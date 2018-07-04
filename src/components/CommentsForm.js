import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentsForm extends Component {

  state = {
    body: '',
    author: ''
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submit(){

    const { body, author } = this.state;

    if(body === '' || author === ''){
      alert('Atention you should fill all the blanks bellow');
      return;
    }

    this.props.postComment(body, author);
  }

  render() {
    return (
      <div className="respond">

        <h3>Leave a Comment</h3>

        <div name="contactForm" id="contactForm"
             method="post" action="">
          <fieldset>

            <div className="group">
              <label>Name <span
                className="required">*</span></label>
              <input name="cName" type="text" id="cName"
                     size="35" value={this.state.author}
                     onChange={this.handleChange('author')}/>
            </div>

            <div className="message group">
              <label>Message <span
                className="required">*</span></label>
              <textarea id="cMessage" rows="10" cols="50"
                        value={this.state.body}
                        onChange={this.handleChange('body')}></textarea>
            </div>

            <button className="submit" onClick={() => {
              this.submit()
            }}>Submit
            </button>

          </fieldset>
        </div>

      </div>
    );
  }
};

CommentsForm.propTypes = {
  postComment: PropTypes.func.isRequired
}

export default CommentsForm