import React, { useState } from 'react';
import storage from '../utils/storage';
import './style.css'
import cancel from '../img/cancel.svg'
import tick from '../img/tick.svg'
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';

function CreateAddiction(props) {
  let [name, setName] = useState('');
  const { path, url } = useRouteMatch();
  const history = useHistory();

  return <div id='creator'>
    <Switch>
      <Route path={`${path}/name`}>
        <CreateName
          setName={setName}
          onParentDone={props.onDone}
          history={history}
          url={url}
        />
      </Route>
      <Route path={`${path}/freq`}>{
        name.length === 0 ?
          <Redirect to={`${url}/name`} /> :
          <CreateFreq
            name={name}
            onParentDone={props.onDone}
          />
      }</Route>
      <Route path={path}><Redirect to={`${url}/name`} /></Route>
    </Switch>
    {/* <div style={{ width: "100%", height: "100%", background: "linear-gradient(red, blue)" }}></div> */}
  </div>;
}

export default CreateAddiction;

function CreateName(props) {
  let data = storage.loadData();

  let [name, setName] = useState('');
  let nameInput = React.createRef()
  let [wrong, setWrong] = useState(false);
  let [errorMessage, setErrorMessage] = useState('');

  const history = useHistory();

  function onNext() {
    let err = name.length === 0 ? 1 : storage.addictionIsAvailable(name.trim().toUpperCase()) ? 2 : 0;
    if (err) {
      setErrorMessage(err === 1 ? 'Enter something!' : `'${name.trim().toUpperCase()}' already exists!`);
      setWrong(true);
      nameInput.current.focus();
      setTimeout(() => setWrong(false), 1000);
    }
    else {
      setWrong(false);
      props.setName(name.trim().toUpperCase());
      history.push(`${props.url}/freq`);
    }
  }

  return <>
    <div className='content'>
      <div id='create-name'>
        I wish not to<br />
        <input
          ref={nameInput}
          className={wrong ? 'err' : ''}
          placeholder='verb'
          title='Name of addiction'
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter')
              onNext();
          }}
          style={{ width: '100%' }}
        />
      </div>
    </div>

    <div className='control'>
      <button
        className='cancel'
        title='Cancel'
        onClick={() => {
          if (data.addictions.length === 0) {
            setName('');
            nameInput.current.focus();
          }
          else
            props.onParentDone();
        }}
      ><img src={cancel} alt="✗" /></button>
      {wrong ? <div className='errorMessage'>{errorMessage}</div> : null}
      <button
        className='done'
        title='Done'
        onClick={onNext}
      ><img src={tick} alt="✓" /></button>
    </div>
  </>;
}

function numWidth(val) {
  let l = 0;
  do {
    l += 1;
    val = ~~(val / 10);
  } while (val);
  return (0.55 * l + 0.15) + 'em';
}

function charWidth(val) {
  return (0.85 * val.length - 2 / 3) + 'em';
}

function CreateFreq(props) {
  let [count, setCount] = useState(1);
  let [time, setTime] = useState(1);
  let [unit, setUnit] = useState('DAY');

  const history = useHistory();

  return <>
    <div className='content'>
      <div id='create-freq'>
        I {props.name} <input
          type='number'
          min='1'
          step='1'
          value={count}
          onChange={(e) => setCount(Math.max(1, Math.round(Number(e.target.value))))}
          style={{ width: numWidth(count) }}
        /> time{count === 1 ? '' : 's'} every <input
          type='number'
          min='1'
          step='1'
          value={time}
          onChange={(e) => setTime(Math.max(1, Math.round(Number(e.target.value))))}
          style={{ width: numWidth(time) }}
        /> <nobr>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            style={{
              width: charWidth(unit),
              marginRight: '-0.05em'
            }}
          >
            <option value="HOUR">HOUR</option>
            <option value="DAY">DAY</option>
            <option value="WEEK">WEEK</option>
            <option value="MONTH">MONTH</option>
          </select>{time === 1 ? '' : 's'}
        </nobr>.
      </div>
    </div>

    <div className='control'>
      <button
        className='cancel'
        onClick={() => history.goBack()}
      ><img src={cancel} alt="✗" /></button>

      <button
        className='done'
        onClick={() => {
          storage.createAddiction(props.name.trim().toUpperCase(), count / time, unit.trim().toUpperCase());
          props.onParentDone();
        }}
      ><img src={tick} alt="✓" /></button>
    </div>
  </>;
}