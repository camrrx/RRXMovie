//Stateless Functional Component (scf to create easily the function)
import "./menu.css";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Nav from "react-bootstrap/Nav";

const Menu = () => {
  return (
    <div className="menu">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Collapse>
          <Nav className="navbar navbar-dark bg-dark">
            <NavDropdown title="Menu" id="collasible-nav-dropdown">
              <NavDropdown.Item>Research</NavDropdown.Item>
              <NavDropdown.Item> Movies Tinder</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Menu;
