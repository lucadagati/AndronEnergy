import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login.css';
import { useEffect, useState } from 'react';
import { login } from '../../api_call/login_api';
import useAuth from '../../context/useAuth';
import {useLocation, useNavigate } from 'react-router-dom';

function Login(){

    const [username,setUsername]=useState();
    const [password,setPassword]=useState();
    const location = useLocation();
    const navigate=useNavigate();
    const from = location.state?.from?.pathname || "/";
    const {setAuth}=useAuth();
    const [error,setError]=useState();
    const handleSubmit=async(event)=>{
        event.preventDefault();
        //console.log(username,password)
        
        
        const response=await login(username,password);
        console.log(response)
        if(!response.data.error){
          const accessToken=response?.data?.accessToken;
          setAuth({user:username,accessToken});
          setUsername(()=>'');
          setPassword(()=>'');
          if(window.location===from){
                navigate('/pod',{replace:true})
              }
          else navigate(from, { replace: true });
            }
        else setError(()=>response.data.error);

    }

    /*const changePersist=()=>{
        setPersist(prev=>!prev);

        
    }*/
    useEffect(()=>{
        localStorage.setItem("persist", true);
    },[])

    return (
    <div className="loginContainer">
        <h2 style={{textAlign:'center',marginTop:"10px",fontWeight:"600"}}>Login</h2>
        {error?
            (<div style={{width:"300px",height:"auto",borderRadius:"8px",backgroundColor:"#ffdddd", margin:"auto",marginTop:"10px"}}>
                <p style={{color:"#f44336",textAlign:"center",fontWeight:"900"}}>{error}</p></div>)
            :
            (undefined)}
        <div style={{marginTop:"30px"}}>
        <Form onSubmit={handleSubmit}>
      <Form.Group as={Col} className="mb-3" autoComplete="off" controlId="formPlaintextEmail">
        <Form.Label column sm="12">
        <div style={{width:"85%",margin:"auto"}}>
          <h4 style={{position:'relative'}}>Username</h4>
          </div>
        </Form.Label>
        <Col sm="10"style={{margin:"auto"}}>
        <Form.Control type="text" placeholder="username" autoComplete="off" required onChange={(event)=>{setError(()=>'');setUsername(()=>event.target.value)}} />
        </Col>
      </Form.Group>

      <Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
        <Form.Label column sm="12">
          <div style={{width:"85%",margin:"auto"}}>
          <h4 style={{position:"relative"}}>Password</h4>
          </div>
        </Form.Label>
        <Col sm="10" style={{margin:"auto"}}>
          <Form.Control type="password" placeholder="Password" autoComplete="off" required onChange={(event)=>{setError(()=>'');setPassword(()=>event.target.value)}}/>
        </Col>
        
      </Form.Group>
      {/*<Form.Group as={Col} className="mb-3" controlId="formPlaintextPassword">
        <Col style={{marginLeft:"50px"}} >
            <Form.Check
                inline
                label="Fidati del dispositivo"
                name="group1"
                id="persist"
                onChange={changePersist}/>
        </Col>
        </Form.Group>*/}
      <div className="d-grid" style={{width:"70%",margin:"auto",marginTop:"40px"}}>
        <Button  className="btn-secondary"  size="lg" type="submit">
            Entra
        </Button>
      </div>
    </Form>
        </div>
    </div>
    )
}

export default Login;