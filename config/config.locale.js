/**
 * 多语言配置
 */

const locales = {
  languages: [
    'en_US', // 英语
    'zh_CN', // 中文简体
    'zh_TW', // 中文繁体
  ],
};

const defaultLang = locales.languages[1];

locales.defaultLang = defaultLang; // 应用默认语言，但是还是会优先浏览器语言

export default locales;
