import axios from "axios";

export  async function get(endpoints){
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
            result=[...result,await  axios.get('http://localhost:8060/'+endpoints[i])];
                
            }
        return result;
        //await  axios.get('http://localhost:8060/'+endpoints).then((res)=>{if(res)console.log(res)})

    } catch (err) {
        // Handle Error Here
        console.error(err);
    }

}

export async function get_data(type,id){
    const call=fetch('http://localhost:8060/+'+type+'/'+id);
    const body=await call.json();

    if(call.status!==200){
        throw Error(body.message)
    }
    return body;
}