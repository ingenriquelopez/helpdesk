import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate }       from 'react-router-dom';
import { useLocalStorage }            from '../../../js/useLocalStorage';
import { useParams }                  from 'react-router-dom';
import axios                          from 'axios';
import DataTable, { createTheme }     from 'react-data-table-component';
import moment                         from 'moment';
import Button                         from 'react-bootstrap/Button';
import { FcCancel }                   from "react-icons/fc";
import AvisoModal                 from '../../Alerts/AvisoModal/AvisoModal';

import './AttendanceEmployee.css';

const {REACT_APP_API} = process.env;
const defaultFile = 'https://stonegatesl.com/wp-content/uploads/2021/01/avatar-300x300.jpg'; 

function AttendanceEmployee() {

  const [mostrarModal, setMostrarModal] = useState(false);

  const [userLogged, setUserLogged] = useLocalStorage('userLogged');
  const [currentTraining, setCurrentTraining] = useState( {} );
  const [show, setShow]     = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [currentRecord, setcurrentRecord]       = useState('');
  const [employeeFounded, setEmployeeFounded]   = useState('');
  const [listPersonal, setListPersonal]         = useState([])
  const [numEmployeeState, setNumEmployeeState] = useState('');
  const [currentPicture, updateCurrentPicture] = useState(defaultFile);
  const [checkIn, setCheckIn] = useState();
  const [checkOut, setCheckOut] = useState();
  const [employeesOfTraining, setEmployeesOfTraining] = useState([]);


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
        selector : row => row.num,
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
      name: 'CHECK-IN',
      selector : row => row.checkIn,
      sortable : true,
      width    : "7rem",
    },
    {
      name: 'CHECK-OUT',
      selector : row => row.checkOut,
      sortable : true,
      width    : "7rem",
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


const mostrarAviso = () => {
  setMostrarModal(true);
};

const cerrarModal = () => {
  setMostrarModal(false);
};


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
          setCurrentTraining(response.data)
        } 
        
    } catch (error) {
      console.log(error.message);
    }
  }
  


  const addToListPersonal = async(responseData)=> {
    let listTmp = [];
    let registro;

    console.log(responseData)
    responseData.map( (e)=> {
      e.Employees.map( (emp) => {
        registro = {
          idt         : IDT,
          key        : emp.numEmployee,
          num        : emp.numEmployee,
          name       : emp.name,
          department : emp.department,
          email      : emp.email,
          checkIn    : emp.Trainings_Employees.CheckIn,
          checkOut   : emp.Trainings_Employees.CheckOut,  
      }

      listTmp.push(registro);
      })
      
      
    })
    setListPersonal(listTmp);

    
  }

  const getEmployeesOfTraining = async()=> {
    try {
      const response = await axios.get(`${REACT_APP_API}/trainingEmployee/${IDT}`);
      if (response) {

        setEmployeesOfTraining(response.data)
        addToListPersonal(response.data);
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
  updateCurrentPicture(defaultFile);
}




//buscar el empleado en la tabla de trainings si ya registrado

//Registrar empleado en tabla de asistencia trainings_employees
const addEmployeeToTraining =async(r)=> {
  
  const data = {
    TrainingId    : IDT,
    EmployeeEmail : employeeFounded.email,
    CheckIn       : checkIn,
    CheckOut      : checkOut,
  }
console.log(employeeFounded)

  let  registro = {
    idt         : IDT,
    key        : employeeFounded.numEmployee,
    num        : employeeFounded.numEmployee,
    name       : employeeFounded.name,
    department : employeeFounded.department,
    email      : employeeFounded.email,
    checkIn    : checkIn,
    checkOut   : checkOut,  
} 

  try {
    const response = await axios.post(`${REACT_APP_API}/trainingEmployee`,data);
    if (response.status === 200) {
      console.log('exito')
      setListPersonal([...listPersonal,registro]);
    } else {
      console.log('error');
    }
  } catch (error) {
    console.log(error)
  }
}

const findEmployee_In_Trainings = async()=> {
  const buscado = {
                  employee_email : employeeFounded.email,
                  training_id :IDT,
                  
  };
    
  try {
    const response = await axios.get(`${REACT_APP_API}/trainingEmployee`, {
      params: {
        jsonData: JSON.stringify(buscado), // Convertir el objeto JSON a una cadena
      },
    });

    console.log(response.data)
    if (response.data) {
      buscado.newCheckIn = checkIn;
      buscado.newCheckOut = checkOut;
      // Como si se encontro, se procede a modificar la hora en el listPersonal y hacer un put en el back
      try {
        const response = await axios.put(`${REACT_APP_API}/trainingEmployee`,buscado);
        if (response) {
          console.log(response)
        
          }

      } catch (error) {
        console.log(error.message);
      }

    } else {
      addEmployeeToTraining(response.data);
    }
  } catch (error) {
    console.log(error.message)  ;
  }
}



const handleRecord = ()=> {
 findEmployee_In_Trainings();
 clearEmployee();  
}


//buscar empleado en la tabla empleados si existe podemos ingresarlo al training
const handleGetEmployee = async(e)=> {
  try {
        const response = await axios.get(`${REACT_APP_API}/employees/number/${numEmployeeState}`, {
          headers: {
              "authorization": `Bearer ${userLogged.userToken}`,
          }
        });
        
        if (response.data) {
          setEmployeeFounded(response.data)
          updateCurrentPicture(response.data.picture);
        } else {
          mostrarAviso();
          clearEmployee();  
        }
      } catch (error) {
        console.log(error.message);
      } 
  }

  /*-------------------------*/
    useEffect( ()=> {
    getTraining();
    getEmployeesOfTraining();
  },[])


  useEffect( ()=> {
  },[listPersonal]);

useEffect ( ()=> {
  getEmployeesOfTraining();
}, [checkIn, checkOut]);
  
  return (  

    
    
    <div className = "container-fluid mt-5">
      
      <section className = "titleTraining mt-2">
        <p id = "titleT"> {currentTraining.training}</p>
        <h5>REGISTRO DE ASISTENCIA</h5>
        <hr/>
      </section>   

      <div id="containerRecord">

          <div className = "personalSource mr-2">
              <div className = "row mb-2" id = "employeeWanted">
                <div className ="container-fluid col-12 findWhat">
                  <label htmlFor = "numEmployee" className = "col-3" >Number:</label>
                  <input type = "text" 
                          className = "form-control col-6" 
                          id        = "numEmployee"
                          value     = {numEmployeeState}
                          onChange  = { (e)=>handleNumEmployeeState(e)}
                    />
                    <button type = "button" className="btn btn-primary" onClick = { (e) => handleGetEmployee(e)}>
                    <svg xmlns = "http://www.w3.org/2000/svg" width = "16" height = "16" fill = "currentColor" className="bi bi-search" viewBox="0 0 16 16">
                      <path d = "M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                    </svg>
                  </button>
                </div>
                

              </div>
              <div className="dataEmployee">
                <div className="row mt-4 text-center" id = "name">
                    {employeeFounded.name ?employeeFounded.name: '?'}
                </div>
                <div className="row mt-0 mb-4 text-center" id = "department">
                    {employeeFounded.department ? employeeFounded.department: '?'}
                </div>
                <div className = "col-12" id = "picture">    
                    <img src = {currentPicture} id = "employeePicture"/>
                </div>
                <div className="times mt-2">
                    <div className="spaceCheckIn col-6">
                      <label htmlFor = "CheckIn" className = "fw-bold fst-italic">Check In</label>
                      <input type="time" name="CheckIn" min="05:00" max="22:00" id = "checkIn" className = "col-12"  onChange = { (e)=> setCheckIn(e.target.value)}/>
                    </div>
                  
                  <div className="spaceCheckOut col-6">
                    <label htmlFor = "CheckOut" className = "fw-bold fst-italic">Check Out</label>
                    <input type="time" name="CheckOut" min="05:00" max="22:00" className = "col-12" onChange = { (e)=> setCheckOut(e.target.value)}/>
                  </div>
                  
                </div>
                <div className = "spaceButton col-12">
                <button 
                      type      = "button" 
                      className = "btn btn-success btn-sm col-12 mt-2"
                      onClick   = {e=>handleRecord(e)}>
                        Add
                </button>  
              </div>
              </div>

          </div>
           
         
          
          <aside className = "List col-9">
            
            <DataTable    columns       = { columns }  
                          data          = { listPersonal ? listPersonal:'' }  
                          customStyles  = {customStyles} 
                        
                            fixedHeader 
                            pagination 
                            striped
                            theme="solarized" 
                /> 
          </aside>

      </div>
      {mostrarModal && (
        <AvisoModal 
                  aviso       = "Employee not Found in Database. Check Employee Number" 
                  cerrarModal = {cerrarModal} />
      )}
      </div> 

      
      
    
  )
}

export default AttendanceEmployee