import React from 'react';
import { Loader } from '../../../shared/Loader';
import { WeatherCard } from '../../WeatherCard';
import { modes } from '../../../app/constants';
import { ForecastData } from '../../../@types/weather';

interface Props {
  currentDayWeather: {
    morning: ForecastData[];
    day: ForecastData[];
    evening: ForecastData[];
    night: ForecastData[];
  } | null;
  location: string;
}

export const Card: React.FC<Props> = ({ currentDayWeather, location }) => {
  if (!currentDayWeather) {
    return <Loader />;
  }

  return (
    <div className="bg-white p-3 rounded-bottom-1">
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <h2 className="w-50">Прогноз на сегодня {location}</h2>
      </div>

      <div className="d-flex flex-row justify-content-between border-co flex-wrap">
        <div className="d-flex flex-column gap-5 w-100 p-5">
          {modes.map((mode) => (
            <WeatherCard
              key={mode.type}
              title={mode.type}
              weatherData={
                currentDayWeather[mode.mode as keyof typeof currentDayWeather]
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};
