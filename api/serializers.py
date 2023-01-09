from rest_framework.serializers import ModelSerializer, Serializer
from core.serializers import UserSerializer, UserCreateSerializer
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from core.models import User
from .models import Driver, Vehicle, Elduser


class DriverSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Driver
        fields = '__all__'
        read_only_fields = ['app_version', 'company_id']


class DriverListSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Driver
        fields = ['id', 'user']


class VehicleSerializer(ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'
        read_only_fields = ['company_id']


class VehicleListSerializer(ModelSerializer):
    class Meta:
        model = Vehicle
        fields = ['id', 'unit_number']


class ELDUserSerializer(ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Elduser
        fields = '__all__'


# ####################################
    

# class DispatcherNameSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['id', 'first_name', 'last_name']

# class LogSerializer (ModelSerializer):
#     class Meta:
#         model = Log
#         fields = '__all__'
#         read_only_fields = ['change', 'time', 'is_edited']

#     def validate_pcs_number(self, value):
#         # check when requested to update and pcs number is not changed
#         if self.instance and self.instance.pcs_number == value:
#             return value
#         # othervise
#         numOfPCSNumbers = Log.objects.filter(pcs_number=value).count()
#         if numOfPCSNumbers != 0:
#             raise serializers.ValidationError(['This number is used before'])
#         return value

#     def create(self, validated_data):
#         log = Log(**validated_data)
#         log.change =  log.original_rate - log.current_rate
#         log.save()
#         # updating driver's budget
#         if log.budget_type == 'D':
#             log.driver.d_budget += log.change
#         elif log.budget_type == 'L':
#             log.driver.l_budget += log.change
#         elif log.budget_type == 'R':
#             log.driver.r_budget += log.change
#         log.driver.save()
#         return log

#     def update(self, instance: Log, validated_data):
#         # updating driver's budget
#         old_change = instance.change
#         old_type = instance.budget_type
#         old_driver = Driver.objects.get(pk=instance.driver.id)
#         budget_type = validated_data.get('budget_type')
#         change = validated_data.get('original_rate') - validated_data.get('current_rate')
#         driver = Driver.objects.get(pk=validated_data['driver'].id)
#         # remove old change from old driver
#         if old_type == 'D':
#             old_driver.d_budget -= old_change
#         elif old_type == 'L':
#             old_driver.l_budget -= old_change
#         elif old_type == 'R':
#             old_driver.r_budget -= old_change
#         old_driver.save()
#         # add new change to requested driver
#         if budget_type == 'D':
#             driver.d_budget += change
#         elif budget_type == 'L':
#             driver.l_budget += change
#         elif budget_type == 'R':
#             driver.r_budget += change
#         driver.save()
#         # mark the log as edited
#         for attr, value in validated_data.items():
#             setattr(instance, attr, value)
#         instance.change = change
#         instance.is_edited = True
#         instance.save()
#         return instance


# class CreateUserSerializer(ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['username', 'first_name', 'last_name', 'role', 'password']

#     def validate_password(self, value: str) -> str:
#         """    Hash value passed by user.    :param value: password of a user    :return: a hashed version of the password    """    
#         return make_password(value)
