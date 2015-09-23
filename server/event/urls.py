from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from event import views

urlpatterns = [
    url(r'^$', views.EventList.as_view()),
    url(r'^query$', views.DateQuery.as_view()),
    url(r'^as-dates/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<day>[0-9]{2})/$', views.DateList.as_view()),
    url(r'^as-dates/(?P<year>[0-9]{4})/(?P<month>[0-9]{2})/(?P<day>[0-9]{2})/(?P<daterange>[0-9]{1})/$', views.DateRangeList.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)