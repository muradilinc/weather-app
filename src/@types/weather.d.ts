export interface Main {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Weather {
  description: string;
  icon: string;
  id: number;
  main: string;
}

export interface AnswerApi {
  city: { name: string };
  list: ForecastData[];
}

export interface ForecastData {
  name: string;
  dt_txt: string;
  main: Main;
  weather: Weather[];
}

export interface GroupedData {
  temperatures: { time: string; temp: number }[];
  label: string;
}
