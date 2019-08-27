import * as actionTypes from '../actions/actionTypes';
import uuid from 'uuid/v1';

let images = [];
const req = require.context('../images/cards', false, /.*\.png$/);
req.keys().forEach(function (key) {
  images.push(key);
});

const initialState = {
  cards: [],
  images: images,
  firstGuess: null,
  deckSize: 6,
  tries: null,
  changeableDeckSizes: [
    6,8,10,12,14,16,18,20
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_DECK_SIZE: {
      return {
        ...state,
        deckSize: action.payload.deckSize
      }
    }
    case actionTypes.LOAD_BOARD: {
      const cards = [];
      const pairs = state.deckSize / 2;
      for(let i = 0; i < pairs; i++) {
        cards.push({
          id: uuid(),
          image: state.images[i]
        });
        cards.push({
          id: uuid(),
          image: state.images[i]
        });
      }
      return {
        ...state,
        cards: cards,
        tries: 0
      }
    }
    default: {
      return state
    }
  }
};

export default reducer;
