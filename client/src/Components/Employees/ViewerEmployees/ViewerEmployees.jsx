import React, { useEffect, useState }     from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate  }     from 'react-router-dom';

import { useLocalStorage } from '../../../js/useLocalStorage';
import { tostada_W } from '../../../utils/Tostadas';
/* import Training from '../Training/Training'; */
import DataTable, { createTheme } from 'react-data-table-component';

import Container     from 'react-bootstrap/Container';
import Button        from 'react-bootstrap/Button';
import { FcCancel }  from "react-icons/fc";
import { BiEditAlt } from "react-icons/bi";
import Confirmation  from '../../Alerts/Confirmation/Confirmation';
import Annoument     from '../../Alerts/Annoument/Annoument';

/* import {loadAllEmployees, deleteEmployee} from '../../../redux/employees/employeesReducer'; */

import axios from 'axios';
/* import EditFormTraining from '../EditFormTraining/EditFormTraining'; */


const {REACT_APP_API} = process.env;


function ViewerEmployees() {

    const navigate= useNavigate();
    const dispatch  = useDispatch();
    /* const { listOfEmployees } = useSelector( state=> state.employees); */

    const [userLogged, setUserLogged] = useLocalStorage('userLogged');
    const [listEmployees, setListEmployees] = useState(null);


    const [show, setShow]     = useState(false);
    const [smShow, setSmShow] = useState(false);
    const [lgShow, setLgShow] = useState(false);
    const [currentRecord, setcurrentRecord] = useState('');

//styles of datatables
const customStyles = {
  rows: {
      style: {
          minHeight: '40px', // override the row height
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
    primary: '#268bd2',
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
        name: 'NUMBER',
        selector: row => row.numEmployee,
        sortable: true,
        width: "5rem",
    },
    {
        name: 'NAME OF EMPLOYEE',
        selector: row => row.name,
        width: "20rem",
        sortable: true,
    },
    {
      name: 'GENERE',
      selector: row => row.genere,
      sortable: true,
      width: "1rem",
    },
    {
      name: 'EMPLOYEE EMAIL',
      selector : row => row.email,
      sortable : true,
      width    : "20rem",
    },
    {
      name: 'LEVEL',
      selector: row => row.level,
      sortable: true,
      width: "10rem",
    },
    {
        name: 'DEPARTMENT',
        selector: row => row.department,
        sortable: true,
        width: "10rem",
      },
    {
      name: 'DELETE',
      width: "4rem",
      cell: (row) =>(
                      <Button className = 'btn-sm'
                        disabled  = { userLogged.typeUser === 'User' ? true: false }
                        style     = {{backgroundColor:"transparent"}}
                        variant   = "light" 
                        onClick   = { ()=>handleShowPreview(row) } 
                      >
                      <FcCancel/> 
                      </Button>
                   )
    },
    {
      name: 'EDIT',
      width: "4rem",
      cell: (row) => (
        <Button  className  = "btn-sm"
                                style     = {{backgroundColor:"transparent"}}
                                variant   = "light" 
                                 onClick  = { ()=>handleShowEdit(row) } 
                       >
                          <BiEditAlt/>
                       </Button>
      )  
    }
];



    //----------------------------------------------------------

  const getAllEmployees =async()=> {
    try {
      const response = await axios.get(`${REACT_APP_API}/employees`, {
        headers: {
            "authorization": `Bearer ${userLogged.userToken}`,
        }
        });

        if (response) {
          if (response.data.message==='El token NO es valido!') {
             navigate('/login' );    
             tostada_W(response.data.message,"top-center",1500,'dark');
             return
          } 
        }

      const { data } = response;
      
      if (data) {
        setListEmployees(data);
      }   
    } catch (error) {
      console.log(error.message)
    }
  }

  //-----------------------------------
  async function handleClickDelete() { 
    //primero lo eliminamos de la base de datos
    
    try {
      const response = await axios.delete(`${REACT_APP_API}/employees/${currentRecord.email}`, {
        headers: {
            "authorization": `Bearer ${userLogged.userToken}`,
        }
      });
      
      if (response.status === 200) {
        if (response.data.message==='El token NO es valido!') {
          navigate('/login' );    
          tostada_W(response.data.message,"top-center",1500,'dark');
          return
       } 
  
        if (response.data === 'Employee Deleted') {
          setShow(false);
          window.location.reload();
          navigate('/trainings/vieweremployees', { replace: true });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
//----------------------------------------  

  const handleShowPreview  = (row) =>  {
    setcurrentRecord(row);
    setShow(true);  
  }
  
  const handleShowEdit  = (row) => {
    setcurrentRecord(row);
    setLgShow(true);   
  };

//---------------------------------------------------------
const handleClose = () => {
  setShow(false);
}

const handleDelete = ()=> {
  handleClickDelete();
  setShow(false)
}

const handleSmClose =() => {
  setSmShow(false);
}

const handleLgClose =()=> {
  setLgShow(false);
}

const handleLgUpdate = ()=> {
  setLgShow(false);
}

//----------------------------------------------------------

  useEffect(()=> {  
    getAllEmployees();
  },[])

  const DATA = listEmployees;  
  
  return (
    <Container className = "container-fluid py-5">
      <div>
      <DataTable columns      = { columns }  
                  data         = { DATA ? DATA:'' }   
                  customStyles = {customStyles} 
                  fixedHeader 
                  pagination 
                  striped
      
          />  
          <Confirmation  
            titulo       = "Warning!"     
            mensaje      = "Do you want Delete this Employee?"   
            textBtn      = "Delete"
            show         = { show }    
            handleClose  = { handleClose } 
            handleDelete = { handleDelete }
          />
          <Annoument     titulo       = "Annoument"    
                        mensaje       = "Employee deleted susscesfull ✅ " 
                        smShow        = { smShow }  
                        handleSmClose = { handleSmClose }
          /> 
      </div>
    </Container>    
  )
}

export default ViewerEmployees;