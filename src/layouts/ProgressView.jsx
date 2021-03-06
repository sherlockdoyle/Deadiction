import React from 'react';
import storage from '../utils/storage';
import './style.css';
import cancel from '../img/cancel.svg';
import copy from '../img/copy.svg';
import whatsapp from '../img/whatsapp.svg';
import facebook from '../img/facebook.svg';
import twitter from '../img/twitter.svg';
import reddit from '../img/reddit.svg';
import share from '../img/share.svg';
import { useLocation } from 'react-router-dom';

const URL = location.origin + process.env.PUBLIC_URL;

function copyText(text) {
  navigator.clipboard.writeText(text).then(null, () => alert('Not copied :('));
}

function ProgressView(props) {
  const location = useLocation();
  let adct = storage.getAddiction(location.state.addictionID);
  let text;  // TODO: Better text
  if (adct.timesAsked === 0)
    text = `I've not used Deadiction still, but I've a good feeling about this.
I'm trying not to ${adct.name.toLowerCase()}.`;
  else if (adct.timesAsked === 1)
    text = `Just started using Deadiction, and I've a good feeling about this.
I'm trying not to ${adct.name.toLowerCase()}${adct.timesResisted ? " and I've already started resisting" : ''}.`;
  else {
    text = `I've used Deadiction ${adct.timesAsked} times trying to reduce how much I ${adct.name.toLowerCase()}.`;
    if (adct.timesRelapsed) {
      text += `\n\nI did fail ${adct.timesRelapsed} time${adct.timesRelapsed === 1 ? '' : 's'}, but I hope to improve.`
      if (adct.timesResisted)
        text += `\nHopefully, I've been able to resist ${adct.timesResisted} time${adct.timesResisted === 1 ? '' : 's'}.`;
    }
    else if (adct.timesResisted)
      text += `\n\nI've already resisted ${adct.timesResisted} time${adct.timesResisted === 1 ? '' : 's'}.`;
  }

  return <div id='share'>
    <button
      className='cancel'
      title='Cancel'
      onClick={props.onCancel}
    ><img src={cancel} alt="✗" /></button>
    <h2>Share your story</h2>
    <div className='content'>{text}</div>

    <div className='control'>
      <button
        title='Copy text'
        onClick={() => copyText(text + '\n\n' + URL)}
      ><img src={copy} alt="Copy" /></button>

      <button
        title='Share on WhatsApp'
        onClick={() => open(`https://wa.me?text=${encodeURIComponent(text + '\n\n' + URL)}`, '_blank')}
      ><img src={whatsapp} alt="WhatsApp" /></button>

      <button
        title='Share on Facebook'
        onClick={() => {
          // Sharing to facebook is so hard!!!
          copyText(text);
          alert('Text copied, paste and share.');
          setTimeout(() => open(`https://www.facebook.com/sharer.php?u=${URL}`, '_blank'), 10);
        }}
      ><img src={facebook} alt="Facebook" /></button>

      <button
        title='Share on Twitter'
        onClick={() =>
          open(`http://twitter.com/share?text=${encodeURIComponent(text)}&url=${URL}&hashtags=deadiction`, '_blank')
        }
      ><img src={twitter} alt="Twitter" /></button>

      <button
        title='Share on Reddit'
        onClick={() =>
          open(`https://www.reddit.com/submit?title=Deadiction&text=${encodeURIComponent(text + '\n\n' + URL)}`, '_blank')
        }
      ><img src={reddit} alt="Reddit" /></button>

      <button
        title='Share anywhere'
        onClick={() => {
          if (navigator.share)
            navigator.share({
              title: 'Deadiction',
              text,
              url: URL
            }).catch(console.error);
        }}
      ><img src={share} alt="Anywhere" /></button>
    </div>
  </div>;
}

export default ProgressView;