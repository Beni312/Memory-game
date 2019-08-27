import PropTypes from 'prop-types';
import React from 'react'
import { CardStatus } from "../../constants/CardStatus";
import { Image } from "react-bootstrap";
import './CardItem.css';

export const CardItem = (props) => {
    return (
      <li className="card m-2" onClick={() => props.flipCard(props.card)}>
        <div className={"imageContainer"}>
          {props.card.status !== CardStatus.CLOSED ? <Image src={'/images/cards/' + props.card.image}/> : null}
        </div>
      </li>
    )
  };

CardItem.propTypes = {
  card: PropTypes.object.isRequired,
  flipCard: PropTypes.func.isRequired
};

export default CardItem;
