import React, { useState } from 'react';
import MainWin from './components/main_win';
import Addiction from './layouts/Addiction';
import Intro from './layouts/Intro';
import storage from './utils/storage.js';

// TODO: Fix for mobile devices!!!

function App() {
  let data = storage.loadData();
  let [firstTime, setFirstTime] = useState(data.firstTime);

  return <MainWin title="Deadiction">
    {firstTime ? <Intro onEnd={() => {
      setFirstTime(false);
      data.firstTime = false;
      storage.saveData();
    }} /> : <Addiction />}
  </MainWin>;
}

export default App;