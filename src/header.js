import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { useMoralis } from "react-moralis";


function Header() {

    const {user, isAuthenticated, authenticate, logout} = useMoralis();

    return (
        <Navbar variant='dark' bg='dark'>
            <Container>
                <Navbar.Brand href="/">NFTBet</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                </Navbar.Collapse>
                {
                    !isAuthenticated && <Button onClick={authenticate}>Login</Button>
                }
                {
                    isAuthenticated && <div className='text-white'>Welcome, {`${user.get("ethAddress").substring(0,10)}...`} <Button variant='outline-light' onClick={logout}>Logout</Button></div>
                }
            </Container>
        </Navbar>
    )
}

export default Header;
