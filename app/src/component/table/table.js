import { get } from "../../api_call/get_api";
import { delete_elem } from "../../api_call/post_api";
import { ReactComponent as Trash} from'../../trash.svg';
import AddElement from "../AddElement/AddElement";
import Table from 'react-bootstrap/Table';


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


export function get_table(type,setTable,set_data,list){
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


        if(!list){
            get(type)
                .then(res=>{
                    let table_fields=res.message.map((val,key)=>{
                        return (
                            <tr key={key}>
                                <td key={key+"name"} style={{"cursor":"pointer"}} onClick={()=>{set_data(val)}}>
                                    {val[type+"Id"]}
                                </td>
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
        else{
            //console.log(list[0])
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
    
}


export function RenderList(props){
    return (
       props.info ?  (<AddElement data={props.data}/>):( <div className='table_styling'>
       {  !props.static?(<Table  bordered hover size="sm">
                <thead>
                    <tr>
                        <th>{props.type} Id</th>
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