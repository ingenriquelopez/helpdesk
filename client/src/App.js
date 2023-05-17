import React               from "react";
import { Routes, Route }   from "react-router-dom" ;
import Login               from './Pages/Login/Login';
import Home                from './Pages/Home/Home';
import NewTask             from './Components/TaskViewer/NewTask/NewTask';
import DashBoard           from './Pages/DashBoard/DashBoard';
import ViewerUsers         from "./Components/Users/ViewerUsers";
import NewUser             from './Components/Users/NewUser/NewUser';
import InventoryViewer     from "./Components/Inventory/InventoryViewer";
import ViewerClassRooms    from "./Components/ClassRooms/ViewerClassRooms/ViewerClassRooms";
import NewClassRoom        from './Components/ClassRooms/NewClassRoom/NewClassRoom';
import NewDeviceInventory from "./Components/Inventory/NewDeviceInventory/NewDeviceInventory";
import PageError404        from "./Pages/PageError404/PageError404";
import HomeResolve         from "./Pages/HomeResolve/HomeResolve";
import Settings            from "./Components/Settings/Settings";
import ServiceOrdersViewer from "./Components/ServiceOrders/ServiceOrdersViewer/ServiceOrdersViewer";
import { ToastContainer }  from 'react-toastify';
import './App.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import "react-toastify/dist/ReactToastify.css";
import HomeTrainings from "./Pages/HomeTrainings/HomeTrainings";
import NewTraining from "./Components/Trainings/NewTraining/NewTraining";
import ViewerTrainings from './Components/Trainings/ViewerTrainings/ViewerTrainings';
import NewEmployee from "./Components/Employees/NewEmployee/NewEmployee";
import ViewerEmployees from './Components/Employees/ViewerEmployees/ViewerEmployees';
import RecordAttendance from "./Components/Trainings/RecordAttendance/RecordAttendance";



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path = '/'       exact   element = { <Login/> }/>
        <Route path = '/login'  exact   element = { <Login/> }/>
        <Route path = '/home'        element = { <Home/> } />
        <Route path = '/newtask'     element = { <NewTask/> }/>
        <Route path = '/homeresolve/:number' element = { <HomeResolve/>}/>

        <Route path  = '/trainings/'          element  = { <HomeTrainings/> }>
          <Route path = 'newtraining'            element = { <NewTraining/>  }/>  
          <Route path = 'viewertrainings'         element = { <ViewerTrainings/> }/>  
          <Route path = 'recordattendance'        element = { <RecordAttendance/> }/>  
          
          <Route path = 'newemployee'            element = { <NewEmployee/> }/>
          <Route path = 'vieweremployees'        element = { <ViewerEmployees/> }/>  
        </Route>

        <Route path  = 'dashboard/'          element  = { <DashBoard/> }>
          <Route path = 'viewerusers'        element = { <ViewerUsers/> }/>  
          <Route path = 'newuser'            element = { <NewUser/>  }/>
          <Route path = 'viewerclassrooms'   element = { <ViewerClassRooms/> }/>  
          <Route path = 'newclassroom'       element = { <NewClassRoom/>}/>
          
          <Route path = 'viewerinventory'    element = { <InventoryViewer/> }/> 
          <Route path = 'newdeviceinventory' element = { <NewDeviceInventory/>}/>
          
          <Route path = 'serviceOrders'      element = { <ServiceOrdersViewer/>}/>
          <Route path = "settings"           element = { <Settings/>}/>
        </Route>
      </Routes>  
      <ToastContainer/>
    </div>
  );
}

export default App;