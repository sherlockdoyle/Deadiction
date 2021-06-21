import React from 'react';
import './style.css';

function MainWin(props) {
  return <div className="main-win-container">
    <div className="main-win-title">
      <h1>{props.title}</h1>
    </div>

    <div
      className="main-win-item"
      data-width={props.hasOwnProperty('width') ? props.width : 'auto'}
    >
      <div className="main-win-square">
        {props.children}
      </div>
    </div>
  </div>;
}

export default MainWin;