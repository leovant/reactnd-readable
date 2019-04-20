import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Col } from 'antd';
import Comment from './Comment';

class Comments extends PureComponent {
  render() {
    const { comments } = this.props;

    return (
      <Col>
        {Object.keys(comments).map(key => {
          const comment = comments[key];

          return <Comment key={comment.id} comment={comment} />;
        })}
      </Col>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.object.isRequired
};

export default Comments;
