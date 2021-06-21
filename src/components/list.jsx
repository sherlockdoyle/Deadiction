import React from 'react';
import share from '../img/share.svg';

function ListView(props) {
  return <ul className='list-view'>
    {props.children}
  </ul>;
}

function ListItem(props) {
  return <li
    className='list-item'
    onClick={props.onClick}
  >
    <div className='content'>{props.children}</div>
    <button
      className='share'
      onClick={(e) => {
        props.onShare();
        e.stopPropagation();
      }}
    ><img src={share} alt=">" /></button>
  </li>;
}

export { ListView, ListItem };