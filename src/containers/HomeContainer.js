import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as FontAwesome from 'react-icons/lib/fa'
import * as PostActions from '../actions/post.action';
import '../App.css';
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

          <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', width:'50%', alignContent:'center' }}><select>
              <option value="recent">Most Recent</option>
              <option value="rated">Top Rated</option>
            </select></div>
            <div style={{ display: 'flex', width:'50%' }}><Link
              to='/post/new'><FontAwesome.FaPlus size={22} /> add new post</Link></div>
          </div>


          <PostsList posts={this.props.posts} orderBy={'upVoting'}/>

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