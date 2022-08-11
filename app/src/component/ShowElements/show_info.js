import { useEffect, useState } from "react";
import './show_info.css';
import PlotData from "../plot/plot";
import { RenderList } from "../table/table";
import { capitalize } from "../../functions/formatData";
import { static_table } from "../table/table";
import { ReactComponent as Back} from "../../back.svg";

function ShowInfo(props){
    const [rendering,setRendering]=useState();
    const [plot,setPlot]=useState();



    const go_back=()=>{
        props.setInfo(()=>false);
        props.setRender(()=>true);
    }

    const filter_data=(val)=>{
        let reg1=/Pod|Plant|User/g;
        let reg2=/(Energy)|^[0-9]/g;
        var res1=[];
        var res2=[];
        var res3=[];
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
            else if(val.match(reg1)){
                res3=val;
            }
        })
        return [res1,res2,res3];
    }


    useEffect(()=>{
        if(props.type==='pod'){
            // eslint-disable-next-line
            let [podList,energyData,title]=filter_data(props.elem);
              setRendering(()=><PlotData elem={energyData} type={props.type} title_list={title}/>)
        }
        else if(props.type==='comunity'){
            let elem = props.elem.filter((val)=>Array.isArray(val));
            let prova=static_table(elem[0])
            console.log(prova)
            setRendering(()=><RenderList result={prova} static={1} type={props.type+" pods"}/>)
        }
        else if(props.type==='plant'){
            let [podList,energyData,title]=filter_data(props.elem);
            setPlot(()=><PlotData elem={energyData} type={props.type} title_list={title}/>)
            let prova=static_table(podList)
            setRendering(()=><RenderList result={prova} static={1} type={capitalize(title)+"-Pods"}/>)
        }
        else if(props.type==='userConsumption'){
            // eslint-disable-next-line
            let [podList,energyData,title]=filter_data(props.elem);
            setPlot(()=><PlotData elem={energyData} type={props.type} title_list={title}/>)
       
        }
    },[props.type,props.elem])


    return (

        <div style={{ "backgroundColor": "#f8f9fa"}}>
            <button type="button" onClick={()=>go_back()}className="btn btn-sm" style={{"marginLeft":"15px",width:"60px",height:"60px",color:"gray"}}><Back/></button>

            {plot}
            {rendering}
        </div>
        )
}


export default ShowInfo;