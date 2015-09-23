from django.db import models
from django.contrib.auth.models import Group

class GroupProfile(models.Model):
    group = models.OneToOneField(Group, unique=True)
    url = models.CharField(max_length=100)
