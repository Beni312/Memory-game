import PropTypes from 'prop-types';
import React from 'react'

export const CardItem = (props) => {
    return (
      <li className="card">
        <div>
          <img src={props.card.src} alt=""/>
        </div>
      </li>
    )
  };

CardItem.propTypes = {
  card: PropTypes.object.isRequired
};

export default CardItem;
