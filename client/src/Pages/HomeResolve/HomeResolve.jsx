import React from 'react'
import { useParams } from 'react-router-dom';
import Footer        from '../../Components/Footer/Footer'
import FormResolve   from './FormResolve/FormResolve';
import NavBarHD from '../../Components/NavBarHD/NavBarHD';

function HomeResolve() {
   const { number } = useParams();
    return (
      <div className="container">
        <NavBarHD/>
        <FormResolve propNumber = {number}/>
        <Footer/>
      </div>
    )
}

export default HomeResolve;