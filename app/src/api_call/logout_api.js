import axios from './axios'

export  async function logout_api(){

    try{
        let res=await axios.get('/admin/logout',
            {
                withCredentials: true
            });
        return res;
            }

    catch (err) {
        if(err.response?.status===400)
            return {error:"Qualcosa è andato storto"}
        else if(!err.response){
            return {error:"Login fallito"};
        }
        else if(err.response?.status===401){
            return err.response;
        }
        else return {error:err.message};
}
}