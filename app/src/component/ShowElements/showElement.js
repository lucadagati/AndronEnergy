import { useEffect } from "react";
import { useState } from "react";
import './showElement.css'
import { get } from "../../api_call/get_api";
import Loading from "../Loading/loading";
//import ShowInfo from "./show_info";
import { formatData } from "../../functions/formatData";
import { get_table } from "../table/table";
import { RenderList } from "../table/table";
import useAuth from "../../context/auth/useAuth";
import Error from "../Error/Error";
//import { add_elem } from "../../api_call/post_api";//potrebbe diventare un hooks
import useGeneral from "../../context/general/useGeneral";
import useSections from "../../context/auth/sectionFlag/useSections";
import GenerateTable from "../GenerateTable/GenerateTable";


export default function ShowElement(props){
    // eslint-disable-next-line
    const [data,setData]=useState();
    const auth=useAuth();
    const general=useGeneral();
    const sections=useSections();
    const [tableElem,setTableElem]=useState();


    const set_data=(val)=>{

        sections.setInfo(()=>true);
        sections.setAdd(()=>false);
        sections.setRender(()=>false); 
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
                general.setPods(()=>list);
                get_table(props.type,general,sections,set_data,auth.auth.accessToken,list);
            }
        }
        else if(props.type!=="plant"&& prova[0]?.status===200 && prova[1]?.status===200){
            let list1=prova[0].data.message.map((val)=>val.comunityId)
            general.setComunities(()=>list1);
            let list2=prova[1].data.message.map((val)=>val.plantId)
            //console.log(list);
            general.setPlants(()=>list2);
            get_table(props.type,general,sections,set_data,auth.auth.accessToken,undefined);
        }
        else if(props.type==="plant" && prova[0]?.status===200 && prova[1]?.status===200){
            let list=prova[1].data.message.map((val)=>val.podId);
            general.setPods(()=>list);
            get_table(props.type,general,sections,set_data,auth.auth.accessToken,undefined);

        }
        else if(props.type!=="comunity"&& prova[0]?.status===200 && prova[1]?.status===200){
            let list=prova[0].data.message.map((val)=>val.podId);
            general.setPods(()=>list);
            let list2=prova[1].data.message.map((val)=>val.plantId)
            general.setUserConsumptions(()=>list2);

        }
        else{
            general.setTable(()=>{})
            sections.setError(()=>true)
        } 
            
            
    })

    useEffect(()=>{
        general.setType(()=>props.type);
        if(props.type==='pod'){   
            request(['comunity','plant']);     
        }
        else if(props.type==='userConsumption'){
            request(['pod']);
        }
        else if(props.type==='plant'){
            request(['plant','pod']);
        }
        else{
            setTableElem(["pod"])
            get_table(props.type,general,sections,set_data,auth.auth.accessToken,undefined);
            
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[props])
    return (
        
        <div className="showElement">
                <h3 style={{textAlign:"center",fontWeight:"300","fontSize": "2.5rem"}}>{props.type.replace(/([A-Z])/g, ' $1').trim().toUpperCase()}</h3>
                {tableElem&&<GenerateTable tableElem={tableElem} type={props.type}/>}
                {/*sections.render&&<RenderList type={props.type}  result={general.table} comunities={general.comunities} plants={general.plants} pods={general.pods} />}
                {
                /*sections.info&&<ShowInfo elem={data} type={props.type} addFunction={add_elem}/>
                */
                
                }    
                </div>)

}