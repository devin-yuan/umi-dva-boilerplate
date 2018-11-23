/**
 * 导航栏
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import router from 'umi/router';
import { NavBar, Icon } from 'antd-mobile';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

class Navigation extends PureComponent {
  render() {
    const {
      children,
      disableBack,
      title,
      theme,
      hideHeader,
    } = this.props;
    const wrapCls = cx(styles.wrap, {
      noHeader: hideHeader === false,
    });
    const header = hideHeader === false
      ? null
      : (
        <div className={cx(styles.header, { dark: theme === 'dark' })}>
          <NavBar
            mode={theme || 'light'}
            icon={!disableBack ? (<Icon type="left" />) : null}
            onLeftClick={() => {
              if (!disableBack) {
                router.goBack();
              }
            }}
          >
            {title}
          </NavBar>
        </div>
      );

    return (
      <div className={wrapCls}>
        {header}

        {children}
      </div>
    );
  }
}

Navigation.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  theme: PropTypes.string,
  disableBack: PropTypes.bool,
  hideHeader: PropTypes.bool,
};

export default Navigation;
