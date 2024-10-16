import { Graphic } from '../widgets/Graphic';
import { Card } from '../widgets/Card';
import { NavTabs } from '../widgets/NavTabs';
import { Tab } from 'react-bootstrap';

const App = () => {
  return (
    <div className="flex justify-center items-center my-5">
      <div className="w-75 mx-auto">
        <NavTabs>
          <Tab eventKey="weather" title="День" tabClassName="text-black">
            <Card />
          </Tab>
          <Tab eventKey="graphic" title="График" tabClassName="text-black">
            <Graphic />
          </Tab>
        </NavTabs>
      </div>
    </div>
  );
};

export default App;
