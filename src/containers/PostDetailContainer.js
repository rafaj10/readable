import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as FontAwesome from 'react-icons/lib/fa'
import * as PostActions from '../actions/post.action';
import * as CommentActions from '../actions/comment.action';
import '../App.css';
import HeaderLogo from "../components/HeaderLogo";
import Sidebar from "../components/Sidebar";
import CommentsList from "../components/CommentsList";
import CommentsForm from "../components/CommentsForm";
const moment = require('moment');

class PostDetailContainer extends Component {

  state = {
    isEditingComment: false,
    commentId: '',
    commentAuthor: '',
    commentBody: ''
  }

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
      this.props.getComments(this.props.postId);
    }else{
      this.notFound();
    }
    this.props.getCategories();
  }

  notFound(){
    alert('oops not found');
  }

  postComment(body,author){
    this.props.newComment(this.state.commentBody, this.state.commentAuthor, this.props.postId, success => {
      if (success) {
        this.setState({
          isEditingComment: false,
          commentId: '',
          commentAuthor: '',
          commentBody: ''
        });
        alert("Thanks for this comment!");
      } else {
        alert("Oops some went wrong please try again");
      }
    });
  }

  deleteComment(id){
    this.props.deleteComment(id);
  }

  voteComment(id,upVote){
    this.props.voteOnComment(id,upVote);
  }

  editComment(id,author,body){
    this.setState({
      isEditingComment: true,
      commentId: id,
      commentAuthor: author,
      commentBody: body
    });
  }

  postEditComment(){
    this.props.editComment(this.state.commentId,this.state.commentBody);
    this.doneEdit();
  }

  doneEdit(){
    this.setState({
      isEditingComment: false,
      commentId: '',
      commentAuthor: '',
      commentBody: ''
    });
  }

  handleCommentChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <div id="content-wrap">

        <div className="row">

          <HeaderLogo />

          {this.props.selectedPost ? (


            <div id="main" className="eight columns">

              <article className="entry">

                <header className="entry-header">

                  <h2 className="entry-title">
                    {this.props.selectedPost.title}
                  </h2>

                  <div className="entry-meta">
                    <ul>
                      <li>{moment(this.props.selectedPost.timestamp).fromNow()}</li>
                      <span className="meta-sep">&nbsp;&nbsp; &bull; &nbsp;&nbsp;</span>
                      <li>{this.props.selectedPost.author}</li>
                      <span className="meta-sep">&nbsp;&nbsp; &bull; &nbsp;&nbsp;</span>
                      <li><FontAwesome.FaComments size={22} /> ({this.props.selectedPost.commentCount})</li>
                      <span className="meta-sep">&nbsp;&nbsp; &bull; &nbsp;&nbsp;</span>
                      <li><FontAwesome.FaThumbsUp size={22} /> ({this.props.selectedPost.voteScore})</li>
                    </ul>
                  </div>

                </header>

                <div className="entry-content">
                  {this.props.selectedPost.body}
                </div>

              </article>
              
              <div id="comments">

                <h3>{this.props.comments.length} Comment(s)</h3>

                <CommentsList
                  comments={this.props.comments}
                  voteComment={this.voteComment.bind(this)}
                  editComment={this.editComment.bind(this)}
                  deleteComment={this.deleteComment.bind(this)}
                />

                <CommentsForm
                  editMode={this.state.isEditingComment}
                  commentId={this.state.commentId}
                  commentAuthor={this.state.commentAuthor}
                  commentBody={this.state.commentBody}
                  comment={this.state.comment}
                  postEditComment={this.postEditComment.bind(this)}
                  postComment={this.postComment.bind(this)}
                  handleCommentChange={this.handleCommentChange.bind(this)}
                  cancelEdit={this.doneEdit.bind(this)}
                />

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
    comments: state.comment.comments,
    categoryPath: ownProps.match.params.category,
    postId: ownProps.match.params.post_id
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, PostActions, CommentActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PostDetailContainer);
