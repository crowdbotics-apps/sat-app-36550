import base64
import os

import requests
from django.conf import settings
from django.http import HttpResponseRedirect, HttpResponse, JsonResponse
from django.urls import reverse
from rest_framework.response import Response
from docusign_esign import Document, TemplateRole, Signer, SignHere, Tabs, EnvelopeDefinition, Recipients, ApiClient, \
    EnvelopesApi, RecipientViewRequest
from rest_framework.decorators import api_view

from .models import DocuSignAPIKey

@api_view(['POST'])
def get_access_code(request):
    keys = DocuSignAPIKey.objects.first()
    base_url = '%s/oauth/auth' % settings.DOCUSIGN_ACCOUNT_BASE_URL
    redirect_uri = 'http://127.0.0.1:8000/documents/docusign/auth_login/'
    consent_scopes = 'signature impersonation openid user_write extended user_read'
    auth_url = '{base_url}?response_type=code&scope={scopes}&client_id={client_id}&client_secret={client_secret}&redirect_uri={redirect_uri}'.format(
        base_url=base_url, scopes=consent_scopes, client_id=keys.integration_key, client_secret=keys.secret_key,
        redirect_uri=redirect_uri
    )
    #return HttpResponseRedirect(auth_url)
    return Response(auth_url)


def auth_login(request):
    base_url = '%s/oauth/token' % settings.DOCUSIGN_ACCOUNT_BASE_URL
    keys = DocuSignAPIKey.objects.first()
    auth_code_string = '{}:{}'.format(keys.integration_key, keys.secret_key)
    auth_token = base64.b64encode(auth_code_string.encode())
    req_headers = {'Authorization': 'Basic {}'.format(auth_token.decode('utf-8'))}
    post_data = {
        'grant_type': 'authorization_code',
        'code': request.GET.get('code')
    }
    res = requests.post(base_url, data=post_data, headers=req_headers)

    response = res.json()
    print(response)

    if 'error' not in response:
        url = '{}?token={}'.format(reverse('documents:get_sigining_url'), response.get('access_token'))
        return HttpResponseRedirect(url)
    return HttpResponse(response['error'])


def get_sigining_url(request):
    keys = DocuSignAPIKey.objects.first()
    signer_email = 'charles.but@gmail.com'
    signer_name = 'Charles'

    file_path = os.path.join(settings.BASE_DIR, 'static/lorem_sample.pdf')

    with open(file_path, 'rb') as file:
        # print(file)
        content_bytes = file.read()

    base64_file_content = base64.b64encode(content_bytes).decode('ascii')

    document = Document(  # create the DocuSign document object
        document_base64=base64_file_content,
        name='Example document',  # can be different from actual file name
        file_extension='pdf',  # many different document types are accepted
        document_id=1  # a label used to reference the doc
    )
    signer = Signer(  # The signer
        email=signer_email, name=signer_name,
        recipient_id="1", routing_order="1",
        # Setting the client_user_id marks the signer as embedded
        client_user_id=keys.integration_key
    )

    sign_here = SignHere(
        document_id=1, page_number=1, recipient_id=1,
        tab_label='SignHereTab', x_position=195, y_position=145
    )
    signer.tabs = Tabs(sign_here_tabs=[sign_here])

    envelope_definition = EnvelopeDefinition(
        email_subject='Please Sign in The Contract',
        documents=[document],
        recipients=Recipients(signers=[signer]),
        status='sent'
    )

    api_client = ApiClient()
    api_client.host = '%s/restapi' % settings.DOCUSIGN_BASE_URL
    api_client.set_default_header('Authorization', 'Bearer {}'.format(request.GET.get('token')))
    envelope_api = EnvelopesApi(api_client)
    results = envelope_api.create_envelope(account_id=keys.account_id, envelope_definition=envelope_definition)
    print(results)
    envelope_id = results.envelope_id
    recipient_view_request = RecipientViewRequest(
        authentication_method='None', client_user_id=keys.integration_key,
        recipient_id=1, return_url=request.build_absolute_uri(reverse('documents:sign_complete')),
        user_name=signer_name, email=signer_email
    )

    results = envelope_api.create_recipient_view(keys.account_id, envelope_id,
                                                 recipient_view_request=recipient_view_request, )
    # return JsonResponse(results.to_dict())
    return HttpResponseRedirect(results.url)


def sign_complete(request):
    # print(request.META)
    # print(request.POST)
    return HttpResponse('sign-complete')
