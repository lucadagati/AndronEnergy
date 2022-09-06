import axios from "./axios";

export async function add_elem(obj,token,type){
    let result=[];
    try{

        if(type==="plant"){
            result=[
                await axios.post(`${type}Op/Add`,JSON.stringify(obj),{
                headers: { 'Authorization': `Bearer ${token}` ,'Content-Type': 'application/json' },
                withCredentials: true
                }),
                await axios.post('podOp/updatePodPlant',JSON.stringify({podId:obj['podId'],plantId:obj['plantId']}),{
                headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
                withCredentials: true
                })
            ] 
        return result;
        }

    else{
        let res=await axios.post(`${type}Op/Add`,JSON.stringify(obj),{
            headers: { 'Authorization': `Bearer ${token}` ,'Content-Type': 'application/json' },
            withCredentials: true
        });
        return res;
    }
    
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
        else {
            let error={}
            if(err.response.data.error){
                error["error"]=err.response.data.error;
            }
            else error["error"]="Errore";
            return error;
        }
    }

}


