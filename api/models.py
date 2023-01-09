from django.db import models
from django.conf import settings
from core.models import User
from core.constants import STATES, YEARS, DEFAULT_YEAR, FUEL_TYPE, COUNTRIES, TIME_ZONES

# settings.AUTH_USER_MODEL
class Company(models.Model):
    name = models.CharField(max_length=63)
    address = models.CharField(max_length=255)
    country = models.CharField(max_length=2, choices=COUNTRIES, default='US')
    region = models.CharField(max_length=2, choices=STATES, default='AK')
    city = models.CharField(max_length=127)
    zip_code = models.CharField(max_length=15)
    time_zone = models.CharField(max_length=7, choices=TIME_ZONES, default='US/East')

class Elduser(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    is_active = models.BooleanField(default=1)

    create_user = models.BooleanField(default=False)
    update_user = models.BooleanField(default=False)
    activate_user = models.BooleanField(default=False)

    create_driver = models.BooleanField(default=False)
    update_driver = models.BooleanField(default=False)
    activate_driver = models.BooleanField(default=False)

    create_vehicle = models.BooleanField(default=False)
    update_vehicle = models.BooleanField(default=False)
    activate_vehicle = models.BooleanField(default=False)

class Vehicle(models.Model):
    # driver = models.ForeignKey(Driver, null=True, on_delete=models.SET_NULL)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    unit_number = models.CharField(max_length=10, unique=True)
    make = models.CharField(max_length=15, null=True, blank=True)
    model = models.CharField(max_length=20, null=True, blank=True)
    year = models.CharField(max_length=3, choices=YEARS, default=DEFAULT_YEAR)
    license_state = models.CharField(max_length=2, choices=STATES, default='AK')
    license_number = models.CharField(max_length=20, null=True, blank=True)
    vin_number = models.CharField(max_length=20, null=True)
    fuel_type = models.CharField(max_length=2, choices=FUEL_TYPE, default='di')
    eld_device = models.CharField(max_length=16, null=True)
    notes = models.CharField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=1)

    def __str__(self):
        return self.unit_number


class Driver(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, null=True, on_delete=models.CASCADE)
    company = models.ForeignKey(Company, on_delete=models.CASCADE)
    vehicle = models.ForeignKey(Vehicle, blank=True, null=True, on_delete=models.SET_NULL)
    cdl_number = models.CharField(max_length=20, unique=True)
    cdl_state = models.CharField(max_length=2, choices=STATES, default='AK')
    co_driver = models.OneToOneField('self', null=True, on_delete=models.SET_NULL)
    phone = models.CharField(max_length = 13, null=True, blank=True)
    address = models.CharField(max_length=127, null=True, blank=True)
    app_version = models.CharField(max_length=5, null=True)
    notes = models.CharField(max_length=255, null=True, blank=True)
    is_active = models.BooleanField(default=1)

    def __str__(self):
        return self.first_name + ' ' + self.last_name


# class Log(models.Model):
#     driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
#     user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user')
#     dispatcher = models.ForeignKey(User, on_delete=models.CASCADE, related_name='dispatcher')
#     original_rate = models.DecimalField(max_digits=9, decimal_places=2)
#     current_rate = models.DecimalField(max_digits=9, decimal_places=2)
#     change = models.DecimalField(max_digits=9, decimal_places=2)
#     total_miles = models.IntegerField()
#     budget_type = models.CharField(max_length=1, choices=BUDGET_TYPE)
#     autobooker = models.BooleanField(default=False)
#     bol_number = models.CharField(max_length=32)
#     carrier = models.CharField(max_length=32)
#     pcs_number = models.CharField(max_length=16)
#     trailer = models.CharField(max_length=16, blank=True)
#     truck = models.CharField(max_length=16, blank=True)
#     status = models.CharField(max_length=2, choices=LOAD_STATUS)
#     origin = models.CharField(max_length=128)
#     origin_state = models.CharField(max_length=2, choices=STATES)
#     destination = models.CharField(max_length=128)
#     destination_state = models.CharField(max_length=2, choices=STATES)
#     time = models.DateTimeField(auto_now_add=True)
#     note = models.CharField(max_length=100, null=True, blank=True)
#     is_edited = models.BooleanField(default=False)

# class LogEdit(models.Model):
#     original_log = models.ForeignKey(Log, on_delete=models.CASCADE, related_name='original')
#     edited_log = models.ForeignKey(Log, on_delete=models.CASCADE, related_name='edited')
#     date = models.DateTimeField(auto_now=True)

# class Action(models.Model):
#     user = models.ForeignKey(User, null=True, on_delete=models.SET_NULL)
#     operation = models.CharField(max_length=3, choices=OPERATIONS)
#     target = models.BigIntegerField(null=True)
#     target_name = models.CharField(max_length=3, choices=TARGET_NAMES)
#     time = models.DateTimeField(auto_now_add=True)

# ELD stuff 
# class Elog(models.Model):
#     driver = models.ForeignKey(Driver, on_delete=models.CASCADE)
#     status = models.CharField(max_length=3, choices= STATUS_CHOICES_TTDATA, default='OFF')
#     date = models.DateField()
#     time = models.TimeField()
#     location = models.CharField(max_length=50, null=True, blank=True)
#     lat = models.DecimalField(max_digits=12, decimal_places=9, null=True, blank=True)
#     lng = models.DecimalField(max_digits=12, decimal_places=9, null=True, blank=True)
#     vehicle = models.ForeignKey(Vehicle, on_delete=models.SET_NULL, null=True, blank=True)
#     odometer = models.IntegerField(null=True, blank=True)
#     eng_hours = models.DecimalField(max_digits=6, decimal_places=1, null=True, blank=True)
#     notes = models.CharField(max_length=20, null=True, blank=True)
#     document = models.CharField(max_length=20, null=True, blank=True)
#     trailer = models.CharField(max_length=20, null=True, blank=True)