import { useEffect, useState } from 'react';
import { getWeather } from '../../../features/weather/api';
import { formatTemp } from '../../../utils/formatTemp';
import { ForecastData, WeatherData } from '../../../@types/weather';
import { formatDate } from '../../../utils/formatDate';
import * as React from 'react';

interface Props {
  currentWeather?: ForecastData;
}

export const Card: React.FC<Props> = ({ currentWeather }) => {
  const [weatherData, setWeatherData] = useState<
    WeatherData | ForecastData | null
  >(null);

  useEffect(() => {
    if (!currentWeather) {
      const fetchWeather = async () => {
        try {
          const data = await getWeather();
          setWeatherData(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchWeather();
    } else {
      setWeatherData(currentWeather);
    }
  }, [currentWeather]);

  if (!weatherData) {
    return <h1>Loading...</h1>;
  }
  return (
    <div className="w-[450px] border-2 border-white rounded-[8px] bg-[#7abcff] text-white box-border">
      <h2 className="text-center text-[11pt] my-[5px] uppercase font-normal">
        {weatherData.name}
      </h2>
      <div className="flex justify-around items-center border-y-2 border-t-white border-b-white">
        <img
          className="w-[50%]"
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt="weather"
        />
        <div className="flex flex-col">
          <h3 className="text-[68pt] font-light">
            {formatTemp(weatherData.main.temp)}°
          </h3>
          <p>Max: {formatTemp(weatherData.main.temp_max)}°</p>
          <p>Min: {formatTemp(weatherData.main.temp_min)}°</p>
        </div>
      </div>
      <p className="text-center text-white text-[18pt] my-[5px]">
        {formatDate(
          currentWeather ? currentWeather.dt_txt : new Date().toString(),
        )}
      </p>
    </div>
  );
};
