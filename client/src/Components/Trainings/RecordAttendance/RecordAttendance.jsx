import React, { useEffect, useState }     from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate  }     from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';

import { useLocalStorage } from '../../../js/useLocalStorage';
import { tostada_W } from '../../../utils/Tostadas';
import DataTable, { createTheme } from 'react-data-table-component';

import Container     from 'react-bootstrap/Container';
import Button        from 'react-bootstrap/Button';

import Confirmation from '../../Alerts/Confirmation/Confirmation';


import axios from 'axios';
import moment        from 'moment';
import './RecordAttendance.css';

import EditFormTraining from '../EditFormTraining/EditFormTraining';


const {REACT_APP_API} = process.env;

const animations = {
  initial: { opacity: 0, x: 0 },
  animate: { opacity: 1, x: 0 },
  staggerDirection: -1
  
};

function RecordAttendance() {

    const navigate= useNavigate();
    
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
        name     : 'ID',
        selector : row => row.id,
        sortable : true,
        width    : "3rem",
    },
    {
        name: 'TRAINING',
        selector : row => row.training,
        width    : "28rem",
        sortable : true,
    },
    {
      name: 'TRAINING DATE',
      selector : row => moment(row.dateTraining).format('DD/MMMM/YYYY'),
      sortable : true,
      width    : "8rem",
    },
    {
      name  : 'ATTENDANCE',
      width : "10rem",
      cell  : (row) =>(
                      <Button className = 'btn-sm' id = "btn_register"
                        disabled  = { userLogged.typeUser === 'User' ? true: false }
                        
                        variant   = "success"
                        onClick   = { ()=>handleShowPreview(row) } 
                      >Register Attendance
                      </Button>
                   )
    },
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
  

  const handleShowPreview  = (row) =>  {
    setcurrentRecord(row);
    setShow(true);  
  }
  
  const handleShowEdit  = (row) => {
    setcurrentRecord(row);
    setLgShow(true);   
  };

//---------------------------------------------------------





const handleLgClose =()=> {
  setLgShow(false);
}

const handleLgUpdateTraining = ()=> {
  setLgShow(false);
  window.location.reload();
  navigate('/trainings', { replace: true });
}

//----------------------------------------------------------
const DATA = listTrainings;
  useEffect(()=> {  
    getAllTrainings();
  },[])


  return (
    <Container className = "container-fluid optionTrainings">
      <section>
          <motion.div 
                    variants   = {animations} 
                    initial    = "initial" 
                    animate    = "animate" 
                    exit       = "exit" 
                    transition = {{ 
                        duration : 0.3,
                        ease     : "easeInOut",
                        delay    : 0.3,
                    }} 
                >
          <DataTable columns      = { columns }  
                    data          = { DATA ? DATA:'' }  
                    customStyles  = {customStyles} 
                      /*  selecttableRows  */
                      fixedHeader 
                      pagination 
                      striped
                      theme="solarized" 
          />
          
          <EditFormTraining
                        myTitle        = "Edit Training" 
                        myData         = { currentRecord }    
                        lgShow         = { lgShow }             
                        handleLgClose  = { handleLgClose }     
                        handleLgUpdateTraining = { handleLgUpdateTraining }
          /> 
          </motion.div>


      </section>
  </Container>    
  )
}

export default RecordAttendance;