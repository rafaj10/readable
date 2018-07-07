import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as FontAwesome from 'react-icons/lib/fa';
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
                

                <div style={{ display: 'flex', justifyContent: 'flex-end', alignContent:'flex-end' }}>
                  <div style={{ width:'70px'}}><button onClick={() => props.vote(item.id,true)}><FontAwesome.FaThumbsUp size={25} /></button></div>
                  <div style={{ width:'70px'}}><button onClick={() => props.vote(item.id,false)}><FontAwesome.FaThumbsDown size={25} /></button></div>
                  <div style={{ width:'70px'}}><button onClick={() => props.edit(item.id)}><FontAwesome.FaEdit size={25} /></button></div>
                  <div style={{ width:'70px'}}><button onClick={() => props.delete(item.id)} style={{ backgroundColor:'red'}}><FontAwesome.FaTrash size={25} /></button></div>
                </div>

              </article>
        ))
      }
    </div>
  );

};

PostsList.propTypes = {
  posts: PropTypes.array.isRequired,
  vote: PropTypes.func.isRequired,
  edit: PropTypes.func.isRequired,
  delete: PropTypes.func.isRequired,
  sortList: PropTypes.array.isRequired,
  handleSortChange: PropTypes.func.isRequired,
  selectedSort: PropTypes.string
}

export default PostsList