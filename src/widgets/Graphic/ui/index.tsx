import React, { useEffect, useState } from 'react';
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
  Chart,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getAllWeather } from '../../../features/weather/api';
import { ForecastData } from '../../../@types/weather';
import { formatDate } from '../../../utils/formatDate';
import { Loader } from '../../../shared/Loader';
import { processWeatherData } from '../../../utils/processWeatherData';
import { FontSpec } from 'chart.js';

import sunny from '../../../../public/sunny.svg';
import partlyCloudy from '../../../../public/partly-cloudy.svg';
import cloudy from '../../../../public/cloudy.svg';
import fog from '../../../../public/fog.svg';
import heavyRain from '../../../../public/heavy-rain.svg';
import scatteradShower from '../../../../public/scatterad-showers.svg';
import scatteradThunderStorm from '../../../../public/scatterad-thunderstorm.svg';
import snow from '../../../../public/snow.svg';
import clearNight from '../../../../public/clear-night.svg';
import clearCloudyNight from '../../../../public/cloudy-clear-night.svg';
import partyCloudyNight from '../../../../public/partly-cloudy-night.svg';
import scatteradShowerNight from '../../../../public/scatterad-showers-night.svg';

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

interface CustomIconsPlugin {
  id: string;
  afterDatasetsDraw: (chart: Chart) => void;
}

interface Props {
  selectedDate: string;
}

export const Graphic: React.FC<Props> = ({ selectedDate }) => {
  const [forecastData, setForecastData] = useState<ForecastData[]>([]);

  const allIcons: { [key: string]: string } = {
    '01d': sunny,
    '02d': partlyCloudy,
    '03d': cloudy,
    '04d': fog,
    '09d': heavyRain,
    '10d': scatteradShower,
    '11d': scatteradThunderStorm,
    '13d': snow,
    '50d': fog,
    '01n': clearNight,
    '02n': partyCloudyNight,
    '03n': clearCloudyNight,
    '04n': fog,
    '09n': heavyRain,
    '10n': scatteradShowerNight,
    '11n': scatteradThunderStorm,
    '13n': snow,
    '50n': fog,
  };

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

  // Если selectedDate пустая строка, используем текущую дату
  const today = formatDate(new Date().toISOString())
    .split(',')[0]
    .split('/')
    .reverse()
    .join('-');
  const dateToShow = selectedDate || today;

  if (!groupedData[dateToShow]) {
    return <Loader />;
  }

  const labels = groupedData[dateToShow].temperatures.map(
    (item) => item.time.split(' ')[1],
  );

  const temperatures = groupedData[dateToShow].temperatures.map(
    (item) => item.temp,
  );

  const icons = groupedData[dateToShow].temperatures.map(
    (item) => allIcons[item.icon],
  );

  const data: ChartData<'line'> = {
    labels,
    datasets: [
      {
        label: 'Temperatures (°C)',
        data: temperatures,
        borderColor: 'pink',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        fill: true,
        datalabels: {
          display: true,
          align: 'top' as const,
          anchor: 'end' as const,
          formatter: (value: number) => `${value}°C`,
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
        text: `Bishkek Weather Forecast for ${formatDate(dateToShow).split(',')[0]}`,
        font: {
          family: '"Outfit", sans-serif',
          size: 18,
          weight: 'bold',
        } as Partial<FontSpec>,
      },
      datalabels: {
        color: 'black',
        align: 'top' as const,
        anchor: 'end' as const,
        formatter: (value: number) => `${value}°C`,
      },
    },
    elements: {
      point: {
        pointStyle: 'circle',
      },
    },
    scales: {
      x: {
        offset: true,
        min: 0,
        max: 10,
      },
      y: {
        min: 0,
        max: 30,
      },
    },
  };

  const customIconsPlugin: CustomIconsPlugin = {
    id: 'customIcons',
    afterDatasetsDraw: (chart) => {
      const ctx = chart.ctx;
      chart.data.datasets.forEach((_, i) => {
        const meta = chart.getDatasetMeta(i);
        meta.data.forEach((point, index) => {
          const icon = new Image();
          icon.src = icons[index];
          icon.onload = () => {
            ctx.drawImage(icon, point.x - 10, point.y - 40, 20, 20);
          };
        });
      });
    },
  };

  return (
    <div className="bg-white d-flex flex-column p-3 rounded-bottom-3">
      <Line options={options} data={data} plugins={[customIconsPlugin]} />
    </div>
  );
};
