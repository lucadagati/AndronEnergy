export async function delete_comunity(id){
    const headers = { 'Content-Type': 'application/json',"Access-Control-Allow-Origin": "*"} 
    const call=await fetch('http://localhost:8060/comunityOp/Delete/'+id,headers);
    const body=await call.json();
    if(call.status!==200){
        throw Error("Something went wrong")
    }
    return body;
    
}