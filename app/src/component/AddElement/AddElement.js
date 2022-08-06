import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
//import { add_elem } from '../../api_call/post_api';
import { text_control,select_control } from '../../functions/formControl';



function AddElement(props){
    const [elem,setElem]=useState('');
    const [comunity,setComunity]=useState();
    const [error,setError]=useState(false);
    const [error2,setError2]=useState(false);
    const [error3,setError3]=useState(false);
    const [comunities,setComunities]=useState();
    const [plants,setPlants]=useState();

    const add=async()=>{
        props.result_fun(()=>undefined);
       /* let body={}

        if (props.type==='pod'){
             body={
                "podId":elem,
                "comunityId":comunity
            };
        }
        else if(props.type==='comunity'){
            body={
                "comunityId":comunity
            };
        }*/
        /*add_elem(props.type,body).then((res)=>{
            if(res)
                window.location.reload();
            })*/

    }

    
    useEffect(()=>{
        if(props.comunities){
            const selection=()=>{
                let comunities=props.comunities.map((val)=>{
                    return <option key={val} value={val}>{val}</option>
                });
                setComunities(()=>comunities);    
            }
            selection();
        }
        if(props.plants){
            let plants=props.plants.map((val)=>{
                return <option key={val} value={val}>{val}</option>
            });
            setPlants(()=>plants);  
        }
    },[props.comunities,props.plants])

    const handleSubmit=(event)=>{
        event.preventDefault();
        if(elem){
            setElem(()=>elem.charAt(0).toUpperCase() + elem.slice(1));
        }
        let res1=text_control(elem);
        let res2=select_control(comunity,"comunity");
        let res3=select_control(plants,'impianto');
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
        <div className='form' style={{width:"63%",margin:"auto"}}>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicId">
            <Form.Label>{props.type} Id</Form.Label>
            <Form.Control type="text"style={{ fontSize: 12, padding: 6,width:"100%" }} placeholder="Nome" 
                onChange={(event)=>{setError('');setElem(()=>event.target.value)}} value={elem}/>
            <p style={{color:"red"}}>{error}</p>    
            </Form.Group>
            {
            props.type==='pod' && comunities && 
                (
                <Form.Group>
                <Form.Label>Comunità</Form.Label>
                <Form.Select aria-label="comunities" style={{ fontSize: 12, padding: 6,width:"100%" }} onChange={(event)=>{setError2("");setComunity(()=>event.target.value)}} className="mb-3">
                    <option value="Seleziona">Seleziona</option>
                    {comunities}
                </Form.Select>
                <p style={{color:"red"}}>{error2}</p>  
                <Form.Label>Plants</Form.Label>
                <Form.Select aria-label="plants" style={{ fontSize: 12, padding: 6,width:"100%" }} onChange={(event)=>{setError3("");setPlants(()=>event.target.value)}} className="mb-3">
                    <option value="Seleziona">Seleziona</option>
                    {plants}
                </Form.Select>
                <p style={{color:"red"}}>{error3}</p>    
                </Form.Group>
                )
            } 
            <Button variant="secondary" style={{"float":"right"}} className="btn btn-sm btn-primary btn-rounded"type="submit" value="Submit">
            Aggiungi
            </Button>
        </Form>
      </div>
    )
}

export default AddElement;