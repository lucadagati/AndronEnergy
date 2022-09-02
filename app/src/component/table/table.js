import { get } from "../../api_call/get_api";
import { delete_elem } from "../../api_call/post_api";
import { ReactComponent as Trash} from'../../trash.svg';
import { ReactComponent as Add} from'../../add.svg';
import { ReactComponent as Minus} from'../../minus.svg';
import AddElement from "../AddElement/AddElement";
import Table from 'react-bootstrap/Table';
import { capitalize } from "../../functions/formatData";
import { removePlantfromPod} from "../../api_call/pod_api";
import { removeUserPod } from "../../api_call/userConsumption_api";
import { Form } from "react-bootstrap";
import { updateUserPod } from "../../api_call/userConsumption_api";
import { add_elem } from "../../api_call/post_api";
import useGeneral from "../../context/general/useGeneral";
import useSections from "../../context/auth/sectionFlag/useSections";

export async function remove_data_from_table(type,id,setFunction,token,sections){
        //setFunction(()=>undefined);
        //console.log(id)
        let body={
        }
        body[type+'Id']=id;
        sections.setLoading(true);
        let result= await delete_elem(type,body,token);
        if(result.status===200){
            window.location.reload();
            }
        else{
            sections.setError(true);
            sections.setErrorMessage(result.error)
            }
        }


export async function get_table(type,general,sections,set_data,token,pods){

        async function updateUser(user){
            console.log(elemSelect)
            let regex=/Pod/g;
            if(elemSelect!==undefined && elemSelect.match(regex)){
                let body={
                    userConsumptionId:user,
                    podId:elemSelect
                }
                //setTable(()=>undefined);
                sections.setLoading(true)
                let result=await updateUserPod(body,token);
                if(result.status===200)
                    window.location.reload();
                //window.location.reload();
                else{
                    sections.setLoading(false);
                    sections.setError(true);
                    sections.setErrorMessage(result.error);
                }
            }
            else return;

        }
        let elemSelect=undefined;
        let getArray=[type];
        if(type==='userConsumption'){
            getArray.push('userConsumption');
        }
        let podsSelect=pods?.map((val)=>{
            return <option key={val} value={val}>{val}</option>
        });
        const search_pattern=(type,elem)=>{
            if(typeof elem=== 'object'&&!Array.isArray(elem) && elem!== null){
                let key=type+'Id';
                //let regex=/Id$/g;
                let res=Object.keys(elem);
                res=res.filter((val)=>val.match(key))
                return res;
            }
            else return elem;
        }
            await get([type],token)
                .then(
                    res=>{
                        if(!res.error){
                            let table_fields=res[0].data.message.map((val,key)=>{
                                return (
                                    <tr key={key}>
                                        <td key={key+"name"} style={{"cursor":"pointer"}} onClick={()=>{set_data(val)}}>
                                            {val[type+"Id"]}
                                        </td>
                                    {type==='userConsumption'? 
                                            (<td key={key+"namePod"}>
                                                    {
                                                    val['podId']
                                                    ?
                                                    (<div className="container" style={{display:"flex",flexDirection:"row",marginLeft:"10px"}}>
                                                        <div>
                                                        {val['podId']}
                                                        <button style={{padding:"0",border:"none",background:"none",marginLeft:"10px"}}type="button" onClick={async()=>{let body={podId:val['podId'],userConsumptionId:val[type+'Id']}
                                                        sections.setLoading(true);
                                                        let result=await removeUserPod(body,token);
                                                        if(result.status===200)
                                                            window.location.reload();
                                                        else{
                                                            sections.setLoading(false);
                                                            sections.setError(true);
                                                            sections.setErrorMessage(result.error);

                                                        }
                                                        //setTable(()=>undefined);
                                                        }}> 
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
                                                            <Form.Select style={{ fontSize: 12, padding: 6,width:"100%",minWidth:"50px",height:"28px" }} onChange={(event)=>{elemSelect=event.target.value}}>
                                                                <option value="Seleziona">Seleziona</option>
                                                                {podsSelect}
                                                            </Form.Select>
                                                        </div>
                                                        <div style={{marginLeft:"20px",width:"40%"}}>
                                                            <button type="button" style={{padding:"0",border:"none",background:"none"}} onClick={()=>{updateUser(val[type+'Id'])}}> 
                                                                <Add style={{width:"20px",height:"20px"}}/>
                                                            </button>
                                                        </div>
                                                    </div>)
                                                    }
                                                </td>):(undefined)
                                        }
                                        <td style={{"width":"80px"}} key={key+'delete_button'}>
                                        <button type="button" onClick={()=>{
                                            let res=search_pattern(type,val); 
                                            if(val[res]){
                                                remove_data_from_table(type,val[res],general.setTable,token,sections)
                                            }
                                            else remove_data_from_table(type,val,general.setTable,token,sections)}}
                                            className="btn btn-sm btn-danger" style={{"marginLeft":"15px"}}>
                                            <Trash/>
                                        </button>
                                        </td>

                                    </tr>
                                    
                                )
                    });
                    general.setTable(()=>table_fields);
                    
            }
            else {sections.setError(true);}
        })
        .catch(err=>console.log(err));
        
    
}
export function static_table(list,remove,title,sections,token,setLoading){
    let table_fields=list.map((val,key)=>{
        return(
            <tr key={key+val}>
                <td key={val}>
                    {val}
                </td>
                {remove?
                (<td style={{"width":"80px"}} key={key+'delete_button'}>
                    <button type="button" className="btn btn-sm btn-danger" onClick={async()=>{
                        if(title) {
                            setLoading(()=>true);
                            let result=await removePlantfromPod({podId:title,plantId:val},token);
                            if(result.status===200)
                                //setError(true);
                                window.location.reload();
                            else{
                                sections.setLoading(false);
                                sections.setError(true);
                                sections.setErrorMessage(result.error);
                            }
                        }    
                        }} style={{"marginLeft":"15px"}}><Trash/></button>
                </td>)
                :
                (undefined)
                }
            </tr>
        )
    })
    return table_fields;
}


export function RenderList(props){
    const sections=useSections();
    const general=useGeneral();
    const addFun=props.addFunction?(props.addFunction):(add_elem);
    return (
       props.info ?  (<AddElement data={props.data} pods={props.pods} addFunction={add_elem} />):(
       <div className='table_styling'  style={{width:"90%",minWidth:"300px",margin:"auto",backgroundColor:"#f8f9fa"}}>
       {  !props.static?(
            
            <Table  bordered hover size="sm" style={{width:"100%",backgroundColor:"white"}}>
                <thead>
                    <tr>
                        <th>{capitalize(props.type.replace(/([A-Z])/g, ' $1').trim())} Id</th>
                        {props.type==='userConsumption'?(<th>{capitalize(props.type.replace(/([A-Z])/g, ' $1').trim())} Pods</th>):(undefined)}
                        {!props.static && <th>Rimuovi {general.type==="userConsumption"?("User"):(undefined)}</th>}
                    </tr>
                </thead>
                <tbody>
                {props.result?(props.result):<tr></tr>}
                </tbody>
            </Table>)
        :
        (<div style={{width:"90%",minWidth:"300px",backgroundColor:"#f8f9fa"}}>
            <Table  bordered  size="sm" style={{width:"100%",backgroundColor:"white",margin:"auto"}}>
                <thead>
                    <tr>
                        <th>{props.type} </th>
                        {!props.static && <th>Rimuovi {general.type==="userConsumption"?(general.type.split(" ")[0]):(undefined)}</th>}
                    </tr>
                </thead>
                <tbody>
                {props.result?(props.result):<tr></tr>}
                </tbody>
            </Table>
        </div>)}

            {!sections.add  && !props.static && <button type="button"className="btn btn-sm btn-primary btn-rounded" style={{"float":"right"}} onClick={()=>sections.setAdd(()=>true)}>Aggiungi</button>}
            {sections.add ? 
                (<div style={{width:"100%",margin:"auto",marginTop:"20px",backgroundColor:"#f8f9fa"}}>
                    <AddElement comunities={props.comunities} pods ={props.pods}  plants={props.plants} type={props.type} addFunction={addFun} /></div>)
                :
                (undefined)}
        </div>)
         

        
        
        ) 
    
}