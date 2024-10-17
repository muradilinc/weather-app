import React from 'react';
import { ForecastData } from '../../../@types/weather';
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

interface Props {
  title: string;
  weatherData: ForecastData[];
}

export const WeatherCard: React.FC<Props> = ({ title, weatherData }) => {
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

  if (weatherData.length === 0) return null;

  return (
    <>
      {weatherData.map((item) => (
        <div
          className={`d-flex align-items-center shadow p-3 text-white justify-content-between w-100 rounded ${title !== 'Вечер' && title !== 'Ночь' ? 'blue-day' : 'sky-night'}`}
        >
          <div className="d-flex gap-5 align-items-center">
            <img
              style={{ width: '45px' }}
              src={allIcons[item.weather[0].icon]}
              alt={title}
            />
            <div className="d-flex flex-column gap-2">
              <p className="m-0">
                {item.main.temp}°C {title}
              </p>
              <p className="m-0 fs-4">{item.weather[0].main}</p>
            </div>
          </div>
          <div className="d-flex flex-column gap-2">
            <h4 className="m-0">
              {item.main.temp_max}°C / {item.main.temp_min}°C
            </h4>
            <div className="d-flex gap-3 justify-content-end">
              <svg
                fill="white"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g fill="#fff">
                  <path d="m15.0066 3.25608c1.8417-.39871 4.1265-.37878 7.2357.3966.5358.13361.8615.67523.7276 1.20973s-.6768.85949-1.2126.72588c-2.8907-.72087-4.8558-.70082-6.3265-.38242-1.4753.31937-2.5358.9528-3.6593 1.63776l-.0841.05131c-1.083.66071-2.28225 1.39235-3.86667 1.65575-1.64339.27319-3.58471.03166-6.1919-1.00882-.51276-.20463-.762156-.7852-.55703-1.29674.20512-.51154.78709-.76034 1.29985-.5557 2.3927.95487 3.9513 1.08756 5.12035.89322 1.18688-.1973 2.09173-.74349 3.2366-1.44146 1.1264-.68674 2.4408-1.48739 4.278-1.88511z" />
                  <path d="m22.2423 7.64302c-3.1092-.77537-5.394-.7953-7.2357-.3966-1.8372.39773-3.1516 1.19837-4.278 1.88511-1.14487.69797-2.04972 1.24417-3.2366 1.44147-1.16905.1943-2.72765.0616-5.12035-.89323-.51276-.20463-1.09473.04416-1.29985.55573-.205126.5115.04427 1.0921.55703 1.2967 2.60719 1.0405 4.54851 1.282 6.1919 1.0088 1.58442-.2634 2.78367-.995 3.86667-1.6557l.0841-.0513c1.1235-.685 2.184-1.31842 3.6593-1.63779 1.4707-.3184 3.4358-.33844 6.3265.38242.5358.13361 1.0787-.19137 1.2126-.72588.1339-.5345-.1918-1.07612-.7276-1.20973z" />
                  <path
                    clip-rule="evenodd"
                    d="m18.9998 10.0266c-.3472 0-.6365.1793-.8384.4506-.0709.0958-.2348.32-.4525.6338-.2896.4173-.6772.9972-1.0665 1.6445-.3874.6441-.7871 1.3725-1.0929 2.0842-.2928.6816-.5506 1.4217-.5496 2.172.0007.2106.0259.4222.0605.6295.0578.346.1752.8224.42 1.3109.2468.4925.6327 1.0153 1.2303 1.4127.6039.4016 1.3641.6352 2.2891.6352s1.6852-.2336 2.289-.6352c.5976-.3974.9836-.9202 1.2304-1.4126.2448-.4886.3623-.965.4201-1.3109.0347-.2076.0602-.4198.0605-.6306.0003-.7503-.2568-1.4893-.5497-2.171-.3057-.7117-.7054-1.4401-1.0928-2.0842-.3893-.6473-.777-1.2272-1.0666-1.6445-.2177-.3138-.3817-.538-.4525-.6338-.2019-.2713-.4913-.4506-.8384-.4506zm1.6121 5.5991c-.2567-.5976-.607-1.2409-.9696-1.8437-.2205-.3666-.4416-.7118-.6425-1.0146-.2009.3028-.422.648-.6425 1.0146-.3625.6028-.7128 1.2461-.9695 1.8437l-.0146.0338c-.1767.4109-.3855.8967-.3731 1.3506.012.359.1087.7296.2692 1.0498.1281.2558.3047.4812.5508.6449.2399.1595.6047.3 1.1797.3s.9398-.1405 1.1797-.3c.2461-.1637.4227-.3892.5509-.6449.1605-.3202.2572-.6908.2692-1.0499.0125-.4537-.1964-.9395-.3731-1.3503z"
                    fill-rule="evenodd"
                  />
                  <path d="m14.1296 11.5308c.7603-.2461 1.3432.5452.9857 1.2584-.1633.3259-.347.6032-.7122.7322-.9771.3452-1.7865.8313-2.6316 1.3465l-.0841.0513c-1.083.6607-2.28224 1.3923-3.86666 1.6557-1.64339.2732-3.5847.0317-6.1919-1.0088-.51276-.2046-.762152-.7852-.55703-1.2967.20513-.5116.78709-.7604 1.29986-.5557 2.39269.9548 3.9513 1.0875 5.12034.8932 1.18688-.1973 2.09173-.7435 3.23659-1.4415 1.088-.6633 2.2077-1.2483 3.401-1.6346z" />
                </g>
              </svg>
              <span>{item.main.humidity} %</span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
