import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useLocalStorage }  from '../../../js/useLocalStorage';
import { useParams }        from 'react-router-dom';
import axios                from 'axios';
import DataTable, { createTheme } from 'react-data-table-component';
import moment        from 'moment';
import Button        from 'react-bootstrap/Button';
import { FcCancel }  from "react-icons/fc";
import './AttendanceEmployee.css';
import Pinga from '../../../assets/pictures/Pinga.jpg';
const {REACT_APP_API} = process.env;

function AttendanceEmployee() {

  const [userLogged, setUserLogged] = useLocalStorage('userLogged');
  const [currentTraining, setCurrentTraining] = useState( {} );
  const [show, setShow]     = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [currentRecord, setcurrentRecord]     = useState('');
  const [employeeFounded, setEmployeeFounded] = useState('');
  const [listPersonal, setListPersonal]       = useState( [
    {}
  ])
  const [numEmployeeState, setNumEmployeeState] = useState('');

  const navigate = useNavigate();
  const IDT = useParams('idt').idt;
/*-----------------------------*/
const customStyles = {
  rows: {
      style: {
          minHeight: '40px', // override the row height
          fontSize: '1rem',
      },
  },
  headCells: {
      style: {
          paddingLeft: '8px', // override the cell padding for head cells
          paddingRight: '8px',
          backgroundColor: "#FFFDE7",
          center:true,
      },
  },
  cells: {
      style: {
          paddingLeft: '8px', // override the cell padding for data cells
          paddingRight: '8px',
      },
  },
};
createTheme('solarized', {
  text: {
    primary  : '#268bd2',
    secondary: '#2aa198',
  },
  
  context: {
    text: '#FFFFFF',
  },
  divider: {
/*     default: '#073642', */
  },
  action: {
    hover: 'rgba(0,0,0,.08)',
  },
})
//---------------------------------------------
  const columns = [
    {
        name     : 'NUM',
        selector : row => row.numEmployee,
        width    : "4rem",
        sortable : true,
    },
    {
        name: 'NAME',
        selector : row => row.name,
        width    : "20rem",
        sortable : true,
    },
    {
      name: 'DEPARTMENT',
      selector : row => row.department,
      sortable : true,
      width    : "15rem",
    },
     {
      name  : 'QUITAR',
      width : "10rem",
      cell  : (row) =>(
                          <Button className = 'btn-sm' id = "btn_quitar"
                                  disabled  = { userLogged.typeUser === 'User' ? true: false }
                                  style     = {{backgroundColor:"transparent"}}
                                  variant   = "light" 
                                  onClick   = { ()=>handleShowPreview(row) } 
                            >
                              <FcCancel/> 
                          </Button>
                      
                   )
    }, 
];

const getEmployee = async()=> {
  try {
    const response = await axios.get(`${REACT_APP_API}/employees/number/${numEmployeeState}`, {
      headers: {
          "authorization": `Bearer ${userLogged.userToken}`,
      }
    });

      if (response) {
        setEmployeeFounded(
          response.data
        )
      } 
  } catch (error) {
    console.log(error.message);
  }
}




  
/*---------------------------------------*/
  const getTraining = async() => {

    try {
      const response = await axios.get(`${REACT_APP_API}/trainings/${IDT}`, {
        headers: {
            "authorization": `Bearer ${userLogged.userToken}`,
        }
      });

        if (response) {
          setCurrentTraining(
            response.data
          )
        } 
    } catch (error) {
      console.log(error.message);
    }
  }
  
  const handleShowPreview  = (row) =>  {
    setcurrentRecord(row);
    setShow(true);  
  }
  
  const handleShowEdit  = (row) => {
    setcurrentRecord(row);
    setLgShow(true);   
  };

  const handleNumEmployeeState = (e)=> {
    setNumEmployeeState(e.target.value);
  }
//---------------------------------------------------------





const handleLgClose =()=> {
  setLgShow(false);
}

const handleLgUpdateTraining = ()=> {
  setLgShow(false);
  window.location.reload();
  navigate('/trainings', { replace: true });
}

const clearEmployee = ()=> {
  setEmployeeFounded('');
}


const handleRecord = ()=> {
  setListPersonal([...listPersonal,employeeFounded]);
    clearEmployee(); 
}

const handleGetEmployee = async(e)=> {
  try {
        const response = await axios.get(`${REACT_APP_API}/employees/number/${numEmployeeState}`, {
          headers: {
              "authorization": `Bearer ${userLogged.userToken}`,
          }
        });

          if (response) {
            setEmployeeFounded(response.data)
          } 
      } catch (error) {
        console.log(error.message);
      } 
  }

  /*-------------------------*/

    useEffect( ()=> {
    getTraining();
  },[])

  
  return (  
    <div className = "container-fluid mt-5">
      
      <section className = "titleTraining mt-2">
        <p id = "titleT"> {currentTraining.training}</p>
      </section>   
      <section className = "titleRegistro">
        <h5>REGISTRO DE ASISTENCIA</h5>
        <hr/>
      </section>

      <div id="containerRecord">
        <aside className = "List">
            <DataTable    columns       = { columns }  
                          data          = { listPersonal ? listPersonal:'' }  
                          customStyles  = {customStyles} 
                            /*  selecttableRows  */
                            fixedHeader 
                            pagination 
                            striped
                            theme="solarized" 
                /> 
          </aside>

          <div className="personalSource">

            <div className="form-group numeroEmpleado">
              <div className="row ml-1">
                <label htmlFor="numEmployee">Number</label>

                <div className="col col-2 pr-0">
                  <input type = "text" 
                         className = "form-control" 
                         id   ="numEmployee"
                         value = {numEmployeeState}
                         onChange = { (e)=>handleNumEmployeeState(e)}

                  />
                </div>

                <div className="col">
                  <button type="button" className="btn btn-primary" onClick = { (e) => handleGetEmployee(e)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </button>
                </div>

              </div>

            </div>

            <div className="employee mt-3 col-12">
              
              <div className=" row ml-1 mb-2 text-center" id = "name">
                {employeeFounded.name}
              </div>

              <div className=" row ml-1 mb-1 text-center">
                Department...
              </div>

              <div className="row ml-1 mb-4 text-center" id = "department">
                    {employeeFounded.department}
              </div>


              <div className="row">
                <div className = "col col-3 mr-2" id = "picture">    
                      <img src = {Pinga}/>
                </div>
              </div>
                
          </div>

            <div className = "text-right">
              <button 
                  type      = "button" 
                  className = "btn btn-success btn-lg"
                  onClick = {e=>handleRecord(e)}>
                    Record
              </button>
            </div>
          </div>
      </div>
      
    </div>
  )
}

export default AttendanceEmployee