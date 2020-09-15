import React from 'react';

import Navbar from 'react-bootstrap/Navbar';

import './Header.scss';

function Header() {
    return (  
      <Navbar bg='primary' expand='lg'>
        <Navbar.Brand>Library</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
      </Navbar>
      )
}


export default Header;