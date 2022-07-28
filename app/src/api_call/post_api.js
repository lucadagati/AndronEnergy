export async function add_elem(type,obj){
    const request={
        method:'POST',
        headers: { 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"},
        body:JSON.stringify(obj)
        };
    const call=fetch(`http:://localhost:8060/${type}Op/Add`,request);
    const body=call.json();
    if(call.status!==200){
        throw Error(body.message)
        }
    return body;
}


export async function delete_elem(type,id){
    const headers = { 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"} 
    const call=await fetch(`http://localhost:8060/${type}Op/Delete/`+id,headers);
    const body=await call.json();
    if(call.status!==200){
        throw Error("Something went wrong")
    }
    return body;
    
}