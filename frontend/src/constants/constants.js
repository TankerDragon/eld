export const DRIVERS_URL = "/api/drivers/";
export const VEHICLES_URL = "/api/vehicles/";
export const VEHICLES_LIST_URL = "/api/vehicles/?list=True";
export const DRIVERS_LIST_URL = "/api/drivers/?list=True";

export const ROLES = {
  Owner: "OWN",
  Staff: "STA",
  Admin: "ADM",
  Dispatcher: "DIS",
  Updater: "UPD",
};

export const DRIVER_TYPE = {
  O88: "Owner operator - 88%",
  O85: "Owner operator - 85%",
  C30: "Company driver - 30%",
  C35: "Company driver - 35%",
  L: "Lease operator",
  R: "Rental operator",
};

export const BUDGET_TYPE = {
  D: "Driver's budget",
  L: "Lane budget",
  R: "Recovery budget",
};

export const GROSS_STATUS = {
  CO: "Covered",
  SO: "Sold",
  TO: "Tonu",
  RJ: "Rejected",
  RM: "Removed",
};

export const STATES = {
  AK: "Alaska",
  AL: "Alabama",
  AR: "Arkansas",
  AS: "American Samoa",
  AZ: "Arizona",
  CA: "California",
  CO: "Colorado",
  CT: "Connecticut",
  DC: "District of Columbia",
  DE: "Delaware",
  FL: "Florida",
  GA: "Georgia",
  GU: "Guam",
  HI: "Hawaii",
  IA: "Iowa",
  ID: "Idaho",
  IL: "Illinois",
  IN: "Indiana",
  KS: "Kansas",
  KY: "Kentucky",
  LA: "Louisiana",
  MA: "Massachusetts",
  MD: "Maryland",
  ME: "Maine",
  MI: "Michigan",
  MN: "Minnesota",
  MO: "Missouri",
  MS: "Mississippi",
  MT: "Montana",
  NC: "North Carolina",
  ND: "North Dakota",
  NE: "Nebraska",
  NH: "New Hampshire",
  NJ: "New Jersey",
  NM: "New Mexico",
  NV: "Nevada",
  NY: "New York",
  OH: "Ohio",
  OK: "Oklahoma",
  OR: "Oregon",
  PA: "Pennsylvania",
  PR: "Puerto Rico",
  RI: "Rhode Island",
  SC: "South Carolina",
  SD: "South Dakota",
  TN: "Tennessee",
  TX: "Texas",
  UT: "Utah",
  VA: "Virginia",
  VI: "Virgin Islands",
  VT: "Vermont",
  WA: "Washington",
  WI: "Wisconsin",
  WV: "West Virginia",
  WY: "Wyoming",
};

export const TRUCK_YEARS = {
  Y99: '1999',
  Y00: '2000',
  Y01: '2001',
  Y02: '2002',
  Y03: '2003',
  Y04: '2004',
  Y05: '2005',
  Y06: '2006',
  Y07: '2007',
  Y08: '2008',
  Y09: '2009',
  Y10: '2010',
  Y11: '2011',
  Y12: '2012',
  Y13: '2013',
  Y14: '2014',
  Y15: '2015',
  Y16: '2016',
  Y17: '2017',
  Y18: '2018',
  Y19: '2019',
  Y20: '2020',
  Y21: '2021',
  Y22: '2022',
  Y23: '2023',
  Y24: '2024',
  Y24: '2025',
  Y24: '2026',
};

export const FUEL_TYPE = {
  di: 'Diesel',
  ga: 'Gasoline',
  pr: 'Propane',
  li: 'Liquid Natural Gas',
  co: 'Compressed Natural Gas',
  me: 'Methanol',
  e: 'E-85',
  m: 'M-85',
  a: 'A55',
  bi: 'Biodisel',
  o: 'Other',
}