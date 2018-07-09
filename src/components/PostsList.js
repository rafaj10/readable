import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as FontAwesome from 'react-icons/lib/fa';
import PostReactions from './PostReactions';
const moment = require('moment');

const PostsList = function (props) {

  return (
    <div id="main" className="eight columns">
      <div>
        <select onChange={props.handleSortChange('sort')}>
          {props.sortList.map((item) => (
            <option value={item.id} key={item.id}>{item.title}</option>
          ))
          }
        </select>
      </div>
      {props.posts.map((item) => (
              <article className="entry" key={item.id}>

                <header className="entry-header">

                  <h2 className="entry-title">
                    <Link
                      to={`/${item.category}/${item.id}`}>{item.title}</Link>
                  </h2>

                  <div className="entry-meta">
                    <ul>
                      <li>{moment(item.timestamp).fromNow()}</li>
                      <span className="meta-sep">&nbsp;&nbsp; &bull; &nbsp;&nbsp;</span>
                      <li>{item.author}</li>
                      <span className="meta-sep">&nbsp;&nbsp; &bull; &nbsp;&nbsp;</span>
                      <li><FontAwesome.FaComments size={22} /> ({item.commentCount})</li>
                      <span className="meta-sep">&nbsp;&nbsp; &bull; &nbsp;&nbsp;</span>
                      <li><FontAwesome.FaThumbsUp size={22} /> ({item.voteScore})</li>
                    </ul>
                  </div>

                </header>

                <PostReactions postId={item.id} postCategory={item.category} handleUpdate={props.handleUpdate} list/>

              </article>
        ))
      }
    </div>
  );

};

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  sortList: PropTypes.array.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  selectedSort: PropTypes.string
}

export default PostsList