import { connect } from 'react-redux';
import CardList from "../../components/card-list/CardList";
import React, { Component } from 'react';
import StatisticContainer from "../statistic/StatisticContainer";
import * as actions from '../../actions';

class CardContainer extends Component {

  componentDidMount() {
    if (this.props.firstGuess || this.props.secondGuess) {
      this.props.closeAllAfterRefresh();
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doAllMatch) {
      this.props.gameEnd();
    }
  }

  render () {
    return (
      <div className={"container"}>
        <StatisticContainer/>
        <CardList cards={this.props.cards}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.card.cards,
    firstGuess: state.card.firstGuess,
    secondGuess: state.card.secondGuess,
    doAllMatch: state.card.matches && (state.card.matches * 2) === (state.card.cards.length)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    gameEnd: () => dispatch(actions.gameEnd()),
    closeAllAfterRefresh: () => dispatch(actions.closeAllAfterRefresh())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
