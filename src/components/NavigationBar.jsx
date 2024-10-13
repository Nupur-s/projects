import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function NavigationBar(){

    function handleClick(){
        localStorage.setItem("admin",false);
        localStorage.setItem("authenticated",false);
    }
    return(<>
        <Navbar bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand >Inventory-Management</Navbar.Brand>
                    <Nav className="ml-auto">
                        <Nav.Link href="/inventory">Inventory</Nav.Link>
                        <Nav.Link href="/buy">Sell</Nav.Link>
                        <Nav.Link href="/" onClick={handleClick} >Logout</Nav.Link>
                    </Nav>
            </Container>
      </Navbar>
    </>);
}

export default NavigationBar;