import axios from "./axios";


export  async function removeUserPod(body,token){
 
    try{
        console.log(body)
        let res=await axios.post('userConsumptionOp/DeletePodFromUser',JSON.stringify(body),
        {
            headers: { 'Authorization': `Bearer ${token}` ,'Content-Type': 'application/json' },
            withCredentials: true
        });
        console.log(res);
        return res;
            }

    catch (err){
        if(err.response?.status===500){
            return {error:err.response.data.message.responses[0].response.message};
        }
        else return {error:err.response.data.error};
    }
}

export  async function updateUserPod(body,token){
 
    try{
        let res=await axios.post('userConsumptionOp/UpdateUserPod',JSON.stringify(body),
        {
            headers: { 'Authorization': `Bearer ${token}` ,'Content-Type': 'application/json' },
            withCredentials: true
        });
        return res;
    }

    catch (err){
        if(err.response?.status===500){
            return {error:err.response.data.message.responses[0].response.message};
        }
        else return {error:err.response.data.error};
    }
}