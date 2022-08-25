import axios from "./axios";

export async function add_elem(type,obj,token){

    try{
        await fetch(`http://localhost:8060/${type}Op/Add`,JSON.stringify(obj),{
            headers: { 'Authorization': `Bearer ${token}` ,'Content-Type': 'application/json' },
            withCredentials: true
        });
    }
    catch (err) {
        if(err.response?.status===500){
            return {error:"Qualcosa è andato storto"};
        }
        else return {error:err.message};
    }
    
}


export async function delete_elem(type,id,token){
    
    try{
        await axios.post(`${type}Op/Delete/`+id,
        {
            headers: { 'Authorization': `Bearer ${token}` ,'Content-Type': 'application/json' },
            withCredentials: true
        });
    }
    catch (err) {
        if(err.response?.status===500){
            return {error:"Qualcosa è andato storto"};
        }
        else return {error:err.message};
    }

}


