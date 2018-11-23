/**
 * 处理语言包
 */

import commonConfig from 'config/config.common';
import localeConfig from 'config/config.locale';
import queryString from 'query-string';
import intl from 'react-intl-universal';
import { handleLocalStorage } from 'utils';
import enUSLangPack from 'locales/en_US.json'; // 英文语言包
import zhCNLangPack from 'locales/zh_CN.json'; // 中文简体语言包
import zhTWLangPack from 'locales/zh_TW.json'; // 中文繁体语言包
// Ant Design Mobile 英文语言包
import enUSAntMobile from 'antd-mobile/lib/locale-provider/en_US';
import enUSAnt from 'antd/lib/locale-provider/en_US'; // Ant Design 英文语言包
import zhCNAnt from 'antd/lib/locale-provider/zh_CN'; // Ant Design 中文简体语言包
import zhTWAnt from 'antd/lib/locale-provider/zh_TW'; // Ant Design 中文繁体语言包

const formatTranslationMessages = (locale, messages) => {
  const configDefaultLang = localeConfig.defaultLang; // 配置文件中的默认语言

  let defaultLangPack = zhCNLangPack;

  switch (configDefaultLang) {
    case 'en_US':
      defaultLangPack = enUSLangPack;
      break;
    case 'zh_CN':
      defaultLangPack = zhCNLangPack;
      break;
    case 'zh_TW':
      defaultLangPack = zhTWLangPack;
      break;
    default:
      defaultLangPack = zhCNLangPack;
      break;
  }

  const defaultFormattedMessages = locale !== configDefaultLang
    ? formatTranslationMessages(configDefaultLang, defaultLangPack)
    : {};

  return Object.keys(messages).reduce((formattedMessages, key) => {
    const formattedMessage = !messages[key] && locale !== configDefaultLang
      ? defaultFormattedMessages[key]
      : messages[key];

    return Object.assign(formattedMessages, {
      [key]: formattedMessage,
    });
  }, {});
};

const appLangPack = {
  en_US: formatTranslationMessages('en_US', enUSLangPack),
  zh_CN: formatTranslationMessages('zh_CN', zhCNLangPack),
  zh_TW: formatTranslationMessages('zh_TW', zhTWLangPack),
};

export const setLanguage = (lang) => {
  let currentLocale = lang || localeConfig.defaultLang;

  if (!lang) {
    // url中带的语言
    const urlLang = queryString.parse(window.location.search).lang || null;
    // 本地保存的语言
    const localLang = handleLocalStorage('get', 'curLanguage');

    // 本地参数为第二优先
    if (localLang && localeConfig.languages.indexOf(localLang) >= 0) {
      currentLocale = localLang;
    }

    // url 参数为第一优先
    if (urlLang && localeConfig.languages.indexOf(urlLang) >= 0) {
      currentLocale = urlLang;
    }
  }

  intl.init({
    currentLocale,
    locales: appLangPack,
  });

  handleLocalStorage('set', 'curLanguage', currentLocale);

  return currentLocale;
};

// 获取 Ant Design 的语言包支持
export const getAntDesignLang = (lang) => {
  const langIndex = localeConfig.languages.indexOf(lang);

  if (!commonConfig.mobile) {
    // PC 版
    switch (langIndex) {
      case 0:
        return enUSAnt;
      case 1:
        return zhCNAnt;
      case 2:
        return zhTWAnt;
      default:
        return zhCNAnt;
    }
  } else {
    // 移动版
    switch (langIndex) {
      case 0:
        return enUSAntMobile;
      default:
        return undefined;
    }
  }
};
