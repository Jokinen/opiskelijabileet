from django.contrib.auth.models import User
from event.models import Event
from rest_framework import serializers
from group_profile.serializer import GroupProfileSerializer

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            'id',
            'created_on',
            'updated_on',
            'creator',
            'owner_groups',
            'name',
            'city',
            'place',
            'description',
            'fb_url',
            'insta_url',
            'tw_url',
            'url',
            'image',
            'start_time',
            'end_time'
        )
        depth = 2
