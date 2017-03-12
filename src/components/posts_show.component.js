import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux'
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router';

class PostShow extends Component {

  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);  
    this.handleDelete = this.handleDelete.bind(this);
  }
  
  handleDelete() {
    this.props.deletePost(this.props.params.id).then(data => {
      this.context.router.push("/");
    }, err => {
        console.log(err);
    });
  }

  render() {

    const { post } = this.props;

    if (!this.props.post) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <Link to="/">Back To Index</Link>
        <button
          className="btn btn-danger pull-xs-right"
          onClick={this.handleDelete}>
            Delete Post
        </button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }

}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

export default connect(mapStateToProps, { fetchPost, deletePost })(PostShow);