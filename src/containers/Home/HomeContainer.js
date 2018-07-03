import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as FontAwesome from 'react-icons/lib/fa'
import * as PostActions from '../../actions/post.action';
import '../../App.css';
import PostsList from "../../components/PostsList";
import Sidebar from "../../components/Sidebar";

class HomeContainer extends Component {

  componentDidMount() {
    this.props.getPosts();
    this.props.getCategories();
  }

  sayHellow(){
    this.props.sayHellow();
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
            <div style={{ display: 'flex', width:'50%' }}><FontAwesome.FaPlus size={22} /> add new post</div>
          </div>


          <PostsList posts={this.props.posts}/>

          <Sidebar categories={this.props.categories}/>

        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.post.categories,
    posts: state.post.posts
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeContainer);
