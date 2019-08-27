import { connect } from 'react-redux';
import React, { Component } from 'react';
import * as actions from '../../actions';
import { FormControl, FormGroup, FormLabel } from "react-bootstrap";

class StartScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      deckSize: 6
    };
  }

  onChange = (e) => {
    this.setState({ deckSize: e.target.value });
  };

  render () {
    return (
      <div className={"container"}>
        <FormGroup controlId="form.deckSize">
          <FormLabel>Example select</FormLabel>
          <FormControl onChange={this.onChange} as="select">
            {this.props.deckSizes.map((item, index) => {
              return (
                <option key={index} value={item}>{item}</option>
              )
            })}
          </FormControl>
        </FormGroup>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    deckSizes: state.card.changeableDeckSizes
  };
};

const mapDispatchToProps = dispatch => {
  return {
    changeDeckSize: (deckSize) => dispatch(actions.changeDeckSize(deckSize)),
    loadBoard: () => dispatch(actions.loadBoard())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StartScreen);
