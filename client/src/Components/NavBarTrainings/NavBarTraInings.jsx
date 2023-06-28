import React           from 'react'
import { NavLink}      from 'react-router-dom';
import { NavDropdown } from 'react-bootstrap';  
import { useDispatch, useSelector }     from 'react-redux';
import  {useLocalStorage } from '../../js/useLocalStorage';
import Container           from 'react-bootstrap/Container';

import 'bootstrap/dist/css/bootstrap.min.css';  
import './NavBarTranings.css';

import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';


export default function NavBarTrainings() {
  const [userLogged, setUserLogged]   = useLocalStorage('userLogged');
        
    
  const dispatch = useDispatch();
     
  return (    
    
      <nav className="navbar fixed-top navbar-light gradientNavBar">
        
          {
                  <NavDropdown
                    id          = "styleLinks"
                    title       = "Trainings"
                    menuVariant = "light"
                    className   = "mx-auto"
                  >
                    <NavLink className = "dropdown-item " to='newtraining'>New Training </NavLink>
                    <NavDropdown.Divider />
                    <NavLink className = "dropdown-item" to='viewertrainings'>Viewer Trainings </NavLink>  
                    <NavDropdown.Divider />
                    <NavLink className = "dropdown-item" to='recordattendance'>Record Attendance </NavLink>  
                    <NavDropdown.Divider />
                    <NavLink className = "dropdown-item" to='/querys'>Viewer Assistance</NavLink>  
                  </NavDropdown>
     
          }
{/* ************************************************************** */}
          {      
                <NavDropdown
                  id          = "styleLinks"
                  title       = "Personal"
                  menuVariant = "light"
                  className   = "mx-auto"
                >
                  <NavLink className = "dropdown-item " to='newemployee'>New Employee </NavLink>
                  <NavDropdown.Divider />
                  <NavLink className = "dropdown-item" to='vieweremployees'>Viewer Employees </NavLink>  
                </NavDropdown>
              
        }

    </nav>    
    
    
  )
}