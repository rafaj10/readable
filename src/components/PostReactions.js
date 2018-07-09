import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as PostActions from '../actions/post.action';
import * as FontAwesome from 'react-icons/lib/fa';

class PostReactions extends Component {

  vote(id,upVote){
    this.props.voteOnPost(id,upVote, success => {
      if (success) {
        if(this.props.list){
          this.props.handleUpdate();
        }
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
        if(this.props.list) {
          this.props.handleUpdate();
        }else{
          this.props.history.push(`/${this.props.postCategory}`);
        }
      } else {
        alert("Oops some went wrong please try again");
      }
    });
  }

  render() {
    return (
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignContent:'flex-end' }}>
        <div style={{ width:'70px'}}><button onClick={() => this.vote(this.props.postId,true)}><FontAwesome.FaThumbsUp size={25} /></button></div>
        <div style={{ width:'70px'}}><button onClick={() => this.vote(this.props.postId,false)}><FontAwesome.FaThumbsDown size={25} /></button></div>
        <div style={{ width:'70px'}}><button onClick={() => this.edit(this.props.postId, this.props.postCategory)}><FontAwesome.FaEdit size={25} /></button></div>
        <div style={{ width:'70px'}}><button onClick={() => this.delete(this.props.postId)} style={{ backgroundColor:'red'}}><FontAwesome.FaTrash size={25} /></button></div>
      </div>
    );
  }

};

PostReactions.propTypes = {
  postId: PropTypes.string.isRequired,
  postCategory: PropTypes.string.isRequired,
  handleUpdate: PropTypes.func,
  list: PropTypes.bool
}

function mapStateToProps() {
  return {};
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PostReactions));