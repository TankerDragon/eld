from django.urls import path
from . import views

urlpatterns = [
    path('', views.main),
    path('test/<int:id>', views.test),
    # path('users/', views.getUsers, name='users'),
    path('drivers/', views.getDrivers, name='drivers'),
    path('driver/<int:id>', views.updateDriver, name='driver'),
    path('new-driver/', views.newDriver, name='new-driver'),
    path('vehicles/', views.getVehicles, name='vehicles'),
    path('vehicle/<int:id>', views.updateVehicle, name='vehicle'),
    path('new-vehicle/', views.newVehicle, name='new-vehicle'),
]