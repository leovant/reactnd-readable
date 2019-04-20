import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  Button,
  Comment as CommentComponent,
  Icon,
  Input,
  Tooltip
} from 'antd';
import { dateTime, fromNow } from '../utils/helpers';
import { editComment, removeComment, voteInComment } from '../actions/comments';

class Comment extends Component {
  state = {
    editing: false,
    body: ''
  };

  edit = comment => {
    this.setState(() => ({
      editing: true,
      body: comment.body
    }));
  };

  handleChange = body => {
    this.setState(() => ({ body }));
  };

  save = () => {
    const { body } = this.state;
    const { comment, dispatch } = this.props;

    dispatch(editComment(comment, body));

    this.setState(() => ({ editing: false }));
  };

  delete = () => {
    const { comment, dispatch } = this.props;
    dispatch(removeComment(comment));
  };

  vote = option => {
    const { comment, dispatch } = this.props;

    dispatch(voteInComment(comment, option));
  };

  render() {
    const { comment } = this.props;
    const { editing, body } = this.state;

    return (
      <CommentComponent
        author={`@${comment.author}`}
        datetime={
          <Tooltip title={dateTime(comment.timestamp)}>
            <span>{fromNow(comment.timestamp)}</span>
          </Tooltip>
        }
        actions={[
          <span>
            <Tooltip title="Like">
              <Icon type="like" onClick={() => this.vote('upVote')} />
            </Tooltip>
            <span style={{ padding: 10 }}>{comment.voteScore}</span>
            <Tooltip title="Dislike">
              <Icon type="dislike" onClick={() => this.vote('downVote')} />
            </Tooltip>
          </span>,
          !editing && (
            <span>
              <Button
                icon="edit"
                size="small"
                onClick={() => this.edit(comment)}
              >
                Edit
              </Button>
              ,
              <Button
                icon="delete"
                size="small"
                onClick={() => this.delete()}
                style={{ marginLeft: 10 }}
              >
                Delete
              </Button>
            </span>
          ),
          editing && (
            <span>
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
            <div>
              <Input
                value={body}
                onChange={e => this.handleChange(e.target.value)}
              />
            </div>
          ) : (
            <p>{comment.body}</p>
          )
        }
      />
    );
  }
}

Comment.propTypes = {
  comment: PropTypes.object.isRequired
};

export default connect()(Comment);
