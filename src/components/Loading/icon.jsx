/**
 * 加载图标
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './styles/icon.less';

const cx = classNames.bind(styles);

const LoadingIcon = ({ height }) => {
  const wrapCls = cx(styles.wrap, {
    hasHeight: height,
  });

  let wrapHeight = 'auto';

  if (height && typeof height === 'number') {
    wrapHeight = `${height}px`;
  } else if (height && typeof height === 'string') {
    const reg = /\d+(\.\d+)?%/;

    // 正则匹配百分比
    if (height.match(reg) !== null) {
      wrapHeight = height;
    }
  }

  return (
    <div
      className={wrapCls}
      style={{ height: wrapHeight }}
      data-flex="main:center cross:center"
    >
      <div className="boilerplate-loading-icon">
        <div className="boilerplate-loading-icon-inner" />
        <div className="boilerplate-loading-icon-inner" />
        <div className="boilerplate-loading-icon-inner" />
      </div>
    </div>
  );
};

LoadingIcon.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default LoadingIcon;
