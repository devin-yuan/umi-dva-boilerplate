/**
 * 加载图标
 */
import React from 'react';
import PropTypes from 'prop-types';
import './styles/icon.less';

const LoadingIcon = ({ height }) => (
  <div
    data-flex="main:center cross:center"
    style={{ height: height ? `${height}px` : '100%' }}
  >
    <div className="boilerplate-loading-icon">
      <div className="boilerplate-loading-icon-inner" />
      <div className="boilerplate-loading-icon-inner" />
      <div className="boilerplate-loading-icon-inner" />
    </div>
  </div>
);

LoadingIcon.propTypes = {
  height: PropTypes.number,
};

export default LoadingIcon;
