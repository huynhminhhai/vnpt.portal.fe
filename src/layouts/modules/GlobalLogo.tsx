import clsx from 'clsx';
import { Link } from 'react-router-dom';
import type { LinkProps } from 'react-router-dom';

// import SystemLogo from '@/components/SystemLogo';

interface Props extends Omit<LinkProps, 'to'> {
  /** Whether to show the title */
  showTitle?: boolean;
}
const GlobalLogo: FC<Props> = memo(({ className, showTitle = true, title, ...props }) => {
  const { t } = useTranslation();

  return (
    <Link
      className={clsx('w-full flex-center nowrap-hidden', className)}
      to={import.meta.env.VITE_ROUTE_HOME}
      {...props}
    >
      <SystemLogo className="mb-[1px] mr-1 h-auto w-[18px] text-32px text-primary dark:invert dark:brightness-0" />
      <h2
        className="pl-4px text-16px text-primary dark:text-white font-bold transition duration-300 ease-in-out"
        style={{ display: showTitle ? 'block' : 'none' }}
      >
        {
          title || t('system.title')
        }
      </h2>
    </Link>
  );
});

export default GlobalLogo;
