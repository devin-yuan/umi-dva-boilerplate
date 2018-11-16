/**
 * 加载组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import './styles/index.less';

import LoadingIcon from './icon';

const Loading = ({
  height,
  row,
  cross,
  icon,
}) => {
  if (icon) {
    // 返回加载icon
    return (<LoadingIcon height={height} />);
  }

  let loopRowNum = [1, 7]; // 默认两行

  if (row) {
    loopRowNum = [];

    for (let i = 0; i < row; i++) {
      if (cross) {
        // 如果要错乱的感觉
        loopRowNum.push(Math.round(Math.random() * (6 - 1) + 1));
      } else {
        if ((row - 1) === i) {
          loopRowNum.push(7);
        } else {
          loopRowNum.push(1);
        }
      }
    }
  }

  // 返回默认加载
  return (
    <div className="boilerplate-loading">
      {loopRowNum.map((val, index) => {
        const loadingRowKey = `loading_row_${index}`;

        switch (val) {
          case 1:
            return (
              <div key={loadingRowKey}>
                <div className="cell a" />
              </div>
            );
          case 2:
            return (
              <div key={loadingRowKey}>
                <div className="cell h" />
                <div className="cell f" />
              </div>
            );
          case 3:
            return (
              <div key={loadingRowKey}>
                <div className="cell j" />
                <div className="cell g" />
                <div className="cell g" />
              </div>
            );
          case 4:
            return (
              <div key={loadingRowKey}>
                <div className="cell h" />
                <div className="cell h" />
                <div className="cell h" />
              </div>
            );
          case 5:
            return (
              <div key={loadingRowKey}>
                <div className="cell e" />
                <div className="cell j" />
                <div className="cell j" />
              </div>
            );
          case 6:
            return (
              <div key={loadingRowKey}>
                <div className="cell h" />
                <div className="cell g" />
              </div>
            );
          case 7:
            return (
              <div key={loadingRowKey}>
                <div className="cell g" />
              </div>
            );
          default:
            break;
        }
      })}
    </div>
  );
}

Loading.propTypes = {
  height: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string
  ]),
  row: PropTypes.number,
  cross: PropTypes.bool,
  icon: PropTypes.bool,
};

export default Loading;
