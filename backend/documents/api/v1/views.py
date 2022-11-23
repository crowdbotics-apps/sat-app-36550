from django.contrib.sites.models import Site
from django.db.models import Q
from django.views.decorators.csrf import csrf_exempt
from docusign_esign import ReturnUrlRequest, RecipientViewRequest
from rest_framework.generics import *
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import authentication, permissions, status
from django.conf import settings
import requests
import json

from documents.api.v1.serializers import TokenSerializer, DocumentSignEnvelopeSerializer
from documents.docusign_config import *
from documents.models import DocumentSignEnvelope
from documents.utils import create_envelope


class GetDocusignToken(APIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    @staticmethod
    def get(request, *args, **kwargs):
        token = docusign_token()
        # print(token)
        if token:
            return Response(token)
        return Response({
            'message': 'Failed to get token'
        }, status=status.HTTP_400_BAD_REQUEST)


class DocuSignSignature(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]
    serializer_class = TokenSerializer

    @staticmethod
    def get(request, *args, **kwargs):
        from documents.docusign_config import DSClient
        ds_client = DSClient()
        keys = ds_client._docusign_keys()

        # gen_token = client.application_token()
        # print(gen_token)
        # return Response('ok')
        redirect_uri = keys.callback_url
        consent_scopes = 'signature impersonation'
        consent_url = f"{settings.DOCUSIGN_ACCOUNT_BASE_URL}/oauth/auth?response_type=code&" \
                      f"scope={consent_scopes}&client_id={keys.integration_key}&redirect_uri={redirect_uri}"
        print(consent_url)

        try:
            auth = ds_client.get()
            print(auth)
            if auth is not None:
                print(auth.to_dict())
                return Response(auth.to_dict())
            return Response('ok')
        except ApiException as err:
            body = err.body.decode('utf8')
            print(body)
            #
            # # Grant explicit consent for the application
            if "consent_required" in body:
                print('consent_required')
                print('redirecting')

                return redirect(consent_url)

        return Response(status=401)


class DocusignUser(APIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    @staticmethod
    def get(request, *args, **kwargs):
        from documents.docusign_config import DSClient
        client = DSClient()

        keys = client._docusign_keys()
        redirect_uri = request.build_absolute_uri()
        try:
            res = client.access_token()
        except ApiException as err:
            body = err.body.decode('utf8')
            # print(body)
            if "consent_required" in body:
                print('consent_required')
                print('redirecting')
                consent_scopes = 'signature impersonation openid user_write extended user_read'
                consent_url = f"{settings.DOCUSIGN_ACCOUNT_BASE_URL}/oauth/auth?response_type=code&" \
                              f"scope={consent_scopes}&client_id={keys.integration_key}&redirect_uri={redirect_uri}"
                return redirect(consent_url)
            return Response(status=401)
        # client.get_user()
        # print(res)
        if res:
            # print(token.access_token)
            user = client.get_user(res.access_token)
            # print(user)
            return Response(user)

        return Response(status=401)


class DocumentSignEnvelopeAPIView(ListCreateAPIView):
    serializer_class = DocumentSignEnvelopeSerializer

    queryset = DocumentSignEnvelope.objects.none()

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def get_queryset(self):
        queryset = DocumentSignEnvelope.objects.filter(user=self.request.user)
        return queryset


class DocumentSignEnvelopeRequestListView(ListAPIView):
    serializer_class = DocumentSignEnvelopeSerializer

    queryset = DocumentSignEnvelope.objects.none()

    def get_queryset(self):
        queryset = DocumentSignEnvelope.objects.filter(
            Q(signer_email=self.request.user.email) | Q(sign_user=self.request.user))
        return queryset


class DocumentSignEnvelopeDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = DocumentSignEnvelopeSerializer

    queryset = DocumentSignEnvelope.objects.none()

    def get_queryset(self):
        queryset = DocumentSignEnvelope.objects.filter(user=self.request.user)
        return queryset


class DocumentSignEnvelopeRequestDetailView(RetrieveUpdateDestroyAPIView):
    serializer_class = DocumentSignEnvelopeSerializer

    queryset = DocumentSignEnvelope.objects.none()

    def get_queryset(self):
        queryset = DocumentSignEnvelope.objects.filter(signer_email=self.request.user.email)
        return queryset


class DocumentSignEnvelopeSenderView(APIView):
    @staticmethod
    def get(request, *args, **kwargs):
        current_site = Site.objects.get(id=settings.SITE_ID)
        keys = DocuSignAPIKey.objects.first()
        instance = DocumentSignEnvelope.objects.get(id=kwargs.get('pk'))
        envelope_id = instance.envelope_id
        # Create the sender view
        token = jwt_token()
        view_request = ReturnUrlRequest(return_url='http://{}'.format(current_site.domain))
        # Exceptions will be caught by the calling function
        api_client = ApiClient()
        api_client.host = '%s/restapi' % settings.DOCUSIGN_BASE_URL
        api_client.set_default_header("Authorization", "Bearer " + token.access_token)
        envelope_api = EnvelopesApi(api_client)
        results = envelope_api.create_sender_view(keys.account_id, envelope_id, return_url_request=view_request)

        # Switch to Recipient and Documents view if requested by the user
        url = results.url

        return Response({'envelope_id': envelope_id, 'redirect_url': url})


class DocumentSignEnvelopeRecipientView(APIView):
    @staticmethod
    def get(request, *args, **kwargs):
        current_site = Site.objects.get(id=settings.SITE_ID)
        keys = DocuSignAPIKey.objects.first()
        instance = DocumentSignEnvelope.objects.get(id=kwargs.get('pk'))
        envelope_id = instance.envelope_id
        # Create the sender view
        token = jwt_token()
        view_request = ReturnUrlRequest(return_url='http://{}'.format(current_site.domain))
        # Exceptions will be caught by the calling function
        api_client = ApiClient()
        api_client.host = 'https://demo.docusign.net/restapi'
        api_client.set_default_header("Authorization", "Bearer " + token.access_token)
        envelope_api = EnvelopesApi(api_client)
        recipient_view_request = RecipientViewRequest(
            authentication_method='none',
            client_user_id=keys.integration_key,
            recipient_id='1',
            return_url='http://{}'.format(current_site.domain),
            user_name=instance.signer_name, email=instance.signer_email
        )
        results = envelope_api.create_recipient_view(keys.account_id, envelope_id,
                                                     recipient_view_request=recipient_view_request)

        # Switch to Recipient and Documents view if requested by the user
        url = results.url

        return Response({'envelope_id': envelope_id, 'redirect_url': url})


class DocumentSignEnvelopeRecipientResend(APIView):
    @staticmethod
    def get(request, *args, **kwargs):
        try:
            instance = DocumentSignEnvelope.objects.get(id=kwargs.get('pk'))
        except DocumentSignEnvelope.DoesNotExist:
            raise Http404

        if instance:
            from documents.utils import send_envelope_email
            try:
                send_envelope_email(instance)
                return Response({'message': 'Sign request resend successfully.'}, status=200)
            except Exception as e:
                return Response({'message': 'Failed to resend.'}, status=400)
