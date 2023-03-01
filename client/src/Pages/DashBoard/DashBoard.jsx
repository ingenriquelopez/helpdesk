import React from 'react';
import { Outlet } from "react-router-dom" ;

import Sidebar from '../../Components/Sidebar/Sidebar';

const Dashboard = () => {
  
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <Sidebar/>  
      <Outlet/>
    </div>
  );
};

export default Dashboard;