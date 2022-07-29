import { useEffect } from "react";
import { useState } from "react";
import Table from 'react-bootstrap/Table';
import './showElement.css'
import { get } from "../../api_call/get_api";
import { ReactComponent as Trash} from'../../trash.svg';
import { delete_elem } from "../../api_call/post_api";
import AddElement from "../AddElement/AddElement";
import Loading from "../Loading/loading";
import ShowInfo from "./show_info";
import { formatData } from "../../functions/formatData";

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
    // eslint-disable-next-line
    const [data,setData]=useState();
    const[comunities,setComunities]=useState();
    const [render,setRender]=useState(true);

    const remove=async(id)=>{
        setResult(()=>undefined);
        delete_elem(props.type,id)
                .then((res)=>{
                    if(res){
                    window.location.reload();
                    }})
        }
    

    const set_data=(val)=>{

        setInfo(()=>true);
        setAdd(()=>false);
        setRender(()=>false); 
        console.log(val)
        let res=formatData(val);
        setData(()=>res)
            
    }


    
    const get_table=async()=>{
        get(props.type)
        .then(res=>{
            let table_fields=res.message.map((val,key)=>{
                return (
                    <tr key={key}>
                        <td key={key+"name"} style={{"cursor":"pointer"}} onClick={()=>{set_data(val)}}>
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
    }


    
    useEffect(()=>{
           if(props.type==='pod'){
            get("comunity").then((res)=>{
                if(res){
                    let list=res.message.map((val)=>val.comunityId)
                    setComunities(()=>list);
                    get_table();                    
                    }
                });
           }
            else{
                get_table();
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])

    return (
        
        result?(<div className="showElement">
                <h3 style={{textAlign:"center",fontWeight:"300","fontSize": "2.5rem"}}>{props.type.toUpperCase()}</h3>
                {render&&<RenderList type={props.type} result={result} funAdd={setAdd} add={add} info={info} data={data}/>}
                {add&&(<AddElement type={props.type} result_fun={setResult} comunities={comunities}/>)}
                {info&&<ShowInfo elem={data} type={props.type}/>}    
                </div>)
                :
                (<Loading type={props.type}/>)
                    
        );
}

