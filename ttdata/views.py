import imp
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
#
from api.serializers import LogSerializer
from .models import Clone


# Create your views here.
@api_view(['POST'])
def logs(request, id):
    if request.method == 'POST':
        data = request.data
        try:
            cloned = Clone.objects.get(tt_id = id)
        except:
            cloned = None
        
        if cloned and cloned.eld_id:
            driver_id = cloned.eld_id
            data["driver"] = driver_id
            new_log = LogSerializer(data=request.data)
            if new_log.is_valid():
                new_log.save()
                return Response({"success": "log has added successfully"}, status=status.HTTP_200_OK)
            return Response(new_log.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            if not cloned:
                new_clone = Clone()
                new_clone.tt_id = id
                new_clone.eld_id = None
                new_clone.save()
        return Response({"success": "driver not found but noted"}, status=status.HTTP_200_OK)
        