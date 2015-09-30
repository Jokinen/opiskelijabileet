from django.contrib.sitemaps import Sitemap
from event.models import Event

class EventSiteMap(Sitemap):
    changefreq = "never"
    priority = 0.5

    def items(self):
        return Event.objects.filter(is_public=True, is_deleted=False)

    def lastmod(self, obj):
        return obj.updated_on