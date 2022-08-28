from asyncio.windows_events import NULL
from django.db import models

# Create your models here.
class Clone(models.Model):
    eld_id = models.IntegerField(blank=True, null=True, default=NULL)
    tt_id = models.IntegerField(unique=True)