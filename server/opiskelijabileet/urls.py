"""opiskelijabileet URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.conf.urls import include, url, patterns
from django.contrib import admin
from django.views.generic import TemplateView
from django.contrib.sitemaps.views import sitemap
from opiskelijabileet.sitemap import EventSiteMap

from facebook_api.views import get_fb_event

admin.autodiscover()

apipatterns = [
    url(r'events/', include('event.urls')),
]

sitemaps = {
    'event': EventSiteMap(),
}

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^rest-auth/', include('rest_auth.urls')),
    url(r'^api/', include(apipatterns)),
    url(r'^robots\.txt$',
        TemplateView.as_view(
            template_name='templates/robots.txt', content_type='text/plain')),
    url(r'^sitemap\.xml$', sitemap, {'sitemaps': sitemaps},
        name='django.contrib.sitemaps.views.sitemap'),
    # define separately for reversing
    url(r'^events/(?P<id>[0-9]+)/$',
        TemplateView.as_view(template_name='index.html'),
        name='event'),
    url(r'^facebook/event/(?P<id>[0-9]+)', view=get_fb_event),
    url(r'^.*$', TemplateView.as_view(template_name='index.html')),
]

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
urlpatterns += staticfiles_urlpatterns()

from django.conf import settings
if settings.DEBUG:
    urlpatterns += patterns('',
                            url(r'^media/(?P<path>.*)$', 'django.views.static.serve', {
                                'document_root': settings.MEDIA_ROOT,
                            }),
                            url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {
                                'document_root': settings.STATIC_ROOT,
                            }),
                            )
