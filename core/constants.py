DRIVER_TYPE = [
    ('O88', 'Owner operator - 88%'),
    ('O85', 'Owner operator - 85%'),
    ('C30', 'Company driver - 30%'),
    ('C35', 'Company driver - 35%'),
    ('L', 'Lease operator'),
    ('R', 'Rental operator')
]

BUDGET_TYPE = [
    ('D', 'driver'),
    ('L', 'lane'),
    ('R', 'recovery')
]

LOAD_STATUS = [
    ('CO', 'Covered'),
    ('SO', 'Sold'),
    ('TO', 'Tonu'),
    ('RJ', 'Rejected'),
    ('RM', 'Removed'),
]

STATES = [
    ("AK", "Alaska"), 
    ("AL", "Alabama"), 
    ("AR", "Arkansas"), 
    ("AS", "American Samoa"), 
    ("AZ", "Arizona"), 
    ("CA", "California"), 
    ("CO", "Colorado"), 
    ("CT", "Connecticut"), 
    ("DC", "District of Columbia"), 
    ("DE", "Delaware"), 
    ("FL", "Florida"), 
    ("GA", "Georgia"), 
    ("GU", "Guam"), 
    ("HI", "Hawaii"), 
    ("IA", "Iowa"), 
    ("ID", "Idaho"), 
    ("IL", "Illinois"), 
    ("IN", "Indiana"), 
    ("KS", "Kansas"), 
    ("KY", "Kentucky"), 
    ("LA", "Louisiana"), 
    ("MA", "Massachusetts"), 
    ("MD", "Maryland"), 
    ("ME", "Maine"), 
    ("MI", "Michigan"), 
    ("MN", "Minnesota"), 
    ("MO", "Missouri"), 
    ("MS", "Mississippi"), 
    ("MT", "Montana"), 
    ("NC", "North Carolina"), 
    ("ND", "North Dakota"), 
    ("NE", "Nebraska"), 
    ("NH", "New Hampshire"), 
    ("NJ", "New Jersey"), 
    ("NM", "New Mexico"), 
    ("NV", "Nevada"), 
    ("NY", "New York"), 
    ("OH", "Ohio"), 
    ("OK", "Oklahoma"), 
    ("OR", "Oregon"), 
    ("PA", "Pennsylvania"), 
    ("PR", "Puerto Rico"), 
    ("RI", "Rhode Island"), 
    ("SC", "South Carolina"), 
    ("SD", "South Dakota"), 
    ("TN", "Tennessee"), 
    ("TX", "Texas"), 
    ("UT", "Utah"), 
    ("VA", "Virginia"), 
    ("VI", "Virgin Islands"), 
    ("VT", "Vermont"), 
    ("WA", "Washington"), 
    ("WI", "Wisconsin"), 
    ("WV", "West Virginia"), 
    ("WY", "Wyoming")
]

OPERATIONS = [
    ('cre', 'create'),
    ('upd', 'update'),
    ('del', 'delete'),
    ('dea', 'deactivate'),
    ('act', 'activate'),
    ('inv', 'invite'),
    ('exp', 'expire'),
]
TARGET_NAMES = [
    ('dri', 'driver'),
    ('use', 'user'),
    ('gro', 'gross'),
    ('lin', 'invite link'),
]

STATUS_CHOICES_TTDATA = [
    ('OFF', 'OFF'),
    ('SB', 'SB'),
    ('DR', 'DR'),
    ('ON', 'ON'),
    ('YM', 'YM'),
    ('PC', 'PC'),
    ('LIN', 'LOGIN'),
    ('LOU', 'LOGOUT'),
    ('POF', 'POWER OFF'),
    ('PON', 'POWER ON'),
    ('CER', 'CERTIFY'),
    ('INT', 'INTERMEDIATE')
]

YEARS = (
    ('99', '1999'),
    ('00', '2000'),
    ('01', '2001'),
    ('02', '2002'),
    ('03', '2003'),
    ('04', '2004'),
    ('05', '2005'),
    ('06', '2006'),
    ('07', '2007'),
    ('08', '2008'),
    ('09', '2009'),
    ('10', '2010'),
    ('11', '2011'),
    ('12', '2012'),
    ('13', '2013'),
    ('14', '2014'),
    ('15', '2015'),
    ('16', '2016'),
    ('17', '2017'),
    ('18', '2018'),
    ('19', '2019'),
    ('20', '2020'),
    ('21', '2021'),
    ('22', '2022'),
    ('23', '2023'),
    ('24', '2024'),
)
DEFAULT_YEAR = '22'
FUEL_TYPE = (
('di', 'Diesel'),
('ga', 'Gasoline'),
('pr', 'Propane'),
('li', 'Liquid Natural Gas'),
('co', 'Compressed Natural Gas'),
('me', 'Methanol'),
('e', 'E-85'),
('m', 'M-85'),
('a', 'A55'),
('bi', 'Biodisel'),
('o', 'Other'),
)

WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']