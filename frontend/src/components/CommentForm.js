import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Modal, Form, Input } from 'antd';

class CommentForm extends Component {
  render() {
    const { visible, loading, onCancel, onSave, form } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="New comment"
        onCancel={onCancel}
        onOk={onSave}
        footer={[
          <Button key="back" icon="close" onClick={onCancel}>
            Cancel
          </Button>,
          <Button
            key="submit"
            type="primary"
            icon="save"
            onClick={onSave}
            loading={loading}
          >
            Save
          </Button>
        ]}
      >
        <Form layout="vertical">
          <Form.Item label="Body">
            {getFieldDecorator('body', {
              rules: [
                {
                  required: true,
                  message: 'Please input the body of the comment!'
                }
              ]
            })(<Input.TextArea />)}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

CommentForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
};

export default Form.create({ name: 'new_post_form' })(CommentForm);
