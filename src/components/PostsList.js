import React from 'react'
import _ from 'lodash';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as FontAwesome from 'react-icons/lib/fa';
const moment = require('moment');
const { limit } = require('stringz');

const PostsList = function (props) {

  const orderedPosts = _.sortBy(props.posts, ['title']);

  return (
    <div id="main" className="eight columns">
      <div>
        <select>
          <option value="recent">Most Recent</option>
          <option value="rated">Top Rated</option>
        </select>
      </div>
      {orderedPosts.map((item) => (
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

                <div className="entry-content">
                  <p>{item.body}</p>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignContent:'center' }}>
                  <div style={{ width:'200px'}}>Like <FontAwesome.FaThumbsUp size={25} /></div>
                  <div style={{ width:'200px'}}>Un-Like <FontAwesome.FaThumbsDown size={25} /></div>
                  <div style={{ width:'200px'}}>Edit <FontAwesome.FaEdit size={25} /></div>
                  <div style={{ width:'200px'}}>Delete <FontAwesome.FaTrash size={25} /></div>
                </div>

              </article>
        ))
      }
    </div>
  );

};

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostsList