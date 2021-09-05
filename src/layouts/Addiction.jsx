import React from 'react';
import { ListItem, ListView } from '../components/list';
import Popup from '../components/popup';
import Dialog from '../components/dialog';
import storage from '../utils/storage';
import CreateAddiction from './creation';
import import_ from '../img/import.svg';
import export_ from '../img/export.svg';
import add from '../img/add.svg';
import AddictionView from './AddictionView';
import ProgressView from './ProgressView';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';

function Addiction() {
  let data = storage.loadData();
  let [isPopupOpen, setIsPopupOpen] = React.useState(false);
  let [deletionID, setDeletionID] = React.useState(null);
  const history = useHistory();

  return <>
    <Switch>
      <Route path='/create'>
        <CreateAddiction onDone={() => history.replace('/list')} />
      </Route>

      <Route path='/list'>
        <ListAddiction
          onCreate={() => history.push('/create')}
          onItemSelect={id => history.push('/view', { addictionID: id })}
          onViewProgress={id => history.push('/progress', { addictionID: id })}
          onDelete={id => {
            setDeletionID(id);
            setIsPopupOpen(true);
          }}
        />

        {isPopupOpen && <Popup onClose={() => setIsPopupOpen(false)}>
          <Dialog
            title='Delete'
            controls={{
              'Yes, I am sure!': () => {
                storage.removeAddiction(deletionID);
                setIsPopupOpen(false);
              },
              'Nooo...': () => setIsPopupOpen(false)
            }}
          >
            Are you sure you want to delete <b>{storage.getAddiction(deletionID).name}</b>?<br />
            Are you sure you won't <b>{storage.getAddiction(deletionID).name}</b> again?
          </Dialog>
        </Popup>}
      </Route>

      <Route path='/view'>
        <AddictionView onCancel={history.goBack} />
      </Route>

      <Route path='/progress'>
        <ProgressView onCancel={history.goBack} />
      </Route>

      <Route path='/'>
        {data.addictions.length === 0 ? <Redirect to='/create' /> : <Redirect to='/list' />}
      </Route>
    </Switch>
  </>;
}

export default Addiction;

function ListAddiction(props) {
  let data = storage.loadData();

  return data.addictions.length === 0 ?
    <Redirect to='/create' /> :
    <div id="lister">
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
          onViewProgress={() => props.onViewProgress(x.id)}
          onDelete={() => props.onDelete(x.id)}
        >Should I <b>{x.name}</b>?</ListItem>)}
      </ListView>
    </div>;
}