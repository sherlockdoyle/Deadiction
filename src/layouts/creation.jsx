import React, { useState } from 'react';
import storage from '../utils/storage';
import './style.css'
import cancel from '../img/cancel.svg'
import tick from '../img/tick.svg'

function numWidth(val) {
  let l = 0;
  do {
    l += 1;
    val = ~~(val / 10);
  }
  while (val);
  return (0.55 * l + 0.15) + 'em';
}

function CreateAddiction(props) {
  let data = storage.loadData();
  let [progress, setProgress] = useState(0);
  let [name, setName] = useState('');
  let [count, setCount] = useState(1);
  let [time, setTime] = useState(1);
  let [unit, setUnit] = useState('DAY');

  let views = [
    CreateName(proceed, { name, setName }),
    CreateTime(proceed, { name, count, setCount, time, setTime, unit, setUnit })
  ]

  function proceed() {
    if (progress === views.length - 1) {
      storage.createAddiction(name.toUpperCase(), count / time, unit.toUpperCase());
      props.onCreate();
    }
    else
      setProgress(progress + 1);
  }

  return <div id='creator'>
    <div style={{
      hyphens: 'auto',
      margin: 'auto 4em'
    }}>{views[progress].view}</div>

    <div className='control'>
      <button
        className='cancel'
        onClick={() => {
          if (data.addictions.length === 0) {
            setProgress(0);
            setName('');
            setCount(1);
            setTime(1);
            setUnit('DAY');
          }
          else
            props.onCreate();
        }}
      ><img src={cancel} alt="✗" /></button>

      <button
        className='done'
        onClick={views[progress].onNext}
      ><img src={tick} alt="✓" /></button>
    </div>
  </div>;
}

export default CreateAddiction;

function CreateName(proceed, { name, setName }) {
  let nameInput = React.createRef()
  let [wrong, setWrong] = useState(false);
  function onNext() {
    if (name.length === 0) {
      setWrong(true);
      nameInput.current.focus();
      setTimeout(() => setWrong(false), 1000);
    }
    else {
      setWrong(false);
      proceed();
    }
  }

  let view = <div style={{
    fontSize: '7.5em',
    fontWeight: 'bold'
  }}>
    I wish not to<br />
    <input
      ref={nameInput}
      className={wrong ? 'err' : ''}
      placeholder='verb'
      autoFocus
      value={name}
      onChange={(e) => setName(e.target.value)}
      onKeyPress={(e) => {
        if (e.key === 'Enter')
          onNext();
      }}
      style={{ width: '100%' }}
    />
  </div>;

  return { view, onNext };
}

function CreateTime(proceed, { name, count, setCount, time, setTime, unit, setUnit }) {
  let widths = { 3: 1.9, 4: 2.7, 5: 3.6, 6: 3.7 };

  let view = <div style={{ fontSize: '6em' }}>
    I {name} <input
      type='number'
      min='1'
      step='1'
      value={count}
      onChange={(e) => setCount(Number(e.target.value))}
      style={{ width: numWidth(count) }}
    /> time{count === 1 ? '' : 's'} every <input
      type='number'
      min='1'
      step='1'
      value={time}
      onChange={(e) => setTime(Number(e.target.value))}
      style={{ width: numWidth(time) }}
    /> <select
      value={unit}
      onChange={(e) => setUnit(e.target.value)}
      style={{
        width: widths[unit.length] + 'em',
        marginRight: '-0.05em'
      }}
    >
      <option value="MINUTE">MINUTE</option>
      <option value="HOUR">HOUR</option>
      <option value="DAY">DAY</option>
      <option value="WEEK">WEEK</option>
      <option value="MONTH">MONTH</option>
    </select>{time === 1 ? '' : 's'}.
    </div>;

  return { view, onNext: proceed };
}