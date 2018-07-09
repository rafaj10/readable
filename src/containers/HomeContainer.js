import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as PostActions from '../actions/post.action';
import '../App.css';
import HeaderLogo from "../components/HeaderLogo";
import PostsList from "../components/PostsList";
import Sidebar from "../components/Sidebar";

class HomeContainer extends Component {

  state = {
    sortList: [{id: 1, title:'Most Recent'},
        {id: 2, title:'Oldest'},
        {id: 3, title:'Top Voted'},
        {id: 4, title:'Less Volted'}],
    selectedSort: '1'
  };

  componentDidUpdate(prevProps) {
    if (this.props.path !== prevProps.path) {
      this.query();
    }
  }

  componentDidMount() {
    this.query();
  }

  vote(id,upVote){
    this.props.voteOnPost(id,upVote, success => {
      if (success) {
        this.updateLists(this.state.selectedSort);
      } else {
        alert("Oops some went wrong please try again");
      }
    });
  }

  edit(id,category){
    this.props.history.push(`/${category}/${id}/edit`);
  }

  delete(id){
    this.props.deletePost(id, success => {
      if (success) {
        this.updateLists(this.state.selectedSort);
      } else {
        alert("Oops some went wrong please try again");
      }
    });
  }

  query(){
    if(this.props.path){
      this.props.getPostsByCategory(this.props.path);
    }else{
      this.props.getPosts();
    }
    this.props.getCategories();
  }

  handleSortChange = name => event => {
    this.setState({...this.state, selectedSort: event.target.value});
    this.updateLists(event.target.value);
  };

  updateLists(sortId){
    switch (sortId) {
      case '1':
        return this.props.orderPostsByDate(true);
      case '2':
        return this.props.orderPostsByDate(false);
      case '3':
        return this.props.orderPostsByVote(true);
      case '4':
        return this.props.orderPostsByVote(false);
      default:
        return;
    }
  }

  render() {
    return (
      <div id="content-wrap">

        <div className="row">

          <HeaderLogo />

          <PostsList
            posts={this.props.posts || []}
            vote={this.vote.bind(this)}
            edit={this.edit.bind(this)}
            delete={this.delete.bind(this)}
            sortList={this.state.sortList}
            handleSortChange={this.handleSortChange.bind(this)}
            selectedSort={this.state.selectedSort}/>

          <Sidebar
            currentCategory={this.props.path || 'all'}
            categories={this.props.categories}/>

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
