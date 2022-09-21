import useGeneral from "../../context/general/useGeneral";
import { useCallback, useEffect } from "react";
import useAuth from "../../context/auth/useAuth";
import { get } from "../../api_call/get_api";
import { ReactComponent as Trash} from'../../trash.svg';
import { useState } from "react";
import Table from 'react-bootstrap/Table';
import { ReactComponent as Add} from'../../add.svg';
import { ReactComponent as Minus} from'../../minus.svg';
import { Form } from "react-bootstrap";

export default function GenerateTable(props){
    
    const auth=useAuth();
    const general=useGeneral();
    const [table,setTable]=useState();

    async function formTable(){
        console.log(props.elem)
        let result=await get(props.tableElem,auth.auth.accessToken);
        console.log(result);
        if(result[0].status===200 ){
            general.setPods(()=>result[0].data.message);           
            let table=[];
            
                var elem=result[0].data.message.map((val,key)=>{
                    return (
                        <tr key={"normal"+key}>
                            {console.log(key)}
                            <td key={"normal"+key+"name"} style={{"cursor":"pointer"}} onClick={()=>{}}>
                                {val[props.tableElem[0]+"Id"]}
                            </td>
                            <td style={{"width":"80px"}} key={key}>
                                <button type="button" onClick={()=>{}}className="btn btn-sm btn-danger" style={{"marginLeft":"15px"}}>
                                    <Trash/>
                                </button>
                            </td>
                        </tr>)
                })
            
            table=[...table,
                (<Table key="feijf" bordered hover size="sm" style={{width:"70%",backgroundColor:"white"}}>
                    <thead>
                        <tr>
                            <th> {props.tableElem[0]} Id</th>
                            {!props.static && <th>Rimuovi</th>}
                        </tr>
                        </thead>
                        <tbody>
                        {elem}
                        </tbody>
                </Table>)
                ]
            
            setTable(()=>table)
        }

    }



    useEffect(()=>{
        formTable();
    },[])

    return (
        <div key="prova"style={{width:"70%",margin:"auto"}}>
            {table?(table):(undefined)}
        </div>
        
    )
}



export  function GenerateUserSpecialTable(props){

    const auth=useAuth();
    const general=useGeneral();
    const [table,setTable]=useState();
    const [podList,setPodList]=useState();
    async function formTable(){

        setPodList(()=>general.pods.map((val)=>val.podId))
        let result=await get(['userConsumption'],auth.auth.accessToken);
        if(result[0].status===200){
            general.setUserConsumptions(()=>result[0].data.message);
            let table=undefined;
            var elem=result[0].data.message.map((val,key)=>{
                return (
                        <tr key={key+"Special"}>
                            <td key={"special"+key+"name"} style={{"cursor":"pointer"}} onClick={()=>{}}>
                                {val["userConsumptionId"]}
                            </td>
                            <td key={"special"+key+"namePod"}>
                            {
                            
                            val['podId']
                                ?
                                (
                                <div className="container" style={{display:"flex",flexDirection:"row",marginLeft:"10px"}}>
                                    <div>
                                        {val['podId']}
                                        <button style={{padding:"0",border:"none",background:"none",marginLeft:"10px"}}type="button"> 
                                            <Minus style={{width:"20px",height:"20px"}}/>
                                        </button>
                                    </div>
                                    <div style={{width:"40%",marginLeft:"10px"}}>
                                    </div>
                                </div>
                                )
                                :
                                (
                                <div className="container" style={{display:"flex",flexDirection:"row"}}>
                                    <div style={{width:"40%"}}>
                                        <Form.Select style={{ fontSize: 12, padding: 6,width:"100%",minWidth:"50px",height:"28px" }} onChange={()=>{}}>
                                            <option value="Seleziona">Seleziona</option>
                                            {podList}
                                        </Form.Select>
                                    </div>
                                    <div style={{marginLeft:"20px",width:"40%"}}>
                                        <button type="button" style={{padding:"0",border:"none",background:"none"}} > 
                                            <Add style={{width:"20px",height:"20px"}}/>
                                        </button>
                                    </div>
                                </div>
                                )
                                
                            }
                            </td>



                            <td style={{"width":"80px"}} key={key+'special_delete_button'}>
                                <button type="button" onClick={()=>{}}className="btn btn-sm btn-danger" style={{"marginLeft":"15px"}}>
                                    <Trash/>
                                </button>
                            </td>
                        </tr>)
                })
            
            table=
                (<Table  bordered hover size="sm" style={{width:"100%",backgroundColor:"white"}}>
                    <thead>
                        <tr>
                            <th>Users Id</th>
                            <th>Pod</th>
                            <th>Remove</th>
                        </tr>
                        </thead>
                        <tbody>
                        {elem}
                        </tbody>
                </Table>);
            
            setTable(()=>table)
        }

    }

    useEffect(()=>{
        formTable();
    },[])

    return(
        <div className="new">
            {table}
        </div>
    )
}


////COME CHIAMARE UNA FUNZIONE ASYNC
export  function GenerateUserSpecialTable(props){

    const [data,setData]=useState();

    const get_data=useCallback( async (params)=>{
        let result=await get(params);
        setData(()=>result)
    });


    useEffect(()=>{
        
        get_data(props.elem)
        
    },[get_data])

return (
    <div>
        <Loading></Loading>
    </div>
    
)
}