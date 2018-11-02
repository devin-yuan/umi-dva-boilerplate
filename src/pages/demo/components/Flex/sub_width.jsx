/**
 * 子元素宽度设置
 */
import React from 'react';
import { Tabs } from 'antd-mobile';
import styles from './styles/index.less';

export default () => {
  const tabs = [
    { title: '平分' },
    { title: '第一个固定' },
    { title: '最后一个固定' },
    { title: '两端第一个固定' },
  ];

  return (
    <div>
      <h3>子元素宽度设置</h3>

      <Tabs tabs={tabs}>
        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="box:mean">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="dir:left box:first">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="dir:left box:last">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="dir:left box:justify">
            <div>1</div>
            <div>2</div>
            <div>3</div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
