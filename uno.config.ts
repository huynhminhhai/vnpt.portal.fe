import { presetSoybeanAdmin } from '@sa/uno-preset';
import presetUno from '@unocss/preset-uno';
import type { Theme } from '@unocss/preset-uno';
import transformerDirectives from '@unocss/transformer-directives';
import transformerVariantGroup from '@unocss/transformer-variant-group';
import { defineConfig } from '@unocss/vite';

import { themeVars } from './src/theme/vars';

export default defineConfig<Theme>({
  content: {
    pipeline: {
      exclude: ['node_modules', 'dist']
    }
  },
  presets: [presetUno({ dark: 'class' }), presetSoybeanAdmin()],
  safelist: [
    (context) => {
      const colors = [
        'gray', 'stone',
        'green', 'emerald', 'teal', 'cyan', 'sky',
        'blue', 'indigo',
      ]
      const levels = ['100', '400', '500', '600', '800', '900', '950']
      const opacities = [
        '', '/10', '/20', '/25', '/30', '/50', '/90', '/95'
      ]

      const utilities = ['text', 'bg', 'from', 'to', 'border']

      const result: string[] = []
      for (const u of utilities) {
        for (const c of colors) {
          for (const l of levels) {
            for (const o of opacities) {
              result.push(`${u}-${c}-${l}${o}`)
            }
          }
        }
      }
      return result
    }
  ],
  rules: [
    [
      /^h-calc\((.*)\)$/, // 匹配 h-clac(xxx) 的正则表达式
      ([, d]) => ({ height: `calc(${d})px` }) // 生成对应的 CSS 样式
    ]
  ],
  shortcuts: {
    'card-wrapper': 'rd-8px shadow-sm'
  },
  theme: {
    ...themeVars,
    fontSize: {
      icon: '1.125rem',
      'icon-large': '1.5rem',
      'icon-small': '1rem',
      'icon-xl': '2rem',
      'icon-xs': '0.875rem'
    }
  },
  transformers: [transformerDirectives(), transformerVariantGroup()]
});
