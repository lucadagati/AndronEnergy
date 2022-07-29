import { useEffect, useState } from "react";
import './show_info.css';
import PlotData from "../plot/plot";

function ShowInfo(props){

    const [rendering,setRendering]=useState();
    useEffect(()=>{
        if(props.type==='pod'){
            setRendering(()=><PlotData elem={props.elem}/>)
        }
        else if(props.type==='comunity'){
            setRendering(()=><div></div>)
        }
    },[props.type,props.elem])


    return (

        <div style={{ "backgroundColor": "#f8f9fa"}}>
            {rendering}
        </div>
        )
}


export default ShowInfo;