from django.contrib.auth.models import User
from event.models import Event
from city.models import City
from django.contrib.auth.models import User
from rest_framework import serializers
from taggit_serializer.serializers import (TagListSerializerField,
                                           TaggitSerializer)

class CreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')

class EventSerializer(TaggitSerializer, serializers.ModelSerializer):
    city = serializers.SlugRelatedField(
        slug_field='name',
        required=False,
        queryset=City.objects.all()
    )
    creator = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    labels = TagListSerializerField()

    class Meta:
        model = Event
        fields = (
            'id',
            'creator',
            'created_on',
            'updated_on',
            'owner_groups',
            'name',
            'city',
            'place',
            'description_fi',
            'description_en',
            'fb_url',
            'insta_url',
            'tw_url',
            'url',
            'image',
            'start_time',
            'end_time',
            'labels'
        )
        depth = 2
