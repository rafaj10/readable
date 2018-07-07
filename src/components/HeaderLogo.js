import React from 'react'
import { Link } from 'react-router-dom';

const HeaderLogo = function (props) {
  return (
    <div className="header-content twelve columns">

      <h1 id="logo-text"><Link
        to={`/`}>Readable</Link></h1>
      <p id="intro">An awesome udacity project...</p>

    </div>
  );
};

export default HeaderLogo