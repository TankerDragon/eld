from django.urls import path
from . import views

urlpatterns = [
    path('', views.main),
    # path('users/', views.getUsers, name='users'),
    path('drivers/', views.getDrivers, name='drivers'),
    path('new-driver/', views.newDriver, name='new-driver'),
    path('vehicles/', views.getVehicles, name='vehicles'),
    path('test/', views.test)
]