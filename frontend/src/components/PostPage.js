import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import PostDetail from './PostDetail';
import CommentForm from './CommentForm';
import { getSinglePost } from '../actions/posts';
import { newComment, retrieveComments } from '../actions/comments';

class PostPage extends Component {
  state = {
    loading: false,
    visible: false
  };

  componentDidMount() {
    const { id, posts, comments, dispatch } = this.props;

    if (!posts[id]) {
      dispatch(getSinglePost(id));
    }
    if (!comments[id]) {
      dispatch(retrieveComments(id));
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
    const { id, dispatch } = this.props;
    const form = this.formRef.props.form;

    form.validateFields((err, values) => {
      if (err) {
        return;
      }
      dispatch(newComment({ ...values, parentId: id })).then(() => {
        form.resetFields();
        this.setState(() => ({ visible: false, loading: false }));
      });
    });
  };

  saveFormRef = formRef => {
    this.formRef = formRef;
  };

  render() {
    const { visible, loading } = this.state;
    const { id, posts } = this.props;
    const post = posts[id] || {};

    return (
      <Fragment>
        <PostDetail post={post} />;
        <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 100 }}>
          <Button
            type="primary"
            icon="message"
            size="large"
            shape="circle"
            style={{ width: 56, height: 56 }}
            onClick={this.showModal}
          />
        </div>
        <CommentForm
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

const mapStateToProps = ({ posts, comments }, props) => {
  const { id } = props.match.params;

  return {
    id,
    posts,
    comments
  };
};

export default connect(mapStateToProps)(PostPage);
