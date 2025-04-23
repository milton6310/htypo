import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

function Header() {
    const expand = "typo";

    return (
        <header>
            <Navbar key={expand} expand={expand}>
                <Container fluid>
                    <Navbar.Brand href="/">Hangul Typo</Navbar.Brand>
                    <Navbar.Toggle aria-controls={`navbar-${expand}`} />
                    <Navbar.Offcanvas
                        id={`navbar-${expand}`}
                        aria-labelledby={`navbarLabel-${expand}`}
                        placement="end"
                    >
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title id={`navbarLabel-${expand}`}>
                                Routes
                            </Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Nav className="justify-content-end flex-grow-1 pe-3">
                                <Nav.Link href="/">Practice</Nav.Link>
                                <Nav.Link href="/essays">Essay Series</Nav.Link>
                                <Nav.Link href="/bookmarks">Bookmarks</Nav.Link>
                                <NavDropdown
                                    title="Dropdown"
                                    id={`navbarDropdown-${expand}`}
                                >
                                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action4">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action5">
                                        Something else here
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Form className="d-flex">
                                <Form.Control
                                    type="search"
                                    placeholder="Search"
                                    className="me-2"
                                    aria-label="Search"
                                />
                                <Button variant="outline-success">Search</Button>
                            </Form>
                        </Offcanvas.Body>
                    </Navbar.Offcanvas>
                </Container>
            </Navbar>            
        </header>
    );
}

export default Header;
