import React, { useRef, useState } from 'react';
import option from '../img/option.svg';
import progress from '../img/progress.svg'
import delete_icon from '../img/delete.svg';

function ListView({ children, ...props }) {
  return <ul className='list-view'>
    {children}
  </ul>;
}

function ListItem({ onClick, onViewProgress, onDelete, children, ...props }) {
  let [isMenuOpen, setMenuOpen] = useState(false);
  let menuButton = useRef();

  function closeMenu(e) {
    if (!menuButton.current?.contains(e.target)) {
      setMenuOpen(false);
      document.removeEventListener('click', closeMenu);
    }
  }

  return <li className='list-item'>
    <div
      className='content'
      onClick={onClick}
    >{children}</div>

    <button
      className='menu-button'
      ref={menuButton}
      title='Menu'
      onClick={() => {
        setMenuOpen(true);
        document.addEventListener('click', closeMenu);
      }}
    ><img src={option} alt="Menu" /></button>

    {isMenuOpen && <div className='menu'>
      <button onClick={onViewProgress}>
        <img src={progress} alt="⋯" />Progress
      </button>
      <button onClick={onDelete}>
        <img src={delete_icon} alt="Delete" />Delete
      </button>
    </div>}
  </li>;
}

export { ListView, ListItem };