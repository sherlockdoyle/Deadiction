import React from 'react';
import storage from '../utils/storage';
import cancel from '../img/cancel.svg';

function AddictionView(props) {
  let addiction = storage.getAddiction(props.addictionID)
  let currentRatio = addiction.timesUsed === 0 ? 1 : addiction.timesUsed / addiction.timesAsked;
  // console.log(addiction, currentRatio, addiction.acceptableRatio)
  let canDo = currentRatio <= addiction.acceptableRatio;

  return <div id='viewer'>
    <button
      className='cancel'
      onClick={props.onCancel}
    ><img src={cancel} alt="✗" /></button>
    <div style={{
      fontSize: '6em',
      fontWeight: 'bold',
      hyphens: 'auto',
      margin: 'auto 0.66667em'
    }}>You <span style={{
      color: canDo ? '#002300' : '#490000'
    }}>{canDo ? 'may' : 'should not'}</span> {addiction.name}.</div>

    <div className='control'>
      <div className='header'>Please choose one to save progress.</div>
      <div className='buttons'>
        <button
          className='no'
          onClick={() => {
            addiction.timesAsked += 1;
            addiction.timesUsed += 1;
            if (!canDo) addiction.timesRelapsed += 1
            addiction.acceptableRatio = Math.max(addiction.acceptableRatio - addiction.decrementFactor, 0);
            storage.saveData();
            props.onCancel();
          }}
        >I <b>did</b> {addiction.name}</button>

        <button
          className='yes'
          onClick={() => {
            addiction.timesAsked += 1;
            if (canDo) addiction.timesResisted += 1;
            storage.saveData();
            props.onCancel();
          }}
        >I <b>did not</b> {addiction.name}</button>
      </div>
    </div>
  </div>;
}

export default AddictionView;