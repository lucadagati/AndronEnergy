import Plot from 'react-plotly.js';
import './plot.css';

function PlotData(props){
    return (
        <div className = 'flex'>
        <div className="plot">
        <Plot className="exchanged_plot"
            data={[{x:[1,2,3,4,5,6,7,8],y:[2,3,4,5,6,7,8,9],
            type:'scatter',
            mode: 'lines+markers',
            maker:{color:'#007bff'}
            }]}
            layout={ {width: 620, height: 520, title: props.elem[2]+' Exchanged Energy',font:{family: 'Courier New, monospace',
                size: 15}} }
        />
        </div>
        <div className="plot">
        <Plot className="stored_plot"
            data={[{x:[1,2,3,4,5,6,7,8],y:[2,3,4,5,6,7,8,9],
            type:'scatter',
            mode: 'lines+markers',
            }]}
            layout={ {width: 620, height: 520, title: props.elem[2]+' Stored Energy',font:{family: 'Courier New, monospace',
                size: 15}}}
        />
        </div>
    </div>
    )
}


export default PlotData;