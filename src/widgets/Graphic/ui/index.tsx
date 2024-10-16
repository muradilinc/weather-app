import React, { ChangeEvent, useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getAllWeather } from '../../../features/weather/api';
import { ForecastData } from '../../../@types/weather';
import { formatDate } from '../../../utils/formatDate';
import { Loader } from '../../../shared/Loader';
import { DateSelector } from '../../../shared/DateSelector';
import { processWeatherData } from '../../../utils/processWeatherData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ChartDataLabels,
);

export const Graphic: React.FC = () => {
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>('');

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const data = await getAllWeather();
        setForecastData(data.list);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
      }
    };

    fetchWeatherForecast();
  }, []);

  const groupedData = processWeatherData(forecastData);
  const dates = Object.keys(groupedData);

  const labels = selectedDate
    ? groupedData[selectedDate].temperatures.map(
        (item) => item.time.split(' ')[1],
      )
    : dates.map((date) => formatDate(date).split(',')[0]);

  const temperatures = selectedDate
    ? groupedData[selectedDate].temperatures.map((item) => item.temp)
    : dates.map((date) =>
        Math.max(
          ...groupedData[date].temperatures.map((dateItem) => dateItem.temp),
        ),
      );

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Temperatures (°C)',
        data: temperatures,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        fill: true,
        datalabels: {
          display: true,
        },
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: `Bishkek ${selectedDate ? selectedDate : '5-Day'} Weather Forecast`,
      },
      datalabels: {
        color: 'black',
        align: 'end' as const,
        anchor: 'end' as const,
        formatter: (value: number) => `${value}°C`,
      },
    },
  };

  const handleDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedDate(event.target.value);
  };

  if (forecastData.length === 0) {
    return <Loader />;
  }

  return (
    <div className="bg-white d-flex flex-column p-3 rounded-bottom-3">
      <div className="d-flex justify-content-end">
        <DateSelector
          type="graphic"
          dates={dates}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>
      <Line options={options} data={data} />
    </div>
  );
};
