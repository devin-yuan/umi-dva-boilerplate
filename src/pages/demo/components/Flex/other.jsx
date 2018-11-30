/**
 * 其他
 */

import React from 'react';
import { Tabs } from 'antd-mobile';
import styles from './styles/index.less';

export default () => {
  const tabs = [
    { title: '左边固定，右边铺满' },
    { title: '右边固定，左边铺满' },
    { title: '上边固定，下边铺满' },
    { title: '下边固定，上边铺满' },
    { title: '左右两边对齐' },
    { title: '上下两边对齐' },
    { title: '垂直居中' },
  ];

  return (
    <div>
      <h3>其他</h3>

      <Tabs tabs={tabs} tabBarBackgroundColor="transparent">
        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="">
            <div data-flex-box="0">1</div>
            <div data-flex-box="1" style={{ width: 0 }}>2</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="dir:right box:first">
            <div>1</div>
            <div style={{ width: 0 }}>2</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="dir:top">
            <div data-flex-box="0">1</div>
            <div data-flex-box="1">2</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="dir:top">
            <div data-flex-box="1">1</div>
            <div data-flex-box="0">2</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="main:justify">
            <div>1</div>
            <div>2</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="dir:top main:justify">
            <div>1</div>
            <div>2</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="main:center cross:center">
            <div>1</div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
