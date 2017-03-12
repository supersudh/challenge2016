import React, { Component, PropTypes } from 'react';

// Action imports
import { createPost } from '../actions';

// Redux imports
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

// Routing imports
import { Link } from 'react-router';

// Form imports
import { Field, reduxForm } from 'redux-form';

class PostsNew extends Component {
  
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.state = {disable: false};
  }
  

  onSubmit(props) {
    this.props.createPost(props).then(data => {
      this.context.router.push("/");
    }, err => {
      console.log(err);
    });

  }

  render() {
    // console.log(this.props);
    const { fields: { title, categories, content },handleSubmit } = this.props;

    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <h3>Create Post</h3>

          <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
            <label>Title</label>
            <input type="text" className="form-control" {...title} />
            <div className="errors">
              {title.touched ? title.error : ''}
            </div>
          </div>

          <div className={`form-group ${categories.touched && categories.invalid ? 'has-danger' : ''}`}>
            <label>Categories</label>
            <input type="text" className="form-control" {...categories} />
            <div className="errors">
              {categories.touched ? categories.error : ''}
            </div>
          </div>

          <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : ''}`}>
            <label>Content</label>
            <textarea type="text" className="form-control" {...content} />
            <div className="errors">
              {content.touched ? content.error : ''}
            </div>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="cancel-button btn btn-secondary">Cancel</Link>
          <button
          className="btn btn-danger"
          onClick={this.handleDisableTest.bind(this)}
          disabled={this.state.disable}
           >
            Disable me :(
        </button>
        </form>

        

      </div>
    );
  }

  handleDisableTest() {
    this.setState({disable: true});
    let _this = this;
    setTimeout(function() {
      _this.setState({disable: false});
    }, 1500);
  }

}

function validate(data) {
  const errors = {};
  for(let key in data) {
    if(!data[key])
      errors[key] = `${key} must not be Empty`;
  }

  return errors;
}

// ### Arguments 
// connect : (mapStateToProps, mapDispatchToProps)
// reduxForm : (config, mapStateToProps, mapDispatchToProps)

export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title','categories','content'],
  validate: validate
}, null, { createPost })(PostsNew);

