import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as actions from '../../actions';
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";
import './StartScreen.css';
import { Link } from "react-router-dom";

class StartScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deckSize: this.props.deckSize
    };
  }

  componentDidMount() {
    this.props.clearBoard();
  }

  onChange = (e) => {
    this.setState({ deckSize: e.target.value });
    this.props.changeDeckSize(e.target.value);
  };

  render () {
    return (
      <div className={"container d-flex justify-content-center align-items-center flex-column startScreen"}>
        <h1 className={"mb-2"}>SNAPSOFT</h1>
        <h5 className={"mb-5"}>MEMORY GAME</h5>
        <FormGroup className={"col-3 d-flex justify-content-center align-items-center flex-column mt-5"} controlId="form.deckSize">
          <FormLabel className={"formTitle"}>Deck size:</FormLabel>
          <FormControl className={"col-4"} onChange={this.onChange} defaultValue={this.state.deckSize} as="select">
            {this.props.deckSizes.map((item, index) => {
              return (
                <option key={index} value={item}>{item}</option>
              )
            })}
          </FormControl>
        </FormGroup>
        <Link to="/game"><button className={"newGameBtn"} onClick={this.props.loadBoard}>START A NEW GAME</button></Link>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deckSizes: state.card.changeableDeckSizes,
    deckSize: state.card.deckSize
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeDeckSize: (deckSize) => dispatch(actions.changeDeckSize(deckSize)),
    loadBoard: () => dispatch(actions.loadBoard()),
    clearBoard: () => dispatch(actions.clearBoard())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
