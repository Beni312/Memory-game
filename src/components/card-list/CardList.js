import React from 'react';
import PropTypes from 'prop-types';
import CardItem from "../card-item/CardItem";
import './CardList.css';

export const CardList = (props) => {
  return (
    <ul className={"cardList"}>
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
