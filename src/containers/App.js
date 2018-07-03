import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../App.css';
import HomeContainer from './HomeContainer';
import CreatePostContainer from './CreatePostContainer';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route
          exact
          path="/:category?"
          component={HomeContainer}
        />
        <Route
          exact
          path="/post/new"
          render={() => (<CreatePostContainer/>)}
        />
      </Switch>
    );
  }
}

export default App;