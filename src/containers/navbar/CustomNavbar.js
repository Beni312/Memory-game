import { Image, Navbar } from "react-bootstrap";
import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from '../../images/snapsoft-logo.svg';
import './CustomNavbar.css';

export class CustomNavbar extends Component {
  render() {
    return (
      <Navbar id={"navbar"} expand="lg">
        <Navbar.Brand><Image id={"logo"} src={logo}/><span className={"ml-3 h6"}>MEMORY GAME</span></Navbar.Brand>
      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {
  };
};

const mapDispatchToProps = dispatch => {
  return {
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar);

