from rest_framework.serializers import ModelSerializer
from rest_framework import serializers
from core.models import User
from .models import Driver, Vehicle, Log


# class UserSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['first_name', 'last_name', 'username', 'password']

class DriverSerializer(ModelSerializer):
    user_id = serializers.IntegerField(read_only=True)
    class Meta:
        model = Driver
        fields = ['id', 'user_id', 'cdl_number', 'cdl_state', 'co_driver', 'notes', 'phone', 'app_version']

class VehicleSerializer(ModelSerializer):
    driver_id = serializers.IntegerField(required=False)
    class Meta:
        model = Vehicle
        fields = ['id', 'driver_id', 'unit_number', 'make', 'model', 'license_number', 'license_state', 'notes']

class LogSerializer(ModelSerializer):
    class Meta:
        model = Log
        fields = ['id', 'driver', 'status', 'date', 'time', 'loc_name', 'lat', 'lng', 'vehicle', 'odometer', 'eng_hours', 'notes', 'document', 'trailer']