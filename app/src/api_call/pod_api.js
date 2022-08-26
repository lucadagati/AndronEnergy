
import axios from "./axios";





export async function updatePodPlant(obj,token){
    try{
        let res=await axios.post('podOp/updatePodPlant',JSON.stringify(obj),
        {
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
            withCredentials: true
        });
        //console.log(res);
        return res;
        }

    catch (err) {
        if(err.response?.status===500){
            return {error:"Qualcosa è andato storto"};
        }
        else return {error:err.message};
    }
}


export async function removePlantfromPod(obj,token){
    try{
        console.log(obj)
       let res= await axios.post('podOp/removePlantfromPod',JSON.stringify(obj),
        {
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
            withCredentials: true
        });
        return res;
        //console.log(res);
        }

    catch (err) {
        if(err.response?.status===500){
            return {error:"Qualcosa è andato storto"};
        }
        else return {error:err.message};
    }
}

export async function add_pod(pod_obj,token){

    try{
        axios.post('podOp/Add',JSON.stringify(pod_obj),{
            headers: { 'Authorization': `Bearer ${token}`,'Content-Type': 'application/json' },
            withCredentials: true
        });
    }
    catch(err){
        if(err.response?.status===500){
            return {error:"Qualcosa è andato storto"};
        }
        else return {error:err.message};
    }


}

