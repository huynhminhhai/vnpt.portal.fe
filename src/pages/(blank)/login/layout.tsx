import { getPaletteColorByNumber, mixColor } from '@sa/color';
import { Outlet } from 'react-router-dom';
import { getThemeSettings, useTheme } from '@/features/theme';
import Header from './modules/Header';
import Particles from 'react-tsparticles';
import { loadFull } from 'tsparticles';
import AOS from "aos";
import "aos/dist/aos.css";

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

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div
      className="relative size-full flex-center overflow-hidden bg-[#08254f] dark:bg-[#2b2b2b]"
    >
      <div className='absolute top-0 left-0 w-full h-full'>
        <img data-aos="zoom-in-up" src="/src/assets/imgs/map.webp" alt="vnpt bg" className='w-full h-full object-contain invert brightness-50' />
      </div>

      <Particles
        id="tsparticles"
        init={particlesInit}
        className="absolute inset-0 z-1 h-full w-full"
        options={{
          background: { color: "transparent" },
          fpsLimit: 60,
          interactivity: {
            events: {
              onHover: { enable: true, mode: "grab" },
              onClick: { enable: true, mode: "push" },
              resize: true,
            },
            modes: {
              repulse: { distance: 120, duration: 0.4 },
              grab: {
                distance: 200,
                line_linked: {
                  opacity: 0.5,
                },
              },
            },
          },
          particles: {
            color: { value: "#ffffff" },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.4,
              width: 1,
            },
            move: {
              enable: true,
              speed: 0.8,
              outModes: "bounce",
            },
            number: {
              density: { enable: true, area: 800 },
              value: 50,
            },
            opacity: { value: 0.6 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
          detectRetina: true,
        }}
      />

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
