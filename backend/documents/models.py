from django.core.validators import FileExtensionValidator
from django.db import models
from django.utils.translation import ugettext_lazy as _

from users.models import User


class DocuSignAPIKey(models.Model):
    user_id = models.CharField(_('DocuSign User ID'), max_length=250)
    account_id = models.CharField(_('DocuSign Account ID'), max_length=250)
    integration_key = models.CharField(_('DocuSign INTEGRATION KEY'), max_length=250)
    rsa_public_key = models.TextField(_('RSA PUBLIC KEY'))
    rsa_private_key = models.TextField(_('RSA Private KEY'))
    keypair_id = models.CharField(_('key Pair ID'), max_length=250)
    rsa_private_key_file = models.FileField(upload_to='documents/docusign', null=True, blank=True)
    auth_server = models.CharField(max_length=250, null=True, blank=True)
    auth_server_http = models.URLField(null=True, blank=True)
    callback_url = models.URLField(null=True, blank=True)
    scopes = models.CharField(max_length=250, null=True, blank=True)

    secret_key = models.CharField(max_length=250, null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ('-created',)
        verbose_name = _('DocuSign API Key')
        verbose_name_plural = _('DocuSign API keys')


class DocumentSignEnvelope(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, related_name='sender_document_sign_envelopes')
    title = models.CharField(_('Title'), max_length=250, null=True, blank=True)
    signer_email = models.EmailField(_('Signer email'), null=False)
    signer_name = models.CharField(_('Signer Name'), max_length=50, null=False)
    description = models.TextField(_('Description'), blank=True)
    file = models.FileField(_('File'), upload_to='documents/envelops', null=True, blank=True,
                            validators=[FileExtensionValidator(allowed_extensions=['pdf', 'docx'])])
    envelope_id = models.CharField(_('Envelope ID'), max_length=250, null=True, blank=True)
    sign_user = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True, blank=True)

    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)

    def __str__(self):
        return '%s: %s' % (self.pk, self.signer_email)

    class Meta:
        ordering = ('-created',)
        verbose_name = _('Document For Sign')
        verbose_name_plural = _('Documents For Sign')

    # def save(self, *args, **kwargs):
    #     if not self.user:
    #         try:
    #             self.sign_user = User.objects.get(email=self.signer_email)
    #         except User.DoesNotExist:
    #             self.sign_user = None
    #         super(self.__class__, self).save(*args, *kwargs)
