export async function get(type){
    const headers = { 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"} 
    const call=await fetch('http://localhost:8060/'+type,headers);
    const body=await call.json();
    if(body.status!==200){
        throw Error(body.message)
    }
    return body;
}

export async function get_data(type,id){
    const call=fetch('http://localhost:8060/+'+type+'/'+id);
    const body=await call.json();

    if(call.status!==200){
        throw Error(body.message)
    }
    return body;
}