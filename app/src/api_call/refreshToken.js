import axios from './axios';
import useAuth from '../context/auth/useAuth';


const useRefreshToken=()=>{
    const {setAuth}=useAuth();


    const refresh=async()=>{
        const response=await axios.get('/admin/refreshToken',{
            withCredentials: true
            });
        setAuth(prev=>{
            //console.log(JSON.stringify(prev));
            //console.log(response.data.accessToken);
            return {...prev,accessToken:response.data.accessToken,user:response.data.username}
        })
        return response.data.accessToken;

    }
    return refresh;
}

export default useRefreshToken;
