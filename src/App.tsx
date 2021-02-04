import React from 'react';
import {InitialScreen} from  './Pages/InitialScreen/InitialScreen';
import {Main} from './Pages/Main/Main';
import {Switch,Route} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>  <InitialScreen /></Route>
        <Route path='/tasks'>  <Main /></Route>
      </Switch>
    </div>
  );
}

export default App;
