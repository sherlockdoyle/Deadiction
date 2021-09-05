import React from 'react';
import './style.css';
import cancel from '../img/cancel.svg';

function Dialog({ title, onClose, controls, noCloseButton, children, ...props }) {
  return <div className="dialog">
    <div className="header">
      <h3>{title}</h3>
      {noCloseButton || <button
        className="close"
        onClick={onClose}
      ><img src={cancel} alt="✗" /></button>}
    </div>
    <div className="content">
      {children}
    </div>
    <div className="control">
      {Object.entries(controls).map(([key, value]) => {
        return <button onClick={value}>{key}</button>
      })}
    </div>
  </div>;
}

export default Dialog;