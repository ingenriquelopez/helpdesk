import React from 'react'
import { Link } from "react-router-dom";
import './Footer.css';

function Footer() {
    var today = new Date();

  return (
    <div className="container" id = "containFooter">
        <footer className="py-1 mt-0">
            <ul className="nav justify-content-center pb-1">
                   
                <li className="nav-item "><Link to={"/"} className="nav-link px-2 text-white">Home</Link></li>
                <li className="nav-item "><Link to={`/privacy`} className="nav-link px-2 text-white">Privacy Policies</Link></li>
                <li className="nav-item "><Link to={`/contact`} className="nav-link px-2 text-white">Contact Us</Link></li>
                <li className="nav-item "><Link to={`/developer`} className="nav-link px-2 text-white">Developer</Link></li>
                <li className="nav-item "><Link to={`/about`} className="nav-link px-2 text-white">About</Link></li> 
            </ul>
            <p className="text-center text-white">{`© ${today.getFullYear()} Help Desk`}</p>
        </footer>
    </div>    
  )
  
}

export default Footer;