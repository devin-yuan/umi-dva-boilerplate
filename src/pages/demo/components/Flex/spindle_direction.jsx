/**
 * 主轴方向
 */

import React from 'react';
import { Tabs } from 'antd-mobile';
import styles from './styles/index.less';

export default () => {
  const tabs = [
    { title: '从上到下' },
    { title: '从右到左' },
    { title: '从下到上' },
    { title: '从左到右' },
  ];

  return (
    <div>
      <h3>主轴方向</h3>

      <Tabs tabs={tabs} swipeable={false}>
        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="dir:top">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="dir:right">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="dir:bottom">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="dir:left">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
