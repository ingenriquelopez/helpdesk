import React, { useEffect, useState }     from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate  }     from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';

import { useLocalStorage } from '../../../js/useLocalStorage';
import { tostada_W } from '../../../utils/Tostadas';
import Training from '../Training/Training';
import DataTable, { createTheme } from 'react-data-table-component';

import Container     from 'react-bootstrap/Container';
import Button        from 'react-bootstrap/Button';
import { FcCancel }  from "react-icons/fc";
import { BiEditAlt } from "react-icons/bi";
import Confirmation from '../../Alerts/Confirmation/Confirmation';
import Annoument from '../../Alerts/Annoument/Annoument';

import {loadAllTrainings,deleteTraining} from '../../../redux/trainings/trainingsReducer';

import axios from 'axios';
import moment        from 'moment';
import EditFormTraining from '../EditFormTraining/EditFormTraining';


const {REACT_APP_API} = process.env;

const animations = {
  initial: { opacity: 0, x: 0 },
  animate: { opacity: 1, x: 0 },
  staggerDirection: -1
  
};

function ViewerTrainings() {

    const navigate= useNavigate();
    const dispatch  = useDispatch();
    const { listOfTrainings } = useSelector( state=> state.trainings);

    const [userLogged, setUserLogged] = useLocalStorage('userLogged');
    const [listTrainings, setListTrainings] = useState(null);


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
        name: 'ID',
        selector: row => row.id,
        sortable: true,
        width: "3rem",
    },
    {
        name: 'TRAINING',
        selector: row => row.training,
        width: "28rem",
        sortable: true,
    },
    {
      name: 'SPEAKER',
      selector: row => row.speaker,
      sortable: true,
      width: "27rem",
    },
    {
      name: 'LEVEL',
      selector : row => row.level,
      sortable : true,
      width    : "3 rem",
    },
    {
      name: 'TRAINING DATE',
      selector: row => moment(row.dateTraining).format('DD/MMM/YYYY'),
      sortable: true,
      width: "8rem",
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

  const getAllTrainings =async()=> {
    try {
      const response = await axios.get(`${REACT_APP_API}/trainings`, {
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
        setListTrainings(data);
      }   
    } catch (error) {
      console.log(error.message)
    }
  }

  //-----------------------------------
  async function handleClickDelete() { 
    //primero lo eliminamos de la base de datos
    
    try {
      const response = await axios.delete(`${REACT_APP_API}/trainings/${currentRecord.id}`, {
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
  
        if (response.data === 'TrainingDeleted') {
          //lo quitaremos del store
          dispatch(deleteTraining(currentRecord.id));
          
          setShow(false);
          navigate('/home', { replace: true });
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
const DATA = listOfTrainings;
  useEffect(()=> {  
    getAllTrainings();
  },[])

  useEffect(() => {
    dispatch(loadAllTrainings(userLogged.levelUser));
},[listOfTrainings]);


  return (
    <Container className = "container-fluid py-5">
        <motion.div 
                variants={animations} 
                initial="initial" 
                animate="animate" 
                exit="exit" 
                transition={{ 
                    duration : 0.3,
                    ease: "easeInOut",
                    delay: 0.3,
                }} 
            >
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
        mensaje      = "Do you want Delete this Training?"   
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
      <EditFormTraining
                    myTitle        = "Edit Training" 
                    myData         = { currentRecord }    
                    lgShow         = { lgShow }             
                    handleLgClose  = { handleLgClose }     
                    handleLgUpdate = { handleLgUpdate }
      /> 
      </motion.div>
  </Container>    
  )
}

export default ViewerTrainings