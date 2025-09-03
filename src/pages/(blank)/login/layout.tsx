import { getPaletteColorByNumber, mixColor } from '@sa/color';
import { Outlet } from 'react-router-dom';
import { getThemeSettings, useTheme } from '@/features/theme';
import Header from './modules/Header';
import AOS from "aos";
import "aos/dist/aos.css";
import map from '@/assets/imgs/map.webp';

function useBgColor() {
  const COLOR_WHITE = '#ffffff';

  const { darkMode } = useTheme();

  const { themeColor } = useAppSelector(getThemeSettings);

  const bgThemeColor = darkMode ? getPaletteColorByNumber(themeColor, 600) : themeColor;

  const ratio = darkMode ? 0.5 : 0.2;

  const bgColor = mixColor(COLOR_WHITE, themeColor, ratio);

  return {
    bgColor,
    bgThemeColor
  };
}

const LoginLayout = () => {

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div
      className="relative size-full flex-center overflow-hidden bg-gradient-to-r from-primary to-blue-900 dark:bg-[#2b2b2b]"
    >
      <div className='absolute top-0 left-0 w-full h-full'>
        <img data-aos="zoom-in-up" src={map} alt="vnpt bg" className='w-full h-full object-contain invert brightness-50' />
      </div>

      <ACard
        className="relative z-4 w-auto rd-12px p-6"
        variant="borderless"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div className="w-400px lt-sm:w-300px">
          <Header />
          <main className="pt-24px">
            <Outlet />
          </main>
        </div>
      </ACard>
    </div>
  );
};

export default LoginLayout;
