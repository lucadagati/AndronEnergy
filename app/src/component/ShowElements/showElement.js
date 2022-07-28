import { useEffect } from "react";
import { useState } from "react";
import Table from 'react-bootstrap/Table';
//import { useNavigate } from "react-router-dom";
import './showElement.css'
import { get } from "../../api_call/get_api";
import { ReactComponent as Trash} from'../../trash.svg';
import { delete_elem } from "../../api_call/post_api";
import AddElement from "../AddElement/AddElement";
import Loading from "../Loading/loading";

function RenderList(props){
    return (
       props.info ?  (<AddElement data={props.data}/>):( <div className='table_styling'>
            <Table  bordered hover size="sm">
                <thead>
                    <tr>
                        <th>{props.type} Id</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                {props.result?(props.result):<tr></tr>}
                </tbody>
            </Table>
            {!props.add && !props.info &&  <button type="button"className="btn btn-sm btn-primary btn-rounded" style={{"float":"right"}} onClick={()=>props.funAdd(()=>true)}>Aggiungi</button>}
        </div>)

        
        
        ) 
    
}

export default function ShowElement(props){
    
    const [info,setInfo]=useState(false);
    const [result,setResult]=useState();
    const [add,setAdd]=useState(false);
    const [data,setData]=useState(); 

    const remove=async(id)=>{
        setResult(()=>undefined);
        delete_elem(props.type,id)
                .then((res)=>{
                    if(res){
                    window.location.reload();
                    }})
        }
    
    useEffect(()=>{
           get(props.type)
            .then(res=>{
                let table_fields=res.message.map((val,key)=>{
                    console.log(key,val)
                    return (
                        <tr key={key}>
                            <td key={key+"name"} style={{"cursor":"pointer"}} onClick={()=>{setInfo(()=>true); setData(()=>val)}}>
                                {val[props.type+"Id"]}
                            </td>
                            <td style={{"width":"80px"}} key={key+'delete_button'}>
                                <button type="button" onClick={()=>{remove(val.podId);}}className="btn btn-sm btn-danger" style={{"marginLeft":"15px"}}><Trash/></button>
                            </td>
                        </tr>
                        
                    )
                });
                setResult(()=>table_fields)})
            .catch(err=>console.log(err));
            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])

    return (
    
        result?(<div className="showElement">
                <h3 style={{textAlign:"center",fontWeight:"300","fontSize": "2.5rem"}}>{props.type.toUpperCase()}</h3>
                <RenderList type={props.type} result={result} funAdd={setAdd} add={add} info={info} data={data}/>
                {add && (<AddElement type={props.type} result_fun={setResult}/>)}    
                </div>)
                :
                (<Loading type={props.type}/>)
                    
        );
}

