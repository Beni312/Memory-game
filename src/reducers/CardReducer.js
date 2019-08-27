import * as actionTypes from '../actions/actionTypes';
import uuid from 'uuid/v1';
import { CardStatus } from "../constants/CardStatus";

let images = [];
const req = require.context('../images/cards', false, /.*\.png$/);
req.keys().forEach(function (key) {
  images.push(key);
});

const initialState = {
  cards: [],
  images: images,
  firstGuess: null,
  tries: null,
  deckSize: 6,
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
    // TODO shuffle
    case actionTypes.LOAD_BOARD: {
      const cards = [];
      const pairs = state.deckSize / 2;
      for(let i = 0; i < pairs; i++) {
        cards.push(createCard(state.images[i], CardStatus.CLOSED));
        cards.push(createCard(state.images[i], CardStatus.CLOSED));
      }
      return {
        ...state,
        firstGuess: null,
        cards: cards,
        tries: 0
      }
    }
    case actionTypes.FLIP_CARD: {
      const index = state.cards.indexOf(action.payload.card);
      const updatedCard = {
        ...state.cards[index],
        status: CardStatus.OPENED
      };
      return {
        ...state,
        cards: [
          ...state.cards.slice(0, index),
          updatedCard,
          ...state.cards.slice(index + 1)
        ],
        firstGuess: updatedCard
      }
    }
    case actionTypes.CHECK_FOR_PAIRS: {
      let firstIndex = state.cards.indexOf(state.firstGuess);
      let secondIndex = state.cards.indexOf(action.payload.card);
      if (firstIndex > secondIndex) {
        let temp = firstIndex;
        firstIndex = secondIndex;
        secondIndex = temp;
      }
      if(state.firstGuess.id !== action.payload.card.id && state.firstGuess.image === action.payload.card.image) {
        return getCheckForPairState(state, firstIndex, secondIndex, CardStatus.MATCHED);
      } else {
        return getCheckForPairState(state, firstIndex, secondIndex, CardStatus.CLOSED);
      }
    }
    default: {
      return state
    }
  }
};

const getCheckForPairState = (state, firstIndex, secondIndex, status) => {
  return {
    ...state,
    firstGuess: null,
    cards: [
      ...state.cards.slice(0, firstIndex), {
        ...state.cards[firstIndex],
        status: status
      },
      ...state.cards.slice(firstIndex + 1, secondIndex), {
        ...state.cards[secondIndex],
        status: status
      },
      ...state.cards.slice(secondIndex + 1)
    ]
  }
};

const createCard = (image, status) => {
  return {
    id: uuid(),
    image: image,
    status: status
  }
};

export default reducer;
