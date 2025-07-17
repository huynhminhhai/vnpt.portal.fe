import enUS from 'antd/es/locale/en_US';
import viVN from 'antd/es/locale/vi_VN';
import zhCN from 'antd/es/locale/zh_CN';
import type { Locale } from 'antd/lib/locale';

export const antdLocales: Record<App.I18n.LangType, Locale> = {
  'en-US': enUS,
  'vi-VN': viVN,
  'zh-CN': zhCN
};
