import React from 'react'
import PropTypes from 'prop-types';

const Sidebar = function (props) {
  return (
    <div id="sidebar" className="four columns">

      <div className="widget widget_categories group">
        <h3>Categories.</h3>
        <ul>
          {props.categories.map((item) => (
            <li key={item.path}><a title="">{item.name}</a></li>
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