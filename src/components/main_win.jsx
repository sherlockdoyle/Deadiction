import React from 'react';
import './style.css';
import github from '../img/github.svg'

function MainWin(props) {
  return <div className="main-win">
    <div className="title">
      <h1>{props.title}</h1>
      <button
        className="github"
        title='See source code!'
        onClick={() => open('https://github.com/sherlockdoyle/Deadiction', '_blank')}
      >
        <img src={github} alt="Github" />
      </button>
    </div>

    <div className="content">
      {props.children}
    </div>
  </div>;
}

export default MainWin;