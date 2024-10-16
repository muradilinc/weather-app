import React from 'react';
import { ForecastData } from '../../../@types/weather';

interface Props {
  title: string;
  weatherData: ForecastData[];
}

export const WeatherCard: React.FC<Props> = ({ title, weatherData }) => {
  if (weatherData.length === 0) return null;

  return (
    <div className="d-flex justify-content-between align-items-center border-1 border-black border px-3 flex-wrap">
      <div className="flex-grow-1">
        <h3>{title}</h3>
      </div>
      <div className="flex-grow-1">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData[0].weather[0].icon}@2x.png`}
          alt={title}
        />
      </div>
      <div>
        {weatherData.map((item) => (
          <div className="d-flex gap-3 flex-wrap" key={item.dt_txt}>
            <p>Описание: {item.weather[0].main}</p>
            <p>Температура: {item.main.temp}°C</p>
            <p>Ощущается: {item.main.feels_like}°C</p>
            <p>Давление: {item.main.pressure} мм</p>
            <p>Влажность: {item.main.humidity} %</p>
          </div>
        ))}
      </div>
    </div>
  );
};
