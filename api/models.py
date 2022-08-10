from django.db import models

from django.conf import settings

# settings.AUTH_USER_MODEL

# Create your models here.
class Driver(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)