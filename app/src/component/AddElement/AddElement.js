import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { text_control,select_control } from '../../functions/formControl';
import useAuth from '../../context/auth/useAuth';
import useSections from '../../context/auth/sectionFlag/useSections';
import useGeneral from '../../context/general/useGeneral';

function AddElement(props){
    const [elem,setElem]=useState('');
    const [comunity,setComunity]=useState();
    const [error,setError]=useState(false);
    const [error2,setError2]=useState(false);
    const [error3,setError3]=useState(false);
    const [comunities,setComunities]=useState();
    const [plants,setPlants]=useState();
    const [plant,setPlant]=useState();
    const [pods,setPods]=useState();
    const [pod,setPod]=useState();
    const auth=useAuth();
    const sections=useSections();
    const general=useGeneral();

    const reg=/pod|comunity|plant|user/g

    const add=async()=>{
        let body={}
        body={
                ...(general.type==="userConsumption"&& elem &&{"userConsumptionId":elem}),
                ...(general.type==="pod"&&elem &&{"podId":elem}),
                ...(general.type==="comunity" && elem && {comunityId:elem}),
                ...(comunity && {"comunityId":comunity}),
                ...(plant && {"plantId":plant}),
                ...(pod && {"podId":pod})
            };
        let regex=/Pod[0-9] Plants/g;
        if(general.type.match(regex)){
            let val=general.type.split(' ');
            body['podId']=val[0];
        }
        console.log(body)
        sections.setLoading(true);
        let result=await props.addFunction(body,auth.auth.accessToken,general.type);
        if(result.status===200)
            window.location.reload();

        }

    useEffect(()=>{
        console.log(general.comunities)
        if(props.comunities){
            //console.log(props.data)

            const selection=()=>{
                let comunities=props.comunities.map((val)=>{
                    return <option key={val} value={val}>{val}</option>
                });
                setComunities(()=>comunities);    
            }
            selection();
        }
        if(props.plants){
            //console.log(props.plants)
            let plants=props.plants.map((val)=>{
                return <option key={val} value={val}>{val}</option>
            });
            setPlants(()=>plants);  
        }
        if(props.pods){
            //console.log(props.pods);
            let pods=props.pods.map((val)=>{
                return <option key={val} value={val}>{val}</option>
            });
            setPods(()=>pods)
        }
    },[props.comunities,props.plants,props.pods])

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(elem){
            setElem(()=>elem.charAt(0).toUpperCase() + elem.slice(1));
        }
        let res1=text_control(elem);
        let res2=comunity?(select_control(comunity,"comunity")):("");
        let res3=(plant || pod)?(select_control((plant?(plant):(pod)),(plant?('impianto'):('pod')))):("");
        if(res1.length>0){
            setError(()=>res1);
            return
        }
        if(res2.length>0){
            setError2(()=>res2)
            return
        }
        if(res3.length>0){
            setError3(()=>res3)
            return
        }
        add();
        


    }
    return(
        <div className='form'style={{marginTop:"40px",height:"auto"}} >
            <Form onSubmit={handleSubmit}>

            {props.type.match(reg)?    
                (<Form.Group className="mb-3" controlId="formBasicId">
                <Form.Label>{general.type} Id</Form.Label>
                <Form.Control type="text"style={{ fontSize: 12, padding: 6,width:"100%" }} placeholder="Nome" 
                    onChange={(event)=>{setError('');setElem(()=>event.target.value)}} value={elem}/>
                <p style={{color:"red"}}>{error}</p>    
                </Form.Group>)
            :
                (undefined)
            }
                {comunities  ? 
                    (<Form.Group>
                    <Form.Label>Comunità</Form.Label>
                    <Form.Select aria-label="comunities" style={{ fontSize: 12, padding: 6,width:"100%" }} onChange={(event)=>{setError2("");setComunity(()=>event.target.value)}} className="mb-3">
                        <option value="Seleziona">Seleziona</option>
                        {comunities}
                    </Form.Select>
                    <p style={{color:"red"}}>{error2}</p> 
                    </Form.Group>)
                    :
                    (undefined)}

                {plants  ?
                    (<Form.Group>
                    <Form.Label>Plants</Form.Label>
                    <Form.Select aria-label="plants" style={{ fontSize: 12, padding: 6,width:"100%" }} onChange={(event)=>{setError3("");setPlant(()=>event.target.value)}} className="mb-3">
                        <option value="Seleziona">Seleziona</option>
                        {plants}
                    </Form.Select>
                    <p style={{color:"red"}}>{error3}</p>    
                    </Form.Group>)
                    :
                    (undefined)
                }

                {general.type==='userConsumption' ?
                        (<Form.Group>
                            <Form.Label>Pods</Form.Label>
                            <Form.Select aria-label="pods" style={{ fontSize: 12, padding: 6,width:"100%" }} onChange={(event)=>{setError3("");setPod(()=>event.target.value)}} className="mb-3">
                                <option value="Seleziona">Seleziona</option>
                                {pods}
                            </Form.Select>
                            <p style={{color:"red"}}>{error3}</p>    
                            </Form.Group>)
                    :
                        (undefined)}
            
            <Button variant="primary" style={{"float":"right"}} className="btn btn-sm btn-primary btn-rounded"type="submit" value="Submit">
            Aggiungi
            </Button>
        </Form>
      </div>
    )
}

export default AddElement;