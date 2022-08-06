import { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
//import { capitalize } from '../../functions/formatData';
import './plot.css';

function PlotData(props){
    const [plotElem,setPlotElem]=useState({x:[],y:[]});
    const [plot,setPlot]=useState([]);
    useEffect(()=>{
        //setPlotElem(()=>[props.elem])
        //console.log(props.elem)
        prepare_data();
        console.log(props.title_list)
// eslint-disable-next-line
    },[props])




    const prepare_data=()=>{
       let plot=[]
        props.elem.forEach((val,key)=>{
            if(Array.isArray(val)){
                setPlotElem( {x: [...plotElem.x,val[0]] ,y: [...plotElem.y,val[1]]} )
                plot.push( <div className="plot" key={"div"+val[2]}>
                    <Plot className="exchanged_plot" key={key+val[2]}
                        data={[{x:[1,2,3,4,5,6,7,8],y:[2,3,4,5,6,7,8,9],
                        type:'scatter',
                        mode: 'lines+markers',
                        maker:{color:'#007bff'}
                        }]}
                        layout={ {width: 620, height: 520, title: props.title_list+ ' '+val[2].replace(/([A-Z])/g, ' $1').trim(),font:{family: 'Courier New, monospace',
                            size: 15}} }
                    />
                </div>);
                
            }

        })
        setPlot(()=>plot);
    }


    return (
        <div className = 'flex'>
        {plot.map(val=>val)}
    </div>
    )
}


export default PlotData;