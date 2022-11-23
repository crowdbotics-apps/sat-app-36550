import base64
import os

import requests
from django.conf import settings
from django.http import HttpResponseRedirect
from django.shortcuts import redirect
from jose import jws
from cryptography.hazmat.primitives import serialization as crypto_serialization
import time

from docusign_esign import ApiClient, EnvelopesApi, Document, Signer, SignHere, Tabs, EnvelopeDefinition, Recipients, \
    TemplateRole
from docusign_esign.client.api_exception import ApiException
from .models import DocuSignAPIKey

client_user_id = settings.DOCUSIGN_USER_ID
client_auth_id = settings.DOCUSIGN_INTEGRATION_KEY
account_id = settings.DOCUSIGN_ACCOUNT_ID


def docusign_token():
    docusign_key = DocuSignAPIKey.objects.first()
    iat = time.time()
    exp = iat + (3600 * 24)
    payload = {
        "sub": docusign_key.user_id,
        "iss": docusign_key.integration_key,
        "iat": iat,  # session start_time
        "exp": exp,  # session end_time
        "aud": "account-d.docusign.com",
        "scope": "signature impersonation"
    }
    # print(docusign_key)
    if docusign_key:
        # print()
        read_file = docusign_key.rsa_private_key.encode('ascii')
        # print(read_file)
        private_key = crypto_serialization.load_pem_private_key(read_file, password=None)
        key = private_key.private_bytes(crypto_serialization.Encoding.PEM, crypto_serialization.PrivateFormat.PKCS8,
                                        crypto_serialization.NoEncryption())
        jwt_token = jws.sign(payload, key, algorithm='RS256')
        return jwt_token
    return None


SCOPES = [
    "signature"
]

DS_JWT = {
    "ds_client_id": "db6edb14-3c00-451f-9fd0-655dedfe6238",
    "ds_impersonated_user_id": "f54de91e-e832-4fb7-bd42-95cb292cc508",  # The id of the user.
    "private_key_file": "./app/private.key",
    # Create a new file in your repo source folder named private.key then copy and paste your RSA private key there and save it.
    "authorization_server": "account-d.docusign.com"
}

DS_CONFIG = {
    "ds_client_id": "db6edb14-3c00-451f-9fd0-655dedfe6238",  # The app's DocuSign integration key
    "ds_client_secret": "2bb07187-5989-4c0e-8021-fa3959833278",  # The app's DocuSign integration key's secret
    "organization_id": "{ORGANIZATION_ID}",  # A GUID value that identifies the organization
    "signer_email": "charles.apochi@crowdbotics.com",
    "signer_name": "Charles Apochi",
    "app_url": "http://localhost:5000",  # The URL of the application. Eg http://localhost:5000
    # NOTE: You must add a Redirect URI of appUrl/ds/callback to your Integration Key.
    #       Example: http://localhost:5000/ds/callback
    "authorization_server": settings.DOCUSIGN_ACCOUNT_BASE_URL,
    "click_api_client_host": "https://demo.docusign.net/clickapi",
    "rooms_api_client_host": "https://demo.rooms.docusign.com/restapi",
    "monitor_api_client_host": "https://lens-d.docusign.net",
    "admin_api_client_host": "https://api-d.docusign.net/management",
    "allow_silent_authentication": True,  # a user can be silently authenticated if they have an
    # active login session on another tab of the same browser
    "target_account_id": None,  # Set if you want a specific DocuSign AccountId,
    # If None, the user's default account will be used.
    "demo_doc_path": "demo_documents",
    "doc_salary_docx": "World_Wide_Corp_salary.docx",
    "doc_docx": "World_Wide_Corp_Battle_Plan_Trafalgar.docx",
    "doc_pdf": "World_Wide_Corp_lorem.pdf",
    "doc_terms_pdf": "Term_Of_Service.pdf",
    "doc_txt": "Welcome.txt",
    # Payment gateway information is optional
    "gateway_account_id": "{DS_PAYMENT_GATEWAY_ID}",
    "gateway_name": "stripe",
    "gateway_display_name": "Stripe",
    "github_example_url": "https://github.com/docusign/code-examples-python/tree/master/app/eSignature/examples/",
    "monitor_github_url": "https://github.com/docusign/code-examples-python/tree/master/app/monitor/examples/",
    "admin_github_url": "https://github.com/docusign/code-examples-python/tree/master/app/admin/examples/",
    "documentation": "",  # Use an empty string to indicate no documentation path.
    "quickstart": "true"
}
ROOMS_SCOPES = [
    "room_forms", "dtr.rooms.read", "dtr.rooms.write",
    "dtr.documents.read", "dtr.documents.write", "dtr.profile.read",
    "dtr.profile.write", "dtr.company.read", "dtr.company.write"
]

CLICK_SCOPES = [
    "signature", "click.manage", "click.send"
]

ADMIN_SCOPES = [
    "signature", "organization_read", "group_read", "permission_read", "user_read", "user_write",
    "account_read", "domain_read", "identity_provider", "read impersonation"
]


class DSClient:
    ds_app = None

    @classmethod
    def _init(cls):
        cls._jwt_auth()

    @staticmethod
    def _docusign_keys():
        return DocuSignAPIKey.objects.first()

    @classmethod
    def _jwt_auth(cls):
        docusign_keys = cls._docusign_keys()
        api_client = ApiClient()
        api_client.set_base_path(settings.DOCUSIGN_ACCOUNT_BASE_URL)
        use_scopes = ["signature", "impersonation", "openid", "user_write", "extended", "user_read"]
        # use_scopes.append("impersonation")
        # use_scopes.append("extended")
        # use_scopes.append("openid")
        # use_scopes = [str(docusign_keys.scopes)]

        private_key = cls._get_private_key().encode("ascii").decode("utf-8")

        try:
            cls.ds_app = api_client.request_jwt_user_token(
                client_id=docusign_keys.integration_key,
                user_id=docusign_keys.user_id,
                oauth_host_name=settings.DOCUSIGN_ACCOUNT_HOST_NAME,
                private_key_bytes=private_key,
                expires_in=3600,
                scopes=use_scopes
            )
            print('token')
        except Exception as e:
            print(e)
            cls.ds_app = None
        # else:
        #     cls.ds_app = None
        return cls.ds_app

    @classmethod
    def application_token(cls):
        docusign_keys = cls._docusign_keys()
        api_client = ApiClient()
        api_client.set_base_path(settings.DOCUSIGN_ACCOUNT_BASE_URL)
        private_key = cls._get_private_key().encode("ascii").decode("utf-8")
        token = api_client.request_jwt_application_token(
            client_id=docusign_keys.integration_key,
            oauth_host_name=settings.DOCUSIGN_ACCOUNT_HOST_NAME,
            private_key_bytes=private_key,
            expires_in=3600,
        )
        return token

    @classmethod
    def _get_private_key(cls):
        private_key = cls._docusign_keys().rsa_private_key
        # print(private_key)

        return private_key

    @classmethod
    def login(cls):
        return cls._jwt_auth()

    @classmethod
    def get_token(cls):
        resp = cls.get()

        if resp is None or resp.to_dict().get("access_token") is None:
            return {
                'error': 'Error'
            }

        return resp.to_dict()

    @classmethod
    def get_user(cls, access_token):
        """Make request to the API to get the user information"""
        # Determine user, account_id, base_url by calling OAuth::getUserInfo
        # See https://developers.docusign.com/esign-rest-api/guides/authentication/user-info-endpoints
        url = "%s/oauth/userinfo" % settings.DOCUSIGN_ACCOUNT_BASE_URL
        auth = {"Authorization": "Bearer " + access_token}
        response = requests.get(url, headers=auth).json()

        return response

    @classmethod
    def get(cls):
        if not cls.ds_app:
            cls._init()
        return cls.ds_app

    @classmethod
    def access_token(cls):
        docusign_keys = cls._docusign_keys()
        api_client = ApiClient()
        api_client.set_base_path(settings.DOCUSIGN_ACCOUNT_BASE_URL)
        use_scopes = SCOPES
        use_scopes.append("impersonation")

        private_key = cls._get_private_key().encode("ascii").decode("utf-8")
        res = api_client.request_jwt_user_token(
            client_id=docusign_keys.integration_key,
            user_id=docusign_keys.user_id,
            oauth_host_name=settings.DOCUSIGN_ACCOUNT_HOST_NAME,
            private_key_bytes=private_key,
            expires_in=3600,
            scopes=use_scopes
        )
        return res

    @classmethod
    def generate_token(cls):
        docusign_keys = cls._docusign_keys()
        api_client = ApiClient()
        api_client.set_oauth_host_name(docusign_keys.auth_server)
        token = docusign_token()
        gen_token = api_client.generate_access_token(client_id=docusign_keys.integration_key,
                                                     client_secret=docusign_keys.secret_key,
                                                     code=token)
        return gen_token


def custom_token():
    token = docusign_token()
    post_data = {
        # 'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'grant_type': 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        'assertion': token,
    }
    base_url = 'https://account-d.docusign.com/oauth/token'

    response = requests.post(base_url, data=post_data)
    if response.status_code == (200 or '200'):
        res_token = response.json()
        print(res_token.get('access_token'))
        return res_token.get('access_token')
    return None


def jwt_token():
    docusign_keys = DocuSignAPIKey.objects.first()
    # private_key = docusign_keys.rsa_private_key.encode("ascii").decode("utf-8")
    private_key = docusign_keys.rsa_private_key.encode("ascii").decode("utf-8")
    use_scopes = ["signature", "impersonation", ]
    api_client = ApiClient()
    api_client.set_base_path(settings.DOCUSIGN_ACCOUNT_BASE_URL)
    token = api_client.request_jwt_user_token(
        client_id=docusign_keys.integration_key,
        user_id=docusign_keys.user_id,
        oauth_host_name=settings.DOCUSIGN_ACCOUNT_HOST_NAME,
        private_key_bytes=private_key,
        expires_in=3600,
        scopes=use_scopes
    )
    return token


def authrization_token():
    client = DSClient()
    token = client.get_token()
    base_url = '%s/oauth/token' % settings.DOCUSIGN_ACCOUNT_BASE_URL
    keys = DocuSignAPIKey.objects.first()
    auth_code_string = '{}:{}'.format(keys.integration_key, keys.secret_key)
    auth_token = base64.b64encode(auth_code_string.encode())
    req_headers = {'Authorization': 'Basic {}'.format(auth_token.decode('utf-8'))}
    post_data = {
        'grant_type': 'authorization_code',
        'code': token.access_token
    }
    res = requests.post(base_url, data=post_data, headers=req_headers)
    return res.json()


def create_api_client(base_path='https://demo.docusign.net/restapi'):
    """Create api client and construct API headers"""
    ds_client = DSClient()
    # token = ds_client.access_token()
    token = ds_client.get_token()
    # print(token)
    if token:
        # print(token.access_token)
        # access_token = token.access_token
        access_token = token
        api_client = ApiClient()
        api_client.host = base_path
        api_client.set_default_header(header_name="Authorization", header_value=f"Bearer {access_token}")
        # api_client.

        return api_client
    return None


def make_envelope(data):
    keys = DocuSignAPIKey.objects.first()
    signer_email = 'charles.apochi@crowdbotics.com'
    signer_name = 'CHarles'
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

    # signer = Signer(  # The signer
    #     email=signer_email, name=signer_name,
    #     recipient_id="1", routing_order="1",
    #     # Setting the client_user_id marks the signer as embedded
    #     client_user_id=settings.DOCUSIGN_USER_ID
    # )
    envelope_definition = EnvelopeDefinition(
        status="sent",  # requests that the envelope be created and sent.
        # template_id='f032f6dd-7147-40e2-8da9-052dd4a1e47e',
        template_id='1',
    )
    signer = TemplateRole(
        email=signer_email,
        name=signer_name,
        role_name='signer',
        client_user_id=keys.integration_key
    )
    sign_here = SignHere(  # DocuSign SignHere field/tab
        anchor_string='/sn1/', anchor_units='pixels',
        anchor_y_offset='10', anchor_x_offset='20'
    )
    # signer.tabs = Tabs(sign_here_tabs=[sign_here])
    # envelope_definition = EnvelopeDefinition(
    #     email_subject="Please sign this document sent from the Python SDK",
    #     # documents=[document],
    #     template_id='f032f6dd-7147-40e2-8da9-052dd4a1e47e',
    #     # The Recipients object wants arrays for each recipient type
    #     recipients=Recipients(signers=[signer]),
    #     status="sent"  # requests that the envelope be created and sent.
    # )

    envelope_definition.template_roles = [signer, ]
    return envelope_definition
