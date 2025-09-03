import AOS from "aos";
import "aos/dist/aos.css";
import { selectUserInfo } from "@/features/auth/authStore";
import map from '@/assets/imgs/map-2.png';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const HeroBanner = () => {

  const { tenant } = useAppSelector(selectUserInfo);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const particlesInit = async (main: any) => {
    await loadFull(main);
  };

  return (
    <div
      className="relative"
      id="particles-js"
    >
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
              // onClick: { enable: true, mode: "push" },
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
              value: 5,
            },
            opacity: { value: 0.6 },
            shape: { type: "circle" },
            size: { value: { min: 1, max: 4 } },
          },
          detectRetina: true,
        }}
      />
      <ACard
        className="relative overflow-hidden border-none px-0 md:px-10 py-[12px] md:py-[20px] rounded-0 bg-gradient-to-r from-primary to-blue-900 dark:bg-[#111826] text-white"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[22px] md:text-[32px] leading:[34px] md:leading-[42px] font-semibold capitalize" data-aos="fade-right" data-aos-delay="100">
              Portal
              {
                tenant ? " " + tenant?.name : " " + "Cấp Xã"
              }
            </h1>
            <div className="mt-1 md:mt-4 max-w-[90%] md:max-w-[60%] text-[15px] font-normal leading-[26px]" data-aos="fade-right" data-aos-delay="200">
              <div className="h-[1.5px] w-[15%] bg-white mb-[6px] opacity-80"></div>
              Nơi bạn có thể quản lý và sử dụng các giải pháp chuyển đổi số được thiết kế chuyên biệt cho địa phương của mình.
            </div>
          </div>
        </div>
        <div className="absolute z-[1] top-1/2 right-[-55%] md:right-[100px] transform -translate-y-[50%]">
          <img data-aos="zoom-in-left" className="w-[320px] md:w-[620px] h-auto invert brightness-0" src={map} alt="vnpt" />
        </div>
      </ACard>
    </div>
  )
}

export default HeroBanner
