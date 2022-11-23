from django.conf import settings
from django.http import *
from django.shortcuts import render, redirect


# Create your views here.
from rest_framework.decorators import api_view

from documents.models import DocuSignAPIKey


# @api_view(['POST', 'GET'])
def docusign_callback(request):
    print(request.POST)
    print(request.GET)
    if 'code' in request.GET:
        # if request.GET.get('code') == '':
        #     return HttpResponseRedirect('/documents/docusign/obtain-access-token/')
        # return HttpResponseRedirect('/api/v1/documents/docusign/signature/')
        return JsonResponse({
            'token': request.GET.get('code')
        })
    # return HttpResponseRedirect('/documents/docusign/obtain-access-token/')
    return HttpResponse('failed')


def obtain_access_token(request):
    docusign_key = DocuSignAPIKey.objects.first()
    url = '{account_base_url}/oauth/auth?response_type=code&scope=signature&client_id={client_id}&redirect_uri={redirect_uri}'.format(
        account_base_url=settings.DOCUSIGN_ACCOUNT_BASE_URL, client_id=docusign_key.integration_key,
        redirect_uri=docusign_key.callback_url
    )
    print(url)
    return redirect(url)
