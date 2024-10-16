import { Graphic } from '../widgets/Graphic';
import { Card } from '../widgets/Card';
import { NavTabs } from '../widgets/NavTabs';
import { Tab } from 'react-bootstrap';

const App = () => {
  return (
    <div className="flex justify-center items-center my-5">
      <NavTabs>
        <Tab eventKey="weather" title="Current">
          <Card />
        </Tab>
        <Tab eventKey="graphic" title="Graphic">
          <Graphic />
        </Tab>
      </NavTabs>
    </div>
  );
};

export default App;
