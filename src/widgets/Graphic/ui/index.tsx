import { useEffect, useState } from 'react';
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
} from 'chart.js';
import { getWeather } from '../../../features/weather/api';
import { ForecastData } from '../../../@types/weather';
import { formatDate } from '../../../utils/formatDate';
import { Loader } from '../../Loader';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: '5-Day Weather Forecast (3-Hour Intervals)',
    },
  },
};

export const Graphic = () => {
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);

  useEffect(() => {
    const fetchWeatherForecast = async () => {
      try {
        const data = await getWeather();
        setForecastData(data.list);
      } catch (error) {
        console.error('Error fetching weather forecast:', error);
      }
    };

    fetchWeatherForecast();
  }, []);

  const labels = forecastData.map((item) => formatDate(item.dt_txt));
  const temperatures = forecastData.map((item) => item.main.temp);

  const data = {
    labels,
    datasets: [
      {
        label: 'Temperature (°C)',
        data: temperatures,
        borderColor: 'red',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        fill: true,
      },
    ],
  };

  if (forecastData.length === 0) {
    return <Loader />;
  }

  return (
    <div className="w-[1200px] mx-auto bg-white p-12 rounded-[8px]">
      <Line options={options} data={data} />
    </div>
  );
};
