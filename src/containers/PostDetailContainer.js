import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as FontAwesome from 'react-icons/lib/fa'
import * as PostActions from '../actions/post.action';
import '../App.css';
import PostsList from "../components/PostsList";
import Sidebar from "../components/Sidebar";
import CommentsList from "../components/CommentsList";
import CommentsForm from "../components/CommentsForm";

class PostDetailContainer extends Component {

  componentDidUpdate(prevProps) {
    if (this.props.path !== prevProps.path) {
      this.query();
    }
  }

  componentDidMount() {
    this.query();
  }

  query(){
    if(this.props.postId){
      console.log("Has PostIt = " + this.props.postId);
      this.props.getPost(this.props.postId);
    }else{
      this.notFound();
    }
    this.props.getCategories();
  }

  notFound(){
    alert('oops not found');
  }

  postComment(body,author){
    alert('Aqui '+author);
  }

  render() {
    return (
      <div id="content-wrap">

        <div className="row">
          {this.props.selectedPost ? (


            <div id="main" className="eight columns">

              <article className="entry">

                <header className="entry-header">

                  <h2 className="entry-title">
                    {this.props.selectedPost.title}
                  </h2>

                  <div className="entry-meta">
                    <ul>
                      <li>July 11, 2014</li>
                      <span className="meta-sep">&bull;</span>
                      <li>
                        <a  title="" rel="category tag">Wordpress</a>,
                        <a  title="" rel="category tag">Ghost</a>
                      </li>
                      <span className="meta-sep">&bull;</span>
                      <li>{this.props.selectedPost.author}</li>
                    </ul>
                  </div>

                </header>

                <div className="entry-content">
                  {this.props.selectedPost.body}
                </div>

              </article>
              
              <div id="comments">

                <h3>{this.props.selectedPost.commentCount} Comment(s)</h3>

                <CommentsList comments={[1,2,3]} />

                <CommentsForm postComment={this.postComment.bind(this)}/>

              </div> 


            </div>
            
          ) : (<div>loading...</div>)}


          <Sidebar categories={this.props.categories}/>

        </div>

      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.post.categories,
    selectedPost: state.post.selectedPost,
    categoryPath: ownProps.match.params.category,
    postId: ownProps.match.params.post_id
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailContainer);
