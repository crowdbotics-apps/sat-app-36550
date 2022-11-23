from django.contrib import admin

from .models import *


@admin.register(DocuSignAPIKey)
class DocuSignAPIKeyAdmin(admin.ModelAdmin):
    list_display = ['user_id', 'account_id', ]

    def has_add_permission(self, request):
        return not DocuSignAPIKey.objects.exists()


@admin.register(DocumentSignEnvelope)
class DocumentSignEnvelopeAdmin(admin.ModelAdmin):
    list_display = ['title', 'envelope_id', 'created', 'updated']
