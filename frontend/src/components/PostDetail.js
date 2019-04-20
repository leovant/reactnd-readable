import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Icon, Col, Row, Select, Tooltip } from 'antd';
import Post from './Post';
import Comments from './Comments';

class PostDetail extends Component {
  state = {
    orderBy: 'votes'
  };

  handleOrder = orderBy => this.setState(() => ({ orderBy }));

  sortComments = () => {
    const { comments } = this.props;
    const { orderBy } = this.state;

    switch (orderBy) {
      case 'date':
        return Object.keys(comments)
          .sort((a, b) => comments[b].timestamp - comments[a].timestamp)
          .reduce((result, current) => {
            result[current] = comments[current];
            return result;
          }, {});
      default:
        return Object.keys(comments)
          .sort((a, b) => {
            if (comments[a].voteScore > comments[b].voteScore) return -1;
            if (comments[b].voteScore > comments[a].voteScore) return 1;

            return 0;
          })
          .reduce((result, current) => {
            result[current] = comments[current];
            return result;
          }, {});
    }
  };

  render() {
    const { post } = this.props;
    const { orderBy } = this.state;
    const comments = this.sortComments();

    return (
      <Col style={{ margin: '20px 50px', backgroundColor: 'white' }}>
        <Post post={post} />
        {Object.keys(comments).length > 0 && (
          <Row style={{ margin: '0 12px', display: 'flex' }}>
            <h1 style={{ flexGrow: 1 }}>Comments</h1>
            <div>
              <span style={{ marginRight: 5 }}>Order by:</span>
              <Select defaultValue={orderBy} onChange={this.handleOrder}>
                <Select.Option value="votes">Best voted</Select.Option>
                <Select.Option value="date">Most recent</Select.Option>
              </Select>
            </div>
          </Row>
        )}
        <Comments comments={comments} />
        <div
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            padding: '16px 12px'
          }}
        >
          <Tooltip title="Close">
            <Icon type="close" onClick={() => this.props.history.push('/')} />
          </Tooltip>
        </div>
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

export default withRouter(connect(mapStateToProps)(PostDetail));
