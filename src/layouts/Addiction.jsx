import React, { useState } from 'react';
import { ListItem, ListView } from '../components/list';
import storage from '../utils/storage';
import CreateAddiction from './creation';
import add from '../img/add.svg';
import AddictionView from './AddictionView';
import ShareView from './ShareView';

function Addiction(props) {
  let data = storage.loadData();
  let [addictionID, setAddictionID] = useState(null);
  let [view, setView] = useState(data.addictions.length === 0 ? 0 : 1);

  let views = [
    <CreateAddiction onCreate={() => setView(data.addictions.length === 0 ? 0 : 1)} />,
    <ListAddiction
      onCreate={() => setView(0)}
      onItemSelect={(id) => {
        setAddictionID(id);
        setView(2);
      }}
      onShare={(id) => {
        setAddictionID(id);
        setView(3);
      }}
    />,
    <AddictionView
      addictionID={addictionID}
      onCancel={() => setView(1)}
    />,
    <ShareView
      addictionID={addictionID}
      onCancel={() => setView(1)}
    />
  ];

  return views[view];
}

export default Addiction;

function ListAddiction(props) {
  let data = storage.loadData();

  return <div id="lister">
    <div className='header'>
      <button
        className='add'
        onClick={() => props.onCreate()}
      ><img src={add} alt="+" /></button>
    </div>
    <ListView>
      {data.addictions.map(x => <ListItem
        key={x.id}
        onClick={() => props.onItemSelect(x.id)}
        onShare={() => props.onShare(x.id)}
      >Should I <b>{x.name}</b>?</ListItem>)}
    </ListView>
  </div>;
}