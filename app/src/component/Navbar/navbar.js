//import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from "react-bootstrap"
import NavDropdown from 'react-bootstrap/NavDropdown';


function Navbar_comunita(){
    return(
        <Navbar bg="dark" expand='lg' variant="dark">
          <Nav className="me-auto">
            <Nav.Link href="pod">Pod</Nav.Link>
            <Nav.Link href="/comunity">Comunity</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
      </Navbar>
    )
}


export default Navbar_comunita;