/**
 * 没有结果
 */

import React from 'react';
import PropTypes from 'prop-types';
import intl from 'react-intl-universal';
import classNames from 'classnames/bind';
import styles from './index.less';

const cx = classNames.bind(styles);

const NoResult = ({ height, text }) => {
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
      <div>
        <span className={styles.icon} />
        <i>
          {
            text
              ? text
              : intl.get('app.components.NoResult.text')
          }
        </i>
      </div>
    </div>
  );
};

NoResult.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  text: PropTypes.string,
};

export default NoResult;
