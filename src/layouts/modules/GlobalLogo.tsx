import clsx from 'clsx';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

// import SystemLogo from '@/components/SystemLogo';

interface Props extends Omit<LinkProps, 'to'> {
  /** Whether to show the title */
  showTitle?: boolean;
}
const GlobalLogo: FC<Props> = memo(({ className, showTitle = true, ...props }) => {
  const { t } = useTranslation();

  return (
    <Link
      className={clsx('w-full flex-center nowrap-hidden', className)}
      to={import.meta.env.VITE_ROUTE_HOME}
      {...props}
    >
      <SystemLogo className="mb-[1px] mr-1 h-auto w-[22px] text-32px text-primary" />
      {/* <Icon
        className="h-auto w-[20px] text-36px text-primary"
        icon="emojione-monotone:sheaf-of-rice"
      /> */}
      <h2
        className="pl-4px text-20px text-primary font-bold capitalize transition duration-300 ease-in-out"
        style={{ display: showTitle ? 'block' : 'none' }}
      >
        {t('system.title')}
      </h2>
    </Link>
  );
});

export default GlobalLogo;
