# Generated by Django 2.2.24 on 2021-09-08 06:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0004_docusignapikey_auth_server_http'),
    ]

    operations = [
        migrations.AlterField(
            model_name='docusignapikey',
            name='auth_server',
            field=models.CharField(blank=True, max_length=250, null=True),
        ),
    ]