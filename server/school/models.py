from django.db import models
from city.models import City

class School(models.Model):
    name = models.CharField(max_length=30)
    cities = models.ManyToMany(City)

