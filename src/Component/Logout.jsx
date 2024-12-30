import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./stores/Auth";
 const Logout =()=>{
    const {LogoutUser} = useAuth();
    useEffect(()=>{
        LogoutUser();
    },[LogoutUser])
    window.location.href = "/"
    return <Navigate to="/"/>
};
export default Logout;