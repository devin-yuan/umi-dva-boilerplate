/**
 * 头像组件
 */

import React from 'react';
import PropTypes from 'prop-types';
import Link from 'umi/link';
import './index.less';

const Avatar = ({
  url,
  href,
  square,
  style,
}) => {
  const wrapCls = `boilerplate-avatar${square ? ' square' : ''}`;
  const img = url
    ? (<img src={url} alt="" />)
    : null;
  const main = href
    ? (
      <Link
        className={wrapCls}
        to={href}
        style={style}
      >
        {img}
      </Link>
    )
    : (
      <span
        className={wrapCls}
        style={style}
      >
        {img}
      </span>
    );

  return main;
};

Avatar.propTypes = {
  url: PropTypes.string,
  href: PropTypes.string,
  size: PropTypes.string,
  square: PropTypes.bool,
  style: PropTypes.object,
};

export default Avatar;
