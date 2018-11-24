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
import md5 from 'md5';
import styles from './styles/login.less';

import Navigation from 'components/Navigation';

class Login extends PureComponent {
  componentDidUpdate() {
    const { dispatch, result } = this.props;

    if (Object.keys(result).length > 0 && result.code !== __SUCCESS__) {
      Toast.fail(result.message, 2, () => {
        dispatch({
          type: 'login/updateState',
          payload: {
            result: {},
          },
        });
      });
    }
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

      const params = values;

      params.password = md5(params.password);

      // 提交登录
      dispatch({
        type: 'login/submitLogin',
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
                message: '用户名不能为空',
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
                message: '密码不能为空',
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
            disabled={loading}
            loading={loading}
          >
            登录
          </Button>

          <div>
            用户名：<i>admin</i>
            密码：<i>admin</i>
          </div>
        </div>
      </Navigation>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  loading: PropTypes.bool,
  result: PropTypes.object.isRequired,
};

export default connect(({ loading, login }) => ({
  loading: loading.effects['login/submitLogin'],
  result: login.result,
}))(createForm()(Login));
