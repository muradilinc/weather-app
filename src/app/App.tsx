import { Graphic } from '../widgets/Graphic';
import { Card } from '../widgets/Card';
import { useState } from 'react';
import { ForecastData } from '../@types/weather';
import { SelectDate } from '../widgets/SelectDate';

const App = () => {
  const [currentWeather, setCurrentWeather] = useState<ForecastData | null>(
    null,
  );
  const [showGraphic, setShowGraphic] = useState(false);

  const handleShowGraphic = () => {
    setShowGraphic((prevState) => !prevState);
  };

  return (
    <div className="flex justify-center items-center my-5">
      <div className="flex flex-col gap-y-3">
        <div className="text-center">
          <button
            onClick={handleShowGraphic}
            className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
          >
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              {!showGraphic ? 'Show graphic' : 'Shingle day'}
            </span>
          </button>
        </div>
        {showGraphic ? (
          <Graphic />
        ) : (
          <div className="flex gap-x-3">
            <Card currentWeather={currentWeather!} />
            <SelectDate setCurrentDay={setCurrentWeather} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
