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

/**
 * localStorage 处理方法
 * @param type: 要做什么操作
 * @param key: 要处理的key
 * @param value: 要存的值
 */
export const handleLocalStorage = (type, key, value) => {
  switch (type) {
    case 'set':
      window.localStorage.setItem(key, value);

      return null;
    case 'get':
      return window.localStorage.getItem(key);
    case 'remove':
      window.localStorage.removeItem(key);

      return null;
    default:
      return null;
  }
};

/**
 * sessionStorage 处理方法
 * @param type: 要做什么操作
 * @param key: 要处理的key
 * @param value: 要存的值
 */
export const handleSessionStorage = (type, key, value) => {
  switch (type) {
    case 'set':
      window.sessionStorage.setItem(key, value);

      return null;
    case 'get':
      return window.sessionStorage.getItem(key);
    case 'remove':
      window.sessionStorage.removeItem(key);

      return null;
    default:
      return null;
  }
};

/**
 * 拆分数组
 * @param array: 要拆分的数组
 * @param num: 一组的个数
 */
export const splitArray = (array, num = 1) => {
  const result = [];

  let temp = [];
  let key = 0;

  for (let i = 0; i < array.length; i++) {
    if (i % num === 0) {
      temp = [];

      for (let j = 0; j < num; j++) {
        if (array[i + j] === undefined) {
          continue; // eslint-disable-line
        } else {
          temp[j] = array[i + j];
        }
      }

      result[key] = temp;

      key += 1;
    }
  }

  return result;
};
