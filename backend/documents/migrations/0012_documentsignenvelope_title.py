# Generated by Django 2.2.24 on 2021-09-16 18:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('documents', '0011_documentsignenvelope_envelope_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='documentsignenvelope',
            name='title',
            field=models.CharField(blank=True, max_length=250, null=True, verbose_name='Title'),
        ),
    ]