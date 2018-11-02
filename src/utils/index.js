/**
 * 工具方法
 */
import commonConfig from 'config/config.common';

/**
 * 适配rem
 * @param {number} val 需要适配的px值
 * @param {boolean} unit 是否返回带px单位的值
 */
export const adaptRem = (val, unit = false) => {
  // 如果是移动端项目，才做适配
  if (commonConfig.mobile) {
    const dpr = window.devicePixelRatio;
    const result = unit ? `${val * dpr}px` : val * dpr;

    return result;
  }

  return unit ? `${val}px` : val;
};
