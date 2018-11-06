/**
 * 主轴对齐方式
 */

import React from 'react';
import { Tabs } from 'antd-mobile';
import styles from './styles/index.less';

export default () => {
  const tabs = [
    { title: '从右到左' },
    { title: '从左到右' },
    { title: '两端对齐' },
    { title: '居中对齐' },
  ];

  return (
    <div>
      <h3>主轴对齐方式</h3>

      <Tabs tabs={tabs} swipeable={false}>
        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="main:right">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="main:left">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="main:justify">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="main:center">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
