import React from 'react';
import './App.scss';
import Header from './components/Header/Header';
import Container from './container/Container'

import {
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

function App() {

  return (
    <div className='App'>
      <header className='App-header'>
      <Header />
      </header>
      <Switch>
          <Route exact path='/'>
          <Redirect push to='/books' />
        </Route>
        <Route path='/books'>
          <Container />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
