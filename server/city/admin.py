from django.contrib import admin
from city.models import City

class CityAdmin(admin.ModelAdmin):
    list_display = ('name',)

admin.site.register(City, CityAdmin)
