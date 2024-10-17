import { Tab, Tabs } from 'react-bootstrap';
import { ChangeEvent, useState } from 'react';
import { useWeather } from '../../../utils/useWeather';
import { DateSelector } from '../../../shared/DateSelector';
import { Card } from '../../Card';
import { Graphic } from '../../Graphic';

export const NavTabs = () => {
  const [selectDate, setSelectDate] = useState('');
  const { currentDayWeather, dates, location } = useWeather(selectDate);

  const handleDateChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectDate(event.target.value);
  };

  return (
    <div className="d-flex flex-column">
      <div className="d-flex justify-content-end">
        <DateSelector
          dates={dates}
          onDateChange={handleDateChange}
          selectedDate={selectDate}
        />
      </div>
      <Tabs defaultActiveKey="weather" id="uncontrolled-tab-example">
        <Tab eventKey="weather" title="День" tabClassName="text-black">
          <Card currentDayWeather={currentDayWeather} location={location} />
        </Tab>
        <Tab eventKey="graphic" title="График" tabClassName="text-black">
          <Graphic selectedDate={selectDate} />
        </Tab>
      </Tabs>
    </div>
  );
};
