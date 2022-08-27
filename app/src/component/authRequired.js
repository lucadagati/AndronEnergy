import { useLocation,Navigate,Outlet } from "react-router-dom";
import useAuth from "../context/auth/useAuth";

const AuthRequired=()=>{
    const auth=useAuth();
    const location=useLocation();

    return (
        auth?.auth.accessToken ? 
            (<Outlet/>)
            :
            (<Navigate to="/login"state={{from:location}} replace/>)
    )
}

export default AuthRequired;