/**
 * 图表通用配置项
 */
import { adaptRem } from 'utils';

export default {
  grid: {
    borderColor: '#132234',
    borderWidth: adaptRem(1),
  },
  axisLine: {
    color: '#132234',
    width: adaptRem(1),
  },
  axisLabel: {
    color: '#506277',
    fontSize: adaptRem(10),
  },
  custom: {
    color: {
      red: '#f03a4f',
      green: '#00ca66',
      priceLine: '#00adcd', // 价格线颜色
      averagePriceLine: '#f1922e', // 均价线颜色
    },
  },
};
