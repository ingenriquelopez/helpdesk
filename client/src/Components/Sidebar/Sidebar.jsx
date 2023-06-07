import React, { useState } from 'react';
import './Sidebar.css'; // Archivo de estilos personalizados
import {NavLink } from 'react-router-dom';




const Sidebar = () => {
  return (
    
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
            <nav className="main-menu">
                <ul>
                    <li>
                        {/* <a href="https://jbfarrow.com"> */}
                        <NavLink to ="/home" className="text-decoration-none" style={{ color: '#999' }}>
                            <i className="fa fa-home fa-2x"></i>
                            <span className="nav-text">
                            HOME
                            </span>
                        </NavLink>
                        {/* </a> */}
                    
                    </li>
                    <li className="has-subnav">
                        <NavLink to="viewerusers" activeclassname="activeClicked">
                            <i className="fa fa-globe fa-2x"></i>
                            <span className="nav-text">
                                Users
                            </span>
                        </NavLink>
                        
                    </li>
                    <li className="has-subnav">
                        <NavLink to="viewerclassrooms" activeclassname="activeClicked">
                            <i className="fa fa-comments fa-2x"></i>
                                <span className="nav-text">
                                    ClassRooms
                                </span>
                        </NavLink>
                        
                    </li>
                    <li className="has-subnav">
                        <NavLink to="viewerinventory" activeclassname="activeClicked">
                            <i className="fa fa-camera-retro fa-2x"></i>
                                <span className="nav-text">
                                    Inventory
                                </span>
                        </NavLink>
                    
                    </li>
                    <li>
                        <NavLink to="serviceorders" activeclassname="activeClicked">
                            <i className="fa fa-film fa-2x"></i>
                            <span className="nav-text">
                                Service Orders
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="reportes" activeclassname="activeClicked">
                            <i className="fa fa-book fa-2x"></i>
                            <span className="nav-text">
                            Reports
                            </span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="settings" activeclassname="activeClicked">
                            <i className="fa fa-cogs fa-2x"></i>
                                <span className="nav-text">
                                    Settings
                                </span>
                        </NavLink>
                    </li>
                    <li>
                    <a href="#">
                            <i className="fa fa-map-marker fa-2x"></i>
                            <span className="nav-text">
                                Member Map
                            </span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                        <i className="fa fa-info fa-2x"></i>
                            <span className="nav-text">
                                Documentation
                            </span>
                        </a>
                    </li>
                </ul>

                <ul className="logout">
                    <li>
                    <a href="#">
                            <i className="fa fa-power-off fa-2x"></i>
                            <span className="nav-text">
                                Logout
                            </span>
                        </a>
                    </li>  
                </ul>
            </nav>
           
            
        
    </div>
  );
};

export default Sidebar;
