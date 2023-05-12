import React, {useState, useEffect}  from 'react';
import { motion } from 'framer-motion/dist/framer-motion';
import { useDispatch, useSelector }     from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../../js/useLocalStorage';
import { tostada_W } from '../../../utils/Tostadas';

import moment from 'moment';
import DatePicker               from "react-datepicker";

import NavBarTrainings from '../../NavBarTrainings/NavBarTraInings'
 import './NewTraining.css'; 


import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Footer from '../../Footer/Footer';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const {REACT_APP_API} = process.env;

moment.locale('us');


const animations = {
  initial: { opacity: 0, x: 0 },
  animate: { opacity: 1, x: 0 },
  staggerDirection: -1
  
};
const LEVELS = ['PreSchool','Elementary','HighSchool','College', 'Global'];


function NewTraining() {
    const [userLogged, setUserLogged]   = useLocalStorage('userLogged');
    const [disabledAdd, setdisabledAdd] = useState(true);

    const [txttraining      , setTxtTraining]      = useState('');
    const [txtspeaker       , setTxtSpeaker]       = useState('');
    const [txtlevel         , setTxtLevel]         = useState('');
    const [txtdateTraining  , setTxtDateTraining]  = useState('');
    const [txtmode          , setTxtMode]          = useState('');
    const [newDateReview    , setnewDateReview]    = useState('');
    const [isOpenDR         , setIsOpenDR]         = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();



    const handleChangeDateTraining   = (date) => {
        setIsOpenDR(!isOpenDR);
        setTxtDateTraining(date);
      };

      const handleClickDateTraining    = (e) => {
        e.preventDefault();
        setIsOpenDR(!isOpenDR);
      }

    const handleTraining = (e)=> {
        setTxtTraining(e.target.value.toUpperCase());
        validateSubmitButton();
    }

    const handleSpeaker = (e)=> {
        setTxtSpeaker(e.target.value.toUpperCase());
        validateSubmitButton();
    }

    const handleLevel = (e)=> {
        setTxtLevel(e.target.value);
        validateSubmitButton();
    }
    const handleMode = (e)=> {
        setTxtMode(e.target.value);
        e.preventDefault();
        validateSubmitButton();
        if (e.target.value.length >0 && e.target.value !=='') setdisabledAdd(true);
        if (e.target.value.length >0 && e.target.value !=='Choose...') setdisabledAdd(false);
        
    }



    async function sendFormTraining() {
        let id_tmp = uuidv4();

        const newTraining = {
            dateTraining: new Date(),
            training   : txttraining ,
            speaker    : txtspeaker,
            level      : txtlevel,
            mode       : txtmode ,
        }
        try 
          {
            const response = await axios.post(`${REACT_APP_API}/trainings`,newTraining, {
                headers: {
                    "authorization": `Bearer ${userLogged.userToken}`,
                }
                });

            if (response) {
                if (response.data.message==='El token NO es valido!') {
                    navigate('/login' );    
                    tostada_W(response.data.message,"top-center",1500,'dark');
                    return false
                 }

                newTraining.dateTraning = newTraining.dateTraining.toJSON();
                /* dispatch(addTraining(newTraning)); */
            }
          } catch (error) {
                console.log(error.message);
            }    
          navigate('/trainings', { replace: true});
      }


      function handleCloseNewTraining() {
        navigate('/trainings', { replace: true});
    }

      const validateSubmitButton=()=> {
        
        (txttraining.length > 0 
            && txtspeaker.length > 0 
                && txtlevel.length > 0  
                && txtmode.length > 0
                        && txtmode !=='Choose...' ) ? setdisabledAdd(false): setdisabledAdd(true) ;
    } 

    function handleSubmitForm(e) {
        e.preventDefault();
        if (!disabledAdd) {
            if (txtlevel !== 'Choose...' && txtmode !='Choose...') {
                sendFormTraining();
            }
        }
    }
  return (
        <div className="d-flex mt-1 d-md-flex justify-content-center"  id = "containerTraining">
        <motion.div 
                variants = {animations} 
                initial  = "initial" 
                animate  = "animate" 
                exit     = "exit" 
                transition={{ 
                    duration : 0.3,
                    ease: "easeInOut",
                    delay: 0.3,
                }} 
            >
         <Form className="mx-auto "  onSubmit={(e) => handleSubmitForm(e)} id = "formTraining" >   
            <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
                <Col xl = {12} lg = {12} md = {12} sm = {12} xs = {12}  className = "text-center"> 
                    <Form.Group className="mb-3 mx-auto" > 
                        <Form.Label className="text-center">TRAINING</Form.Label>
                        <Form.Control
                            type="text" 
                            name="training" 
                            value = {txttraining} 
                            onChange = { (e) => handleTraining(e)}
                        />
                       
                    </Form.Group> 
                </Col>
            </Row>
            <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
                <Col xl = {11} lg = {11} md = {11} sm = {12} xs = {12}  className = "text-center"> 
                    <Form.Group className="mb-3 mx-auto">
                        <Form.Label>SPEAKER</Form.Label>
                        <Form.Control
                            type="text" 
                            name="speaker" 
                            value = {txtspeaker} 
                            onChange = { (e) => handleSpeaker(e)}
                        />
                    </Form.Group> 
                </Col>
            </Row>
            <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
               <Col xl = {6} lg = {6} md= {6} sm ={12} xs = {12} className = "text-center"> 
                    <Form.Group className="mb-3 mx-auto">
                        <Form.Label>LEVEL</Form.Label>
                        <Form.Select defaultValue="Choose Level..." onChange ={ (e)=> handleLevel(e)}>
                            <option>Choose...</option>
                            <option>{LEVELS[0]}</option>
                            <option>{LEVELS[1]}</option>
                            <option>{LEVELS[2]}</option>
                            <option>{LEVELS[3]}</option>
                            <option>{LEVELS[4]}</option>
                        </Form.Select>
                    </Form.Group> 
                </Col>
            </Row>
            <Row className = "justify-content-center py-2">
                 <Col xl = {8} lg = {8} md = {8} sm = {12} xs = {12} className = "text-center">
                    <Form.Label>TRAINING DATE</Form.Label>
                    <Row className = "justify-content-center py-2">
                        <Col xl = {8} lg = {8} md = {8} sm = {12} xs = {12}  className = "text-center">
                            <button className = {txtdateTraining ? "btn-info" : "btn-light"}
                                     onClick = { (e) => handleClickDateTraining(e) } 
                            > 
                                {txtdateTraining ? moment(txtdateTraining).format("dddd DD/MMMM/YYYY"): 'Training Date...' }
                            </button> 
                            {isOpenDR && (<DatePicker selected={txtdateTraining} onChange={ (date) => handleChangeDateTraining(date)} inline />  )}  
                        </Col>
                    </Row>
                </Col>
                <Col xl = {5} lg = {5} md = {5} sm = {6} xs = {5}  className = "text-center">
                    <Form.Group className="mb-3 mx-auto px-1">
                        <Form.Label>MODE</Form.Label>
                        <Form.Select as ="select" id = "mode" defaultValue="Choose device..." onChange ={ (e)=> handleMode(e)}>
                            <option>Choose...</option>
                            <option>FaceToFace</option>
                            <option>OnLine</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            
            <Row className = "d-md-flex justify-content-center py-2 mb-4">
                 <Col className = "text-center d-md-flex justify-content-around">
                    <Button className  = "mx-2 customButton" variant = "danger" onClick = {handleCloseNewTraining}>Cancel</Button>
                    <Button className  = {"mx-2 customButton " } 
                            type       = "submit" 
                            variant    = "success"
                            disabled   = {disabledAdd} 
                    >
                        Add
                    </Button>

                  </Col>
            </Row>    
        </Form>
        </motion.div>
        </div>
    
  )
}

export default NewTraining