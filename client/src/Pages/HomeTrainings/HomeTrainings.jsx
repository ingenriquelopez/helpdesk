import React from 'react';
import { Outlet } from "react-router-dom" ;
import NavBarTrainings from '../../Components/NavBarTrainings/NavBarTraInings';


const HomeTrainings = () => {
  
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <NavBarTrainings/>
      <Outlet/>
    </div>
  );
};

export default HomeTrainings;