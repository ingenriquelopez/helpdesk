import { Route, Redirect } from "react-router-dom";
import { useContext } from 'react';
import UserContext from "../../context/UserContext";

export default function PrivateRoute( { component: Component,...rest } ) {
  const { userLogged } = useContext(UserContext); 
  console.log(userLogged)
  return (
    <Route { ...rest }>
      { userLogged.typeUser !== 'guest' ? <Component/> 
             :
               <Redirect to = "/"/>
      }
    </Route>

  );
}

