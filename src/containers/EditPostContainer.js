import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as PostActions from '../actions/post.action';
import HeaderLogo from "../components/HeaderLogo";
import '../App.css';

class EditPostContainer extends Component {

  state = {
    title: '',
    body: ''
  };

  componentDidUpdate(prevProps) {
    if (this.props.path !== prevProps.path) {
      this.query();
    }
  }

  componentDidMount() {
    this.query();
  }

  query(){
    if(this.props.postId){
      this.props.getPost(this.props.postId, success => {
        if (success) {
          this.setState({
            title: this.props.selectedPost.title,
            body: this.props.selectedPost.body,
            author: this.props.selectedPost.author,
            category: this.props.selectedPost.category
          });
        } else {
          this.notFound();
        }
      });
    }else{
      this.notFound();
    }
  }

  notFound(){
    this.props.history.push('/');
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  submit(){

    var category = this.state.category;

    if(category === ''){
      category = this.props.categories[0].name;
    }

    const { title, body } = this.state;

    if( title === '' || body === ''){
      alert('Atention you should fill all the blanks bellow');
      return;
    }

    this.props.editPost(this.props.postId, title, body, success => {
      if (success) {
        this.props.history.push(`/${category}/${this.props.postId}`)
      } else {
        alert("Oops some went wrong please try again");
      }
    });
  }

  render() {
    return (
      <div id="content-wrap">

        <div className="row">

          <HeaderLogo />

          <div className="respond">

            <h3>Edit Post:</h3>

            <div name="contactForm" id="contactForm">
              <fieldset>

                <div className="group">
                  <label>Title <span className="required">*</span></label>
                  <input type="text" id="cTitle" size="35" value={this.state.title} onChange={this.handleChange('title')} />
                </div>

                <div className="message group">
                  <label>Body <span className="required">*</span></label>
                  <textarea id="cBody" rows="10" cols="50" value={this.state.body} onChange={this.handleChange('body')} ></textarea>
                </div>

                <button className="submit" onClick={() => { this.submit() }}>Confirm</button>

              </fieldset>
            </div>

          </div>

        </div>

      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    categories: state.post.categories,
    selectedPost: state.post.selectedPost,
    categoryPath: ownProps.match.params.category,
    postId: ownProps.match.params.post_id
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditPostContainer));
