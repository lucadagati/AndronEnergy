import { useEffect, useState } from "react";
import './show_info.css';
import PlotData from "../plot/plot";
import { RenderList } from "../table/table";
import { static_table } from "../table/table";
import { ReactComponent as Back} from "../../back.svg";
import Error from "../Error/Error";
import { updatePodPlant } from "../../api_call/pod_api";
import useAuth from "../../context/auth/useAuth";
import useSections from "../../context/auth/sectionFlag/useSections";
import useGeneral from "../../context/general/useGeneral";

function ShowInfo(props){
    const [rendering,setRendering]=useState();
    const [plot,setPlot]=useState();
    const auth=useAuth()
    const sections=useSections();
    const general=useGeneral();

    const go_back=()=>{
        sections.setInfo(()=>false);
        sections.setRender(()=>true);
        sections.setAdd(()=>false)
    }

    const filter_data=(val)=>{
        let reg1=/Pod|Plant|User|Comunity/g;
        let reg2=/(Energy)|^[0-9]/g;
        var res1=[];
        var res2=[];
        var res3=[];
        //console.log(val)
        val.forEach((val,key)=>{
            //console.log(val);
            if(Array.isArray(val)){
                val.forEach((val,key)=>{
                    if(val.toString().match(reg2)){
                        //console.log(val)
                        res2=[...res2,val];
                    }
                    else if(val.match(reg1)){
                        //console.log(val)
                        res1=[...res1,val]
                    }
                })  
            }
            else if(val.match(reg1)){
                res3=val;
            }
        })
        return [res1,res2,res3];
    }


    useEffect(()=>{
        if(props.type==='pod'){
            // eslint-disable-next-line
            let [plantList,energyData,title]=filter_data(props.elem);
            setPlot(()=><PlotData elem={energyData} type={props.type} title_list={title}/>)
            let table=static_table(plantList,true,title,sections,auth.auth.accessToken,sections.setLoading);
            setRendering(()=><RenderList result={table} static={0}  plants={general.plants} type={title+" Plants"}  addFunction={updatePodPlant}/>)


        }
        else if(props.type==='comunity'){
            // eslint-disable-next-line
            let [podList,energyData,title]=filter_data(props.elem);
            let table=static_table(podList);
            setRendering(()=><RenderList result={table} static={1} type={title+" Pods"}/>)
        }
        else if(props.type==='plant'){
            // eslint-disable-next-line
            let [podList,energyData,title]=filter_data(props.elem);
            setPlot(()=><PlotData elem={energyData} type={props.type} title_list={title}/>)
        }
        else if(props.type==='userConsumption'){
            // eslint-disable-next-line
            let [podList,energyData,title]=filter_data(props.elem);
            console.log(props.elem)
            setPlot(()=><PlotData elem={energyData} type={props.type} title_list={title}/>)

       
        }
        // eslint-disable-next-line
    },[props.type,props.elem])


    return (
        !sections.error ?
            (<div style={{ "backgroundColor": "#f8f9fa"}}>
                <button type="button" onClick={()=>go_back()}className="btn btn-sm" style={{"marginLeft":"10px",width:"50px",height:"50px",color:"gray"}}><Back/></button>
                {rendering}
                {plot}
            </div>)
            :
            (<Error/>)
        )
}


export default ShowInfo;