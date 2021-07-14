import React, { useState } from 'react';
import { Route, Redirect, useHistory, BrowserRouter, Switch } from "react-router-dom";
import MainWin from './components/main_win';
import Addiction from './layouts/Addiction';
import Intro from './layouts/Intro';
import storage from './utils/storage.js';

// TODO: Fix for mobile devices!!!

function App() {
  let data = storage.loadData();
  let [firstTime, setFirstTime] = useState(data.firstTime);
  const history = useHistory();

  return <MainWin title="Deadiction">
    <Switch>
      <Route path="/intro">
        <Intro onEnd={() => {
          setFirstTime(false);
          data.firstTime = false;
          storage.saveData();
          history.replace("/");
        }} />
      </Route>

      <Route path="/">
        {firstTime ? <Redirect to="/intro" /> : <Addiction />}
      </Route>
    </Switch>
  </MainWin>;
}

export default App;