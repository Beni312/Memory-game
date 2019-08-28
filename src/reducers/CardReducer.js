import * as actionTypes from '../actions/actionTypes';
import shuffle from 'shuffle-array';
import uuid from 'uuid/v1';
import { CardStatus } from "../constants/CardStatus";

const getState = () => {
  const stateFromLocalStorage = JSON.parse(localStorage.getItem('cardState'));

  if (stateFromLocalStorage) {
    return stateFromLocalStorage;
  }

  let images = [];
  const req = require.context('../images/cards', false, /.*\.png$/);
  req.keys().forEach(function (key) {
    images.push(key);
  });

  return {
    cards: [],
    images: images,
    firstGuess: null,
    secondGuess: null,
    tries: null,
    deckSize: 6,
    matches: null,
    best: null,
    changeableDeckSizes: [
      6,8,10,12,14,16,18,20
    ]
  }
};

const initialState = getState();

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SELECT_DECK_SIZE: {
      return saveState ({
        ...state,
        deckSize: action.payload.deckSize
      });
    }
    case actionTypes.LOAD_BOARD: {
      const cards = [];
      const pairs = state.deckSize / 2;
      for(let i = 0; i < pairs; i++) {
        cards.push(createCard(state.images[i], CardStatus.CLOSED));
        cards.push(createCard(state.images[i], CardStatus.CLOSED));
      }
      shuffle(cards);
      return saveState ({
        ...state,
        firstGuess: null,
        secondGuess: null,
        cards: cards,
        tries: 0,
        matches: 0
      });
    }
    case actionTypes.FLIP_CARD: {
      const index = state.cards.indexOf(action.payload.card);
      const updatedCard = {
        ...state.cards[index],
        status: CardStatus.OPENED
      };
      return saveState ({
        ...state,
        cards: [
          ...state.cards.slice(0, index),
          updatedCard,
          ...state.cards.slice(index + 1)
        ],
        ...state.firstGuess == null ? {firstGuess: updatedCard} : {secondGuess: updatedCard}
      });
    }
    case actionTypes.CHECK_FOR_PAIRS: {
      let firstIndex = state.cards.indexOf(state.firstGuess);
      let secondIndex = state.cards.indexOf(state.secondGuess);
      if (firstIndex > secondIndex) {
        let temp = firstIndex;
        firstIndex = secondIndex;
        secondIndex = temp;
      }
      if(state.secondGuess === null) {
        return state;
      }

      if(state.firstGuess.id !== state.secondGuess.id && state.firstGuess.image === state.secondGuess.image) {
        const matches = state.matches + 1;
        return getCheckForPairState(state, firstIndex, secondIndex, CardStatus.MATCHED, matches);
      } else {
        return getCheckForPairState(state, firstIndex, secondIndex, CardStatus.CLOSED, state.matches);
      }
    }
    case actionTypes.GAME_END: {
      let bestPoint;
      if (state.best == null) {
        bestPoint = state.tries;
      } else if (state.best > state.tries) {
        bestPoint = state.tries;
      } else {
        bestPoint = state.best;
      }

      return saveState ({
        ...state,
        matches: null,
        firstGuess: null,
        secondGuess: null,
        best: bestPoint
      });
    }
    case actionTypes.CLOSE_ALL_AFTER_REFRESH: {
      let cards = state.cards;
      cards.forEach(c => {
        if (c.status === CardStatus.OPENED) {
          c.status = CardStatus.CLOSED;
        }
      });

      return {
        ...state,
        cards: cards,
        firstGuess: null,
        secondGuess: null
      }
    }
    default: {
      return state
    }
  }
};

const getCheckForPairState = (state, firstIndex, secondIndex, status, matches) => {
  return saveState ({
    ...state,
    firstGuess: null,
    secondGuess: null,
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
    ],
    tries: state.tries + 1,
    matches: matches
  });
};

const createCard = (image, status) => {
  return {
    id: uuid(),
    image: image,
    status: status
  }
};

const saveState = (newState) => {
  localStorage.setItem('cardState', JSON.stringify(newState));
  return newState;
};

export default reducer;
