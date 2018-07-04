import React from 'react'
import PropTypes from 'prop-types';

const CommentsList = function (props) {
  return (
    <ol className="commentlist">

      {props.comments.map((item) => (
        <li className="depth-1">

          <div className="comment-content">

            <div className="comment-info">
              <cite>Itachi Uchiha</cite>

              <div className="comment-meta">
                <time className="comment-time">Jul 12, 2014 @ 23:05</time>
              </div>
            </div>

            <div className="comment-text">
              <p>Adhuc quaerendum est ne, vis ut harum tantas noluisse, id suas iisque mei. Nec te inani ponderum vulputate,
                facilisi expetenda has et. Iudico dictas scriptorem an vim, ei alia mentitum est, ne has voluptua praesent.</p>
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