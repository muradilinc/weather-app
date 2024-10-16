import { ChangeEvent, useEffect, useState } from 'react';
import { getAllWeather } from '../../../features/weather/api';
import { ForecastData } from '../../../@types/weather';
import { format, addDays } from 'date-fns';
import { Form } from 'react-bootstrap';

export const Card = () => {
  const [currentDayWeather, setCurrentDayWeather] = useState<{
    morning: ForecastData[];
    day: ForecastData[];
    evening: ForecastData[];
    night: ForecastData[];
  } | null>(null);
  const [dates, setDates] = useState<ForecastData[]>([]);
  const [selectDate, setSelectDate] = useState('');

  useEffect(() => {
    const fetchWeather = async (date: string) => {
      try {
        const data = await getAllWeather();
        setDates(data.list);
        const today = format(date ? date : new Date(), 'yyyy-MM-dd'); // Текущий день
        const nextDay = format(addDays(new Date(), 1), 'yyyy-MM-dd'); // Следующий день

        const todayForecast = data.list.filter((item) =>
          item.dt_txt.startsWith(today),
        );

        const nextDayForecast = data.list.filter((item) =>
          item.dt_txt.startsWith(nextDay),
        );

        const morningWeather = todayForecast.filter((item) => {
          const hour = new Date(item.dt_txt).getHours();
          return hour >= 6 && hour < 12; // 6:00 - 12:00
        });

        const dayWeather = todayForecast.filter((item) => {
          const hour = new Date(item.dt_txt).getHours();
          return hour >= 12 && hour < 18; // 12:00 - 18:00
        });

        const eveningWeather = todayForecast.filter((item) => {
          const hour = new Date(item.dt_txt).getHours();
          return hour >= 18 && hour < 24; // 18:00 - 00:00
        });

        const nightWeather = [
          ...todayForecast.filter((item) => {
            const hour = new Date(item.dt_txt).getHours();
            return hour >= 0 && hour < 6; // 00:00 - 6:00 текущего дня
          }),
          ...nextDayForecast.filter((item) => {
            const hour = new Date(item.dt_txt).getHours();
            return hour >= 0 && hour < 6; // 00:00 - 6:00 следующего дня
          }),
        ];

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

    fetchWeather(selectDate);
  }, [selectDate]);

  if (!currentDayWeather) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Прогноз на сегодня</h2>
      <Form.Select
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          setSelectDate(event.target.value)
        }
        aria-label="Default select example"
      >
        <option>Choose a date</option>
        {dates.map((item) => (
          <option key={item.dt_txt} value={item.dt_txt}>
            {item.dt_txt}
          </option>
        ))}
      </Form.Select>
      {currentDayWeather.morning.length !== 0 ? (
        <>
          <h3>Утро</h3>
          <img
            src={`https://openweathermap.org/img/wn/${currentDayWeather.morning[0].weather[0].icon}@2x.png`}
            alt="day"
          />
          {currentDayWeather.morning.map((item) => (
            <p
              key={item.dt}
            >{`Температура: ${item.main.temp} °C, Время: ${item.dt_txt}`}</p>
          ))}
        </>
      ) : null}

      {currentDayWeather.day.length !== 0 ? (
        <>
          <h3>День</h3>
          <img
            src={`https://openweathermap.org/img/wn/${currentDayWeather.day[0].weather[0].icon}@2x.png`}
            alt="day"
          />
          {currentDayWeather.day.map((item) => (
            <p
              key={item.dt}
            >{`Температура: ${item.main.temp} °C, Время: ${item.dt_txt}`}</p>
          ))}
        </>
      ) : null}

      {currentDayWeather.evening.length !== 0 ? (
        <>
          <h3>Вечер</h3>
          <img
            src={`https://openweathermap.org/img/wn/${currentDayWeather.evening[0].weather[0].icon}@2x.png`}
            alt="day"
          />
          {currentDayWeather.evening.map((item) => (
            <p
              key={item.dt}
            >{`Температура: ${item.main.temp} °C, Время: ${item.dt_txt}`}</p>
          ))}
        </>
      ) : null}
      {currentDayWeather.night.length !== 0 ? (
        <>
          <h3>Ночь</h3>
          <img
            src={`https://openweathermap.org/img/wn/${currentDayWeather.night[0].weather[0].icon}@2x.png`}
            alt="day"
          />
          {currentDayWeather.night.map((item) => (
            <p
              key={item.dt}
            >{`Температура: ${item.main.temp} °C, Время: ${item.dt_txt}`}</p>
          ))}
        </>
      ) : null}
    </div>
  );
};
