from django.contrib import admin
from event.models import Event

class EventAdmin(admin.ModelAdmin):
    list_display = ('name',)

admin.site.register(Event, EventAdmin)