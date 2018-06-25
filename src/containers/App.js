import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../App.css';
import HomeContainer from './Home/HomeContainer';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/"
          render={() => (<HomeContainer/>)}
        />
      </Switch>
    );
  }
}

export default App;