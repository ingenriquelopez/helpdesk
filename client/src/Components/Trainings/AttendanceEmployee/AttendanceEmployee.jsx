import React, { useEffect } from 'react';
import { useLocalStorage }  from '../../../js/useLocalStorage';
import { useParams }        from 'react-router-dom';
import axios                from 'axios';



const {REACT_APP_API} = process.env;

function AttendanceEmployee() {
  const [userLogged, setUserLogged] = useLocalStorage('userLogged');

  const getTraining = async() => {
    try {
      const response = await axios.get(`${REACT_APP_API}/trainings`, {
        headers: {
            "authorization": `Bearer ${userLogged.userToken}`,
        }
        });

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect( ()=> {
    
    getTraining();
  },[])

  return (  
    <section className = "container mt-5">
      <h1>AttendanceEmployee </h1>
      {console.log(useParams('idt'))}
    </section>
  )
}

export default AttendanceEmployee