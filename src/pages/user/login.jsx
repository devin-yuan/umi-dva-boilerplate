/**
 * 登录
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Helmet } from 'react-helmet';
import { createForm } from 'rc-form';
import {
  WhiteSpace,
  InputItem,
  Button,
  Toast,
} from 'antd-mobile';
import styles from './styles/login.less';

import Navigation from 'components/Navigation';

class Login extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      btnDisabled: false,
    };
  }

  // 提交表单
  submit = (e) => {
    e.preventDefault();

    const { form, dispatch } = this.props;
    const { validateFields } = form;

    validateFields((error, values) => {
      if (error !== null) {
        return false;
      }

      this.setState({
        btnDisabled: true,
      });

      const params = values;

      // 提交登录
      dispatch({
        type: 'userLogin/submitLogin',
        payload: params,
      });
    });
  }

  // 显示错误消息
  showErrorMsg = (item) => {
    const { form } = this.props;

    const errorMsg = form.getFieldError(item);

    Toast.info(errorMsg.join(','), 1);
  }

  render() {
    const pageTitle = '登录';
    const { form, loading } = this.props;
    const { btnDisabled } = this.state;
    const { getFieldProps, getFieldError } = form;

    return (
      <Navigation title={pageTitle}>
        <Helmet>
          <title>{pageTitle}</title>
        </Helmet>

        <div className={styles.wrap}>
          <InputItem
            {...getFieldProps('username', {
              rules: [{
                required: true,
                message: '不能为空',
              }],
            })}
            placeholder="用户名"
            error={getFieldError('username') !== undefined}
            onErrorClick={() => this.showErrorMsg('username')}
          />

          <InputItem
            {...getFieldProps('password', {
              rules: [{
                required: true,
                message: '不能为空',
              }],
            })}
            placeholder="密码"
            type="password"
            error={getFieldError('password') !== undefined}
            onErrorClick={() => this.showErrorMsg('password')}
          />

          <WhiteSpace />

          <Button
            type="primary"
            onClick={this.submit}
            disabled={btnDisabled}
            loading={loading}
          >
            登录
          </Button>
        </div>
      </Navigation>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool,
};

export default connect(({ loading, userLogin }) => ({
  loading: loading.effects['userLogin/submitLogin'],
  result: userLogin.result,
}))(createForm()(Login));
