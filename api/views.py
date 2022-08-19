from django.shortcuts import render, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.conf import settings
from django.db.models import Q
from .serializers import DriverSerializer, VehicleSerializer
from core.serializers import UserSerializer, UserCreateSerializer
from core.models import User
from .models import Driver, Vehicle

# Create your views here.

def test(request):
    return HttpResponse('test')

@api_view()
def main(request):
    print([user[0] for user in  User.objects.all().values_list('username')])
    return Response({"greet": "Hola!"})

@api_view(['GET','POST'])
# @permission_classes([IsAuthenticated])
def getDrivers(request):
    if request.method == 'GET':
        drivers = Driver.objects.all()
        user_IDs = [driver.user_id for driver in drivers]
        users = User.objects.filter(id__in = user_IDs)
        driver_serializer = DriverSerializer(drivers, many=True)
        user_serializer = UserSerializer(users, many=True)

        # adding driver's co driver name

        #adding driver fields to user
        for user in user_serializer.data:
            for driver in driver_serializer.data:
                if driver["user_id"] == user["id"]:
                    user["profile"] = driver
        return Response(user_serializer.data)
    

@api_view(['GET','POST'])
def newDriver(request):
    if request.method == "GET":
        # preparing co drivers' names and IDs
        drivers = Driver.objects.all().values('id', 'user_id')
        user_IDs = [driver["user_id"] for driver in drivers]
        users = User.objects.filter(id__in = user_IDs).values('id', 'first_name', 'last_name')

        # adding names to drivers
        for driver in drivers:
            for user in users:
                if driver["user_id"] == user["id"]:
                    driver["full_name"] = user["first_name"] + ' ' + user["last_name"]

        # preparing vehicles' unit numbers and IDs
        vehicles = Vehicle.objects.filter(Q(driver_id=None)).values('id', 'unit_number')
        return Response({"drivers": drivers, "vehicles": vehicles})


    if request.method == 'POST':
        print(request.data)
        user = UserCreateSerializer(data=request.data)
        profile = DriverSerializer(data=request.data.get("profile"))
        valid_user = user.is_valid()
        valid_profile = profile.is_valid()
        #check the assigned vehicle
        assigned_vehicle_id = request.data.get("profile").get("vehicle")
        if assigned_vehicle_id:
            assigned_vehicle = Vehicle.objects.get(pk = assigned_vehicle_id)
        
        if valid_user and valid_profile and assigned_vehicle.driver_id == None:
            saved_user = user.save()
            saved_profile = profile.save()
            # clone user and profile together
            saved_profile.user_id = saved_user.id
            saved_profile.save()
            # saving vehicle if there was assigned
            if assigned_vehicle_id:
                assigned_vehicle.driver_id = saved_profile.id
                assigned_vehicle.save()
            
            return Response({"success": "driver has been added successfully"}, status=status.HTTP_200_OK)
        return Response({"user": user.errors, "profile": profile.errors}, status=status.HTTP_400_BAD_REQUEST)
    

@api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
def getVehicles(request):
    if request.method == 'GET':
        vehicles = Vehicle.objects.all()
        driver_IDs = [vehicle.driver_id for vehicle in vehicles]
        drivers = Driver.objects.filter(id__in = driver_IDs).values('id', 'user_id')
        user_IDs = [driver["user_id"] for driver in drivers]
        users = User.objects.filter(id__in = user_IDs).values('id', 'first_name', 'last_name')

        vehicle_serializer = VehicleSerializer(vehicles, many=True)
        
        # cloning users to drivers
        for user in users:
            for driver in drivers:
                if driver["user_id"] == user["id"]:
                    driver["full_name"] = user["first_name"] + " " + user["last_name"]
        
        # adding names into data
        for vehicle in vehicle_serializer.data:
            for driver in drivers:
                if driver["id"] == vehicle["driver_id"]:
                    vehicle["full_name"] = driver["full_name"]
        return Response(vehicle_serializer.data, status=status.HTTP_200_OK)


    if request.method == 'POST':
        # print(request.data)
        vehicle = VehicleSerializer(data=request.data)

        if vehicle.is_valid():
            vehicle.save()
            return Response({"success": "vehicle has been added successfully"}, status=status.HTTP_200_OK)
        return Response(vehicle.errors, status=status.HTTP_400_BAD_REQUEST)

