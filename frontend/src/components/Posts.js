import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Col, Row } from 'antd';
import { newPost, retrievePosts } from '../actions/posts';
import Post from './Post';
import PostForm from './PostForm';

class Posts extends Component {
  state = {
    loading: false,
    visible: false
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
        this.setState(() => ({ visible: false }));
      });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { posts, category } = this.props;
    const { visible, loading } = this.state;

    return (
      <Fragment>
        <Col>
          <Row style={{ margin: '20px 50px' }}>
            <h1>Showing posts to {category ? `/${category}` : '/'}</h1>
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
        <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 100 }}>
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
