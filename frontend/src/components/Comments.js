import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';
import Comment from './Comment';

class Comments extends PureComponent {
  render() {
    const { comments } = this.props;

    return (
      <Col>
        <Row style={{ marginLeft: 12 }}>
          <h1>Comments</h1>
        </Row>
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
