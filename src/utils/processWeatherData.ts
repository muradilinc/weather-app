import { ForecastData, GroupedData } from '../@types/weather';
import { formatDate } from './formatDate';

export const processWeatherData = (
  data: ForecastData[],
): Record<string, GroupedData> => {
  return data.reduce(
    (acc, item) => {
      const date = item.dt_txt.split(' ')[0];
      const temperature = item.main.temp;
      const icon = item.weather[0].icon; // Получаем иконку погоды

      if (!acc[date]) {
        acc[date] = {
          temperatures: [],
          label: formatDate(item.dt_txt),
        };
      }

      acc[date].temperatures.push({
        time: item.dt_txt,
        temp: temperature,
        icon, // Добавляем иконку погоды
      });

      return acc;
    },
    {} as Record<string, GroupedData>,
  );
};
