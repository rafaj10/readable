import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as PostActions from '../../actions/post.action';
import '../../App.css';
import PostsList from "../../components/PostsList";
import Sidebar from "../../components/Sidebar";

class HomeContainer extends Component {

  sayHellow(){
    this.props.sayHellow();
  }

  render() {
    return (
      <div id="content-wrap">

        <div className="row">

          <PostsList posts={[0,1,2,3,4,5]}/>

          <Sidebar/>

        </div>

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
