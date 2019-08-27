import { connect } from 'react-redux';
import React, { Component } from 'react';
import CardList from "../../components/card-list/CardList";
import * as actions from '../../actions';

class CardContainer extends Component {
  componentDidMount () {
  }

  render () {
    return (
      <div className={"container"}>
        <CardList cards={this.props.cards}/>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    cards: state.card.cards,
    isFirstFlip: !state.card.firstGuess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    flipCard: (card) => {
      this.props.isFirstFlip ? dispatch(actions.flipCard(card)) : dispatch(actions.checkForPair(card))
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CardContainer);
