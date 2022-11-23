from urllib import response
from django.utils import timezone
from django.utils.translation import ugettext_lazy as _
from rest_framework import permissions, authentication, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.generics import *
from rest_auth.views import LoginView, PasswordChangeView
from rest_framework.response import Response
from rest_framework.parsers import JSONParser
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.views import APIView
from django.http import HttpResponse, JsonResponse
from django.shortcuts import redirect

import json
from .account_serializers import *
from users.models import *



class AccountRegistration(CreateAPIView):
    serializer_class = AccountSignupSerializer
    authentication_classes = []
    permission_classes = [permissions.AllowAny]


class AccountTokenLoginView(LoginView):
    pass


class CustomAuthToken(ObtainAuthToken):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if user.is_blocked:
            return Response({'error': 'Account Restricted.'}, status=status.HTTP_403_FORBIDDEN)
        user_data = UserSerializerForToken(user).data
        token, created = Token.objects.get_or_create(user=user)
        user.last_login = timezone.now()
        user.save()

        data = {
            'key': token.key,
            'user': user_data,
            # 'user_id': user.pk,
            # 'email': user.email,
            # 'first_name': user.first_name,
            # 'last_name': user.last_name,
            # 'prfile_picture': profile_picture_url,
        }
        return Response(data)


class AuthAccountProfileDetails(RetrieveUpdateAPIView):
    authentication_classes = [authentication.TokenAuthentication, authentication.SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = AuthAccountProfileSerializer

    def get_object(self):
        return get_object_or_404(self.get_queryset(), pk=self.request.user.pk)



class AccountPasswordChange(PasswordChangeView):
    authentication_classes = [authentication.TokenAuthentication]
    permission_classes = [permissions.IsAuthenticated]


class AccountPasswordReset(CreateAPIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    serializer_class = PasswordResetOTPSerializer
    queryset = PasswordResetOTP.objects.all()

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {"detail": _("Password reset OTP sent to your email")},
                status=status.HTTP_200_OK
            )
        return Response(
            {"detail": _("Failed to send OTP.")},
            status=status.HTTP_400_BAD_REQUEST
        )


class AccountPasswordResetConfirm(CreateAPIView):
    authentication_classes = []
    permission_classes = [permissions.AllowAny]
    serializer_class = PasswordResetConfirmWithOTPSerializer
    queryset = None

    @staticmethod
    def post(request, *args, **kwargs):
        serializer = PasswordResetConfirmWithOTPSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response({'detail': 'Password resetted successfully.'})
        return Response({'detail': 'Password reset failed.'}, status=status.HTTP_400_BAD_REQUEST)

class UsersList(APIView):
    """
    List all Users
    """
    def get(self, request, format=None):
        users = User.objects.all()
        serializer = UserSerializerForToken(users, many=True)
        return Response(serializer.data)