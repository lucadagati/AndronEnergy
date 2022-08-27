import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import useRefreshToken from "../../../api_call/refreshToken"
import useAuth from "../../../context/auth/useAuth";

const  PersistantLogin=()=>{

    const refresh=useRefreshToken();
    const [isLoading,setIsLoading]=useState(true);
    const {auth,persist}=useAuth();


    useEffect(()=>{
        let isMounted=true;

        const verifyRefresh=async()=>{
            try{
                await refresh();

            }
            catch(error){
                console.log(error);

            }
            finally{
                isMounted && setIsLoading(false);
            }
        }
        !auth?.accessToken && persist ? verifyRefresh() : setIsLoading(false);

        return () => isMounted = false;
    // eslint-disable-next-line
    },[])


    return (
        <>
        {!persist
        ?
        <Outlet/>
        : isLoading
        ?
        <p>Loading ...</p>
        :
        <Outlet/>
        }

        </>
    )

}


export default PersistantLogin