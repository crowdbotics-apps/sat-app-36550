# Generated by Django 2.2.24 on 2021-09-08 06:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0002_docusignapikey_rsa_private_key_file'),
    ]

    operations = [
        migrations.AddField(
            model_name='docusignapikey',
            name='auth_server',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='docusignapikey',
            name='callback_url',
            field=models.URLField(blank=True, null=True),
        ),
    ]
