import { useEffect } from "react";
import { useState } from "react";
import './showElement.css'
import { get } from "../../api_call/get_api";
import Loading from "../Loading/loading";
import ShowInfo from "./show_info";
import { formatData } from "../../functions/formatData";
import { get_table } from "../table/table";
import { RenderList } from "../table/table";
import useAuth from "../../context/useAuth";
import Error from "../Error/Error";
import { add_elem } from "../../api_call/post_api";



export default function ShowElement(props){
    const [info,setInfo]=useState(false);
    const [table,setTable]=useState();
    const [add,setAdd]=useState(false);
    // eslint-disable-next-line
    const [data,setData]=useState();
    const [loading,setLoading]=useState(false);
    const [error,setError]=useState(false);
    const[comunities,setComunities]=useState();
    const [plants,setPlants]=useState();
    const [pods,setPods]=useState();
    const [render,setRender]=useState(true);
    const auth=useAuth();



    const set_data=(val)=>{

        setInfo(()=>true);
        setAdd(()=>false);
        setRender(()=>false); 
        let res=formatData(val);
        setData(()=>res)
            
    }

    const request=(async(elements)=>{
        let prova; 
        //console.log(auth.auth.accessToken)
        prova=await get(elements,auth.auth.accessToken);
        if(props.type==='userConsumption'){
            if(prova[0]?.status===200){
                let list=prova[0].data.message.map((val)=>val.podId);
                setPods(()=>list)
                get_table(props.type,setTable,set_data,auth.auth.accessToken,setError,list,setLoading);
            }
        }
        else if( prova[0]?.status===200 && prova[1]?.status===200){
            let list=prova[0].data.message.map((val)=>val.comunityId)
            setComunities(()=>list);
            list=prova[1].data.message.map((val)=>val.plantId)
            //console.log(list);
            setPlants(()=>list)
            get_table(props.type,setTable,set_data,auth.auth.accessToken,setError,undefined,setLoading);
        } 
        else{
            setTable(()=>{})
            setError(()=>true)
        } 
            
            
    })

    useEffect(()=>{
           if(props.type==='pod'){   
                request(['comunity','plant']); 
                
           }
           else if(props.type==='userConsumption'){
                request(['pod']);
           }
            else{
                get_table(props.type,setTable,set_data,auth.auth.accessToken,setError,undefined,setLoading);
            }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])

    return (
        
        table && !loading ?(<div className="showElement">
                <h3 style={{textAlign:"center",fontWeight:"300","fontSize": "2.5rem"}}>{props.type.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</h3>
                {render&&<RenderList type={props.type}  funAdd={setAdd} add={add} info={info} result={table} comunities={comunities} plants={plants} pods={pods} setLoading={setLoading}/>}
                {info&&<ShowInfo elem={data} type={props.type} addFunction={add_elem} plants={plants} setInfo={setInfo} setRender={setRender} add={add} info={info} funAdd={setAdd} setLoading={setLoading}/>}    
                </div>)
                :(error ?
                    (<Error/>)
                    :
                    (<Loading type={props.type}/>)
                )
                    
        );
}