/**
 * 导航栏
 */
import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import router from 'umi/router';
import { NavBar, Icon } from 'antd-mobile';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

class Navigation extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      headerHeight: 90,
      wrapHeight: document.documentElement.clientHeight,
    };
  }

  componentDidMount() {
    this.changeHeight();

    // 监听窗口变化，改变列表高度
    window.addEventListener('resize', this.changeHeight);
  }

  componentWillUnmount() {
    // 注销窗口变化事件监听
    window.removeEventListener('resize', this.changeHeight);
  }

  // 改变高度
  changeHeight = () => {
    const wrapHeight = document.documentElement.clientHeight;
    const headerHeight = ReactDOM.findDOMNode(this.headerBox).offsetHeight;

    this.setState({
      wrapHeight,
      headerHeight,
    });
  }

  render() {
    const {
      children,
      disableBack,
      title,
      theme,
    } = this.props;
    const { wrapHeight, headerHeight } = this.state;

    return (
      <div
        data-flex="dir:top"
        style={{
          height: `${wrapHeight}px`,
        }}
      >
        <div
          data-flex-box="0"
          className={cx(styles.header, { dark: theme === 'dark' })}
          ref={(el) => { this.headerBox = el; }}
        >
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

        <div
          data-flex-box="1"
          className={styles.main}
        >
          <div
            className={styles.content}
            style={{
              height: `${wrapHeight - headerHeight}px`,
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

Navigation.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  theme: PropTypes.string,
  disableBack: PropTypes.bool,
};

export default Navigation;
