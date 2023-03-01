import React from 'react';

import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
} from 'cdbreact';

import { NavLink } from 'react-router-dom';



const Sidebar = () => {

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'scroll initial' }}>
      <CDBSidebar textColor="#fff" backgroundColor="#000080">
        <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
          <NavLink to ="/home" className="text-decoration-none" style={{ color: 'inherit' }}>
            HOME
          </NavLink>
          
        </CDBSidebarHeader>

        <CDBSidebarContent className="sidebar-content">
          <CDBSidebarMenu>
            <NavLink to="viewerusers" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="columns">Users</CDBSidebarMenuItem>
            </NavLink>
            
            <NavLink to="/tables" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="table">Devices</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="viewerClassRooms" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="table">ClassRooms</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="/profile" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="user">Inventary</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="serviceorders" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Service Orders</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="devices" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="chart-line">Reports</CDBSidebarMenuItem>
            </NavLink>

            <NavLink to="settings" activeclassname="activeClicked">
              <CDBSidebarMenuItem icon="exclamation-circle">Settings</CDBSidebarMenuItem>
            </NavLink>
          </CDBSidebarMenu>
        </CDBSidebarContent>

        <CDBSidebarFooter style={{ textAlign: 'center' }}>
          <div
            style={{
              padding: '20px 5px',
            }}
          >
            Sidebar Footer
          </div>
        </CDBSidebarFooter>
      </CDBSidebar>
    
    </div>
    
  );
};

export default Sidebar;
