import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Select, Row } from 'antd';
import { newPost, retrievePosts } from '../actions/posts';
import Post from './Post';
import PostForm from './PostForm';

class Posts extends Component {
  state = {
    loading: false,
    visible: false,
    orderBy: 'votes'
  };

  componentDidMount() {
    this.props.dispatch(retrievePosts(this.props.category));
  }

  componentDidUpdate(prevProps) {
    if (this.props.category !== prevProps.category) {
      this.props.dispatch(retrievePosts(this.props.category));
    }
  }

  showModal = () => {
    this.setState(() => ({ visible: true }));
  };

  handleCancel = () => {
    this.setState(() => ({ visible: false }));
  };

  handleSave = () => {
    this.setState(() => ({ loading: true }));
    const form = this.formRef.props.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.dispatch(newPost(values)).then(() => {
        form.resetFields();
        this.setState(() => ({ visible: false, loading: false }));
      });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  handleOrder = orderBy => this.setState(() => ({ orderBy }));

  sortPosts = () => {
    const { posts } = this.props;
    const { orderBy } = this.state;

    switch (orderBy) {
      case 'date':
        return Object.keys(posts)
          .sort((a, b) => posts[b].timestamp - posts[a].timestamp)
          .reduce((result, current) => {
            result[current] = posts[current];
            return result;
          }, {});
      case 'comments':
        return Object.keys(posts)
          .sort((a, b) => posts[b].commentCount - posts[a].commentCount)
          .reduce((result, current) => {
            result[current] = posts[current];
            return result;
          }, {});
      default:
        return Object.keys(posts)
          .sort((a, b) => {
            if (posts[a].voteScore > posts[b].voteScore) return -1;
            if (posts[b].voteScore > posts[a].voteScore) return 1;

            return 0;
          })
          .reduce((result, current) => {
            result[current] = posts[current];
            return result;
          }, {});
    }
  };

  render() {
    const { category } = this.props;
    const { visible, loading, orderBy } = this.state;
    const posts = this.sortPosts();

    return (
      <Fragment>
        <Col>
          <Row style={{ margin: '20px 50px', display: 'flex' }}>
            <h1 style={{ flexGrow: 1 }}>
              Showing posts in {category ? `/${category}` : '/all'}
            </h1>
            <div>
              <span style={{ marginRight: 5 }}>Order by:</span>
              <Select
                defaultValue={orderBy}
                onChange={this.handleOrder}
                style={{ width: 200 }}
              >
                <Select.Option value="votes">Best voted</Select.Option>
                <Select.Option value="date">Most recent</Select.Option>
                <Select.Option value="comments">Most commented</Select.Option>
              </Select>
            </div>
          </Row>
          {Object.keys(posts).map(key => {
            const post = posts[key];

            return (
              <Row
                style={{ margin: '20px 50px', backgroundColor: 'white' }}
                key={post.id}
              >
                <Post post={post} />
              </Row>
            );
          })}
        </Col>
        <div style={{ position: 'fixed', bottom: 25, right: 25, zIndex: 100 }}>
          <Button
            type="primary"
            icon="plus"
            size="large"
            shape="circle"
            style={{ width: 56, height: 56 }}
            onClick={this.showModal}
          />
        </div>
        <PostForm
          wrappedComponentRef={this.saveFormRef}
          visible={visible}
          onCancel={this.handleCancel}
          onSave={this.handleSave}
          loading={loading}
        />
      </Fragment>
    );
  }
}

Posts.propTypes = {
  category: PropTypes.string
};

const mapStateToProps = ({ posts }, props) => ({
  category: props.match ? props.match.params.category : '',
  posts
});

export default connect(mapStateToProps)(Posts);
