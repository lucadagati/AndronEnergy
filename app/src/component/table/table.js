import { get } from "../../api_call/get_api";
import { delete_elem } from "../../api_call/post_api";
import { ReactComponent as Trash} from'../../trash.svg';
import { ReactComponent as Add} from'../../add.svg';
import AddElement from "../AddElement/AddElement";
import Table from 'react-bootstrap/Table';
import { capitalize } from "../../functions/formatData";
import { useState } from "react";
import { removePlantfromPods } from "../../api_call/pod_api";

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


export async function get_table(type,setTable,set_data,token,setError){
        let getArray=[type];
        if(type==='userConsumption'){
            getArray.push('userConsumption');
        }
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
                        console.log(res)
                        if(!res.error){
                            let table_fields=res[0].data.message.map((val,key)=>{
                                return (
                                    <tr key={key}>
                                        <td key={key+"name"} style={{"cursor":"pointer"}} onClick={()=>{set_data(val)}}>
                                            {val[type+"Id"]}
                                        </td>
                                    {type==='userConsumption'? 
                                            (<td key={key+"namePod"} style={{"cursor":"pointer"}} onClick={()=>{set_data(val)}}>
                                                    {
                                                    val['podId']?(val['podId'])
                                                    :
                                                    (<button type="button" className="btn btn-sm btn-success rounded-circle"> <Add style={{width:"15px",height:"15px"}}/></button>)
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
       props.info ?  (<AddElement data={props.data} pods={props.pods} addFunction={props.addFunction}/>):(
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