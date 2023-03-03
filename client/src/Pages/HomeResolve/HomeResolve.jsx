import React from 'react'
import { useParams } from 'react-router-dom';

import NavBarResolve from '../../Components/NavBarResolve/NavBarResolve'
import Footer        from '../../Components/Footer/Footer'
import FormResolve   from './FormResolve/FormResolve';

function HomeResolve() {
   const { number } = useParams();
    return (
      <div className="container-fluid">
        <NavBarResolve/>
        <FormResolve propNumber = {number}/>
        <Footer/>
      </div>
    )
}

export default HomeResolve;