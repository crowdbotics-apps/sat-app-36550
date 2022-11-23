import base64
import os
from pathlib import Path

from django.conf import settings
from django.contrib.sites.models import Site
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from docusign_esign import Document, EnvelopeDefinition, TemplateRole, SignHere, Signer, ApiClient, EnvelopesApi, \
    RecipientViewRequest, Recipients, Tabs, CarbonCopy, ReturnUrlRequest, CustomField, CustomFields, TextCustomField

from documents.docusign_config import create_api_client, jwt_token
from documents.models import DocuSignAPIKey, DocumentSignEnvelope


def create_envelope(user, title, signer_email, signer_name, file, description=None, access_token=None, status='created',
                    return_url=None):
    keys = DocuSignAPIKey.objects.first()

    # signer_email = instance.get('signer_email')
    # signer_name = instance.get('signer_name')
    extension = Path(file.name).suffix[1:].lower()
    content_bytes = file.read()

    base64_file_content = base64.b64encode(content_bytes).decode('ascii')

    sign_here = SignHere(
        anchor_string='/signer_signature/',
        x_position=0,
        y_position=0
    )

    document_html = render_to_string('documents/render_signature.html', {
        'user': user,
        'signer_email': signer_email,
        'signer_name': signer_name,
        'title': title,
        'description': description,
    })

    document_html_bytes = base64.b64encode(bytes(document_html, "utf-8")).decode("ascii")

    documents = [
        Document(  # create the DocuSign document object
            document_base64=base64_file_content,
            name=title,  # can be different from actual file name
            file_extension=extension,  # many different document types are accepted
            document_id=1  # a label used to reference the doc
        ),
        Document(
            document_base64=document_html_bytes,
            name=title,
            file_extension='html',
            document_id=2
        )
    ]
    signer = Signer(  # The signer
        email=signer_email, name=signer_name,
        recipient_id="1", routing_order="1",
        # Setting the client_user_id marks the signer as embedded
        client_user_id=keys.integration_key
    )
    custom_fields = CustomFields(
        text_custom_fields=[
            TextCustomField(
                name="Full Name",
                value=signer_name,
                required="true",
                show="true"
            ),
            TextCustomField(
                name="Email",
                value=signer_email,
                required="true",
                show="true"
            )
        ]
    )

    signer.tabs = Tabs(sign_here_tabs=[sign_here])
    cc = CarbonCopy(
        email=user.email,
        name=user.get_full_name().strip(),
        recipient_id="2",
        routing_order="2"
    )
    recipients = Recipients(signers=[signer], carbon_copies=[cc])
    envelope_definition = EnvelopeDefinition(
        email_subject=title,
        documents=documents,
        recipients=recipients,
        status=status,
        custom_fields=custom_fields
    )

    api_client = ApiClient()
    api_client.host = '%s/restapi' % settings.DOCUSIGN_BASE_URL
    api_client.set_default_header(header_name="Authorization", header_value=f"Bearer {access_token}")
    envelope_api = EnvelopesApi(api_client)
    results = envelope_api.create_envelope(account_id=keys.account_id, envelope_definition=envelope_definition)
    # print(results)
    # envelope_id = results.envelope_id
    # recipient_view_request = RecipientViewRequest(
    #     authentication_method='None', client_user_id=keys.integration_key,
    #     recipient_id=1, return_url=return_url,
    #     user_name=signer_name, email=signer_email
    # )
    #
    # results = envelope_api.create_recipient_view(keys.account_id, envelope_id,
    #                                              recipient_view_request=recipient_view_request, )

    # print(envelope_id)
    # instance.envelope_id = envelope_id
    # instance.save()
    # envelope_definition.template_roles = [signer, ]
    return results


def send_envelope_email(instance):
    keys = DocuSignAPIKey.objects.first()
    current_site = Site.objects.get(id=settings.SITE_ID)

    envelope_id = instance.envelope_id

    token = jwt_token()
    # view_request = ReturnUrlRequest(return_url='http://{}'.format(current_site.domain))
    api_client = ApiClient()
    api_client.host = '%s/restapi' % settings.DOCUSIGN_BASE_URL
    api_client.set_default_header("Authorization", "Bearer " + token.access_token)
    envelope_api = EnvelopesApi(api_client)
    recipient_view_request = RecipientViewRequest(
        authentication_method='none',
        client_user_id=keys.integration_key,
        recipient_id='1',
        return_url='http://{}/documents/docusign/sign-complete/'.format(current_site.domain),
        user_name=instance.signer_name, email=instance.signer_email
    )
    results = envelope_api.create_recipient_view(keys.account_id, envelope_id,
                                                 recipient_view_request=recipient_view_request)

    sign_url = results.url
    data = {
        'instance': instance,
        'sign_url': sign_url
    }
    subject = 'You have a new request to sign on a document from %s' % (instance.user.get_full_name())
    from_email, to = settings.DEFAULT_FROM_EMAIL, instance.signer_email
    text_content = ""
    html_content = render_to_string('documents/emails/send_envelope_email.html', data)
    msg = EmailMultiAlternatives(subject, text_content, from_email, [to])
    msg.attach_alternative(html_content, "text/html")
    msg.send()
    return instance
