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
import useAuth from "../../context/useAuth";
import Error from "../Error/Error";


export default function ShowElement(props){
    const [info,setInfo]=useState(false);
    const [table,setTable]=useState();
    const [add,setAdd]=useState(false);
    // eslint-disable-next-line
    const [data,setData]=useState();
    const [error,setError]=useState(false);
    const[comunities,setComunities]=useState();
    const [plants,setPlants]=useState()
    const [render,setRender]=useState(true);
    const auth=useAuth();



    const set_data=(val)=>{

        setInfo(()=>true);
        setAdd(()=>false);
        setRender(()=>false); 
        let res=formatData(val);
        setData(()=>res)
            
    }

    const request=(async()=>{
        let prova; 
        //console.log(auth.auth.accessToken)
        prova=await get(['comunity','plant'],auth.auth.accessToken);
        if( prova[0]?.status===200 && prova[1]?.status===200){
            console.log("qui")
            let list=prova[0].data.message.map((val)=>val.comunityId)
            setComunities(()=>list);
            list=prova[1].data.message.map((val)=>val.plantId)
            console.log(list);
            setPlants(()=>list)
            get_table(props.type,setTable,set_data,auth.auth.accessToken,setError);
        } 
        else{
            setTable(()=>{})
            setError(()=>true)
        } 
            
            
    })

    useEffect(()=>{
           if(props.type==='pod'){   
                request(); 
                
           }
            else{
                get_table(props.type,setTable,set_data,auth.auth.accessToken,setError);
            }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])

    return (
        
        table?(<div className="showElement">
                <h3 style={{textAlign:"center",fontWeight:"300","fontSize": "2.5rem"}}>{props.type.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</h3>
                {render&&<RenderList type={props.type}  funAdd={setAdd} add={add} info={info} result={table} />}
                {add&&(<AddElement type={props.type} result_fun={setTable} comunities={comunities} plants={plants}/>)}
                {info&&<ShowInfo elem={data} type={props.type} setInfo={setInfo} setRender={setRender} info={info}/>}    
                </div>)
                :(error ?
                    (<Error/>)
                    :
                    (<Loading type={props.type}/>)
                )
                    
        );
}