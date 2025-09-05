import { Space } from 'antd';

import FlipText from '@/components/FilpText';
import SystemLogo from '@/components/SystemLogo';
import { LangSwitch } from '@/features/lang';
import { ThemeSchemaSwitch } from '@/features/theme';

const Header = memo(() => {
  const { t } = useTranslation();

  return (
    <header className="flex-center items-center justify-between">
      <div className='flex items-center gap-4'>
        <SystemLogo className="mb-1 mr-2 mt-2 h-36px w-36px text-primary lt-sm:h-48px lt-sm:w-48px" />
        <div>
          <FlipText
            className="text-24px leading-32px text-primary font-bold lt-sm:text-22px"
            word={'Cổng Chuyển đổi số cấp xã tỉnh Tây Ninh'}
          />
        </div>
      </div>

      <div className="i-flex-col absolute top-2 right-2">
        <ThemeSchemaSwitch
          className="text-20px lt-sm:text-18px"
          showTooltip={false}
        />
        {/* <LangSwitch showTooltip={false} /> */}
      </div>
    </header>
  );
});

export default Header;
