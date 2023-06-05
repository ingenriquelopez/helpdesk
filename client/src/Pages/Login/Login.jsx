import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { useNavigate }  from 'react-router-dom'
import { useLocalStorage } from '../../js/useLocalStorage';

import "bootstrap/dist/css/bootstrap.min.css";
import Button    from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form      from 'react-bootstrap/Form';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import  './Login.css';
import face from './face-scan.gif';
import axios      from 'axios';
import { setUser } from '../../redux/users/userReducer';

import { superPassword } from '../../js/superPassword';


const { REACT_APP_USERNAME_SUPER_ADMIN,
        REACT_APP_EMAIL_SUPER_ADMIN, 
        REACT_APP_PASSWORD_SUPER_ADMIN, 
        REACT_APP_TYPE_SUPER_ADMIN,
        REACT_APP_LEVEL_SUPER_ADMIN,
        REACT_APP_API,
         } = process.env;



function Login() {
  const dispatch   = useDispatch();
  const navigate   = useNavigate();
  
  const [userLogged    , setUserLogged]    = useLocalStorage('userLogged','');
      
  const [password      , setPassword]      = useState("");
  const [email         , setEmail]         = useState("");
  const [passwordError , setPasswordError] = useState("");
  const [emailError    , setEmailError]    = useState("");


  const [mostrarPass   , setmostrarPass]   = useState(false);

const validUser = async()=> 
{
  //valida primero si es admin
  if (email === REACT_APP_EMAIL_SUPER_ADMIN) {
    if (password === REACT_APP_PASSWORD_SUPER_ADMIN) {
      //-----------if password is correct
      try {
          const responseToken = await axios.get(`${REACT_APP_API}/user/login/gettoken/${email}`);
          if (responseToken) {
            const data = {
              userName  : REACT_APP_USERNAME_SUPER_ADMIN, 
              email     : REACT_APP_EMAIL_SUPER_ADMIN,
              typeUser  : REACT_APP_TYPE_SUPER_ADMIN,
              levelUser : REACT_APP_LEVEL_SUPER_ADMIN,
              userToken : responseToken.data,
            }
  
          dispatch(setUser( data ))
          setUserLogged(data);
          
          console.log(`bienvenido ${userLogged.userName}`);
         
          navigate('/home', {replace: true});
          return true;  
          }
          
      } catch (error) {
           console.log(error.message);
        }
      
    //passworr was correct
    }
  } else 
      {
        try {
          const response = await axios.get(`${REACT_APP_API}/user/login/${email}`);
          const { data } = response;          
        
          if (data!== 'Email not found') {
            let encrypted = data.password;                           
            
            if (password === superPassword(encrypted)) {
              
                try { // si el usuario si es valido entonces 
                  //conseguir el token
                  const responseToken = await axios.get(`${REACT_APP_API}/user/login/gettoken/${email}`);
                  if (responseToken) {
                    //construir el registro ya con el token devuelto
                    const userTmp = {
                      userName  : data.userName,
                      email     : data.email,
                      typeUser  : data.typeUser,
                      levelUser : data.level,
                      userToken : responseToken.data,
                    }
                    dispatch(setUser( userTmp ))
                    setUserLogged(userTmp);
          

                    navigate('/home', { replace: true});
                    return true;
                  } else {
                    console.log('Token no Generado!')
                    return false;
                  }
                  
                } catch (error) {
                  console.log(error.message)
                }
            } else 
                {
                  setPasswordError('Invalid Password!')
                  return false;
                }
          } else 
            {
              setEmailError('Email not found!');
              return false;
            }
        } catch (error) {
            console.log(error.message)
          }
      }
    }



    const handleOjito = ()=> {
      let OJO = document.getElementById('ojito');

      setmostrarPass(!mostrarPass);
      if (mostrarPass) {
        OJO.classList.remove('fa-eye');
        OJO.classList.add('fa-eye-slash');
      } else {
        OJO.classList.remove('fa-eye-slash');
        OJO.classList.add('fa-eye');
        
      }
      
      
    }

  const loginSubmit = (e) => {
    e.preventDefault();
    localStorage.removeItem('txtgyg')
    localStorage.removeItem('txtlevel')
    localStorage.removeItem('txtteacher')
    localStorage.removeItem('txtdevice')
    localStorage.removeItem('txtproblem')
    validUser()
  };

return (  
    <div className= "Login position-relative">
       <Container className = "container-fluid py-5">
        <div> 
            <Form className = "position-absolute top-50 start-50 translate-middle mx-auto" id = "loginform" onSubmit = {(e)=>loginSubmit(e)}>
            <img id = "idface"
          src= {face}
          alt = {'cybersecurity'}
        />
                <Row>
                    <Col>
                        <Form.Group className = "mx-auto">
                            <Row> <Form.Label className="text-center">Email address</Form.Label>  </Row>
                            <Form.Control 
                                type = "email" 
                                id   = "EmailInput"
                                name = "EmailInput"
                                onChange={(event) => setEmail(event.target.value)}
                            />
                        </Form.Group>
                        <small id="emailHelp" className="text-danger form-text">
                            {emailError}
                        </small>
                    </Col>
                </Row>
              
                <Row>
                    <Col>
                        <Form.Group className="mx-auto">
                            <Row> <Form.Label className="text-center">Password</Form.Label>  </Row>
                            <Row > 
                              <div  className = "rowPassword" >
                                <Form.Control 
                                  type={mostrarPass ? 'text' : 'password'}
                                  className   = "password"
                                  id          = "inputPassword"
                                  placeholder = "Password"
                                  onChange    = {(event) => setPassword(event.target.value)}
                                  value       = {password}
                                />
                              </div>
                              <div className = "colOjito">
                                 <i id = "ojito" className = "fa fa-eye-slash" aria-hidden="true" onClick = { (e)=> handleOjito(e) }></i>
                              </div>
                              
                       
                            </Row>
                            

                        </Form.Group>
                        <small id="passworderror" className="text-danger form-text">
                          {passwordError}
                        </small>
                    </Col>
                </Row>
                <Form.Group className = "mx-auto">
                    <Row>
                        <Col>
                          <Button className = "customButton" variant = "danger">Cancel</Button> 
                        </Col>
                        <Col>
                            <Button className = "customButton" type ="submit" variant = "success">Login</Button>
                        </Col>
                    </Row>
                 </Form.Group>      
            </Form>
            </div>
        </Container>
    </div>
  );
}


  export default Login;