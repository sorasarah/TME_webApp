# Generated by Django 5.0.3 on 2024-03-20 12:31

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("mytig", "0003_user"),
    ]

    operations = [
        migrations.AddField(
            model_name="transaction",
            name="taxes",
            field=models.DecimalField(
                blank=True, decimal_places=2, max_digits=10, null=True
            ),
        ),
    ]
