import axios from "./axios";

export  async function get(endpoints,token){
    /*const headers = { 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"} 
    let res=await axios.get('http://localhost:8060/'+type,headers);
    if(res.response.status!==200){
        throw Error(res.message)
    }
    return res.data;
    */
    let result=[] 
    try{
        for(let i=0;i<endpoints.length;i++){
            result=[...result,await  axios.get(endpoints[i],{headers: { 'Authorization': `Bearer ${token}` ,'Content-Type': 'application/json' },withCredentials: true})];
                
            }
        return result;
        //await  axios.get('http://localhost:8060/'+endpoints).then((res)=>{if(res)console.log(res)})

    } catch (err) {
        // Handle Error Here
        if(err.status===500){
            return {error:err.response.data.message.responses[0].response.message}
        }
        else{
            return {error:err.response.data.error}

        }
    }

}

/*
export async function get_data(type,id){
    const call=fetch('http://localhost:8060/+'+type+'/'+id);
    const body=await call.json();

    if(call.status!==200){
        throw Error(body.message)
    }
    return body;
}
*/