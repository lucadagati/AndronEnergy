
import axios from "./axios";





export async function updatePodPlant(obj){
    try{
        await axios.post('podOp/updatePodPlant',JSON.stringify(obj),
        {
            headers: {'Content-Type': 'application/json' },
            withCredentials: true
        });
        //console.log(res);
        }

    catch (err) {
        if(err.response?.status===500){
            return {error:"Qualcosa è andato storto"};
        }
        else return {error:err.message};
    }
}


export async function removePlantfromPods(obj){
    try{
        await axios.post('podOp/removePlantfromPods',JSON.stringify(obj),
        {
            headers: {'Content-Type': 'application/json' },
            withCredentials: true
        });
        //console.log(res);
        }

    catch (err) {
        if(err.response?.status===500){
            return {error:"Qualcosa è andato storto"};
        }
        else return {error:err.message};
    }
}

export async function add_pod(pod_obj){

    try{
        axios.post('podOp/Add',JSON.stringify(pod_obj),{
            headers: {'Content-Type': 'application/json' },
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

