import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import Post from './Post';
import Comments from './Comments';

class PostDetail extends PureComponent {
  render() {
    const { post, comments } = this.props;

    return (
      <Col style={{ margin: '20px 50px', backgroundColor: 'white' }}>
        <Post post={post} />
        <Comments comments={comments} />
      </Col>
    );
  }
}

PostDetail.propTypes = {
  post: PropTypes.object.isRequired
};

const mapStateToProps = ({ comments }, { post }) => ({
  comments: comments[post.id] || {}
});

export default connect(mapStateToProps)(PostDetail);
