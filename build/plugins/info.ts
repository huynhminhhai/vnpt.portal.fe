import boxen, { type Options as BoxenOptions } from 'boxen';
import gradientString from 'gradient-string';
import type { Plugin } from 'vite';

import { themeSettings } from '../../src/theme/settings';

const welcomeMessage = gradientString(themeSettings.themeColor, 'magenta').multiline(
  `Phát triển bởi VNPT Tây Ninh (Mr.Trong and Mr.Hai)`
);

const boxenOptions: BoxenOptions = {
  borderColor: themeSettings.themeColor,
  borderStyle: 'round',
  padding: 0.5
};

export function setupProjectInfo(): Plugin {
  return {
    buildStart() {
      console.log(boxen(welcomeMessage, boxenOptions));
    },

    name: 'vite:buildInfo'
  };
}
