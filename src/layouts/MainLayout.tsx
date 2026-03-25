import React from 'react';
import { Outlet } from 'react-router';
import AppLayout from './AppLayout';

const MainLayout: React.FC = () => {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  );
};

export default MainLayout;
