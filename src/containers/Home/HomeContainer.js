import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as PostActions from '../../actions/post.action';
import logo from '../../logo.svg';
import '../../App.css';

class HomeContainer extends Component {

  sayHellow(){
    this.props.sayHellow();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">Welcome <input type="button" name="submit" value="SAY HELLOW" onClick={() => this.sayHellow()} /></h1>
        </header>
        <p className="App-intro">
          Redux are saying {this.props.hellow}
        </p>
     </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    hellow: state.post.hellow
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
