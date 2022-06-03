import React from 'react';
import { useState,useEffect } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
} from 'reactstrap';
//import Image from "next/image";
import { Avatar, Badge } from '@material-ui/core';
import jwt_decode from "jwt-decode";
const NavBar = () => {
   const [user,setUser]=useState({
     first_name:''
   })

  function deletetoken() {
    localStorage.removeItem('token');
    console.log(localStorage.getItem('token'));
    localStorage.clear();
  }

  useEffect(() => {
  
   var decoded = jwt_decode(localStorage.getItem('token'));
   console.log('local',localStorage.getItem('token'))
   console.log('lres',decoded.result)
   setUser(decoded.result)
},[])

  return (
    <div>
      {/* rgba(16, 103, 138, 0.933) */}
      <Navbar  dark expand="sm" fixed="top" style={{backgroundImage:'linear-gradient(rgba(16, 103, 138, 0.933),black)'}}>
      
        <NavbarBrand href="/" style={{padding:'10px'}}>
          <img src="/white_logo.png" height='80px' width="120px" style={{marginLeft:'80px'}}/>
         
        </NavbarBrand>
        <Collapse navbar>
          <Nav className="mr-auto" navbar>
            {/* <NavbarToggler onClick={toggle} color="dark" />
         isOpen={isOpen}
            <NavItem>
              <NavLink
                href="#"
                className="d-none d-sm-block"
                onClick={toggleLeft}
              >
                <i
                  className={`fas fa-caret-square-${
                    isToggled ? 'left' : 'right'
                  }`}
                ></i>
              </NavLink> */}
            {/* </NavItem> */}
            {/* <NavItem>
              <NavLink href="/page/typography">Typography</NavLink>
            </NavItem> */}
            {/* <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Pages
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem tag="div">
                  <NavLink href="/card/posts" className="text-primary">
                    Cards
                  </NavLink>
                </DropdownItem>
                <DropdownItem tag="div">
                  <NavLink href="/table/tables" className="text-primary">
                    Tables
                  </NavLink>
                </DropdownItem>
                <DropdownItem tag="div">
                  <NavLink href="/form/buttons" className="text-primary">
                    Buttons
                  </NavLink>
                </DropdownItem>
                {/* <DropdownItem divider /> */}
                {/* <DropdownItem tag="div">
                  <NavLink href="/form/forms" className="text-primary">
                    Forms
                  </NavLink>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown> */} 
          </Nav>
          <UncontrolledDropdown inNavbar>
            <DropdownToggle caret nav className="text-secondary">
              <NavbarText className="align-self-center text-left font-weight-bold">
                <Avatar
                  src="/images/profile2.jpg"
                  alt={user.first_name}
                  className="border rounded-circle img-42 img-fluid mr-1"
                />
                {/* Account */}
              </NavbarText>
            </DropdownToggle>
            <DropdownMenu style={{marginLeft:"-30px"}}>
              <DropdownItem tag="div">
                <NavLink href="/page/profile" className="text-dark">
                  <i className="fas fa-user"></i> Profile
                </NavLink>
              </DropdownItem>
              
              <DropdownItem tag="div">
                <NavLink
                  href="/page/login"
                  onClick={deletetoken}
                  className="text-dark"
                >
                  <i className="fas fa-home"></i> Logout
                </NavLink>
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default NavBar;
