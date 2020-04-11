import React, { useState, useEffect, useContext } from 'react'
import Logout from './Logout'
import { UserContext } from './UserContext'


import { Nav, Navbar } from 'react-bootstrap';


const Navigation = () => {
  const [user, setUser] = useContext(UserContext)
  console.log('navigation user', user)


  const LoggedIn = () => {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
          <Navbar.Brand href="#home">TFP</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="smooth-scroll">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link >{< Logout />}</Nav.Link>
              <Nav.Link href="#contact-form">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }

  const NotLoggedIn = () => {
    return (
      <>
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" >
          <Navbar.Brand href='/'>TFP</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="smooth-scroll">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="#contact-form">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </>
    )
  }


  return (
    <>
      {user === null ? <NotLoggedIn /> : <LoggedIn />}
    </>
  )
}

export default Navigation