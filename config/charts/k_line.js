/**
 * K线图配置
 */
import { adaptRem } from 'utils';
import commonConfig from './common';
import apiResult from 'config/data/k_line.json';

const splitData = (rawData) => {
  var categoryData = [];
  var values = [];
  var volumes = [];
  for (var i = 0; i < rawData.length; i++) {
    categoryData.push(rawData[i].splice(0, 1)[0]);
    values.push(rawData[i]);
    volumes.push([i, rawData[i][4], rawData[i][0] > rawData[i][1] ? 1 : -1]);
  }

  return {
    categoryData: categoryData,
    values: values,
    volumes: volumes
  };
}

const calculateMA = (dayCount, data) => {
  var result = [];
  for (var i = 0, len = data.values.length; i < len; i++) {
    if (i < dayCount) {
      result.push('-');
      continue;
    }
    var sum = 0;
    for (var j = 0; j < dayCount; j++) {
      sum += data.values[i - j][1];
    }
    result.push(+(sum / dayCount).toFixed(3));
  }
  return result;
}

const data = splitData(apiResult.data);
// console.log('看下值', data);

export default {
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
    show: true,
    left: adaptRem(2),
    right: adaptRem(2),
    bottom: adaptRem(1),
    height: adaptRem(36),
    borderColor: commonConfig.grid.borderColor,
    borderWidth: commonConfig.grid.borderWidth,
  }],
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    },
    backgroundColor: 'rgba(245, 245, 245, 0.8)',
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    textStyle: {
      color: '#000'
    },
    position: function (pos, params, el, elRect, size) {
      var obj = { top: 10 };
      obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
      return obj;
    }
    // extraCssText: 'width: 170px'
  },
  axisPointer: {
    link: { xAxisIndex: 'all' },
    label: {
      backgroundColor: '#777'
    }
  },
  toolbox: {
    show: false,
  },
  brush: {
    xAxisIndex: 'all',
    brushLink: 'all',
    outOfBrush: {
      colorAlpha: 0.1
    }
  },
  visualMap: {
    show: false,
    seriesIndex: 5,
    dimension: 2,
    pieces: [{
      value: 1,
      color: commonConfig.custom.color.green
    }, {
      value: -1,
      color: commonConfig.custom.color.red
    }]
  },
  xAxis: [
    {
      type: 'category',
      data: data.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: {
        onZero: false,
        lineStyle: {
          color: commonConfig.axisLineColor,
          width: commonConfig.axisLineWidth,
        },
      },
      axisTick: {
        show: false,
        inside: true,
      },
      axisLabel: {
        // inside: true,
        color: commonConfig.axisLabelColor,
        fontSize: commonConfig.axisLabelFontSize,
      },
      splitLine: {
        show: false
      },
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax',
      axisPointer: {
        z: 100
      }
    },
    {
      type: 'category',
      gridIndex: 1,
      data: data.categoryData,
      scale: true,
      boundaryGap: false,
      axisLine: { onZero: false },
      axisTick: { show: false },
      splitLine: { show: false },
      axisLabel: { show: false },
      splitNumber: 20,
      min: 'dataMin',
      max: 'dataMax'
      // axisPointer: {
      //     label: {
      //         formatter: function (params) {
      //             var seriesValue = (params.seriesData[0] || {}).value;
      //             return params.value
      //             + (seriesValue != null
      //                 ? '\n' + echarts.format.addCommas(seriesValue)
      //                 : ''
      //             );
      //         }
      //     }
      // }
    }
  ],
  yAxis: [{
    scale: true,
    axisLine: {
      lineStyle: {
        color: commonConfig.axisLineColor,
        width: commonConfig.axisLineWidth,
      },
    },
    axisTick: {
      show: false,
      inside: true,
    },
    axisLabel: {
      inside: true,
      color: commonConfig.axisLabelColor,
      fontSize: commonConfig.axisLabelFontSize,
    },
    splitArea: {
      show: true
    }
  }, {
    scale: true,
    gridIndex: 1,
    splitNumber: 2,
    axisLabel: { show: false },
    axisLine: { show: false },
    axisTick: { show: false },
    splitLine: { show: false }
  }],
  dataZoom: [
    {
      type: 'inside',
      xAxisIndex: [0, 1],
      start: 98,
      end: 100
    },
    {
      show: false,
      xAxisIndex: [0, 1],
      type: 'slider',
      top: '85%',
      start: 98,
      end: 100
    }
  ],
  series: [
    {
      name: 'Dow-Jones index',
      type: 'candlestick',
      data: data.values,
      itemStyle: {
        normal: {
          color: commonConfig.custom.color.red,
          color0: commonConfig.custom.color.green,
          borderColor: null,
          borderColor0: null
        }
      },
      tooltip: {
        formatter: function (param) {
          param = param[0];
          return [
            'Date: ' + param.name + '<hr size=1 style="margin: 3px 0">',
            'Open: ' + param.data[0] + '<br/>',
            'Close: ' + param.data[1] + '<br/>',
            'Lowest: ' + param.data[2] + '<br/>',
            'Highest: ' + param.data[3] + '<br/>'
          ].join('');
        }
      }
    },
    {
      name: 'MA5',
      type: 'line',
      data: calculateMA(5, data),
      smooth: true,
      lineStyle: {
        normal: { opacity: 0.5 }
      }
    },
    {
      name: 'MA10',
      type: 'line',
      data: calculateMA(10, data),
      smooth: true,
      lineStyle: {
        normal: { opacity: 0.5 }
      }
    },
    {
      name: 'MA20',
      type: 'line',
      data: calculateMA(20, data),
      smooth: true,
      lineStyle: {
        normal: { opacity: 0.5 }
      }
    },
    {
      name: 'MA30',
      type: 'line',
      data: calculateMA(30, data),
      smooth: true,
      lineStyle: {
        normal: { opacity: 0.5 }
      }
    },
    {
      name: 'Volume',
      type: 'bar',
      xAxisIndex: 1,
      yAxisIndex: 1,
      data: data.volumes
    }
  ]
}
