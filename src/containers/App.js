import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import '../App.css';
import HomeContainer from './HomeContainer';
import CreatePostContainer from './CreatePostContainer';
import PostDetailContainer from './PostDetailContainer';
import NothingHereContainer from './NothingHereContainer';

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
          path="/:category/:post_id"
          component={PostDetailContainer}
        />
        <Route
          exact
          path="/:category/post/new"
          component={CreatePostContainer}
        />
        <Route
          exact
          path="*"
          component={NothingHereContainer}
        />
      </Switch>
    );
  }
}

export default App;