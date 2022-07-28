import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { add_elem } from '../../api_call/post_api';


function AddElement(props){
    const [elem,setElem]=useState('');
    const [error,setError]=useState(false);


    const add=async()=>{
        props.result_fun(()=>undefined);
        let body={"podId":elem};
        add_elem(props.type,body)
            .then((res)=>{
                if(res)
                    window.location.reload()
                });
    }

    const handleSubmit=(event)=>{
        setElem(()=>elem.charAt(0).toUpperCase() + elem.slice(1));
        event.preventDefault();
        let control=/[.,/#!$%^&*;:{}=\-_`'"~()\s]/g;
        let char_check=/[a-zA-Z]/g;
        let res1=elem.match(control);
        let res2=elem.match(char_check);
        
        if(!elem){
            setError(()=>"Devi inserire un nome identificativo");
        }
        else if(res1){
            setError(()=>"Puoi inserire solo lettere e numeri");

        }
        else if(!res2){
            setError(()=>"Devi inserire delle lettere");
        }
        else{
            add();
        }


    }
    return(
        <div className='form' style={{width:"63%",margin:"auto"}}>
            <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="formBasicId">
            <Form.Label>{props.type} Id</Form.Label>
            <Form.Control type="text"style={{ fontSize: 12, padding: 6,width:"100%" }} placeholder="Nome" 
                onChange={(event)=>setElem(()=>event.target.value)} value={elem}/>
            </Form.Group>
            <p>{error}</p>            
            <Button variant="primary" style={{"float":"right"}} className="btn btn-sm btn-primary btn-rounded"type="submit" value="Submit">
            Aggiungi
            </Button>
        </Form>
      </div>
    )
}

export default AddElement;