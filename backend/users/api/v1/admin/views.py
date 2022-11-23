from rest_framework import permissions, authentication
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.response import Response

from .serializers import *


class AdminAuthToken(ObtainAuthToken):
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        if not user.is_superuser or not user.is_staff:
            return Response({'message': 'Permission denied.'}, status=403)
        user_data = AdminUserSerializer(user).data
        token, created = Token.objects.get_or_create(user=user)
        data = {
            'key': token.key,
            'user': user_data,
        }
        return Response(data)
