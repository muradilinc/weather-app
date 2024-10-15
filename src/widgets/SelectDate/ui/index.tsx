import React from 'react';
import { ChangeEvent, useEffect, useState } from 'react';
import { ForecastData } from '../../../@types/weather';
import { getAllWeather } from '../../../features/weather/api';

interface Props {
  setCurrentDay: (data: ForecastData) => void;
}

export const SelectDate: React.FC<Props> = ({ setCurrentDay }) => {
  const [dates, setDates] = useState<ForecastData[]>([]);
  const [selectDate, setSelectDate] = useState('');

  useEffect(() => {
    const fetchAllWeather = async () => {
      try {
        const data = await getAllWeather();
        const updatedList = data.list.map((item: ForecastData) => ({
          ...item,
          name: data.city.name,
        }));
        setDates(updatedList);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllWeather();
  }, []);

  const changeDate = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectDate(() => event.target.value);
    const filteredDate = dates.filter(
      (item) => item.dt_txt === event.target.value,
    )[0];
    setCurrentDay(filteredDate);
  };

  return (
    <form className="max-w-lg">
      <select
        value={selectDate}
        onChange={changeDate}
        className="py-3 px-4 pe-9 outline-none block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
      >
        <option value={''}>Choose a date</option>
        {dates.map((weather) => (
          <option key={weather.dt_txt} value={weather.dt_txt}>
            {weather.dt_txt}
          </option>
        ))}
      </select>
    </form>
  );
};
