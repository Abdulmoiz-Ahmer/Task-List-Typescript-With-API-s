import React, { useState } from 'react';
import { InitialScreen } from './Pages/InitialScreen/InitialScreen';
import { Main } from './Pages/Main/Main';
import { Switch, Route } from 'react-router-dom';
import { UserContext } from './Contexts/UserContext';

function App() {
  const [user, setUser] = useState({name:""});

  const setUserState = (user: {
    age: number,
    name: string,
    _id?: string
  }) => {
    setUser(user);
  }
  const val = { user, setUserState };
  return (
    <div className="App">
      <UserContext.Provider value={val}>
        <Switch>
          <Route exact path='/'><InitialScreen /></Route>
          <Route path='/tasks'>
            <Main />
          </Route>
        </Switch>
      </UserContext.Provider>
    </div>
  );
}
export default App;
