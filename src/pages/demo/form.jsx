/**
 * title: 表单示例
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import {
  WingBlank,
  WhiteSpace,
  List,
  InputItem,
  Button,
  Toast,
} from 'antd-mobile';
import { createForm } from 'rc-form';

import Navigation from 'components/Navigation';

class DemoForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      btnDisabled: false,
    };
  }

  // eslint-disable-next-line
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log('在这个生命周期里做提交按钮的解除禁用', nextProps, prevState);

    return null;
  }

  // 提交表单
  submit = (e) => {
    e.preventDefault();

    const { form } = this.props;
    const { validateFields } = form;

    validateFields((error, values) => {
      if (error !== null) {
        return false;
      }

      this.setState({
        btnDisabled: true,
      });

      const params = values;

      // eslint-disable-next-line
      console.log('要提交的值', params);
    });
  }

  // 重置表单
  reset = (e) => {
    e.preventDefault();

    const { form } = this.props;

    form.resetFields();
  }

  // 显示错误消息
  showErrorMsg = (item) => {
    const { form } = this.props;

    const errorMsg = form.getFieldError(item);

    Toast.info(errorMsg.join(','), 1);
  }

  render() {
    const { form } = this.props;
    const { btnDisabled } = this.state;
    const { getFieldProps, getFieldError } = form;

    return (
      <Navigation title="表单示例">
        <List>
          <InputItem
            {...getFieldProps('name', {
              rules: [{
                required: true,
                message: '不能为空',
              }],
            })}
            placeholder="name"
            error={getFieldError('name') !== undefined}
            onErrorClick={() => this.showErrorMsg('name')}
          >
            姓名
          </InputItem>
          <InputItem
            {...getFieldProps('age', {
              rules: [{
                required: true,
                message: '不能为空',
              }],
            })}
            placeholder="age"
            type="number"
            error={getFieldError('age') !== undefined}
            onErrorClick={() => this.showErrorMsg('age')}
          >
            年龄
          </InputItem>
        </List>

        <WhiteSpace />

        <WingBlank>
          <Button
            type="primary"
            disabled={btnDisabled}
            onClick={this.submit}
          >
            提交
          </Button>

          <WhiteSpace />

          <Button
            type="ghost"
            disabled={btnDisabled}
            onClick={this.reset}
          >
            重置
          </Button>
        </WingBlank>

        <div>
          调用相机
          <input type="file" accept="image/*" capture="environment" />
        </div>
        <div>
          调用摄像头
          <input type="file" accept="video/*" capture="user" />
        </div>
      </Navigation>
    );
  }
}

DemoForm.propTypes = {
  form: PropTypes.object.isRequired,
};

export default createForm()(DemoForm);
