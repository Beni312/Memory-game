import { connect } from 'react-redux';
import React, { Component } from 'react';
import CardList from "../../components/card-list/CardList";
import * as actions from '../../actions';
import { CardStatus } from "../../constants/CardStatus";

class CardContainer extends Component {
  componentDidMount () {
  }

  flipCard = (card) => {
    if (card.status === CardStatus.MATCHED) {
      return;
    }
    if (!this.props.firstFlip) {
      this.props.flipCard(card);
    } else if (this.props.firstFlip.id !== card.id) {
      this.props.checkForPair(card);
    }
  };

  render () {
    return (
      <div className={"container"}>
        <CardList cards={this.props.cards} flipCard={this.flipCard}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.card.cards,
    firstFlip: state.card.firstGuess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    flipCard: (card) => dispatch(actions.flipCard(card)),
    checkForPair: (card) => dispatch(actions.checkForPair(card))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
