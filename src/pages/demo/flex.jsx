/**
 * title: Flex 布局示例
 */

import React from 'react';
import { WhiteSpace } from 'antd-mobile';

import Navigation from 'components/Navigation';
import {
  FlexSpindleDirection,
  FlexSpindleAlignment,
  FlexCrossAxisAlignment,
  FlexSubWidth,
  FlexSubHeight,
  FlexOther,
} from './components/Flex';

export default () => (
  <Navigation title="Flex 布局示例">
    <FlexSpindleDirection />

    <WhiteSpace />

    <FlexSpindleAlignment />

    <WhiteSpace />

    <FlexCrossAxisAlignment />

    <WhiteSpace />

    <FlexSubWidth />

    <WhiteSpace />

    <FlexSubHeight />

    <WhiteSpace />

    <FlexOther />
  </Navigation>
);
