import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as PostActions from '../actions/post.action';
import '../App.css';
import HeaderLogo from "../components/HeaderLogo";
import PostsList from "../components/PostsList";
import Sidebar from "../components/Sidebar";

class HomeContainer extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.path !== prevProps.path) {
      this.query();
    }
  }

  componentDidMount() {
    this.query();
  }

  vote(id,upVote){
    this.props.voteOnPost(id,upVote);
  }

  query(){
    if(this.props.path){
      console.log("Has category = " + this.props.path);
      this.props.getPostsByCategory(this.props.path);
    }else{
      this.props.getPosts();
    }
    this.props.getCategories();
  }

  render() {
    return (
      <div id="content-wrap">

        <div className="row">

          <HeaderLogo />

          <PostsList
            posts={this.props.posts}
            vote={this.vote.bind(this)}
            orderBy={'upVoting'}/>

          <Sidebar categories={this.props.categories}/>

        </div>

      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.post.categories,
    posts: state.post.posts,
    path: ownProps.match.params.category
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
