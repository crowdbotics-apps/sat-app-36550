from django.contrib.auth import get_user_model
from rest_framework import serializers

from users.api.v1.account_serializers import UserProfileSerializer
from users.models import User, UserProfile


# class AdminUserSerializerForToken(serializers.ModelSerializer):


class AdminUserSerializer(serializers.ModelSerializer):
    mobile_number = serializers.CharField(read_only=True)

    def to_representation(self, instance):
        res = super(AdminUserSerializer, self).to_representation(instance)

        try:
            res['profile'] = UserProfileSerializer(instance.user_profile).data
        except UserProfile.DoesNotExist:
            res['profile'] = None

        return res

    class Meta:
        model = User
        # fields = '__all__'
        exclude = ('user_permissions', 'groups', 'is_staff', 'is_superuser', 'password')
        extra_kwargs = {
            'username': {
                'read_only': True,
            },
            'email': {
                'required': True,
                'allow_blank': False,
            }
        }
