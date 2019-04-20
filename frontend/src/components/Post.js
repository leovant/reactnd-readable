import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { Button, Comment, Icon, Input, Popconfirm, Tooltip } from 'antd';
import { dateTime, fromNow } from '../utils/helpers';
import { editPost, removePost, voteInPost } from '../actions/posts';

class Post extends Component {
  state = {
    editing: false,
    title: '',
    body: ''
  };

  edit = post => {
    this.setState(() => ({
      editing: true,
      title: post.title,
      body: post.body
    }));
  };

  handleBodyChange = body => {
    this.setState(() => ({ body }));
  };

  handleTitleChange = title => {
    this.setState(() => ({ title }));
  };

  save = () => {
    const { body, title } = this.state;
    const { post, dispatch } = this.props;

    dispatch(editPost(post, title, body));

    this.setState(() => ({ editing: false }));
  };

  delete = () => {
    const { post, dispatch } = this.props;
    dispatch(removePost(post)).then(() => {
      this.props.history.push(`/`);
    });
  };

  vote = option => {
    const { post, dispatch } = this.props;

    dispatch(voteInPost(post, option));
  };

  render() {
    const { post } = this.props;
    const { editing, title, body } = this.state;

    return (
      <Comment
        author={`@${post.author}`}
        datetime={
          <Tooltip title={dateTime(post.timestamp)}>
            <span>{fromNow(post.timestamp)}</span>
          </Tooltip>
        }
        actions={[
          <span style={{ marginRight: 10, fontSize: 14 }}>
            <Tooltip title="Like">
              <Icon type="like" onClick={() => this.vote('upVote')} />
            </Tooltip>
            <span style={{ padding: 10 }}>{post.voteScore}</span>
            <Tooltip title="Dislike">
              <Icon type="dislike" onClick={() => this.vote('downVote')} />
            </Tooltip>
          </span>,
          <Link to={`/${post.category}/${post.id}`}>
            <Icon type="message" />
            <span style={{ padding: 10 }}>{post.commentCount} comments</span>
          </Link>,
          !editing && (
            <span style={{ marginLeft: 10 }}>
              <Button icon="edit" size="small" onClick={() => this.edit(post)}>
                Edit
              </Button>
              <Popconfirm
                title="Are you sure about delete this post?"
                onConfirm={this.delete}
                okText="Yes"
                cancelText="No"
              >
                <Button icon="delete" size="small" style={{ marginLeft: 10 }}>
                  Delete
                </Button>
              </Popconfirm>
            </span>
          ),
          editing && (
            <span style={{ marginLeft: 10 }}>
              <Button
                type="primary"
                icon="save"
                size="small"
                onClick={() => this.save()}
              >
                Save
              </Button>
              <Button
                icon="close"
                size="small"
                onClick={() => this.setState(() => ({ editing: false }))}
                style={{ marginLeft: 10 }}
              >
                Cancel
              </Button>
            </span>
          )
        ]}
        content={
          editing ? (
            <div style={{ marginRight: 12 }}>
              <Input
                value={title}
                onChange={e => this.handleTitleChange(e.target.value)}
                style={{ margin: '5px 0px 5px 0' }}
              />
              <Input
                value={body}
                onChange={e => this.handleBodyChange(e.target.value)}
                style={{ margin: '0 0 40px 0' }}
              />
            </div>
          ) : (
            <div>
              <Link to={`/${post.category}/${post.id}`}>
                <h1>{post.title}</h1>
              </Link>
              <p style={{ margin: '20px 0 40px 0' }}>{post.body}</p>
            </div>
          )
        }
      />
    );
  }
}

Post.propTypes = {
  post: PropTypes.object.isRequired
};

export default withRouter(connect()(Post));
