import { ChangeEvent, useState } from 'react';
import { Loader } from '../../../shared/Loader';
import { DateSelector } from '../../../shared/DateSelector';
import { useWeather } from '../../../utils/useWeather';
import { WeatherCard } from '../../WeatherCard';
import { modes } from '../../../app/constants';

export const Card = () => {
  const [selectDate, setSelectDate] = useState('');
  const { currentDayWeather, dates, location } = useWeather(selectDate);

  const handleDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectDate(event.target.value);
  };

  if (!currentDayWeather) {
    return <Loader />;
  }

  return (
    <div className="bg-white p-3 rounded-bottom-1">
      <div className="d-flex align-items-center justify-content-between flex-wrap">
        <h2 className="w-50">Прогноз на сегодня {location}</h2>
        <DateSelector
          type="single"
          dates={dates}
          onDateChange={handleDateChange}
          selectedDate={selectDate}
        />
      </div>

      <div className="d-flex flex-row justify-content-between border-co">
        <div className="w-50 p-5">
          <h4 className="text-center fw-bolder fs-2">День</h4>
          <div className="d-flex flex-column gap-2">
            {modes.map((mode) => {
              if (mode.mode === 'morning' || mode.mode === 'day') {
                return (
                  <WeatherCard
                    modeDay="day"
                    key={mode.type}
                    title={mode.type}
                    weatherData={
                      currentDayWeather[
                        mode.mode as keyof typeof currentDayWeather
                      ]
                    }
                  />
                );
              }
            })}
          </div>
        </div>
        <div className="w-50 dark-night p-5">
          <h4 className="text-center text-white fw-bolder fs-2">Ночь</h4>
          <div className="d-flex flex-column gap-2">
            {modes.map((mode) => {
              if (mode.mode === 'evening' || mode.mode === 'night') {
                return (
                  <WeatherCard
                    modeDay="night"
                    key={mode.type}
                    title={mode.type}
                    weatherData={
                      currentDayWeather[
                        mode.mode as keyof typeof currentDayWeather
                      ]
                    }
                  />
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
