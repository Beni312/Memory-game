import * as actions from '../../actions';
import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Button } from "react-bootstrap";
import './StatisticContainer.css';

class StatisticContainer extends Component {

  render () {
    return (
      <div className={"container mt-3 mb-1"}>
        <div className={"statisticFlexContainer ml-4 mr-4"}>
          <div>
            <span>current tries</span>
            <span className={"font-weight-bold ml-2"}>{this.props.tries}</span>
          </div>
          {this.props.best == null ? null :
            <div>
              <div>Best:</div>
              <h3>{this.props.best}</h3>
            </div>
          }
          <div>
            <Button onClick={() => this.props.restart()}>RESTART</Button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tries: state.card.tries,
    best: state.card.best,
    isVisible: state.card.cards.length !== 0
  };
};

const mapDispatchToProps = dispatch => {
  return {
    restart: () => dispatch(actions.loadBoard())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StatisticContainer);
