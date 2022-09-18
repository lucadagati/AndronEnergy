import useGeneral from "../../context/general/useGeneral";
import useSections from "../../context/auth/sectionFlag/useSections";
import { useEffect, useState } from "react";
import { get } from "../../api_call/get_api";
import { Table } from "react-bootstrap";
import useAuth from "../../context/auth/useAuth";
import { ReactComponent as Trash} from'../../trash.svg';
import { ReactComponent as Add} from'../../add.svg';
import { ReactComponent as Minus} from'../../minus.svg';
import { Form } from "react-bootstrap";
import AddElement from "../AddElement/AddElement";
import ShowInfo from "../ShowElements/show_info";

export default function TableCreate(props){
    const sections=useSections();
    const general=useGeneral();
    const auth=useAuth();
    const [info,setInfo]=useState(false);
    const [removeButton,setRemoveButton]=useState(true);


    function enableInfo(){
        //sections.setRender(false);
        props.setInfo(true)
    }

    function generateTableFields(elem, ...args){
        let list=args[1] && args[1].type?(args[1].column.map((val,key)=><option key={key} value={val[args[1].type+'Id']}>{val[args[1].type+'Id']}</option>)):(undefined);
        let table=elem.map((val,key)=>{
            return (
                <tr key={key+val}>
                    <td key={key+"name"} style={{"cursor":"pointer"}} onClick={()=>{setInfo(true)}}>
                        {val[props.table_elem?(props.table_elem+'Id'):(props.type+"Id")]}
                    </td>
                    {
                    list ?
                        (
                        val[args[1].column[0]+'Id'] ?
                            (
                            <td>    
                                <div className="container" style={{display:"flex",flexDirection:"row",marginLeft:"10px"}}>
                                    {val[args[2].column[0]+'Id']}
                                    <button style={{padding:"0",border:"none",background:"none",marginLeft:"10px"}}type="button"> 
                                        <Minus style={{width:"20px",height:"20px"}}/>
                                    </button>
                                </div>
                            </td>
                            )
                            :
                            (
                            <td>
                                <div className="container" style={{display:"flex",flexDirection:"row"}}>
                                    <div style={{width:"40%"}}>
                                        <Form.Select style={{ fontSize: 12, padding: 6,width:"100%",minWidth:"50px",height:"28px" }} >
                                            <option value="Seleziona">Seleziona</option>
                                            {list}
                                        </Form.Select>
                                    </div>
                                    <div style={{marginLeft:"20px",width:"40%"}}>
                                        <button type="button" style={{padding:"0",border:"none",background:"none"}}> 
                                            <Add style={{width:"20px",height:"20px"}}/>
                                        </button>
                                    </div>
                                </div>
                            </td>
                            )
                        )
                        :
                        (undefined)
                    }
                    {
                    args[0].remove===true ?
                        (                                        
                        <td style={{"width":"80px"}} key={key+'delete_button'}>
                            <button type="button" className="btn btn-sm btn-danger" style={{"marginLeft":"15px"}}>
                                <Trash/>
                            </button>
                        </td>
                        )
                        :
                        (undefined)
                    }
                </tr>
            )
        })
        general.setTable(()=>table)
    }

    async function get_data(){
        let res;
        switch(props.type){
            case "pod":
                res=await get(['comunity','plant',"pod"],auth.auth.accessToken);
                if(res[0]?.status===200 && res[1]?.status===200 && res[2]?.status===200){
                    general.setComunities(()=>res[0].data.message);
                    general.setPlants(()=>res[1].data.message);
                    general.setPods(()=>res[2].data.message);
                    general.setAdd_type('plant');
                    generateTableFields(res[2].data.message,{remove:removeButton});

                }
                else{
                    sections.setError(()=>true)
                }break;

            case "plant":
                res=await get(['plant',"pod"],auth.auth.accessToken);
                if( res[0]?.status===200 && res[1]?.status===200){
                    general.setPods(()=>res[1].data.message);
                    general.setPlants(()=>res[0].data.message);
                    generateTableFields(res[0].data.message,{remove:removeButton});

                }
                else{
                    sections.setError(()=>true)
                }break;
            case "userConsumption":
                res=await get(['userConsumption',"pod"],auth.auth.accessToken);
                if( res[0]?.status===200 && res[1]?.status===200){
                    general.setUserConsumptions(()=>res[1].data.message);
                    general.setPods(()=>res[0].data.message);
                    generateTableFields(res[0].data.message,{remove:removeButton},{column:res[1].data.message,type:'pod'});
                }
                else{
                    sections.setError(()=>true)
                }break;
            case "comunity":
                res=await get(['comunity'],auth.auth.accessToken);
                if( res[0]?.status===200){
                    general.setComunities(()=>res[0].data.message);
                    generateTableFields(res[0].data.message,{remove:removeButton});
                }
                else{
                    sections.setError(()=>true)
                }break;

            default:return 0;               
        }
    }

    useEffect(()=>{
        if(props.table_elem){
            let elem=general.hello(props.table_elem)
            generateTableFields(elem,{remove:removeButton});
        }
        else get_data();
        // eslint-disable-next-line
    },[]
    )
    return (

        <div style={{width:"90%",backgroundColor:"#f8f9fa",margin:"auto"}}>
            {!info?
                (<Table bordered hover size="sm" style={{width:"100%",backgroundColor:"white"}}>
                    <thead>
                        <tr>
                            <th>{props.table_elem?(props.table_elem):(props.type)}</th>
                            {props.type==="userConsumption"?(<th>Pod Utenza</th>):(undefined)}
                            <th>Rimuovi</th>
                        </tr>
                    </thead>
                    <tbody>
                    {general.table}
                    </tbody>
                </Table>)
                :
                (<ShowInfo />) }
        </div>
        
        ) 
    
}