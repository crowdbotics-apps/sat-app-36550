from rest_framework import viewsets
from rest_framework import permissions, authentication
from .serializers import *
from ..filtersets import UserFilterSet


class UserListViewset(viewsets.ModelViewSet):
    serializer_class = AdminUserSerializer
    queryset = User.objects.all()

    permission_classes = [permissions.IsAdminUser]
    filterset_class = UserFilterSet
    search_fields = ['first_name', 'last_name', 'email', 'username', 'user_profile__location',
                     'user_mobile_number__mobile_number', ]

    def get_queryset(self):
        return User.objects.select_related('user_profile', 'user_mobile_number').all().order_by('first_name')
