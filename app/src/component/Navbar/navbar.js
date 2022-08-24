//import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from "react-bootstrap"
import NavDropdown from 'react-bootstrap/NavDropdown';
import Container from 'react-bootstrap/Container';
import useAuth from '../../context/useAuth';
import { useEffect } from 'react';
import useLogout from '../../functions/logout';

function Navbar_comunita(){
    const auth=useAuth();
    const logout = useLogout();
    useEffect(()=>{},[auth])

  const logoutFunc=async()=>{
    let resp=await logout();
    console.log(resp)
    if(resp.status===204)
        window.location.reload();
    else {
      return ;;//naviga alla pagina di errore
    }
    }
    

    return(

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      {auth?.auth.user?  (<Container>
          <Navbar.Brand >Comunità</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
            <Nav.Link href="/pod">Pod</Nav.Link>
            <Nav.Link href="/comunity">Comunity</Nav.Link>
            <Nav.Link href="/plant">Plant</Nav.Link>
            <Nav.Link href="/user  ">Consumi utenza</Nav.Link>
        </Nav>
      <Nav>
      <NavDropdown title={auth?.auth.user} id="collasible-nav-dropdown">
              <NavDropdown.Item href="/register">Aggiungi admin</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>logoutFunc()}>Logout</NavDropdown.Item>
      </NavDropdown>
     
    </Nav> 
  </Navbar.Collapse>
</Container>):(<Container><Navbar.Brand >Comunità</Navbar.Brand></Container>)}
</Navbar>

    )
}


export default Navbar_comunita;

