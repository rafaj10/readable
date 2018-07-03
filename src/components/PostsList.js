import React from 'react'
import PropTypes from 'prop-types';

const PostsList = function (props) {
  return (
    <div id="main" className="eight columns">
      {props.posts.map((item) => (
              <article className="entry">

                <header className="entry-header">

                  <h2 className="entry-title">
                    <a href="single.html" title="">Hey, We Love Open Sans!</a>
                  </h2>

                  <div className="entry-meta">
                    <ul>
                      <li>July 12, 2014</li>
                      <span className="meta-sep">&bull;</span>
                      <li><a title="" rel="category tag">Ghost</a></li>
                      <span className="meta-sep">&bull;</span>
                      <li>John Doe</li>
                    </ul>
                  </div>

                </header>

                <div className="entry-content">
                  <p>Duis ex ad cupidatat tempor Excepteur cillum cupidatat fugiat nostrud cupidatat dolor sunt sint sit nisi est eu exercitation incididunt adipisicing veniam velit id fugiat enim mollit amet anim veniam dolor dolor irure velit commodo cillum sit nulla ullamco magna amet magna cupidatat qui labore cillum sit in tempor veniam consequat non laborum adipisicing aliqua ea nisi sint ut quis proident ullamco ut dolore culpa occaecat ut laboris in sit minim cupidatat ut dolor voluptate enim veniam consequat occaecat fugiat in adipisicing in amet Ut nulla nisi non ut enim aliqua laborum mollit quis nostrud sed sed.</p>
                </div>
              </article>
        ))
      }
      <div className="pagenav">
        <p>
          <a rel="prev" >Prev</a>
          <a rel="next" >Next</a>
        </p>
      </div>
    </div>
  );
};

PostsList.propTypes = {
  posts: PropTypes.array.isRequired
}

export default PostsList