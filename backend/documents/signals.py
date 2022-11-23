from django.db.models.signals import post_save
from django.dispatch import receiver

from .docusign_config import jwt_token
from .models import *
from .utils import send_envelope_email, create_envelope


@receiver(post_save, sender=DocumentSignEnvelope)
def document_sign_envelope_post_save(sender, instance, created, **kwargs):
    if created:
        # token = jwt_token()
        # envelope = create_envelope(instance, access_token=token.access_token, status='sent')
        # instance.envelope_id = envelope.envelope_id
        # instance.save()
        try:
            send_envelope_email(instance)
        except Exception as e:
            print(e)
