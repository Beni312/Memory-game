import { connect } from 'react-redux';
import CardList from "../../components/card-list/CardList";
import React, { Component } from 'react';
import StatisticContainer from "../statistic/StatisticContainer";
import * as actions from '../../actions';
import { CardStatus } from "../../constants/CardStatus";

class CardContainer extends Component {
  componentDidMount () {
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doAllMatch) {
      this.props.gameEnd();
    }
  }

  flipCard = (card) => {
    if (card.status === CardStatus.MATCHED || (this.props.firstGuess && this.props.secondGuess)) {
      return;
    }
    if (!this.props.firstGuess) {
      this.props.flipCard(card);
    } else if (this.props.firstGuess.id !== card.id) {
      this.props.flipCard(card);
      if (this.props.firstGuess.image !== card.image) {
        setTimeout(() => this.props.checkForPair(), 2500)
      } else {
        this.props.checkForPair();
      }
    }
  };

  render () {
    return (
      <div className={"container"}>
        <StatisticContainer/>
        <CardList cards={this.props.cards} flipCard={this.flipCard}/>
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
    flipCard: (card) => dispatch(actions.flipCard(card)),
    checkForPair: () => dispatch(actions.checkForPair()),
    gameEnd: () => dispatch(actions.gameEnd())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
