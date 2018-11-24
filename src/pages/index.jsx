/**
 * title: 首页
 */

import React, { PureComponent } from 'react';
import router from 'umi/router';
import intl from 'react-intl-universal';
import { List } from 'antd-mobile';

import Navigation from 'components/Navigation';

const { Item } = List;

class Home extends PureComponent {
  render() {
    return (
      <Navigation title="首页" disableBack>
        <List>
          <Item
            arrow="horizontal"
            onClick={() => {
              router.push('/demo');
            }}
          >
            示例中心
          </Item>

          <Item
            arrow="horizontal"
            onClick={() => {
              router.push('/user');
            }}
          >
            用户中心
          </Item>

          <Item
            arrow="horizontal"
            onClick={() => {
              router.push('/setting');
            }}
          >
            {intl.get('app.page.setting.title')}
          </Item>
        </List>
      </Navigation>
    );
  }
}

export default Home;
