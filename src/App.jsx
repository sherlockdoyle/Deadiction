import React, { useState } from 'react';
import { Route, Redirect, useHistory, Switch } from "react-router-dom";
import MainWin from './components/main_win';
import Addiction from './layouts/Addiction';
import Intro from './layouts/Intro';
import storage from './utils/storage.js';

// TODO: Works for mobile devices?

function App() {
  let data = storage.loadData();
  let [firstTime, setFirstTime] = useState(data.firstTime);
  let path, url = path = '/Deadiction';  // TODO: How to use useRouteMatch here?
  const history = useHistory();

  return <MainWin title="Deadiction">
    <Switch>
      <Route path={`${path}/intro`}>
        <Intro onEnd={() => {
          setFirstTime(false);
          data.firstTime = false;
          storage.saveData();
          history.replace(url);
        }} />
      </Route>

      <Route path={path}>
        {firstTime ? <Redirect to={`${url}/intro`} /> : <Addiction />}
      </Route>

      <Route path='/'><Redirect to={url} /></Route>
    </Switch>
  </MainWin>;
}

export default App;