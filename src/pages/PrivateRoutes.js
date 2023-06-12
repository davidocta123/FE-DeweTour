import { Outlet, Navigate } from 'react-router-dom';
import { DataContext } from "../context/dataContext";
import { useContext} from "react";

const PrivateRoute = ({element: Component, role, ...rest}) => {
    const {userLogin, adminLogin} = useContext(DataContext);
    
    const User = userLogin
    const Admin = adminLogin
   if (role === "admin" && Admin) {
        return <Outlet />;
      } else if (role === "user" && User) {
        return <Outlet />;
      } else {
        return <Navigate to="/" />;
      }
} 

export default PrivateRoute