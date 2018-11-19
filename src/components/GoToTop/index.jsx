/**
 * 回到顶部
 */

import React, { PureComponent } from 'react';
import { Icon } from 'antd-mobile';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

class GoToTop extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  render() {
    const { show } = this.state;
    const wrapCls = cx(styles.wrap, {
      show,
    });

    return (
      <div className={wrapCls}>
        <Icon type="up" color="#fff" />
      </div>
    );
  }
}

export default GoToTop;
