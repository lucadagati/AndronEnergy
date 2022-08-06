import { get } from "../../api_call/get_api";
import { delete_elem } from "../../api_call/post_api";
import { ReactComponent as Trash} from'../../trash.svg';
import AddElement from "../AddElement/AddElement";
import Table from 'react-bootstrap/Table';
import { capitalize } from "../../functions/formatData";

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


export async function get_table(type,setTable,set_data){
        //console.log(list)
        const search_pattern=(elem)=>{
            if(typeof elem=== 'object'&&!Array.isArray(elem) && elem!== null){
                let regex=/Id/g;
                let res=Object.keys(elem);
                res=res.filter((val)=>val.match(regex))
                return res;
            }
            else return elem;
        }
            await get([type])
                .then(res=>{console.log(res)
                    let table_fields=res[0].data.message.map((val,key)=>{
                        return (
                            <tr key={key}>
                                <td key={key+"name"} style={{"cursor":"pointer"}} onClick={()=>{set_data(val)}}>
                                    {val[type+"Id"]}
                                </td>
                               {type==='userConsumption'? 
                                    (<td key={key+"namePod"} style={{"cursor":"pointer"}} onClick={()=>{set_data(val)}}>
                                            {val['podId']}
                                        </td>):(undefined)
                                }
                                <td style={{"width":"80px"}} key={key+'delete_button'}>
                                <button type="button" onClick={()=>{let res=search_pattern(val); if(val===res){remove_data_from_table(type,val,setTable)}else remove_data_from_table(type,val[res],setTable)}}className="btn btn-sm btn-danger" style={{"marginLeft":"15px"}}><Trash/></button>
                                </td>
                            </tr>
                            
                        )
                    });
                
                setTable(()=>table_fields);
        })
        .catch(err=>console.log(err));
        
    
}
export function static_table(list){
    let table_fields=list.map((val,key)=>{
        return(
            <tr key={key+val}>
                <td key={val}>
                    {val}
                </td>
            </tr>
        )
    })
    return table_fields;
}


export function RenderList(props){
    return (
       props.info ?  (<AddElement data={props.data}/>):( <div className='table_styling'>
       {  !props.static?(<Table  bordered hover size="sm">
                <thead>
                    <tr>
                        <th>{capitalize(props.type.replace(/([A-Z])/g, ' $1').trim())} Id</th>
                        {props.type==='userConsumption'?(<th>{capitalize(props.type.replace(/([A-Z])/g, ' $1').trim())} Pods</th>):(undefined)}
                        {!props.static && <th>Remove</th>}
                    </tr>
                </thead>
                <tbody>
                {props.result?(props.result):<tr></tr>}
                </tbody>
            </Table>)
        :(<Table  bordered  size="sm">
        <thead>
            <tr>
                <th>{props.type} Id</th>
                {!props.static && <th>Remove</th>}
            </tr>
        </thead>
        <tbody>
        {props.result?(props.result):<tr></tr>}
        </tbody>
    </Table>)}

            {!props.add && !props.info && !props.static && <button type="button"className="btn btn-sm btn-primary btn-rounded" style={{"float":"right"}} onClick={()=>props.funAdd(()=>true)}>Aggiungi</button>}
        </div>)

        
        
        ) 
    
}