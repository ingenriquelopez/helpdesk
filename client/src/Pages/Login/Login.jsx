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

  function togglePasswordVisibility() {
    
    let passwordInput = document.getElementById("inputPassword");
    let passwordToggle = document.querySelector(".passwordToggle");
  
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      passwordToggle.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
      passwordInput.type = "password";
      passwordToggle.innerHTML = '<i class="fas fa-eye"></i>';
    }
  }
  

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
       <Container fluid className = "Login">
          <Form  id = "loginform" onSubmit = {(e)=>loginSubmit(e)}>
            <img id = "idface"
                  src= {face}
                  alt = {'cybersecurity'}
            />
            <Row>
              <Col>
                <Form.Group className = "mx-auto">
                  <Form.Label className="text-center">Email address</Form.Label>
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
                          < Row className = "rowPassword" > 
                              <Form.Label className="text-center">Password</Form.Label>
                                  <Form.Control 
                                    type={mostrarPass ? 'text' : 'password'}
                                    className   = "password"
                                    id          = "inputPassword"
                                    placeholder = "Password"
                                    onChange    = {(event) => setPassword(event.target.value)}
                                    value       = {password}
                                  />

                                  <span class="passwordToggle" onClick ={()=> togglePasswordVisibility()}>
                                      <i class="fas fa-eye"></i>
                                  </span>
                          </Row>
                        </Form.Group>
                        <small id="passworderror" className="text-danger form-text">
                          {passwordError}
                        </small>
                    </Col>
                </Row>
                <Row>
                  <Form.Group className = "mx-auto">
                    <Button className = "customButton mr-1" variant = "danger">Cancel</Button>
                    <Button className = "customButton ml-1" type ="submit" variant = "success">Login</Button>    
                  </Form.Group>      
                </Row>
                 
            </Form>
        </Container>
  );
}


  export default Login;