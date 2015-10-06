import imghdr

from django.utils.translation import ugettext_lazy as _
from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from django.core.urlresolvers import reverse

from group_profile.models import GroupProfile
from city.models import City
from taggit.managers import TaggableManager

from django.core.exceptions import ValidationError

class Event(models.Model):
    created_on = models.DateTimeField(default=timezone.now, blank=True, verbose_name=_('Created'))
    updated_on = models.DateTimeField(blank=True, verbose_name=_('Updated'))
    is_deleted = models.BooleanField(default=False, blank=True, verbose_name=_('Deleted'))
    is_public = models.BooleanField(default=True, blank=True, verbose_name=_('Public'))
    creator = models.ForeignKey(User, verbose_name=_('Creator'))
    owner_groups = models.ManyToManyField(GroupProfile, verbose_name=_('Owner groups'))
    city = models.ForeignKey(City, verbose_name=_('City'))
    labels = TaggableManager(verbose_name=_('Labels'), help_text=_('Choose one from: bileet (we need to make up other fitting types, but bileet might be enoughto start)'))
    place = models.CharField(max_length=100, blank=True, verbose_name=_('Place'))
    name = models.CharField(max_length=200, blank=True, verbose_name=_('Event\'s Name'))
    price = models.PositiveIntegerField(blank=True, null=True, verbose_name=_('Price'), help_text=_('The most common amount the event will cost for someone taking part. In euros. Please include discounts in the description(s).'))
    description_fi = models.TextField(max_length=2000, blank=True, verbose_name=_('Description in Finnish'), help_text=_('Description used with the Finnish translation of the page'))
    description_en = models.TextField(max_length=2000, blank=True, verbose_name=_('Description in English'), help_text=_('Description used with the English translation of the page'))
    description_se = models.TextField(max_length=2000, blank=True, verbose_name=_('Description in Swedish'), help_text=_('Description used with the Swedish translation of the page'))
    fb_url = models.URLField(max_length=100, blank=True, verbose_name=_('Facebook'), help_text=_('Facebook page or event page for the event'))
    tw_url = models.URLField(max_length=100, blank=True, verbose_name=_('Twitter'), help_text=_('Twitter profile for the event'))
    insta_url = models.URLField(max_length=100, blank=True, verbose_name=_('Instagram'), help_text=_('Instagram profile for the event'))
    url = models.URLField(max_length=100, blank=True, verbose_name=_('Homepage'), help_text=_('Event\'s homepage'))
    image = models.ImageField(upload_to='event/', blank=True, verbose_name=_('Image'), help_text=_('Maximum height: 400px, Maximum width: 600px, Allowed formats: jpeg(jpg), png'))
    start_time = models.DateTimeField(verbose_name=_('Start time'))
    end_time = models.DateTimeField(verbose_name=_('End time'))

    class Meta:
        verbose_name = _('event')
        verbose_name_plural = _('events')

    def save(self, *args, **kwargs):
        # set created_on if object doesn't exist
        if not self.id:
            self.created_on = timezone.now()
        # on every save, update the updated_on attribute
        self.updated_on = timezone.now()
        super(Event, self).save(*args, **kwargs)

    def clean(self):
        if self.image:
            from django.core.files.images import get_image_dimensions
            image_errors = []
            max_width = 600
            max_height = 400
            image_formats = ['jpeg', 'png']
            print(imghdr.what(self.image))
            if imghdr.what(self.image) not in image_formats:
                image_errors.append(ValidationError(_('Only *.jpg and *.png images are allowed.')))
            w, h = get_image_dimensions(self.image)
            if w > max_width:
                image_errors.append(ValidationError(_("The image is {}px wide when the maximum width is {}px").format(w, max_width)))
            if h > max_height:
                image_errors.append(ValidationError(_("The image is {}px high when the maximum height is {}px").format(h, max_height)))
            if len(image_errors) > 0:
                raise ValidationError({'image': image_errors})
        if self.start_time > self.end_time:
            raise ValidationError({
                'start_time': ValidationError(_("Start time must be before end time!")),
                'end_time': ValidationError(_("End time must be after start time!")),
            })

    def get_absolute_url(self):
        return reverse('event', kwargs={'id':self.id})

    def __unicode__(self):
        return unicode(self.name)
