import React               from "react";
import { Routes, Route }   from "react-router-dom" ;
import Login               from './Pages/Login/Login';
import Home                from './Pages/Home/Home';
import NewTask             from './Components/TaskViewer/NewTask/NewTask';
import DashBoard           from './Pages/DashBoard/DashBoard';
import ViewerUsers         from "./Components/Users/ViewerUsers";
import NewUser             from './Components/Users/NewUser/NewUser';
import Devices             from "./Components/Devices/Devices";
import ViewerClassRooms    from "./Components/ClassRooms/ViewerClassRooms/ViewerClassRooms";
import NewClassRoom        from './Components/ClassRooms/NewClassRoom/NewClassRoom';
import PageError404        from "./Pages/PageError404/PageError404";
import HomeResolve         from "./Pages/HomeResolve/HomeResolve";
import Settings            from "./Components/Settings/Settings";
import ServiceOrdersViewer from "./Components/ServiceOrders/ServiceOrdersViewer/ServiceOrdersViewer";
import { ToastContainer }  from 'react-toastify';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/'       exact   element = { <Login/> }/>
        <Route path = '/login'  exact   element = { <Login/> }/>
        <Route path = '/home'        element = { <Home/> } />
        <Route path = '/newtask'     element = { <NewTask/> }/>
        <Route path = '/homeresolve/:number' element = { <HomeResolve/>}/>
          
        <Route path  = 'dashboard/' element  = { <DashBoard/> }>
          <Route path = 'viewerusers'      element = { <ViewerUsers/> }/>  
          <Route path = 'newuser'          element = { <NewUser/>  }/>
          <Route path = 'devices'          element = { <Devices/> }/> 
          <Route path = 'viewerclassrooms' element = { <ViewerClassRooms/> }/>  
          <Route path = 'newclassroom'     element = { <NewClassRoom/>}/>
          <Route path = 'serviceOrders'    element = { <ServiceOrdersViewer/>}/>
          <Route path = "settings"         element = { <Settings/>}/>
        </Route>
      </Routes>  
      <ToastContainer/>
    </div>
  );
}

export default App;