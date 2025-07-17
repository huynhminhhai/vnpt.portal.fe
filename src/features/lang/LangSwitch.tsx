import type { FC } from 'react';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { Dropdown as ADropdown } from 'antd';
import ButtonIcon from '@/components/ButtonIcon';

import { useLang } from './langContext';

interface Props {
  className?: string;
  /** Show tooltip */
  showTooltip?: boolean;
}

const LangSwitch: FC<Props> = memo(({ className, showTooltip = true }) => {
  const { t } = useTranslation();

  const { locale, localeOptions, setLocale } = useLang();

  const tooltipContent = showTooltip ? t('icon.lang') : '';

  function changeLocales({ key }: { key: string }) {
    setLocale(key as App.I18n.LangType);
  }

  // Convert localeOptions to Ant Design Dropdown format
  const dropdownItems = useMemo(
    () =>
      localeOptions.map(option => ({
        key: option.key,
        label: option.label
      })),
    [localeOptions]
  );

  return (
    <ADropdown menu={{ items: dropdownItems, onClick: changeLocales, selectedKeys: [locale] }}>
      <div>
        <ButtonIcon
          className={className}
          icon="heroicons:language"
          tooltipContent={tooltipContent}
          tooltipPlacement="left"
        />
      </div>
    </ADropdown>
  );
});

export default LangSwitch;
