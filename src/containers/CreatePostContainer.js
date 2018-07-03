import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
import { bindActionCreators } from 'redux';
import {connect} from 'react-redux';
import * as PostActions from '../actions/post.action';
import '../App.css';

class CreatePostContainer extends Component {

  state = {
    title: '',
    body: '',
    author: '',
    category: ''
  };

  componentDidMount() {
    this.props.getCategories();
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

    const { title, body, author } = this.state;

    if( title === '' || body === '' || author === ''){
      alert('Atention you should fill all the blanks bellow');
      return;
    }

    this.props.newPost(title, body, author, category, success => {
      if (success) {
        this.props.history.push('/');
      } else {
        alert("Oops some went wrong please try again");
      }
    });
  }

  render() {
    return (
      <div id="content-wrap">

        <div className="row">

          <div className="respond">

            <h3>New Post:</h3>

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

                <div className="group">
                  <label>Author <span className="required">*</span></label>
                  <input type="text" id="cAuthor" size="35" value={this.state.author} onChange={this.handleChange('author')} />
                </div>

                <div className="group">
                  <label>Category <span className="required">*</span></label>
                  <select onChange={this.handleChange('category')}>
                    {this.props.categories.map((item) => (
                    <option value={item.name} key={item.path}>{item.name}</option>
                    ))
                    }
                  </select>
                </div>

                <button className="submit" onClick={() => { this.submit() }}>Submit</button>

              </fieldset>
            </div>

          </div>

        </div>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    categories: state.post.categories
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(PostActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(CreatePostContainer));
