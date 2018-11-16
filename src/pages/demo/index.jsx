/**
 * title: 示例中心
 */

import React from 'react';
import router from 'umi/router';
import { List } from 'antd-mobile';

import Navigation from 'components/Navigation';

const { Item } = List;

export default () => (
  <Navigation title="示例中心">
    <List>
      <Item
        arrow="horizontal"
        onClick={() => {
          router.push('/demo/form');
        }}
      >
        表单示例
      </Item>
      <Item
        arrow="horizontal"
        onClick={() => {
          router.push('/demo/flex');
        }}
      >
        Flex 布局示例
      </Item>
      <Item
        arrow="horizontal"
        onClick={() => {
          router.push('/demo/charts');
        }}
      >
        图表示例
      </Item>
      <Item
        arrow="horizontal"
        onClick={() => {
          router.push('/news/1');
        }}
      >
        Mock 示例
      </Item>
    </List>
  </Navigation>
);
