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
            'owner',
            'owner_group',
            'name',
            'city',
            'place',
            'description',
            'image_thumb',
            'start_time',
            'end_time'
        )
        depth = 2
