import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as actions from '../../actions';
import { Button, FormControl, FormGroup, FormLabel } from "react-bootstrap";

class StartScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deckSize: this.props.deckSize
    };
  }

  onChange = (e) => {
    this.setState({ deckSize: e.target.value });
    this.props.changeDeckSize(e.target.value);
  };

  render () {
    return (
      <div className={"container"}>
        <FormGroup controlId="form.deckSize">
          <FormLabel>Deck size</FormLabel>
          <FormControl onChange={this.onChange} defaultValue={this.state.deckSize} as="select">
            {this.props.deckSizes.map((item, index) => {
              return (
                <option key={index} value={item}>{item}</option>
              )
            })}
          </FormControl>
        </FormGroup>
        <Button variant="primary" onClick={this.props.loadBoard}>Start a new game</Button>
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
    loadBoard: () => dispatch(actions.loadBoard())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
