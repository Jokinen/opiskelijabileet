from django.db import models
from django.contrib.auth.models import User
from datetime import datetime

from group_profile.models import GroupProfile
from city.models import City
from taggit.managers import TaggableManager

class Event(models.Model):
    created_on = models.DateTimeField(default=datetime.now, blank=True)
    updated_on = models.DateTimeField(blank=True)
    is_deleted = models.BooleanField(default=False, blank=True)
    is_public = models.BooleanField(default=True, blank=True)
    creator = models.ForeignKey(User)
    owner_groups = models.ManyToManyField(GroupProfile)
    city = models.ForeignKey(City)
    labels = TaggableManager()
    place = models.CharField(max_length=100, blank=True)
    name = models.CharField(max_length=200, blank=True)
    description_fi = models.TextField(max_length=2000, blank=True)
    description_en = models.TextField(max_length=2000, blank=True)
    fb_url = models.URLField(max_length=100, blank=True)
    tw_url = models.URLField(max_length=100, blank=True)
    insta_url = models.URLField(max_length=100, blank=True)
    url = models.URLField(max_length=100, blank=True)
    image = models.ImageField(upload_to='event/', blank=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    def save(self, *args, **kwargs):
        # set created_on if object doesn't exist
        if not self.id:
            self.created_on = datetime.now()
        # on every save, update the updated_on attribute
        self.updated_on = datetime.now()
        super(Event, self).save(*args, **kwargs)

    def __unicode__(self):
        return unicode(self.name)
