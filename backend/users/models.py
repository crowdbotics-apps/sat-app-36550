import os.path

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.urls import reverse
from django.utils import timezone
from django.contrib.postgres.fields.jsonb import JSONField
from django.utils.translation import ugettext_lazy as _


def profile_picture_path(instance, filename):
    file_path = 'users/user_{user_id}/profile_pictures/'.format(user_id=instance.id)
    return os.path.join(file_path, filename)


class User(AbstractUser):
    # WARNING!
    """
    Some officially supported features of Crowdbotics Dashboard depend on the initial
    state of this User model (Such as the creation of superusers using the CLI
    or password reset in the dashboard). Changing, extending, or modifying this model
    may lead to unexpected bugs and or behaviors in the automated flows provided
    by Crowdbotics. Change it at your own risk.


    This model represents the User instance of the system, login system and
    everything that relates with an `User` is represented by this model.
    """

    # First Name and Last Name do not cover name patterns
    name = models.CharField(_("Name of User"), blank=True, null=True, max_length=255)
    first_name = models.CharField(_('First name'), max_length=32, null=True, blank=True)
    last_name = models.CharField(_('Last name'), max_length=150, null=True, blank=True)
    email = models.EmailField(_('Email'), unique=True)
    phone = models.CharField(_('Phone Number'), max_length=20, null=True)
    profile_picture = models.ImageField(upload_to=profile_picture_path, default=None, null=True, blank=True)

    is_blocked = models.BooleanField(_("Blocked"), default=False)

    def get_absolute_url(self):
        return reverse("users:detail", kwargs={"username": self.username})

    @property
    def mobile_number(self):
        if self.user_mobile_number:
            return '%s' % self.user_mobile_number.mobile_number
        return None

    @property
    def full_name(self):
        if self.first_name and self.first_name != '':
            return '{} {}'.format(self.first_name, self.last_name).strip()
        return '%s' % self.username


    # class Meta(AbstractUser.Meta):
    #     constraints = [
    #         models.UniqueConstraint(
    #             fields=['mobile_number'], condition=models.Q(mobile_number__isnull=False),
    #             name='user_unique_mobile_number',
    #         )
    #     ]

    # def clean(self):
    #     if self.pk:
    #         mobile_number = self.mobile_number
    #         check_mobile_number = User.objects.filter(~models.Q(pk=self.pk), mobile_number=mobile_number,)

    # def save(self, *args, **kwargs):
    #     if self.pk is None:
    #         saved_image = self.profile_picture
    #         self.profile_picture = None
    #         super(self.__class__, self).save(*args, **kwargs)
    #         self.profile_picture = saved_image
    #         # if 'force_insert' in kwargs:
    #         #     kwargs.pop('force_insert')
    #
    #     super(self.__class__, self).save(*args, **kwargs)


class UserProfile(models.Model):
    user = models.OneToOneField('users.User', on_delete=models.CASCADE, related_name='user_profile')
    date_of_birth = models.DateField(_('Date of Birth'), default=None, null=True, blank=True)
    location = models.CharField(_('Location'), max_length=150, default=None, null=True, blank=True)

    @property
    def age(self):
        from datetime import date
        today = date.today()
        if self.date_of_birth:
            calculate_age = today.year - self.date_of_birth.year - ((today.month, today.day) <
                                                                    (self.date_of_birth.month, self.date_of_birth.day))
            return calculate_age
        return None

    def __str__(self):
        return '%s' % self.user.username

    class Meta:
        ordering = ('user__username',)
        verbose_name = _('User Profile')
        verbose_name_plural = _('User Profiles')


class PasswordResetOTP(models.Model):
    user = models.OneToOneField('users.User', on_delete=models.CASCADE, related_name='password_reset_otp')
    otp_hash = models.CharField(max_length=256)
    created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '%s' % self.user.username

    class Meta:
        verbose_name = _('Password Reset OTP')
        verbose_name_plural = _('Password Reset OTPs')