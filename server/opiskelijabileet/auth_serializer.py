from rest_framework import serializers
from django.contrib.auth import get_user_model

class UserDetailsSerializer(serializers.ModelSerializer):
    """
    User model w/o password
    """
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'is_staff')
        read_only_fields = ('email', 'is_staff', 'id')
