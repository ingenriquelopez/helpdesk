import React               from 'react'
import { useSelector }     from 'react-redux';
import { Link, NavLink}    from 'react-router-dom';
import { useLocalStorage } from '../../js/useLocalStorage';

import NavDropdown from 'react-bootstrap/NavDropdown';
import userIcon    from '../../assets/userIcon.png';
import ButtonBack  from '../Buttons/ButtonBack/ButtonBack';
import './NavBarHD.css';

export default function NavBarHD( { buttonEnabled }) {
  const { listCR }  = useSelector ( (state) => state.classRooms);
  const [userLogged, setUserLogged] = useLocalStorage('userLogged');
  
  
  return (    
    <nav className="navbar fixed-top navbar-light gradientNavBar">
        <div className="container-fluid">
          <div>
            <ButtonBack enabled = {buttonEnabled}/>
          </div>
          {
                (listCR.length > 0) 
                ? 
                  <NavDropdown
                    id          = "styleLinks"
                    title       = {userLogged.levelUser}
                    menuVariant = "light"
                  >
            
                    <NavLink className = "dropdown-item " to='/newtask'> New Task </NavLink>
                    <NavDropdown.Divider />
                    <NavLink className = "dropdown-item" to='/querys'> Querys </NavLink>  
                  </NavDropdown>
                : null
          }

          {
              (userLogged.typeUser.includes('Admin') || userLogged.typeUser.includes('superAdmin') ||  userLogged.typeUser.includes('superUser'))
              ?
                (<Link className = "navbar-brand fs-6" to = "/trainings" id = "styleLinks">Trainings <i className='bx bxs-right-arrow-alt bx-fade-right-hover'></i></Link>)
                : null    
            }  
        
          {
              (userLogged.typeUser.includes('Admin') || userLogged.typeUser.includes('superAdmin'))
              ?
                (<Link className = "navbar-brand fs-6" to = "/dashboard" id = "styleLinks">DashBoard <i className='bx bxs-right-arrow-alt bx-fade-right-hover'></i></Link>)
                : null    
            }  
          <div className = "classUserLogged">
            <img src = {userIcon} id = "userIcon" alt = "UserIcon"/>
            <h6> {userLogged.userName } </h6>    
          </div>  
        </div>    
    </nav>    
  )
}