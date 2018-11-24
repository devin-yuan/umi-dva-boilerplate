/**
 * 用户中心
 */

import React, { PureComponent } from 'react';
// import { Tabs } from 'antd-mobile';

import Navigation from 'components/Navigation';

class User extends PureComponent {
  render() {
    return (
      <Navigation title="用户中心">
        <div>
          用户信息
        </div>
      </Navigation>
    );
  }
}

export default User;
