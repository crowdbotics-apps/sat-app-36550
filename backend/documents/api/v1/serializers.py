from pathlib import Path

from rest_framework import serializers

from documents.docusign_config import jwt_token
from documents.models import *
from documents.utils import create_envelope, send_envelope_email


class TokenSerializer(serializers.Serializer):
    token = serializers.CharField()


class DocumentSignEnvelopeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentSignEnvelope
        fields = '__all__'
        extra_kwargs = {
            'user': {
                'read_only': True
            },
            'envelope_id': {
                'read_only': True
            }
        }

    def create(self, validated_data):

        signer_email = validated_data.get('signer_email')
        signer_name = validated_data.get('signer_name')
        title = validated_data.get('title')
        file = validated_data.get('file')
        user = validated_data.get('user')
        description = validated_data.get('description', None)
        # return validated_data

        try:
            token = jwt_token()
            envelope = create_envelope(user=user, signer_email=signer_email, signer_name=signer_name,
                                       file=file, title=title, description=description,
                                       access_token=token.access_token, status='sent')

        except Exception as e:
            print(e)
            raise serializers.ValidationError({
                'envelope': 'Failed to Create envelope.'
            })

        if envelope:
            print(envelope.envelope_id)
            validated_data['envelope_id'] = envelope.envelope_id
            instance = DocumentSignEnvelope.objects.create(**validated_data)
            try:
                send_envelope_email(instance)
            except Exception as e:
                print(e)

            return instance

        raise serializers.ValidationError({
            'envelope': 'Failed to Create envelope.'
        })
