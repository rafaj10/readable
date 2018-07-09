import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as FontAwesome from 'react-icons/lib/fa'

const Sidebar = function (props) {
  return (
    <div id="sidebar" className="four columns">

      <div style={{ paddingBottom:'20px'}}>
        <Link
          to={`/${props.currentCategory}/post/new`}><FontAwesome.FaPlus size={22} /> add new post</Link>
      </div>

      <div className="widget widget_categories group">
        <h3>Categories.</h3>
        <ul>
          <li key={0}><Link
            to={`/`}>all</Link></li>
          {props.categories.map((item) => (
            <li key={item.path}><Link
              to={`/${item.path}`}>{item.name}</Link></li>
            ))
          }
        </ul>
      </div>

    </div>
  );
};

Sidebar.propTypes = {
  categories: PropTypes.array.isRequired
}

export default Sidebar