from django.db import models

class City(models.Model):
    name = models.CharField(max_length=30)
    name_se = models.CharField(max_length=30)

    def __unicode__(self):
        return unicode(self.name)
