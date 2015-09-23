from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

from group_profile.models import GroupProfile
from city.models import City

class Event(models.Model):
    created_on = models.DateTimeField(default=datetime.now, blank=True)
    updated_on = models.DateTimeField(blank=True)
    owner = models.ForeignKey(User)
    owner_group = models.ForeignKey(GroupProfile)
    city = models.ForeignKey(City)
    name = models.CharField(max_length=200, blank=True)
    description = models.CharField(max_length=1000, blank=True)
    image_thumb = models.ImageField(upload_to = 'wallpapers/thumb/', blank=True, default="/images/404thumb.jpg")
    start_time = models.DateTimeField(blank=True)
    end_time = models.DateTimeField(blank=True)

    def save(self, *args, **kwargs):
        # set created_on if object doesn't exist
        if not self.id:
            self.created_on = datetime.now()
        # on every save, update the updated_on attribute
        self.updated_on = datetime.now()
        super(Event, self).save(*args, **kwargs)

    def __unicode__(self):
        return unicode(self.name)
