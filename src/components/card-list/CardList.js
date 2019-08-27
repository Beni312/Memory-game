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
          flipCard={props.flipCard}
        />
      ))}
    </ul>
  )
};

CardList.propTypes = {
  cards: PropTypes.array.isRequired,
  flipCard: PropTypes.func.isRequired
};

export default CardList;
