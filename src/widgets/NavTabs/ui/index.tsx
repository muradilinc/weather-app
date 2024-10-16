import { Tabs } from 'react-bootstrap';
import React, { PropsWithChildren } from 'react';

export const NavTabs: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <Tabs
      defaultActiveKey="weather"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      {children}
    </Tabs>
  );
};
