# Generated by Django 5.0.2 on 2024-02-28 14:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("providers", "0002_add_category_icon"),
    ]

    operations = [
        migrations.AddField(
            model_name="provider",
            name="has_counter",
            field=models.BooleanField(default=True, verbose_name="has counter"),
        ),
    ]
