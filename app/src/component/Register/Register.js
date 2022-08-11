import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './Register.css';
import {  useState } from 'react';
import { login } from '../../api_call/login_api';

function Register(){

    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const [error,setError]=useState();
    const handleSubmit=(event)=>{
        event.preventDefault();
        //console.log(username,password)
        
        try{
            login(username,password);

        }
        catch(error){
            if(error.response?.status===400)
                setError(()=>"Errore username o password")
            else if(!error.response){
                setError(()=>"Login fallito");
            }
        }
    }


    return (
    <div className="RegisterContainer">
        <h2 style={{textAlign:'center',marginTop:"10px",fontWeight:"600"}}>Register Admin</h2>
        {error?
            (<div style={{width:"300px",height:"auto",borderRadius:"8px",backgroundColor:"#ffdddd", margin:"auto",marginTop:"10px"}}>
                <p style={{color:"#f44336",textAlign:"center",fontWeight:"900"}}>{error}</p></div>)
            :
            (undefined)}
        <div style={{marginTop:"30px"}}>
        <Form onSubmit={handleSubmit}>
      <Form.Group as={Col} className="mb-3" autoComplete="off" controlId="formPlaintextEmail">
        <Form.Label column sm="12">
          <h4 style={{textAlign:'center'}}>Username</h4>
        </Form.Label>
        <Col sm="10"style={{margin:"auto"}}>
        <Form.Control type="text" placeholder="username" autoComplete="off" required onChange={(event)=>{setUsername(()=>event.target.value)}} />
        </Col>
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
          <h4 style={{textAlign:'center'}}>Password</h4>
        </Form.Label>
        <Col sm="10" style={{margin:"auto"}}>
          <Form.Control type="password" placeholder="Password" autoComplete="off" required onChange={(event)=>{setPassword(()=>event.target.value)}}/>
        </Col>
        
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
          <h4 style={{textAlign:'center'}}>Reinserisci Password</h4>
        </Form.Label>
        <Col sm="10" style={{margin:"auto"}}>
          <Form.Control type="password" placeholder="Reinserisci password" autoComplete="off" required onChange={(event)=>{setPassword(()=>event.target.value)}}/>
        </Col>
        
      </Form.Group>
      <div className="d-grid" style={{width:"70%",margin:"auto",marginTop:"40px"}}>
        <Button  className="btn-secondary"  size="lg" type="submit">
            Registra
        </Button>
      </div>
    </Form>
        </div>
    </div>
    )
}

export default Register;