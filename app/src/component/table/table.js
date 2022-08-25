import { get } from "../../api_call/get_api";
import { delete_elem } from "../../api_call/post_api";
import { ReactComponent as Trash} from'../../trash.svg';
import { ReactComponent as Add} from'../../add.svg';
import { ReactComponent as Minus} from'../../minus.svg';
import AddElement from "../AddElement/AddElement";
import Table from 'react-bootstrap/Table';
import { capitalize } from "../../functions/formatData";
import { useState } from "react";
import { removePlantfromPods} from "../../api_call/pod_api";
import { removeUserPod } from "../../api_call/userConsumption_api";
import { Form } from "react-bootstrap";
import { updateUserPod } from "../../api_call/userConsumption_api";

export function remove_data_from_table(type,id,setFunction){
        //console.log(type,id)
        setFunction(()=>undefined);
        //console.log(id)
        delete_elem(type,id)
                .then((res)=>{
                    if(res){
                    window.location.reload();
                    }})
        }


export async function get_table(type,setTable,set_data,token,setError,pods,setLoading){

        async function updateUser(user){
            console.log(elemSelect)
            let regex=/Pod/g;
            if(elemSelect!==undefined && elemSelect.match(regex)){
                let body={
                    userConsumptionId:user,
                    podId:elemSelect
                }
                //setTable(()=>undefined);
                setLoading(true)
                let result=await updateUserPod(body,token);
                if(result.status===200)
                    window.location.reload();
                //window.location.reload();
            }
            else return;

        }

        let elemSelect=undefined;
        let getArray=[type];
        if(type==='userConsumption'){
            getArray.push('userConsumption');
        }
        let podsSelect=pods?.map((val)=>{
            return <option key={val} value={val}>{val}</option>
        });
        const search_pattern=(elem)=>{
            if(typeof elem=== 'object'&&!Array.isArray(elem) && elem!== null){
                let regex=/Id/g;
                let res=Object.keys(elem);
                res=res.filter((val)=>val.match(regex))
                return res;
            }
            else return elem;
        }
            await get([type],token)
                .then(
                    res=>{
                        if(!res.error){
                            let table_fields=res[0].data.message.map((val,key)=>{
                                return (
                                    <tr key={key}>
                                        <td key={key+"name"} style={{"cursor":"pointer"}} onClick={()=>{set_data(val)}}>
                                            {val[type+"Id"]}
                                        </td>
                                    {type==='userConsumption'? 
                                            (<td key={key+"namePod"}>
                                                    {
                                                    val['podId']
                                                    ?
                                                    (<div className="container" style={{display:"flex",flexDirection:"row",marginLeft:"10px"}}>
                                                        <div>
                                                        {val['podId']}
                                                        <button style={{padding:"0",border:"none",background:"none",marginLeft:"10px"}}type="button" onClick={async()=>{let body={podId:val['podId'],userConsumptionId:val[type+'Id']}
                                                        setLoading(true);
                                                        let result=await removeUserPod(body,token);
                                                        if(result.status===200)
                                                            window.location.reload();
                                                        //setTable(()=>undefined);
                                                        }}> 
                                                            <Minus style={{width:"20px",height:"20px"}}/>
                                                        </button>
                                                        </div>
                                                        <div style={{width:"40%",marginLeft:"10px"}}>
                                                    
                                                        </div>
                                                    </div>
                                                    )
                                                    :
                                                    (
                                                    <div className="container" style={{display:"flex",flexDirection:"row"}}>
                                                        <div style={{width:"40%"}}>
                                                            <Form.Select style={{ fontSize: 12, padding: 6,width:"100%",height:"28px" }} onChange={(event)=>{elemSelect=event.target.value}}>
                                                                <option value="Seleziona">Seleziona</option>
                                                                {podsSelect}
                                                            </Form.Select>
                                                        </div>
                                                        <div style={{marginLeft:"10px"}}>
                                                            <button type="button" style={{padding:"0",border:"none",background:"none"}} onClick={()=>{updateUser(val[type+'Id'])}}> 
                                                                <Add style={{width:"20px",height:"20px"}}/>
                                                            </button>
                                                        </div>
                                                    </div>)
                                                    }
                                                </td>):(undefined)
                                        }
                                        <td style={{"width":"80px"}} key={key+'delete_button'}>
                                        <button type="button" onClick={()=>{let res=search_pattern(val); if(val===res){remove_data_from_table(type,val,setTable)}else remove_data_from_table(type,val[res],setTable)}}className="btn btn-sm btn-danger" style={{"marginLeft":"15px"}}><Trash/></button>
                                        </td>

                                    </tr>
                                    
                                )
                    });
                
                setTable(()=>table_fields);
            }
            else setError(true)
        })
        .catch(err=>console.log(err));
        
    
}
export function static_table(list,remove,title,setError){
    let table_fields=list.map((val,key)=>{
        return(
            <tr key={key+val}>
                <td key={val}>
                    {val}
                </td>
                {remove?
                (<td style={{"width":"80px"}} key={key+'delete_button'}>
                    <button type="button" className="btn btn-sm btn-danger" onClick={()=>{
                        if(title) {
                            let result=removePlantfromPods({pods:[title],plantId:val})
                            if(result.data.error)
                                setError(true);
                            window.location.reload();
                        }    
                        }} style={{"marginLeft":"15px"}}><Trash/></button>
                </td>)
                :
                (undefined)
                }
            </tr>
        )
    })
    return table_fields;
}


export function RenderList(props){


    const [add,setAdd]=useState(false);

    return (
       props.info ?  (<AddElement data={props.data} pods={props.pods} addFunction={props.addFunction} />):(
       <div className='table_styling'  style={{width:"63%",minWidth:"300px",backgroundColor:"#f8f9fa"}}>
       {  !props.static?(
            
            <Table  bordered hover size="sm" style={{width:"100%",backgroundColor:"white"}}>
                <thead>
                    <tr>
                        <th>{capitalize(props.type.replace(/([A-Z])/g, ' $1').trim())} Id</th>
                        {props.type==='userConsumption'?(<th>{capitalize(props.type.replace(/([A-Z])/g, ' $1').trim())} Pods</th>):(undefined)}
                        {!props.static && <th>Rimuovi</th>}
                    </tr>
                </thead>
                <tbody>
                {props.result?(props.result):<tr></tr>}
                </tbody>
            </Table>)
        :
        (<div style={{backgroundColor:"#f8f9fa"}}>
            <Table  bordered  size="sm">
                <thead>
                    <tr>
                        <th>{props.type} </th>
                        {!props.static && <th>Rimuovi</th>}
                    </tr>
                </thead>
                <tbody>
                {props.result?(props.result):<tr></tr>}
                </tbody>
            </Table>
        </div>)}

            {!add  && !props.static && <button type="button"className="btn btn-sm btn-primary btn-rounded" style={{"float":"right"}} onClick={()=>setAdd(()=>true)}>Aggiungi</button>}
            {add ? 
                (<div style={{width:"100%",margin:"auto",marginTop:"20px",backgroundColor:"#f8f9fa"}}>
                    <AddElement type={props.type} data={props.data} plants={props.plants} comunities={props.comunities} pods ={props.pods} addFunction={props.addFunction} /></div>)
                :
                (undefined)}
        </div>)
         

        
        
        ) 
    
}