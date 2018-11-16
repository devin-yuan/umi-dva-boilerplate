/**
 * 文章标题
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './article.less';

import Loading from 'components/Loading';

const cx = classNames.bind(styles);

const ArticleTitle = ({ text }) => {
  const wrapCls = cx(styles.titleBox, {
    hasContent: text,
  });

  return (
    <div className={wrapCls}>
      {text ? text : (<Loading />)}
    </div>
  );
}

ArticleTitle.propTypes = {
  text: PropTypes.string,
};

export default ArticleTitle;
