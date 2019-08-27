import * as actionTypes from './actionTypes.js'

export const changeDeckSize = (deckSize) => {
  return {
    type: actionTypes.SELECT_DECK_SIZE,
    payload: {
      deckSize: deckSize
    }
  };
};

export const checkForPair = () => {
  return {
    type: actionTypes.CHECK_FOR_PAIRS
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

export const gameEnd = () => {
  return {
    type: actionTypes.GAME_END
  }
};
