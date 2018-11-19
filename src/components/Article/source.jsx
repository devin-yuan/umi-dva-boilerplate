/**
 * 文章来源
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import styles from './article.less';

import Loading from 'components/Loading';
import Avatar from 'components/Avatar';

class ArticleSource extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      hideAvatar: props.avatar === false,
    };
  }

  render() {
    const { data } = this.props;
    const { hideAvatar } = this.state;
    const sourceContent = data
      ? (
        <dl>
          <dt>
            {data.source}
          </dt>
          <dd>
            {moment(data.pubDate).format('YYYY-MM-DD HH:mm:ss')}
          </dd>
        </dl>
      )
      : (<Loading />);
    const main = hideAvatar
      ? (
        <div className={styles.sourceBox}>
          <div className={styles.sourceContent}>
            {sourceContent}
          </div>
        </div>
      )
      : (
        <div className={styles.sourceBox} data-flex="">
          <div
            className={styles.sourceAvatar}
            data-flex-box="0"
          >
            <Avatar url={data ? data.sourceAvatar : undefined} />
          </div>
          <div
            className={styles.sourceContent}
            data-flex-box="1"
            style={{ width: 0 }}
          >
            {sourceContent}
          </div>
        </div>
      );

    return main;
  }
}

ArticleSource.propTypes = {
  data: PropTypes.object,
  avatar: PropTypes.bool,
};

export default ArticleSource;
