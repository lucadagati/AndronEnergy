import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login.css';
import { useState } from 'react';
import { login } from '../../api_call/login_api';

function Login(){

    const [username,setUsername]=useState();
    const [password,setPassword]=useState();


    const handleSubmit=(event)=>{
        event.preventDefault();
        //console.log(username,password)
        login(username,password);
    }


    return (
    <div className="loginContainer">
        <h2 style={{textAlign:'center',marginTop:"10px"}}>Login</h2>
        <div style={{marginTop:"30px"}}>
        <Form onSubmit={handleSubmit}>
      <Form.Group as={Col} className="mb-3" controlId="formPlaintextEmail">
        <Form.Label column sm="12">
          <h4 style={{textAlign:'center'}}>Username</h4>
        </Form.Label>
        <Col sm="10"style={{margin:"auto"}}>
        <Form.Control type="text" placeholder="username" onChange={(event)=>{setUsername(()=>event.target.value)}} />
        </Col>
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
          <h4 style={{textAlign:'center'}}>Password</h4>
        </Form.Label>
        <Col sm="10" style={{margin:"auto"}}>
          <Form.Control type="password" placeholder="Password" onChange={(event)=>{setPassword(()=>event.target.value)}}/>
        </Col>
      </Form.Group>
      <div className="d-grid" style={{width:"70%",margin:"auto",marginTop:"40px"}}>
        <Button  className="btn-secondary"  size="lg" type="submit">
            Login
        </Button>
      </div>
    </Form>
        </div>
    </div>
    )
}

export default Login;