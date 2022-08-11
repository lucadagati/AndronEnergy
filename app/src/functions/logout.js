import { logout_api } from "../api_call/logout_api";

const useLogout=()=>{

   const logout=async()=>{ 
        let res=await logout_api();
        return res;
    }
    return logout;

}

export default useLogout;