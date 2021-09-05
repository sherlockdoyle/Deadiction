import React from 'react';
import { createPortal } from 'react-dom';
import './style.css';

function Popup({ closable, onClose, children, ...props }) {
  return createPortal(
    <div
      className="popup"
      onClick={() => {
        if (closable)
          onClose();
      }}
    >
      {React.Children.map(children, child => {
        if (React.isValidElement(child))
          return React.cloneElement(child, { onClose });
        return child;
      })}
    </div >,
    document.getElementById('overlay')
  );
}

export default Popup;