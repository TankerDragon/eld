# Generated by Django 4.1.4 on 2023-01-07 08:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0007_rename_create_new_user_elduser_activate_driver_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='elduser',
            name='is_active',
            field=models.BooleanField(default=1),
        ),
    ]