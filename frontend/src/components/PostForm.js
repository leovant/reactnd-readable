import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Modal, Form, Input, Select } from 'antd';

class PostForm extends Component {
  render() {
    const { visible, loading, onCancel, onSave, form, categories } = this.props;
    const { getFieldDecorator } = form;

    return (
      <Modal
        visible={visible}
        title="New post"
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
          <Form.Item label="Title">
            {getFieldDecorator('title', {
              rules: [
                {
                  required: true,
                  message: 'Please input the title of the post!'
                }
              ]
            })(<Input />)}
          </Form.Item>
          <Form.Item label="Body">
            {getFieldDecorator('body', {
              rules: [
                {
                  required: true,
                  message: 'Please input the body of the post!'
                }
              ]
            })(<Input.TextArea />)}
          </Form.Item>
          <Form.Item label="Category">
            {getFieldDecorator('category', {
              rules: [{ required: true, message: 'Please select a category!' }]
            })(
              <Select placeholder="Select a category">
                {Object.keys(categories).map(key => (
                  <Select.Option value={categories[key].path} key={key}>
                    {categories[key].name}
                  </Select.Option>
                ))}
              </Select>
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

PostForm.propTypes = {
  visible: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  categories: PropTypes.object.isRequired
};

const mapStateToProps = ({ categories }) => ({ categories });

export default connect(mapStateToProps)(
  Form.create({ name: 'new_post_form' })(PostForm)
);
