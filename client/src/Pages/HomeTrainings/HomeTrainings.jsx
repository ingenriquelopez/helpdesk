import React from 'react';
import { Outlet } from "react-router-dom" ;
import NavBarTrainings from '../../Components/NavBarTrainings/NavBarTraInings';
import HomeTraining from './HomeTraining.css';


const HomeTrainings = () => {
  
  return (
    <div className = "container-fluid d-flex align-items-center" id = "homeTraining" >
      <NavBarTrainings/>
      <Outlet/>
    </div>
  );
};

export default HomeTrainings;