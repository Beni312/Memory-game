import * as actions from '../../actions';
import { FormControl, FormGroup, FormLabel, Image, Navbar } from "react-bootstrap";
import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from '../../images/snapsoft-logo.svg';
import './CustomNavbar.css';
import { Link } from "react-router-dom";

class CustomNavbar extends Component {

  onChange = (e) => {
    this.setState({ deckSize: e.target.value });
    this.props.changeDeckSize(e.target.value);
  };

  render() {
    return (
      <Navbar id={"navbar"} expand="lg">
        <Navbar.Brand>
          <Image id={"logo"} src={logo}/>
          <Link to="/rules"><span className={"ml-3 h6 ruleLink"}>MEMORY GAME</span></Link>
        </Navbar.Brand>
        {this.props.isNewGameVisible ? <div className={"d-flex justify-content-center align-items-center navNewGame"}>
          <FormGroup className={"d-flex align-items-center mb-0 mr-3"} controlId="form.deckSize">
            <FormLabel className={"formTitle"}>Deck size:</FormLabel>
            <FormControl className={"deckSizeSelect"} onChange={this.onChange} defaultValue={this.props.deckSize} as="select">
              {this.props.deckSizes.map((item, index) => {
                return (
                  <option key={index} value={item}>{item}</option>
                )
              })}
            </FormControl>
          </FormGroup>
            <Link to="/game"><button className={"ml-3 newGameBtn"} onClick={this.props.newGame}>START A NEW GAME</button></Link>
        </div>
        : null
        }

      </Navbar>
    )
  }
}

const mapStateToProps = state => {
  return {
    deckSize: state.card.deckSize,
    deckSizes: state.card.changeableDeckSizes,
    isNewGameVisible: state.card.cards.length > 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeDeckSize: (deckSize) => dispatch(actions.changeDeckSize(deckSize)),
    newGame: () => dispatch(actions.loadBoard())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomNavbar);

