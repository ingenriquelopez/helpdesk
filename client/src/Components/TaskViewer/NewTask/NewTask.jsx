import React, {useState, useEffect}  from 'react';
import { useDispatch, useSelector }     from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../../../js/useLocalStorage';
import { addTask  } from '../../../redux/tasks/tasksReducer';
import { createListClassRooms } from '../../../redux/classRooms/classRoomsReducer';
import { tostada_W } from '../../../utils/Tostadas';

import  './NewTask.css';

import Form      from 'react-bootstrap/Form';
import Button    from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';

import NavBarHD  from '../../NavBarHD/NavBarHD'; 
import Footer    from '../../Footer/Footer';

import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';


const {REACT_APP_API} = process.env;

moment.locale('us');

export default function NewTask() {
    const { listCR:listOfClassRooms }   = useSelector ( (state) => state.classRooms);
    const [userLogged, setUserLogged]   = useLocalStorage('userLogged');
    const [disabledAdd, setdisabledAdd] = useState(true);
    
    const dispatch = useDispatch();
    const navigate = useNavigate();
        
    //Defino un state Persistente para conservar informacion del form
    const [txtclassroom   , setTxtClassRoom] = useState('');
    const [txtlevel       , setTxtLevel]     = useState('');
    const [txtgyg         , setTxtGyg]       = useState('');
    const [txtteacher     , setTxtTeacher]   = useState('');
    const [txtdevice      , setTxtDevice]    = useState('');
    const [txtproblem     , setTxtProblem]   = useState('');
    
    
    async function sendFormTask() {
        let id_tmp = uuidv4();

        const newTask = {
            id         : id_tmp,
            dateTask   : new Date(),
            classRoom  : txtclassroom ,
            level      : txtlevel,
            gyg        : txtgyg ,
            teacher    : txtteacher   ,
            device     : txtdevice ,
            problem    : txtproblem,
            notes      : '',
            statusTask : 'Required',
        }
        try 
          {
            const response = await axios.post(`${REACT_APP_API}/task`,newTask, {
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

                newTask.dateTask = newTask.dateTask.toJSON();
                dispatch(addTask(newTask));
            }
          } catch (error) {
                console.log(error.message);
            }    
          navigate('/home', { replace: true});
      }
      
    const validateSubmitButton=()=> {
        (txtclassroom.length > 0 
            && txtgyg.length > 0 
                && txtlevel.length > 0  
                    && txtproblem.length > 0 
                        && txtdevice !=='Choose...' ) ? setdisabledAdd(false): setdisabledAdd(true) ;
    } 

    function handleSubmitForm(e) {
        e.preventDefault();
        if (!disabledAdd) {
            if (txtdevice !== 'Choose...') {
                sendFormTask();
            }
        }
    }

    function handleCloseNewTask() {
        navigate('/home', { replace: true});
    }

    function handleClassRoom(e) {  
        let ncr = e.target.value;

        if (ncr!== 'none' && ncr) {
            let listClassRooms = listOfClassRooms.find( (element)=> element.classRoom === ncr);
            setTxtClassRoom(listClassRooms.classRoom);
            setTxtGyg(listClassRooms.gyg);
            setTxtLevel(listClassRooms.level);
        } else {
            setTxtLevel('');
            setTxtGyg('');
        }
        validateSubmitButton();
    }

    
    function handleTeacher(e) {
    setTxtTeacher(e.target.value.toUpperCase());
    validateSubmitButton();
    }

    function handleDevice(e) {
    setTxtDevice(e.target.value);
    validateSubmitButton();
    }
      
    function handleProblem(e) {
    setTxtProblem(e.target.value.toUpperCase());
    validateSubmitButton();
    }


    const  clearForm = ()=> {
    setTxtLevel('');
    setTxtGyg('');
    setTxtTeacher('');
    setTxtDevice('');
    setTxtProblem('');
    }

    useEffect(() => {
        clearForm();
        dispatch(createListClassRooms(userLogged.levelUser));
    },[])


  return (
    <>
    <NavBarHD/>
    <Container className = "container-fluid d-md-flex mt-1 justify-content-center" >
        
        <div className="d-flex mb-0"  id = "containerTask">
         <Form className="mx-auto" onSubmit={(e) => handleSubmitForm(e)} >   
            <Row className = "d-grid d-md-flex justify-content-center py-2 mx-1">
                <Col xl = {4} lg = {4} md = {4} sm  className = "text-center"> 
                    <Form.Group className="mb-3 mx-auto" >
                        <Form.Label className="text-center">ClassRoom</Form.Label>
                        <Form.Select options = {listOfClassRooms} 
                            onChange = { (e)=> handleClassRoom(e) }                               
                        >
                            <option defaultValue = {txtclassroom}></option>
                                      
                           {listOfClassRooms.map( (elemento)=> (  (elemento.level === userLogged.levelUser) || (userLogged.levelUser ==='Absolute') ? <option key={elemento.classRoom} value = {elemento.classRoom}>{elemento.classRoom}</option>
                                     :
                                     null
                                     ))}
                        </Form.Select>
                    </Form.Group>
                </Col>
                
                <Col xl = {4} lg = {4} md = {4} sm  className = "text-center"> 
                    <Form.Group className="mb-3 mx-auto">
                        <Form.Label>GYG</Form.Label>
                        <Form.Control
                            type="text" 
                            name="gyg" 
                            value = {txtgyg}
                            disabled
                            
                        />
                    </Form.Group> 
                </Col>
                
               <Col xl = {4} lg = {4} md= {4} sm  className = "text-center"> 
                    <Form.Group className="mb-3 mx-auto">
                        <Form.Label>LEVEL</Form.Label>
                        <Form.Control 
                            type  = "text" 
                            name  = "level"
                            value = {txtlevel}
                            disabled
                        />
                    </Form.Group> 
                </Col>
            </Row>
            <Row className = "justify-content-center py-2">
                 <Col xl = {4} lg = {4} md = {4} sm  className = "text-center">
                    <Form.Group className="mb-3 mx-auto" >
                         <Form.Label>Teacher</Form.Label>
                         <Form.Control 
                            type = "text" 
                            name="teacher"
                            value = {txtteacher}
                            onChange={(e) => handleTeacher(e)} 
                            placeholder="Enter a teacher"/>
                    </Form.Group>
                </Col>
                <Col xl = {4} lg = {4} md = {4} sm  className = "text-center">
                    <Form.Group className="mb-3 mx-auto">
                        <Form.Label>Device</Form.Label>
                        <Form.Select defaultValue="Choose device..." onChange ={ (e)=> handleDevice(e)}>
                            <option>Choose...</option>
                            <option>Computer</option>
                            <option>Laptop</option>
                            <option>Printer</option>
                            <option>VideoProyector</option>
                            <option>Speakers</option>
                            <option>Camera</option>
                            <option>Other...</option>
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
            <Row className = "justify-content-center py-2">
            <Col xl={7} lg= {7} md={7}   className = "text-center">
                    <Form.Group className="mb-3 mx-auto" >
                        <Form.Label className="mb-3">Problem</Form.Label>
                        <Form.Control 
                            as          = "textarea"  
                            name        = "problem" 
                            value       = {txtproblem}
                            onChange    = { (e) => handleProblem(e) } 
                            placeholder = "write the problem..."/>
                    </Form.Group>
                </Col>
            </Row>
            <Row className = "d-md-flex justify-content-center py-2 mb-4">
                 <Col className = "text-center d-md-flex justify-content-around">
                    <Button className  = "mx-2 customButton" variant = "danger" onClick = {handleCloseNewTask}>Cancel</Button>
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
        </div>
        
        <Footer/> 
    </Container>
    </>

  )
};