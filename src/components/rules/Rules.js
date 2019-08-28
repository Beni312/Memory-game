import React from 'react';
import './Rules.css';

const Rules = () => {
  return (
    <div className={"container rules pt-5"}>
      <ul>
        <li>1. Present the user with an even number of cards, „face down”</li>
        <li>2. When the user clicks a card, „flip it over” and reveal the hidden image</li>
        <li>3. When two cards are revealed:</li>
        <ul>
          <li>a. If the cards are identical, remove them from play.</li>
          <li>b. If they are not, flip them back.</li>
        </ul>
        <li>4. The game ends when all cards are removed.</li>
      </ul>
    </div>
  )
};

export default Rules;
