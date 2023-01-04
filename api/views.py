# data['date'] = datetime.date.today()
# data['time'] = datetime.datetime.now().strftime("%H:%M:%S")
###
from django.shortcuts import render, HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from django.conf import settings
from django.db.models import Q
from core.serializers import UserSerializer, UserCreateSerializer
from core.models import User
from .models import Driver, Vehicle
from .serializers import DriverSerializer, VehicleSerializer
# from .tasks import notify_customers
from core.constants import WEEKDAYS
import datetime


@api_view(['GET', 'PATCH'])
@permission_classes([IsAuthenticated])
def test(request):
    # notify_customers.delay('hello')
    return Response(status=status.HTTP_200_OK)


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([AllowAny])
def drivers(request):
    if request.method == 'GET':
        if request.GET.get('id'):
            query = Driver.objects.select_related('user').get(pk = request.GET.get('id'))
            serializer = DriverSerializer(query)
        else:
            query = Driver.objects.select_related('user').all()
            serializer = DriverSerializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        # set user role and company
        request.data['role'] = "DRI"
        request.data['company'] = request.user.company_id
        # serialization
        driver_serializer = DriverSerializer(data=request.data)
        user_serializer = UserCreateSerializer(data=request.data)
        # data validation
        valid_user = user_serializer.is_valid()
        valid_driver = driver_serializer.is_valid()
        if valid_user and valid_driver:
            saved_user = user_serializer.save()
            saved_driver = driver_serializer.save()
            # clone two models 
            saved_driver.user = saved_user
            saved_driver.save()
            return Response({'success': 'driver has been succesfully created'}, status=status.HTTP_201_CREATED)
        return Response(user_serializer.errors | driver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PUT':
        # set user role to Driver
        request.data['role'] = "DRI"
        print(request.data.get('id'))
        if request.data.get('id'):
            driver = Driver.objects.get(pk=request.data.get('id'))
            user = User.objects.get(pk = driver.user_id)
            driver_serializer = DriverSerializer(instance=driver, data=request.data)
            user_serializer = UserSerializer(instance=user, data=request.data)
            # data validation
            valid_user = user_serializer.is_valid()
            valid_driver = driver_serializer.is_valid()
            if valid_user and valid_driver:
                user_serializer.save()
                driver_serializer.save()
                return Response({'success': 'driver has been succesfully updated'}, status=status.HTTP_200_OK)
            return Response(user_serializer.errors | driver_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': '"id" is required to update driver'}, status=status.HTTP_400_BAD_REQUEST)
"""
{
    "username": "driver",
    "role": "ADM",
    "password": "8090",
    "first_name": "FNAME",
    "last_name": "LNAME",
    "cdl_number": "cdl001"
}

{
    "cdl_number": "cdl001",
    "username": "driver2",
    "role": "ADM",
    "password": "!2344321",
    "first_name": "FNAME",
    "last_name": "LNAME",
    "user": {
        "role": "ADM",
        "first_name": "FNAME",
        "last_name": "LNAME"
    }
}
"""

@api_view(['GET', 'POST', 'PUT'])
@permission_classes([AllowAny])
def vehicles(request):
    print(request.GET)
    if request.method == 'GET':
        if request.GET.get('id'):
            query = Vehicle.objects.get(pk = request.GET.get('id'))
            serializer = VehicleSerializer(query)
        else:
            query = Vehicle.objects.all()
            serializer = VehicleSerializer(query, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        serializer = VehicleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 'vehicle has been succesfully created'}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PUT':
        if request.GET.get('id'):
            vehicle = Vehicle.objects.get(pk=request.GET.get('id'))
            serializer = VehicleSerializer(instance=vehicle, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response({'success': 'vehicle has been succesfully updated'}, status=status.HTTP_200_OK)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': '"id" is required to update vehicle'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([AllowAny])
def users(request):
    if request.method == 'GET':
        if request.GET.get('id', None):
            user = User.objects.get(pk=request.GET.get('id', None))
            user_serializer = UserSerializer(user)
        else:
            users = User.objects.all()
            user_serializer = UserSerializer(users, many=True)            
        return Response(user_serializer.data, status=status.HTTP_200_OK)

    if request.method == 'POST':
        # check if requested user has access and check if requested user can create requested type of user
        role = request.user.role
        requested_role = request.data["role"]
        if role == "OWN" or (role == "ADM" and (requested_role != "OWN" and requested_role != "ADM")):
            user_serializer = CreateUserSerializer(data=request.data)
            if user_serializer.is_valid():
                new_user = user_serializer.save()
                generate_action(request.user.id, 'cre', new_user.id, 'use')
                return Response({'success': 'user has been succesfully created'}, status=status.HTTP_201_CREATED)
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'you have no access to create user'}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'PUT':
        # check if requested user has access and check if requested user can update requested type of user
        role = request.user.role
        requested_role = request.data["role"]
        if role == "OWN" or (role == "ADM" and (requested_role != "OWN" and requested_role != "ADM")):
            user = User.objects.get(pk=request.data["id"])
            user_serializer = UserSerializer(instance=user, data=request.data)
            if user_serializer.is_valid():
                updated_user = user_serializer.save()
                generate_action(request.user.id, 'upd', updated_user.id, 'use')
                return Response({'success': 'user has been succesfully updated'}, status=status.HTTP_200_OK)
            return Response(user_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'detail': 'you have no access to update to this role'}, status=status.HTTP_403_FORBIDDEN)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def driver_archive(request, id):
    log_edits = LogEdit.objects.all().values('edited_log')
    logEdits_list = list(map(lambda l: l['edited_log'], log_edits))
    #
    # driver = Driver.objects.get(pk = id)

    if request.user.is_superuser:
        queryset = Log.objects.all().filter(driver_id = id, is_edited = False).order_by('-date')
    else:
        # in_group = Group.objects.filter(staff = request.user)
        # drivers_list = list(map(lambda l: l.driver_id, in_group))
        queryset = Log.objects.filter(driver_id = id, is_edited = False).order_by('-date') #, user=request.user

    log_serializer = LogSerializer(queryset, many=True)

    for query in log_serializer.data:
        query["edited_link"] = False
        if query["id"] in logEdits_list:
            query["edited_link"] = True

    return Response(log_serializer.data, status=status.HTTP_200_OK)
   

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def archive_edits(request, id):
    #selecting logs only related to given ID
    editGroup = LogEdit.objects.all().order_by('-date') #values('original_log', 'edited_log')
    nextPickID = id
    pickedLogs = []
    pickedLogs.append(id)
    for g in editGroup:
        if g.edited_log_id == nextPickID:
            nextPickID = g.original_log_id
            pickedLogs.append(nextPickID)

    editedLogs = Log.objects.filter(pk__in = pickedLogs)

    log_serializer = LogSerializer(editedLogs, many=True)
    # reverding data
    data = log_serializer.data[::-1]
    return Response(data, status=status.HTTP_200_OK)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def drivers_board(request, week_before):
    # calculating requested week start and week end
    week_start = get_week_start() - datetime.timedelta(days=(7 * week_before))
    week_end = week_start + datetime.timedelta(days=7)
    # till_today = datetime.datetime.now() + datetime.timedelta(days=1)

    dispatchers = User.objects.filter(role="DIS").values("username")
    dispatchers_list = [dispatcher["username"] for dispatcher in dispatchers]
    logs = Log.objects.filter(date__gte = week_start, date__lte = week_end)

    drivers = Driver.objects.all().values("id", "first_name", "last_name", "dispatcher", "gross_target")
    drivers = list(drivers)
    # drivers_serializer = DriversBoardSerializer(drivers, many=True)
    for d in drivers:
        print(d.id)


    for driver in drivers:
        driver.disp =''
        for d in dispatchers_list:
            if driver.dispatcher_id == d[0]:
                driver.disp = d[1]

        driver_logs = list(filter(lambda l: l.driver_id == driver.id, logs))
        total_miles = 0
        actual_gross = 0
        for l in driver_logs:
            total_miles += l.total_miles
            actual_gross += l.current_rate

        driver.loads = len(driver_logs)
        driver.total_miles = total_miles
        driver.actual_gross = actual_gross
        if total_miles == 0:
            driver.rate = 0
        else:    
            driver.rate = round((actual_gross / total_miles)*100) / 100

        if driver.gross_target == 0:
            driver.percentage = 0
        else:    
            driver.percentage = round((actual_gross / driver.gross_target) * 10000) / 100

    drivers = sorted(drivers, key=lambda d: d.percentage, reverse=True)
    
    return Response(drivers, status=status.HTTP_200_OK)


@api_view(['GET', 'POST', 'PUT'])
@permission_classes([IsAuthenticated])
def gross(request):
    if request.method == 'GET':
        #preparing driver names
        driver_names = Driver.objects.all().values('id', 'first_name', 'last_name')
        driver_names_serializer = DriverNameSerializer(driver_names, many=True)

        #preparing dispatcher names
        dispatcher_names = User.objects.filter(role='DIS').values('id', 'first_name', 'last_name')
        dispatcher_names_serializer = DispatcherNameSerializer(dispatcher_names, many=True)

        queryset = Log.objects.all().order_by('-time')
        log_serializer = LogSerializer(queryset, many=True)

        return Response({"logs": log_serializer.data, "drivers": driver_names_serializer.data, "dispatchers": dispatcher_names_serializer.data}, status=status.HTTP_200_OK)

    if request.method == "POST":
        data = request.data
        data['user'] = request.user.id
        log_serializer = LogSerializer(data=data)
        if log_serializer.is_valid():
            new_log = log_serializer.save()
            generate_action(request.user.id, 'cre', new_log.id, 'gro')
            return Response({'success': 'gross has been succesfully added'}, status=status.HTTP_200_OK)
        return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    if request.method == 'PUT':
        data = request.data
        log = Log.objects.get(pk=data["id"])
        old_change = log.change
        log_serializer = LogSerializer(instance=log, data=data)
        if log_serializer.is_valid():
            updated_log = log_serializer.save()
            generate_action(request.user.id, 'upd', updated_log.id, 'gro')
            return Response({'success': 'the gross has been succesfully updated'}, status=status.HTTP_200_OK)
        return Response(log_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
