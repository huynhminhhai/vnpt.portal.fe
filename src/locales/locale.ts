import enUS from './langs/en-us';
import viVN from './langs/vi-vn';
import zhCN from './langs/zh-cn';

const locales: Record<App.I18n.LangType, App.I18n.Schema> = {
  'en-US': {
    translation: enUS
  },
  'vi-VN': {
    translation: viVN
  },
  'zh-CN': {
    translation: zhCN
  }
};

export default locales;
