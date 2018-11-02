/**
 * 加载组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import './styles/index.less';

import LoadingIcon from './icon';

const Loading = ({ height, icon }) => {
  if (icon) {
    // 返回加载icon
    return (<LoadingIcon height={height} />);
  }

  const row1 = (
    <div>
      <div className="cell a" />
    </div>
  );
  const row2 = (
    <div>
      <div className="cell h" />
      <div className="cell f" />
    </div>
  );
  const row3 = (
    <div>
      <div className="cell j" />
      <div className="cell g" />
      <div className="cell g" />
    </div>
  );
  const row4 = (
    <div>
      <div className="cell h" />
      <div className="cell h" />
      <div className="cell h" />
    </div>
  );
  const row5 = (
    <div>
      <div className="cell e" />
      <div className="cell j" />
      <div className="cell j" />
    </div>
  );
  const row6 = (
    <div>
      <div className="cell h" />
      <div className="cell g" />
    </div>
  );

  // 返回默认加载
  return (
    <div
      className="boilerplate-loading"
      style={{ height: height ? `${height}px` : 'auto' }}
    >
      {row1}
      {row2}
      {row3}
      {row4}
      {row5}
      {row6}
    </div>
  );
}

Loading.propTypes = {
  height: PropTypes.number,
  icon: PropTypes.bool,
};

export default Loading;
