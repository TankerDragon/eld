from django.shortcuts import render, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.conf import settings
from .serializers import DriverSerializer, VehicleSerializer
from core.serializers import UserSerializer
from core.models import User
from .models import Driver

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
    if request.method == 'POST':
        serializer = DriverSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    drivers = Driver.objects.all()
    user_IDs = [driver.user_id for driver in drivers]
    print(user_IDs)
    users = User.objects.filter(id__in = user_IDs)
    print(users)
    driver_serializer = DriverSerializer(drivers, many=True)
    user_serializer = UserSerializer(users, many=True)
    for user in user_serializer.data:
        user_id = user["id"]
        for driver in driver_serializer.data:
            if driver["user_id"] == user_id:
                user["profile"] = driver
    return Response(user_serializer.data)
    

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def getVehicles(request):
    serializer = VehicleSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
