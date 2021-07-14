import React from 'react';
import { ListItem, ListView } from '../components/list';
import storage from '../utils/storage';
import CreateAddiction from './creation';
// import import_ from '../img/import.svg';
// import export_ from '../img/export.svg';
import add from '../img/add.svg';
import AddictionView from './AddictionView';
import ShareView from './ShareView';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

function Addiction(props) {
  let data = storage.loadData();
  const history = useHistory();

  return <Switch>
    <Route path='/create'>
      <CreateAddiction onDone={() => history.replace('/list')} />
    </Route>

    <Route path='/list'>
      <ListAddiction
        onCreate={() => history.push('/create')}
        onItemSelect={id => history.push('/view', { addictionID: id })}
        onShare={id => history.push('/share', { addictionID: id })}
      />
    </Route>

    <Route path='/view'>
      <AddictionView onCancel={history.goBack} />
    </Route>

    <Route path='/share'>
      <ShareView onCancel={history.goBack} />
    </Route>

    <Route path='/'>
      {data.addictions.length === 0 ? <Redirect to='/create' /> : <Redirect to='/list' />}
    </Route>
  </Switch>;
}

export default Addiction;

function ListAddiction(props) {
  let data = storage.loadData();

  return <div id="lister">
    <div className='header'>
      {/* <button
        className='import'
        onClick={() => props.onCreate()}
      ><img src={import_} alt="Import" /></button>
      <button
        className='export'
        onClick={() => props.onCreate()}
      ><img src={export_} alt="Export" /></button> */}
      <button
        className='add'
        title='Create new'
        onClick={() => props.onCreate()}
      ><img src={add} alt="+" /></button>
    </div>
    <div className='instruction'>Choose what you're thinking to do.</div>
    <ListView>
      {data.addictions.map(x => <ListItem
        key={x.id}
        onClick={() => props.onItemSelect(x.id)}
        onShare={() => props.onShare(x.id)}
      >Should I <b>{x.name}</b>?</ListItem>)}
    </ListView>
  </div>;
}