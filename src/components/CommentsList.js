import React from 'react'
import PropTypes from 'prop-types';
import * as FontAwesome from 'react-icons/lib/fa';
const moment = require('moment');

const CommentsList = function (props) {
  return (
    <ol className="commentlist">

      {props.comments.map((item) => (
        <li className="depth-1" style={{ paddingLeft:'2%'}} key={item.id}>

          <div className="comment-content">

            <div className="comment-info">
              <cite>{item.author}</cite>

              <div className="comment-meta">
                <time className="comment-time">{moment(item.timestamp).fromNow()} &nbsp;&nbsp; <FontAwesome.FaThumbsUp size={22} /> ({item.voteScore})</time>
              </div>
            </div>

            <div className="comment-text">
              <p>{item.body}</p>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', alignContent:'flex-end' }}>
              <div style={{ width:'70px'}}><button onClick={() => props.voteComment(item.id,true)}><FontAwesome.FaThumbsUp size={25} /></button></div>
              <div style={{ width:'70px'}}><button onClick={() => props.voteComment(item.id,false)}><FontAwesome.FaThumbsDown size={25} /></button></div>
              <div style={{ width:'70px'}}><button onClick={() => props.editComment(item.id,item.author,item.body)}><FontAwesome.FaEdit size={25} /></button></div>
              <div style={{ width:'70px'}}><button onClick={() => props.deleteComment(item.id)} style={{ backgroundColor:'red'}}><FontAwesome.FaTrash size={25} /></button></div>
            </div>

          </div>

        </li>
      ))
      }

    </ol>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired,
  voteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired
}

export default CommentsList