/**
 * 分时图
 */
import React, { PureComponent } from 'react';
import ReactEcharts from 'echarts-for-react';
import { minuteConfig } from 'config/charts';
import { adaptRem } from 'utils';
import apiResult from 'config/data/minute.json';

class MinuteChart extends PureComponent {
  render() {
    return (
      <ReactEcharts
        option={minuteConfig(apiResult.tsArray, apiResult.preClose)}
        style={{
          width: '100%',
          height: adaptRem(225, true),
        }}
      />
    );
  }
}

export default MinuteChart;
