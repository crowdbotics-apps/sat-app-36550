from django.contrib.auth.hashers import make_password, check_password
from django.db.models import Q
from django.http import HttpRequest
from rest_auth.models import TokenModel
from rest_auth.registration.serializers import SocialLoginSerializer, SocialConnectMixin
from rest_framework import serializers
from django.utils.translation import ugettext_lazy as _
from allauth.account import app_settings as allauth_settings
from allauth.utils import email_address_exists, generate_unique_username
from allauth.account.adapter import get_adapter
from allauth.account.utils import setup_user_email
from django.conf import settings

from users.models import *


class UserSerializerForToken(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'profile_picture')


class CustomTokenModelSerializer(serializers.ModelSerializer):
    user = UserSerializerForToken(read_only=True)

    class Meta:
        model = TokenModel
        fields = ["key", "user"]


class UserProfileSerializer(serializers.ModelSerializer):
    age = serializers.IntegerField(read_only=True)

    class Meta:
        model = UserProfile
        fields = '__all__'
        extra_kwargs = {
            'user': {
                'read_only': True
            }
        }


class AccountSignupSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(max_length=120, required=False, allow_blank=True, allow_null=True, default=None)
    last_name = serializers.CharField(max_length=120, required=False, allow_blank=True, allow_null=True, default=None)

    profile = UserProfileSerializer(required=False, many=False, write_only=True)

    def to_representation(self, instance):
        res = super(AccountSignupSerializer, self).to_representation(instance)

        try:
            res['profile'] = UserProfileSerializer(instance.user_profile).data
        except UserProfile.DoesNotExist:
            res['profile'] = None

        return res

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'phone', 'first_name', 'last_name', 'profile_picture', 'password', 'profile')
        extra_kwargs = {
            'username': {
                'read_only': True,
            },
            'password': {
                'write_only': True,
                'style': {
                    'input_type': 'password'
                }
            },
            'email': {
                'required': True,
                'allow_blank': False,
            }
        }

    def _get_request(self):
        request = self.context.get('request')
        if request and not isinstance(request, HttpRequest) and hasattr(request, '_request'):
            request = request._request
        return request

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."))
        return email

    def create(self, validated_data):
        # print(validated_data)
        profile = None
        if 'profile' in validated_data:
            profile = validated_data.pop('profile')

        username_generate = []
        if 'first_name' in validated_data:
            username_generate.append(validated_data.get('first_name'))

        if 'last_name' in validated_data:
            username_generate.append(validated_data.get('last_name'))

        username_generate += [validated_data.get('email'), 'user']
        username = generate_unique_username(username_generate)

        user = User(
            username=username,
            email=validated_data.get('email'),
            phone=validated_data.get('phone'),
            first_name=validated_data.get('first_name'),
            last_name=validated_data.get('last_name'),
        )
        if 'first_name' in validated_data:
            user.first_name = validated_data.get('first_name')

        if 'last_name' in validated_data:
            user.last_name = validated_data.get('last_name')

        if 'profile_picture' in validated_data and validated_data.get('profile_picture') != "":
            user.profile_picture = validated_data.get('profile_picture')

        user.set_password(validated_data.get('password'))

        user.save()

        if profile:
            try:
                UserProfileSerializer().update(user.user_profile, profile)
            except UserProfile.DoesNotExist:
                UserProfile.objects.create(user=user, **profile)

        request = self._get_request()
        setup_user_email(request, user, [])

        try:
            from allauth.account.utils import complete_signup
            complete_signup(request, user,
                            allauth_settings.EMAIL_VERIFICATION,
                            None)
        except Exception as e:
            print(e)
            pass

        return user


class AuthAccountProfileSerializer(serializers.ModelSerializer):
    # first_name = serializers.CharField(max_length=32, required=False, allow_blank=False)
    # last_name = serializers.CharField(max_length=150, required=False, allow_blank=False)
    profile = UserProfileSerializer(many=False, source='user_profile', )
    mobile_number = serializers.CharField(read_only=True)

    def to_representation(self, instance):
        res = super(AuthAccountProfileSerializer, self).to_representation(instance)
        try:
            from subscriptions.api.v1.serializers import LawyerSubscriptionReadSerializer
            res['active_subscription'] = LawyerSubscriptionReadSerializer(instance.active_subscription, read_only=True,
                                                                          many=False).data
        except:
            res['active_subscription'] = None
        return res

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'phone', 'profile_picture',
                  'profile', 'mobile_number')

        extra_kwargs = {
            'email': {
                'read_only': True
            },
            'username': {
                'read_only': True
            }
        }

    # def validate_first_name(self, first_name):
    #     if first_name == "":
    #         raise serializers.ValidationError(_('First Name is empty.'))
    #     return first_name
    #
    # def validate_last_name(self, last_name):
    #     if last_name == "":
    #         raise serializers.ValidationError(_('Last Name is empty.'))
    #     return last_name
    #

    def validate(self, attrs):
        # errors = []
        if 'profile' in attrs:
            if attrs.get('profile') == "":
                raise serializers.ValidationError({
                    'profile': _('Profile is enpty.')
                })

        # if len(errors) > 0:
        #     raise serializers.ValidationError(errors)

        return attrs

    def update(self, instance, validated_data):
        # print(validated_data)
        profile_data = None
        if 'user_profile' in validated_data:
            profile_data = validated_data.pop('user_profile')
            print(profile_data)
        super(AuthAccountProfileSerializer, self).update(instance, validated_data)
        if profile_data:
            try:
                UserProfileSerializer().update(instance.user_profile, profile_data)
            except UserProfile.DoesNotExist:
                UserProfile.objects.create(user=instance, **profile_data)
            # instance.user_profile = profile_data
            # instance.user_profile.save()

        return instance


class PasswordResetOTPSerializer(serializers.ModelSerializer):
    # email = serializers.EmailField(max_length=150, required=True)

    def __init__(self, *args, **kwargs):
        super(PasswordResetOTPSerializer, self).__init__(*args, **kwargs)
        self.fields['email'] = serializers.EmailField(max_length=150, required=True)

    class Meta:
        model = PasswordResetOTP
        fields = ('user',)

        extra_kwargs = {
            'user': {
                'read_only': True,
            }
        }

    def validate(self, attrs):
        email = attrs.pop('email')
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            raise serializers.ValidationError({
                'email': _('User with this email not found')
            })

        attrs['user'] = user
        return attrs

    def create(self, validated_data):
        user = validated_data.get('user')
        try:
            user.password_reset_otp.delete()
        except:
            pass

        import random
        random_number = random.randint(1000, 9999)
        otp = PasswordResetOTP(
            user=user
        )
        otp.otp_hash = make_password(random_number)
        otp.save()
        from users.utils import send_password_reset_otp_email
        send_password_reset_otp_email(user, random_number)
        self.fields.pop('email')
        return otp


class PasswordResetConfirmWithOTPSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=100)
    otp = serializers.CharField(max_length=6)
    new_password1 = serializers.CharField(max_length=128)
    new_password2 = serializers.CharField(max_length=128)

    def validate(self, attrs):
        email = attrs.get('email')
        otp = attrs.get('otp')
        new_password1 = attrs.get('new_password1')
        new_password2 = attrs.get('new_password2')

        # otp_hash = make_password(otp)

        try:
            otp_object = PasswordResetOTP.objects.get(user__email=email)

        except PasswordResetOTP.DoesNotExist:
            raise serializers.ValidationError({
                'otp': _('Invalid OTP or expired.')
            })

        # if otp_object:
        if new_password2 != new_password1:
            raise serializers.ValidationError({
                'password': _('Password not matched.')
            })

        if otp_object and check_password(otp, otp_object.otp_hash):
            attrs['otp_object'] = otp_object
        else:
            raise serializers.ValidationError({
                'otp': _('OTP Invalid.')
            })

        return attrs

    def create(self, validated_data):
        import datetime
        otp_object = validated_data.get('otp_object')
        time_delta = datetime.datetime.now() - otp_object.created
        total_seconds = time_delta.total_seconds()
        minutes = total_seconds / 60

        if minutes > 5:
            otp_object.delete()
            raise serializers.ValidationError({
                'otp': _('OTP expired.')
            })
        else:
            otp_object.user.set_password(validated_data.get('new_password2'))
            otp_object.user.save()

            return otp_object.user

        # raise serializers.ValidationError(_())