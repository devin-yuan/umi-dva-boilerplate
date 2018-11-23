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

  componentDidMount() {
    // 监听滚动条，改变显示状态
    window.addEventListener('scroll', this.switchShowState);
  }

  componentWillUnmount() {
    // 注销滚动条事件监听
    window.removeEventListener('scroll', this.switchShowState);
  }

  // 切换显示状态
  switchShowState = () => {
    const { show } = this.state;
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop; // eslint-disable-line

    if (!show && scrollTop >= 500) {
      this.setState({
        show: true,
      });
    } else if (show && scrollTop < 500) {
      this.setState({
        show: false,
      });
    }
  }

  // 去顶部
  goToTop = () => {
    window.scrollTo(0, 0);
  }

  render() {
    const { show } = this.state;
    const wrapCls = cx(styles.wrap, {
      show,
    });

    return (
      <div
        className={wrapCls}
        onClick={this.goToTop}
      >
        <Icon type="up" color="#fff" />
      </div>
    );
  }
}

export default GoToTop;
