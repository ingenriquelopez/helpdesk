import React from 'react'
import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
    var today = new Date();

  return (
    <div className="container" id = "containFooter">
        <footer className="mt-0 footer">
            <ul className="nav">

                 <li className="nav-item "><Link to={"/"} className="nav-link px-2 text-white">Home</Link></li> 
                 <li className="nav-item "><Link to={`/privacy`} className="nav-link px-2 text-white">Privacy Policies</Link></li> 
                 <li className="nav-item "><Link to={`/contact`} className="nav-link px-2 text-white">Contact Us</Link></li> 
                 <li className="nav-item "><Link to={`/developer`} className="nav-link px-2 text-white">Developer</Link></li> 
                 <li className="nav-item "><Link to={`/about`} className="nav-link px-2 text-white">About</Link></li>  
                 <li className="nav-item ">{`© ${today.getFullYear()} Help Desk`}</li>
            </ul>
            
        </footer>
    </div>    
  )
  
}

export default Footer;