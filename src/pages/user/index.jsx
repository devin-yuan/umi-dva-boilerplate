/**
 * 用户中心
 */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Tabs } from 'antd-mobile';
import styles from './styles/index.less';

import Navigation from 'components/Navigation';
import Loading from 'components/Loading';
import Avatar from 'components/Avatar';

class User extends PureComponent {
  render() {
    const { userInfo } = this.props;
    const tabs = [
      { title: '关注' },
      { title: '粉丝' },
    ];

    return (
      <Navigation title="用户中心">
        <div className={styles.userInfoBox} data-flex="">
          <div data-flex-box="0">
            <Avatar url={userInfo.avatar} />
          </div>
          <div data-flex-box="1" style={{ width: 0 }}>
            {
              userInfo.nickname
                ? (<i className={styles.nickname}>{userInfo.nickname}</i>)
                : (<Loading row={1} />)
            }
          </div>
        </div>

        <Tabs
          tabs={tabs}
          tabBarBackgroundColor="transparent"
        >
          <div>1</div>
          <div>2</div>
        </Tabs>
      </Navigation>
    );
  }
}

User.propTypes = {
  userInfo: PropTypes.object.isRequired,
};

export default connect(({ global }) => ({
  userInfo: global.user.info,
}))(User);
