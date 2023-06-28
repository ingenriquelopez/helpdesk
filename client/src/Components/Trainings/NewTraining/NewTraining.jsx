import React, {useState, useEffect}  from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../../js/useLocalStorage';
import { tostada_W } from '../../../utils/Tostadas';

import moment from 'moment';
import DatePicker               from "react-datepicker";

import NavBarTrainings from '../../NavBarTrainings/NavBarTraInings'
import './NewTraining.css'; 


import {FloatingLabel}  from 'react-bootstrap';
import Form           from 'react-bootstrap/Form';
import Button         from 'react-bootstrap/Button';
import Container      from 'react-bootstrap/Container';
import Row            from 'react-bootstrap/Row';
import Col            from 'react-bootstrap/Col';
import Footer         from '../../Footer/Footer';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const {REACT_APP_API} = process.env;

moment.locale('us');


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
    <div className='form-wrapper'>
        <Form className="mx-auto"  onSubmit={(e) => handleSubmitForm(e)} id = "formTraining" >   
            <Container fluid>
                <Form.Group className='mb-3' controlId='formBasicTraining'>
                    <FloatingLabel controlId='trainingLabel' label='Enter Training'>
                        <Form.Control
                            type='training'
                            placeholder='Enter training'
                            required
                            pattern='^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'
                        />
                    </FloatingLabel>
                </Form.Group>

                <Form.Group className="mb-3" controlId ="formBasicSpeaker">
                    <FloatingLabel controlId='speakerLabel' label='Enter Speaker'>
                        <Form.Control
                            type="speaker" 
                            placeholder='Enter training'
                            name="speaker" 
                            required
                            value = {txtspeaker} 
                            onChange = { (e) => handleSpeaker(e)}
                        />
                    </FloatingLabel>
                </Form.Group> 


                <Form.Group className="mb-3" controlId = "formBasicLevel">
                    <FloatingLabel controlId='levelLabel' label='Level'>
                        <Form.Select defaultValue="Choose Level..." onChange ={ (e)=> handleLevel(e)}>
                            <option>Choose...</option>
                            <option>{LEVELS[0]}</option>
                            <option>{LEVELS[1]}</option>
                            <option>{LEVELS[2]}</option>
                            <option>{LEVELS[3]}</option>
                            <option>{LEVELS[4]}</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group> 

                

                <Form.Group className="mb-3" controlId = "formBasicMode">
                   <FloatingLabel controlId='modeLabel' label='mode'>
                        <Form.Select as ="select" id = "mode" defaultValue="Choose device..." onChange ={ (e)=> handleMode(e)}>
                            <option>Choose...</option>
                            <option>FaceToFace</option>
                            <option>OnLine</option>
                        </Form.Select>
                    </FloatingLabel>
                </Form.Group>

                
                <Form.Label className = "d-md-flex justify-content-center"> Date Training</Form.Label>
            
                <Form.Group className = "mb-3 d-md-flex justify-content-center" controlId = "formBasicDate">
                    <button className = {txtdateTraining ? "btn-info" : "btn-light"}
                        onClick = { (e) => handleClickDateTraining(e) } 
                    > 
                        {txtdateTraining ? moment(txtdateTraining).format("dddd DD/MMMM/YYYY"): 'Training Date...' }
                    </button> 
                    {isOpenDR && (<DatePicker selected={txtdateTraining} onChange={ (date) => handleChangeDateTraining(date)} inline />  )}   
                </Form.Group>

                <div className = "text-center d-md-flex justify-content-around">
                        <Button className  = "mx-2 customButton" variant = "danger" onClick = {handleCloseNewTraining}>Cancel</Button>
                        <Button className  = {"mx-2 customButton " } 
                                id = "buttonSubmit"
                                type       = "submit" 
                                variant    = "success"
                                disabled   = {disabledAdd} 
                        >
                            Add
                        </Button>
                </div>
                
                
                

              




      </Container>
    </Form>
  </div>
  )
}

export default NewTraining