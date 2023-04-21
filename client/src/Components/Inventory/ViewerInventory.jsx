import React, { useEffect, useState }     from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link  }     from 'react-router-dom';


import axios from 'axios';
import { useLocalStorage } from '../../js/useLocalStorage';

import DataTable, { createTheme } from 'react-data-table-component';
import Container                  from 'react-bootstrap/Container';
import Button                     from 'react-bootstrap/Button';
import { FcCancel }               from "react-icons/fc";
import { BiEditAlt }              from "react-icons/bi";
import Confirmation               from '../Alerts/Confirmation/Confirmation';
import Annoument                  from '../Alerts/Annoument/Annoument';
/* import EditFormTask               from './EditFormTask/EditFormTask'; */
import { loadAllInventory,load } from '../../redux/Inventory/inventoryReducer';

import moment                     from 'moment';

import { tostada_W } from '../../utils/Tostadas';
import './ViewerInventory.css';



const {REACT_APP_API} = process.env;

function ViewerInventory() {

  const navigate= useNavigate();
  const dispatch = useDispatch();  

  const [listOfInventory, setListOfInventory] = useState(null);
  const [userLogged, setUserLogged] = useLocalStorage('userLogged');

  const [show, setShow]     = useState(false);
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [currentRecord, setcurrentRecord] = useState('');
      
   //----------------------------------------------------------
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
        name: 'DEVICE',
        selector: row => row.device,
        sortable: true,
    },
    {
        name: 'SERIAL',
        selector: row => row.serial,
    },
    {
      name: 'INTERNAL CODE',
      selector: row => row.internalcode,
      sortable: true,
    },
    {
      name: 'TRADE',
      selector: row => row.trade,
      sortable: true,
    },
    {
      name: 'MODEL',
      selector: row => row.model,
      sorteable:true,
    },
    {
      name: 'STATUS',
      selector: row => <Button className = 'btn-sm'
                          onClick  = { ()=>handleResolve(row) } 
                          disabled = { userLogged.typeUser === 'User' ? true: false}
                          variant  = {row.statusTask === 'Completed'       
                                        ? 'success' 
                                        : row.statusTask ==='Required' ? 'primary' 
                                        : row.statusTask ==='Rejected' ? 'danger': 'warning' 
                                      }
                        > 
                          {row.statusTask}  
                        </Button>  
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

const DATA = listOfInventory;
  /* useEffect(() => {
      dispatch(createListClassRooms(userLogged.levelUser));
  },[])
 */
  useEffect(() => {
    dispatch(loadAllInventory(userLogged.levelUser));
},[listOfInventory]);
//*----------------------------------------------------


   //---------------------------------------------------------
  const getAllInventory =async()=> {
    try {
      const response = await axios.get(`${REACT_APP_API}/inventory`, {
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
        setListOfInventory(data);
      }   
    } catch (error) {
      console.log(error.message)
    }
  }

  //-------------------------------------------------------
  async function handleClickDelete() { 
    //primero lo eliminamos de la base de datos
    
    try {
      const response = await axios.delete(`${REACT_APP_API}/inventory/${currentRecord.id}`, {
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
  
        if (response.data === 'RequestDeleted') {
          //lo quitaremos del store
        /*   dispatch(deleteTask(currentRecord.id)); */
          
          setShow(false);
          navigate('/home', { replace: true });
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  
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
  
  const handleShowPreview  = (row) =>  {
    setcurrentRecord(row);
    setShow(true);  
  }
  
  const handleShowEdit  = (row) => {
    setcurrentRecord(row);
    setLgShow(true);   
  };
  
    
  const handleResolve =(row)=> {
    navigate(`/homeresolve/${row.number}`);
  }
  
//----------------------------------------------------------
  useEffect(()=> {  
    getAllInventory();
  },[])

console.log(listOfInventory)
  return (
    <Container className = "container-fluid py-5 mb-2" >
      <DataTable columns      = { columns }  
                 data         = { DATA }  
                 customStyles = {customStyles} 
                  /*  selecttableRows  */
                   fixedHeader 
                   pagination 
                   striped
                   /* theme="solarized" */
      />

      <Confirmation  
        titulo       = "Warning!"     
        mensaje      = "Do you want Delete this Request?"   
        textBtn      = "Delete"
        show         = { show }    
        handleClose  = { handleClose } 
        handleDelete = { handleDelete }
      />
      <Annoument     titulo       = "Annoument"    
                    mensaje       = "Request deleted susscesfull ✅ " 
                    smShow        = { smShow }  
                    handleSmClose = { handleSmClose }
      /> 
      {/* <EditFormTask myTitle        = "Edit Request" 
                    myData         = { currentRecord }    
                    lgShow         = { lgShow }             
                    handleLgClose  = { handleLgClose }     
                    handleLgUpdate = { handleLgUpdate }
      /> */}
    </Container>       
  );
}

export default ViewerInventory;