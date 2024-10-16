export const api = {
  key: 'd24fe5329183f180988d8b5beaad5b3a',
  base: 'https://api.openweathermap.org/data/2.5',
};
export const API_LINK = api.base;
export const modes: { type: string; mode: string }[] = [
  { type: 'Утро', mode: 'morning' },
  { type: 'День', mode: 'day' },
  {
    type: 'Вечер',
    mode: 'evening',
  },
  { type: 'Ночь', mode: 'night' },
];
