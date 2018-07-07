import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentsForm extends Component {

  submit(){

    const { commentBody, commentAuthor } = this.props;

    if(commentBody === '' || commentAuthor === ''){
      alert('Atention you should fill all the blanks bellow');
      return;
    }

    this.props.postComment();
  }

  submitEdit(){

    const { commentId, commentBody, commentAuthor } = this.props;

    if(commentId === '' || commentBody === '' || commentAuthor === ''){
      alert('Atention you should fill all the blanks bellow');
      return;
    }

    this.props.postEditComment();
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
                     size="35" value={this.props.commentAuthor}
                     onChange={!this.props.editMode ? this.props.handleCommentChange('commentAuthor') : undefined}
                     />
            </div>

            <div className="message group">
              <label>Message <span
                className="required">*</span></label>
              <textarea id="cMessage" rows="10" cols="50"
                        value={this.props.commentBody}
                        onChange={this.props.handleCommentChange('commentBody')}
                        ></textarea>
            </div>

            {this.props.editMode && (
              <button className="submit" onClick={() => { this.props.cancelEdit() }} style={{ backgroundColor:'red'}}>CANCEL
              </button>
            )}

            <button className="submit" onClick={() => {
              this.props.editMode? this.submitEdit() : this.submit()
            }}>Submit
            </button>

          </fieldset>
        </div>

      </div>
    );
  }
};

CommentsForm.propTypes = {
  postComment: PropTypes.func.isRequired,
  postEditComment: PropTypes.func.isRequired,
  editMode: PropTypes.bool.isRequired,
  cancelEdit: PropTypes.func.isRequired
}

export default CommentsForm