from django.urls import path

from .views import *

app_name = 'documents'

urlpatterns = [
    path('docusign/token/', GetDocusignToken.as_view()),
    path('docusign/get-user/', DocusignUser.as_view()),
    path('docusign/signature/', DocuSignSignature.as_view()),
    path('docusign/document-sign-envelops/', DocumentSignEnvelopeAPIView.as_view()),
    path('docusign/document-sign-envelops/<int:pk>/', DocumentSignEnvelopeDetailView.as_view()),
    path('docusign/document-sign-envelops/<int:pk>/view/', DocumentSignEnvelopeSenderView.as_view()),
    path('docusign/document-sign-envelops/<int:pk>/resend/', DocumentSignEnvelopeRecipientResend.as_view()),
    path('docusign/document-sign-requests/', DocumentSignEnvelopeRequestListView.as_view()),
    path('docusign/document-sign-requests/<int:pk>/', DocumentSignEnvelopeRequestDetailView.as_view()),
    path('docusign/document-sign-requests/<int:pk>/view/', DocumentSignEnvelopeRecipientView.as_view()),
    path('docusign/document-sign-requests/<int:pk>/resend/', DocumentSignEnvelopeRecipientResend.as_view()),
]
