from django.contrib.auth.models import User
from event.models import Event
from rest_framework import serializers

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = Event
        fields = (
            'id',
            'created_on',
            'updated_on',
            'creator',
            'owner_group',
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
