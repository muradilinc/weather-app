import { useEffect, useState } from 'react';
import { format, addDays } from 'date-fns';
import { ForecastData } from '../@types/weather';
import { getAllWeather } from '../features/weather/api';

export const useWeather = (selectDate: string) => {
  const [currentDayWeather, setCurrentDayWeather] = useState<{
    morning: ForecastData[];
    day: ForecastData[];
    evening: ForecastData[];
    night: ForecastData[];
  } | null>(null);
  const [dates, setDates] = useState<string[]>([]);
  const [location, setLocation] = useState('');

  const getUniqueDates = (list: ForecastData[]): string[] => {
    const uniqueDates = new Set<string>();
    list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      uniqueDates.add(date);
    });

    return Array.from(uniqueDates);
  };

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getAllWeather();
        const groupDate = getUniqueDates(data.list);
        setDates(groupDate);
        setLocation(data.city.name);

        const today = format(
          selectDate ? new Date(selectDate) : new Date(),
          'yyyy-MM-dd',
        );
        const nextDay = format(addDays(new Date(today), 1), 'yyyy-MM-dd');

        const todayForecast = data.list.filter((item) =>
          item.dt_txt.startsWith(today),
        );
        const nextDayForecast = data.list.filter((item) =>
          item.dt_txt.startsWith(nextDay),
        );

        const morningWeather = todayForecast.filter((item) => {
          const hour = new Date(item.dt_txt).getHours();
          return hour >= 9 && hour < 12;
        });

        const dayWeather = todayForecast.filter((item) => {
          const hour = new Date(item.dt_txt).getHours();
          return hour >= 12 && hour < 15;
        });

        const eveningWeather = todayForecast.filter((item) => {
          const hour = new Date(item.dt_txt).getHours();
          return hour >= 18 && hour < 21;
        });

        const nightWeather = nextDayForecast.filter((item) => {
          const hour = new Date(item.dt_txt).getHours();
          return hour === 0;
        });

        setCurrentDayWeather({
          morning: morningWeather,
          day: dayWeather,
          evening: eveningWeather,
          night: nightWeather,
        });
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeather();
  }, [selectDate]);

  return { currentDayWeather, dates, location };
};
