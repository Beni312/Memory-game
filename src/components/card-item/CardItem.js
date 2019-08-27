import PropTypes from 'prop-types';
import React from 'react'
import { Image } from "react-bootstrap";
import './CardItem.css';

export const CardItem = (props) => {
    return (
      <li className="card m-2">
        <div className={"imageContainer"}>
          <Image src={'/images/cards/' + props.card.image}/>
        </div>
      </li>
    )
  };

CardItem.propTypes = {
  card: PropTypes.object.isRequired
};

export default CardItem;
