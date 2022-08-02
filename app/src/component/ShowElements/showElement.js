import { useEffect } from "react";
import { useState } from "react";
import './showElement.css'
import { get } from "../../api_call/get_api";
import AddElement from "../AddElement/AddElement";
import Loading from "../Loading/loading";
import ShowInfo from "./show_info";
import { formatData } from "../../functions/formatData";
import { get_table } from "../table/table";
import { RenderList } from "../table/table";

export default function ShowElement(props){
    const [info,setInfo]=useState(false);
    const [table,setTable]=useState();
    const [add,setAdd]=useState(false);
    // eslint-disable-next-line
    const [data,setData]=useState();
    const[comunities,setComunities]=useState();
    const [render,setRender]=useState(true);


    const set_data=(val)=>{

        setInfo(()=>true);
        setAdd(()=>false);
        setRender(()=>false); 
        //console.log(val)
        let res=formatData(val);
        setData(()=>res)
            
    }

    useEffect(()=>{
           if(props.type==='pod'){
            get("comunity").then((res)=>{
                if(res){
                    let list=res.message.map((val)=>val.comunityId)
                    setComunities(()=>list);
                    get_table(props.type,setTable,set_data);                    
                    }
                });
           }
            else{
                get_table(props.type,setTable,set_data);
            }

            // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])

    return (
        
        table?(<div className="showElement">
                <h3 style={{textAlign:"center",fontWeight:"300","fontSize": "2.5rem"}}>{props.type.toUpperCase()}</h3>
                {render&&<RenderList type={props.type}  funAdd={setAdd} add={add} info={info} result={table} />}
                {add&&(<AddElement type={props.type} result_fun={setTable} comunities={comunities} />)}
                {info&&<ShowInfo elem={data} type={props.type} info={info}/>}    
                </div>)
                :
                (<Loading type={props.type}/>)
                    
        );
}