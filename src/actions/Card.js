import * as actionTypes from './actionTypes.js'

export const changeDeckSize = (deckSize) => {
  return {
    type: actionTypes.SELECT_DECK_SIZE,
    payload: {
      deckSize: deckSize
    }
  };
};

export const checkForPair = (card) => {
  return {
    type: actionTypes.CHECK_FOR_PAIRS,
    payload: {
      card: card
    }
  };
};

export const flipCard = (card) => {
  return {
    type: actionTypes.FLIP_CARD,
    payload: {
      card: card
    }
  };
};

export const loadBoard = () => {
  return {
    type: actionTypes.LOAD_BOARD
  }
};
