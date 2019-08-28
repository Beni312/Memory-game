import React from 'react';
import './Rules.css';

const Rules = () => {
  return (
    <div className={"container rules pt-5"}>
      <ul>
        <li>Mix up the cards.</li>
        <li>Lay them in rows, face down.</li>
        <li>Turn over any two cards.</li>
        <li>If the two cards match, keep them.</li>
        <li>If they don't match, turn them back over.</li>
        <li>Watch and remember during the other player's turn.</li>
        <li>The game is over when all the cards have been matched.</li>
        <li>The player with the most matches wins.</li>
      </ul>
    </div>
  )
};

export default Rules;
