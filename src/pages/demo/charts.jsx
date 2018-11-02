/**
 * title: 图表示例
 */
import React, { PureComponent } from 'react';
import classNames from 'classnames/bind';
import styles from './styles/charts.less';

import Navigation from 'components/Navigation';
import {
  MinuteChart,
  KLineChart,
} from 'components/Charts';

const cx = classNames.bind(styles);

class DemoCharts extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tabIndex: 1,
    };
  }

  // 切换 tab
  switchTab = (index) => {
    this.setState({
      tabIndex: index,
    });
  }

  /**
   * React 渲染的生命周期
   * Doc: https://reactjs.org/docs/react-component.html
   */
  render() {
    const { tabIndex } = this.state;

    let chart = (<MinuteChart />);

    switch (tabIndex) {
      case 1:
        chart = (<KLineChart />);
        break;

      default:
        break;
    }

    // console.log('看下是下啥', window.navigator);

    return (
      <Navigation title="图表示例">
        <div>
          <ul>
            <li
              className={cx(styles.tab, { active: tabIndex === 0 })}
              onClick={() => {
                this.switchTab(0);
              }}
            >
              分时
            </li>
            <li
              className={cx(styles.tab, { active: tabIndex === 1 })}
              onClick={() => {
                this.switchTab(1);
              }}
            >
              日K
            </li>
          </ul>

          {chart}
        </div>
      </Navigation>
    );
  }
}

export default DemoCharts;
