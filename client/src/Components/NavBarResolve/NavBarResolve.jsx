import React from 'react'
import { NavLink} from 'react-router-dom';
import { useLocalStorage } from '../../js/useLocalStorage';
import './NavBarResolve.css';
import userIcon from '../../assets/userIcon.png';

import NavDropdown from 'react-bootstrap/NavDropdown';

export default function NavBarResolve() {
  const [userLogged, setUserLogged] = useLocalStorage('userLogged');

  return (    
    <nav className="navbar fixed-top navbar-light gradientNavBar">
        <div className="container-fluid">
                  <NavDropdown
                    id="nav-dropdown"
                    title={userLogged.levelUser}
                    menuVariant="light"
                  >
            
                    <NavLink className = "dropdown-item " to='/newtask'> New Task </NavLink>
                    <NavDropdown.Divider />
                    <NavLink className = "dropdown-item" to='/querys'> Querys </NavLink>  
                  </NavDropdown>
         
          <NavDropdown
              id="nav-dropdown-Events"
              title="Events"
              menuVariant="light"
            >
              <NavDropdown.Item href="#action/3.2">Reserve</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.1">EventsViewer</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Cancel</NavDropdown.Item>
          </NavDropdown>
          
          <div className = "classUserLogged">
            <img src = {userIcon} id = "userIcon" alt = "UserIcon"/>
            <h6> {userLogged.userName } </h6>  
          </div>
         
        </div>
    </nav>    
  )
}