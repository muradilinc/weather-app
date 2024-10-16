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

      <div className="flex flex-column border-co">
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
  );
};
