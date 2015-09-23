from django.contrib import admin
from .models import GroupProfile

@admin.register(GroupProfile)
class GroupProfileAdmin(admin.ModelAdmin):
    pass
