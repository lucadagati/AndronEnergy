import { useEffect, useState } from "react";
import './show_info.css';
import PlotData from "../plot/plot";
import { RenderList } from "../table/table";
import { get_table } from "../table/table";

function ShowInfo(props){
    const [rendering,setRendering]=useState();
    const [plot,setPlot]=useState();

    const filter_data=(val)=>{
        let reg1=/Pod/g;
        let reg2=/(Energy)|^[0-9]/g;
        var res1=[];
        var res2=[];
        console.log(val)
        val.forEach((val,key)=>{
            //console.log(val);
            if(Array.isArray(val)){
                val.forEach((val,key)=>{
                    if(val.toString().match(reg2)){
                        //console.log(val)
                        res2=[...res2,val];
                    }
                    else if(val.match(reg1)){
                        console.log(val)
                        res1=[...res1,val]
                    }
                })  
            }
        })
        return [res1,res2];
    }


    useEffect(()=>{
        if(props.type==='pod'){
            setRendering(()=><PlotData elem={props.elem}/>)
        }
        else if(props.type==='comunity'){
            let elem = props.elem.filter((val)=>Array.isArray(val));
            let prova=get_table(props.type,setRendering,undefined,elem[0])
            //console.log(prova)
            setRendering(()=><RenderList result={prova} static={1} type={props.type+" pods"}/>)
        }
        else if(props.type==='plant'){
            let [podList,energyData]=filter_data(props.elem);
            setPlot(()=><PlotData elem={energyData} type={props.type}/>)
            let prova=get_table(props.type,setRendering,undefined,podList)
            setRendering(()=><RenderList result={prova} static={1} type={props.type+" pods"}/>)
        }
    },[props.type,props.elem])


    return (

        <div style={{ "backgroundColor": "#f8f9fa"}}>
            {plot}
            {rendering}
        </div>
        )
}


export default ShowInfo;