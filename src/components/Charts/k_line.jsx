/**
 * K线图
 */

import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import { kLineConfig } from 'config/charts';
import { adaptRem } from 'utils';

class KLineChart extends PureComponent {
  render() {
    return (
      <ReactEcharts
        option={kLineConfig}
        style={{
          width: '100%',
          height: adaptRem(225, true),
        }}
      />
    );
  }
}

export default KLineChart;
