import React from 'react';
import PropTypes from 'prop-types';
import CardItem from "../card-item/CardItem";

export const CardList = (props) => {
  return (
    <ul>
      {props.cards.map((card) => (
        <CardItem
          key={card.id}
          card={card}
        />
      ))}
    </ul>
  )
};

CardList.propTypes = {
  cards: PropTypes.array.isRequired
};

export default CardList;
