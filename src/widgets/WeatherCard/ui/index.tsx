import React from 'react';
import { ForecastData } from '../../../@types/weather';

interface Props {
  title: string;
  modeDay: string;
  weatherData: ForecastData[];
}

export const WeatherCard: React.FC<Props> = ({
  title,
  weatherData,
  modeDay,
}) => {
  if (weatherData.length === 0) return null;

  return (
    <>
      {weatherData.map((item) => (
        <div
          className={`d-flex align-items-center shadow p-3 mb-5 text-white justify-content-between px-3 w-100 ${modeDay === 'day' ? 'blue-day' : 'sky-night'}`}
        >
          <div className="d-flex gap-5 align-items-center">
            <img
              src={`https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={title}
            />
            <div className="d-flex flex-column gap-2">
              <p className="m-0">
                {item.main.temp}°C {title}
              </p>
              <p className="m-0">{item.weather[0].main}</p>
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <h4 className="m-0">
              {item.main.temp_max}/{item.main.temp_min}
            </h4>
            <div className="d-flex gap-3">
              <img
                style={{ width: '25px' }}
                src="https://cdn-icons-png.flaticon.com/512/2204/2204338.png"
                alt="humidity"
              />
              <span>{item.main.humidity} mm</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
