/**
 * 分时图配置
 */

import echarts from 'echarts';
import moment from 'moment';
import numeral from 'numeral';
import { adaptRem } from 'utils';
import commonConfig from './common';

/**
 * 生成分时图交易时间点数据, 用于分时图x轴的数据显示
 * @param {string} area 地区
 */
const initTimeData = (area) => {
  const oneMin = 60000; // 一分钟的毫秒数
  const curDate = new Date(); // 当前时间
  const curYear = curDate.getFullYear(); // 当前年
  const curMonth = curDate.getMonth(); // 当前月
  const curDay = curDate.getDate(); // 当前日

  let data = []; // 最后返回的数组
  let am = 121; // 上午的交易时间点 (默认A股)
  let pm = 121; // 下午的交易时间点 (默认A股)
  // 上午的开盘时间 (默认A股)
  let amTime = new Date(curYear, curMonth, curDay, 9, 30, 0, 0);
  // 下午的开盘时间 (默认A股)
  let pmTime = new Date(curYear, curMonth, curDay, 13, 0, 0, 0);

  switch (area) {
    case 'hk':
      /* 港股 */
      am = 151;
      pm = 181;
      amTime = new Date(curYear, curMonth, curDay, 9, 30, 0, 0);
      pmTime = new Date(curYear, curMonth, curDay, 13, 0, 0, 0);

      break;
    default:
      break;
  }

  // 循环生成上午的交易时间点数
  for (let a = 0; a < am; a++) {
    data.push(moment(amTime).format('HH:mm'));

    // 循环一次加一分钟
    amTime = new Date(amTime.getTime() + oneMin);
  }

  // 循环生成下午的交易时间点数
  for (let p = 0; p < pm; p++) {
    data.push(moment(pmTime).format('HH:mm'));

    // 循环一次加一分钟
    pmTime = new Date(pmTime.getTime() + oneMin);
  }

  return data;
};

/**
 * 拆分数据
 * @param {array} data 需要处理的数据
 * @param {string} preClose 昨日收盘价格
 * data的数据结构为:
  [[
    1536543000000, // 时间戳
    "318.800", // 价格
    "316.814", // 均价
    "3777292", // 成交量
    "1196700631", // 成交额
  ], [
    ...
  ]]
 */
const splitData = (data, preClose) => {
  let price = []; // 价格
  let priceRange = []; // 价格涨跌幅
  let priceRangeSection = [0, 0]; // 价格涨跌幅区间，用于 y 轴
  let averagePrice = []; // 均价
  let averagePriceSection = [0, 0]; // 均价区间，用于 y 轴
  let volume = []; // 成交量

  for (let i = 0; i < data.length; i++) {
    const item = data[i]; // 当前项
    const curPrice = item[1]; // 当前价格
    const curAveragePrice = item[2]; // 当前均价
    const curPriceRange = numeral(((curPrice - preClose) / preClose) * 100).format('0.00'); // 当前涨跌幅

    let curVolume = {
      value: item[3], // 当前成交量
      itemStyle: {
        color: commonConfig.custom.color.red,
      },
    };

    // 算 y 轴的范围
    priceRangeSection[0] = curPriceRange > priceRangeSection[0]
      ? curPriceRange
      : priceRangeSection[0];
    priceRangeSection[1] = curPriceRange < priceRangeSection[1]
      ? curPriceRange
      : priceRangeSection[1];
    averagePriceSection[0] = curAveragePrice > averagePriceSection[0]
      ? curAveragePrice
      : averagePriceSection[0];
    averagePriceSection[1] = curAveragePrice < averagePriceSection[1]
      ? curAveragePrice
      : averagePriceSection[1];

    price.push(curPrice); // 价格
    priceRange.push(curPriceRange); // 价格涨跌幅
    averagePrice.push(curAveragePrice); // 均价

    // 处理成交量
    if (i === 0) {
      // 如果是第一个点跟昨收比
      if (curPrice < preClose) {
        curVolume.itemStyle.color = commonConfig.custom.color.green;
      }
    } else {
      // 如果不是第一个点跟前一个点比
      let prePrice = data[i - 1][1]; // 上一个点的现价

      if (curPrice < prePrice) {
        curVolume.itemStyle.color = commonConfig.custom.color.green;
      }
    }

    volume.push(curVolume);
  }

  return {
    price,
    priceRange,
    priceRangeSection,
    averagePrice,
    averagePriceSection,
    volume,
  };
};

/**
 * 折线图配置项
 * @param {array} data 图表需要的数据
 * @param {string} preClose 昨日收盘价格
 */
export default (data, preClose) => {
  const timeData = initTimeData('hk');
  const result = splitData(data, preClose);

  return {
    title: {
      show: false,
    },
    legend: {
      show: false,
    },
    grid: [{
      left: adaptRem(2),
      top: 0,
      right: adaptRem(2),
      height: adaptRem(161),
    }, {
      left: adaptRem(2),
      top: 0,
      right: adaptRem(2),
      height: adaptRem(161),
    }, {
      show: true,
      left: adaptRem(2),
      right: adaptRem(2),
      bottom: adaptRem(1),
      height: adaptRem(36),
      borderColor: commonConfig.grid.borderColor,
      borderWidth: commonConfig.grid.borderWidth,
    }],
    xAxis: [{
      gridIndex: 0,
      position: 'top',
      type: 'category',
      boundaryGap: false,
      axisLine: {
        onZero: false,
        lineStyle: {
          color: commonConfig.axisLine.color,
          width: commonConfig.axisLine.width,
        },
      },
      axisTick: {
        show: false,
        inside: true,
      },
      axisLabel: {
        show: false,
        inside: true,
      },
      data: timeData,
      axisPointer: {
        label: {
          margin: 0,
          color: '#fff',
          fontSize: adaptRem(10),
          backgroundColor: '#45586d',
          padding: [
            adaptRem(3),
            adaptRem(6),
            adaptRem(3),
            adaptRem(6),
          ],
          shadowBlur: 0,
          shadowColor: 'transparent',
        },
        lineStyle: {
          color: '#fff',
          width: 1,
        },
      },
    }, {
      gridIndex: 1,
      position: 'bottom',
      type: 'category',
      boundaryGap: false,
      axisLine: {
        onZero: false,
        lineStyle: {
          color: '#132234',
          width: adaptRem(1),
        },
      },
      axisTick: {
        show: false,
        inside: true,
      },
      axisLabel: {
        inside: true,
        interval: 0,
        margin: adaptRem(-15),
        formatter: (value, index) => {
          if (index === 0 || index === 330) {
            return value;
          } else if (index === 165) {
            return '12:00/13:00';
          } else {
            return null;
          }
        },
        color: '#506277',
        fontSize: adaptRem(10),
      },
      // splitLine: {
      //   interval: 0,
      // },
      data: timeData,
      axisPointer: {
        show: false,
      },
    }, {
      gridIndex: 2,
      type: 'category',
      axisLine: {
        show: false,
        onZero: false,
      },
      axisTick: {
        show: false,
        inside: true,
      },
      axisLabel: {
        show: false,
        inside: true,
      },
      data: timeData,
      axisPointer: {
        label: {
          show: false,
        },
        lineStyle: {
          color: '#fff',
          width: 1,
        },
      },
    }],
    yAxis: [{
      gridIndex: 0,
      position: 'right',
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#132234',
          width: adaptRem(1),
        },
      },
      axisTick: {
        show: false,
        inside: true,
      },
      axisLabel: {
        inside: true, // 刻度标签是否朝内
        margin: adaptRem(5),
        color: '#506277',
        fontSize: adaptRem(10),
        // formatter: (value, index) => {
        //   console.log(value, index);
        // },
      },
      splitLine: {
        show: false,
        // interval: (index, value) => {
        //   console.log('看下', index, value);

        //   return true;
        // },
        lineStyle: {
          color: '#f00',
          width: adaptRem(2),
          type: 'dotted',
        },
      },
      axisPointer: {
        show: false,
      },
    }, {
      gridIndex: 1,
      position: 'left',
      type: 'value',
      axisLine: {
        show: true,
        lineStyle: {
          color: '#132234',
          width: adaptRem(1),
        },
      },
      min: 310,
      max: 325,
      axisTick: {
        show: false,
        inside: true,
      },
      axisLabel: {
        inside: true, // 刻度标签是否朝内
        margin: adaptRem(5),
        color: '#506277',
        fontSize: adaptRem(10),
        // formatter: (value, index) => {
        //   console.log(value, index);
        // },
      },
      splitLine: {
        show: false,
        // interval: (index, value) => {
        //   console.log('看下', index, value);

        //   return true;
        // },
        lineStyle: {
          color: '#132234',
          width: adaptRem(1),
        },
      },
      axisPointer: {
        label: {
          precision: 2,
          margin: 0,
          color: '#fff',
          fontSize: adaptRem(10),
          backgroundColor: '#45586d',
          padding: [
            adaptRem(3),
            adaptRem(6),
            adaptRem(3),
            adaptRem(6),
          ],
          shadowBlur: 0,
          shadowColor: 'transparent',
        },
        lineStyle: {
          color: '#fff',
          width: 1,
          type: 'solid',
        },
      },
    }, {
      gridIndex: 2,
      type: 'value',
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
        inside: true,
      },
      axisLabel: {
        show: false,
        inside: true,
        margin: adaptRem(5),
        color: '#506277',
        fontSize: adaptRem(10),
      },
      splitLine: {
        show: false,
      },
      axisPointer: {
        show: false,
      },
    }],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        lineStyle: {
          width: 1,
        },
      },
      transitionDuration: 0,
      position: [0, adaptRem(-52)],
      // formatter: (params) => {
      //   console.log('看参数', params);
      // },
      backgroundColor: '#45586d',
      padding: 0,
      extraCssText: `width: 100%; height: ${adaptRem(52)}px;`,
    },
    axisPointer: {
      link: {
        xAxisIndex: 'all'
      },
    },
    toolbox: {
      show: false,
    },
    series: [{
      name: '价格',
      type: 'line',
      xAxisIndex: 0,
      yAxisIndex: 0,
      data: result.priceRange,
      itemStyle: {
        opacity: 0,
      },
      lineStyle: {
        color: commonConfig.custom.color.priceLine,
        width: adaptRem(1),
      },
      areaStyle: {
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
          offset: 0,
          color: 'rgba(0,222,255,.12)', // 0% 处的颜色
        }, {
          offset: 1,
          color: 'rgba(0,222,255,0)', // 100% 处的颜色
        }], false),
        origin: 'start',
      },
    }, {
      name: '均价',
      type: 'line',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: result.averagePrice,
      itemStyle: {
        opacity: 0,
      },
      lineStyle: {
        color: commonConfig.custom.color.averagePriceLine,
        width: adaptRem(1),
      },
    }, {
      type: 'bar',
      xAxisIndex: 2,
      yAxisIndex: 2,
      data: result.volume,
    }],
  };
};
