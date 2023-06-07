import React from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from "react-router-dom" ;




const DashBoard = () => {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <Sidebar/>   
       <Outlet/>  
    </div>
  );
};

export default DashBoard;



