export default {
  '-12:00': '(GMT -12:00) Eniwetok, Kwajalein',
  '-11:00': '(GMT -11:00) Midway Island, Samoa',
  '-10:00': '(GMT -10:00) Hawaii',
  '-09:00': '(GMT -9:00) Alaska',
  '-08:00': '(GMT -8:00) Pacific Time (US & Canada)',
  '-07:00': '(GMT -7:00) Mountain Time (US & Canada)',
  '-06:00': '(GMT -6:00) Central Time (US & Canada), Mexico City',
  '-05:00': '(GMT -5:00) Eastern Time (US & Canada), Bogota, Lima',
  '-04:00': '(GMT -4:00) Atlantic Time (Canada), Caracas, La Paz',
  '-03:30': '(GMT -3:30) Newfoundland',
  '-03:00': '(GMT -3:00) Brazil, Buenos Aires, Georgetown',
  '-02:00': '(GMT -2:00) Mid-Atlantic',
  '-01:00': '(GMT -1:00 hour) Azores, Cape Verde Islands',
  '+00:00': '(GMT) Western Europe Time, London, Lisbon, Casablanca',
  '+01:00': '(GMT +1:00 hour) Brussels, Copenhagen, Madrid, Paris',
  '+02:00': '(GMT +2:00) Kaliningrad, South Africa',
  '+03:00': '(GMT +3:00) Baghdad, Riyadh, Moscow, St. Petersburg',
  '+03:30': '(GMT +3:30) Tehran',
  '+04:00': '(GMT +4:00) Abu Dhabi, Muscat, Baku, Tbilisi',
  '+04:30': '(GMT +4:30) Kabul',
  '+05:00': '(GMT +5:00) Ekaterinburg, Islamabad, Karachi, Tashkent',
  '+05:30': '(GMT +5:30) Bombay, Calcutta, Madras, New Delhi',
  '+05:45': '(GMT +5:45) Kathmandu',
  '+06:00': '(GMT +6:00) Almaty, Dhaka, Colombo',
  '+07:00': '(GMT +7:00) Bangkok, Hanoi, Jakarta',
  '+08:00': '(GMT +8:00) Beijing, Perth, Singapore, Hong Kong',
  '+09:00': '(GMT +9:00) Tokyo, Seoul, Osaka, Sapporo, Yakutsk',
  '+09:30': '(GMT +9:30) Adelaide, Darwin',
  '+10:00': '(GMT +10:00) Eastern Australia, Guam, Vladivostok',
  '+11:00': '(GMT +11:00) Magadan, Solomon Islands, New Caledonia',
  '+12:00': '(GMT +12:00) Auckland, Wellington, Fiji, Kamchatka'
};

export const timezoneKeys = [
  '-12:00',
  '-11:00',
  '-10:00',
  '-09:00',
  '-08:00',
  '-07:00',
  '-06:00',
  '-05:00',
  '-04:00',
  '-03:30',
  '-03:00',
  '-02:00',
  '-01:00',
  '+00:00',
  '+01:00',
  '+02:00',
  '+03:00',
  '+03:30',
  '+04:00',
  '+04:30',
  '+05:00',
  '+05:30',
  '+05:45',
  '+06:00',
  '+07:00',
  '+08:00',
  '+09:00',
  '+09:30',
  '+10:00',
  '+11:00',
  '+12:00'
];

// E.g., -0400
const tempTimezone = new Date().toString().match(/([-\+][0-9]+)\s/)[1];
// E.g. -04:00
export const myTimezone = `${tempTimezone.slice(0, 3)}:${tempTimezone.slice(3)}`;
