import React, { useState } from 'react';
import './style.css';
import rarrow from '../img/rarrow.svg';

function CardView(props) {
  let numCards = props.children.length;  // single child fails
  let [cardIdx, setCardIdx] = useState(0);

  let card = React.cloneElement(props.children[cardIdx], {
    key: cardIdx,
    onNext: cardIdx === numCards - 1 ? props.onEnd : () => {
      setCardIdx(cardIdx + 1);
    }
  });

  return <div className="card-view">{card}</div>;
}

function Card(props) {
  let [state, setState] = useState('enter');

  return <div
    className={`card ${state}`}
    style={{ ...props.style }}
  >
    <div className="content">{props.children}</div>
    <button
      title='Next'
      onClick={() => {
        setState('exit');
        setTimeout(props.onNext, 1000);
      }}
    ><img src={rarrow} alt=">" /></button>
  </div>;
}

export { CardView, Card };