from django.urls import path
from . import views, docusign_views

app_name = 'documents'

urlpatterns = [
    path('docusign/callback/', views.docusign_callback, ),
    path('docusign/obtain-access-token/', views.obtain_access_token, ),
    path('docusign/get-access-code/', docusign_views.get_access_code, ),
    path('docusign/auth_login/', docusign_views.auth_login, ),
    path('docusign/get_sigining_url/', docusign_views.get_sigining_url, name='get_sigining_url'),
    path('docusign/sign-complete/', docusign_views.sign_complete, name='sign_complete'),
]
