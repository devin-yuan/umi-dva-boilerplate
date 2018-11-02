/**
 * 交叉轴对齐方式
 */
import React from 'react';
import { Tabs } from 'antd-mobile';
import styles from './styles/index.less';

export default () => {
  const tabs = [
    { title: '从上到下' },
    { title: '从下到上' },
    { title: '跟随内容高度对齐' },
    { title: '居中对齐' },
    { title: '高度并排铺满' },
  ];

  return (
    <div>
      <h3>交叉轴对齐方式</h3>

      <Tabs tabs={tabs} swipeable={false}>
        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="cross:top">
            <div>
              1
              <br />
              1 * 2
            </div>
            <div>
              2
              <br />
              2 * 2
              <br />
              2 * 3
            </div>
            <div>
              3
              <br />
              3 * 2
              <br />
              3 * 3
              <br />
              3 * 4
            </div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="cross:bottom">
            <div>
              1
              <br />
              1 * 2
            </div>
            <div>
              2
              <br />
              2 * 2
              <br />
              2 * 3
            </div>
            <div>
              3
              <br />
              3 * 2
              <br />
              3 * 3
              <br />
              3 * 4
            </div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="cross:baseline">
            <div>
              1
              <br />
              1 * 2
            </div>
            <div>
              2
              <br />
              2 * 2
              <br />
              2 * 3
            </div>
            <div>
              3
              <br />
              3 * 2
              <br />
              3 * 3
              <br />
              3 * 4
            </div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="cross:center">
            <div>
              1
              <br />
              1 * 2
            </div>
            <div>
              2
              <br />
              2 * 2
              <br />
              2 * 3
            </div>
            <div>
              3
              <br />
              3 * 2
              <br />
              3 * 3
              <br />
              3 * 4
            </div>
          </div>
        </div>

        <div className={styles.itemBox}>
          <div className={styles.item} data-flex="cross:stretch">
            <div>
              1
              <br />
              1 * 2
            </div>
            <div>
              2
              <br />
              2 * 2
              <br />
              2 * 3
            </div>
            <div>
              3
              <br />
              3 * 2
              <br />
              3 * 3
              <br />
              3 * 4
            </div>
          </div>
        </div>
      </Tabs>
    </div>
  );
};
