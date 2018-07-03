import React from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Sidebar = function (props) {
  return (
    <div id="sidebar" className="four columns">

      <div className="widget widget_categories group">
        <h3>Categories.</h3>
        <ul>
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