from group_profile.models import GroupProfile
from rest_framework import serializers

class GroupProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = GroupProfile
        fields = ('group', 'url')