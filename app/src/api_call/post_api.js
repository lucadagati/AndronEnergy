import axios from "./axios";

export async function add_elem(obj,token,type){

    try{
        let res=await axios.post(`${type}Op/Add`,JSON.stringify(obj),{
            headers: { 'Authorization': `Bearer ${token}` ,'Content-Type': 'application/json' },
            withCredentials: true
        });
        return res;
    }
    catch (err) {
        if(err.response?.status===500){
            return {error:err.response.data.message.responses[0].response.message};
        }
        else return {error:err.response.data.error};
    }
    
}


export async function delete_elem(type,body,token){
    
    try{
        console.log(body)
        let res=await axios.post(`${type}Op/Delete/`,JSON.stringify(body),
        {
            headers: { 'Authorization': `Bearer ${token}` ,'Content-Type': 'application/json' },
            withCredentials: true
        });
        return res;
    }
    catch (err) {
        if(err.response?.status===500){
            return {error:err.response.data.message.responses[0].response.message};
        }
        else return {error:err.response.data.error};
    }

}


