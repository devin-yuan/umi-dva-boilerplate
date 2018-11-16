/**
 * 文章内容
 */

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './article.less';

import Loading from 'components/Loading';

const cx = classNames.bind(styles);

const ArticleContent = ({ content }) => {
  const wrapCls = cx(styles.contentBox, {
    hasContent: content,
  });

  return (
    <div className={wrapCls}>
      {
        content
          ? (<div dangerouslySetInnerHTML={{ __html: content }} />)
          : (<Loading row={ 5 } />)
      }
    </div>
  );
};

ArticleContent.propTypes = {
  content: PropTypes.string,
};

export default ArticleContent;
