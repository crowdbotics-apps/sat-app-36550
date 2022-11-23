from django.urls import path
from .account_views import *

urlpatterns = [
    path('signup/', AccountRegistration.as_view(), name='account_registration'),
    path('login/token/', CustomAuthToken.as_view(), name='account_login'),

    path('profile/', AuthAccountProfileDetails.as_view(), name='auth_profile'),
    path('password/change/', AccountPasswordChange.as_view()),
    path('password-reset/', AccountPasswordReset.as_view()),
    path('password-reset/confirm/', AccountPasswordResetConfirm.as_view(), ),

    path('users/', UsersList.as_view(), name='users_profile'),
]
