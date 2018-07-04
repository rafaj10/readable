import React from 'react'
import PropTypes from 'prop-types';
const moment = require('moment');

const CommentsList = function (props) {
  return (
    <ol className="commentlist">

      {props.comments.map((item) => (
        <li className="depth-1" key={item.id}>

          <div className="comment-content">

            <div className="comment-info">
              <cite>{item.author}</cite>

              <div className="comment-meta">
                <time className="comment-time">{moment(item.timestamp).fromNow()}</time>
              </div>
            </div>

            <div className="comment-text">
              <p>{item.body}</p>
            </div>

          </div>

        </li>
      ))
      }

    </ol>
  );
};

CommentsList.propTypes = {
  comments: PropTypes.array.isRequired
}

export default CommentsList