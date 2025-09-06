import { ThemeContext } from "@/features/theme"
import { toHostname } from "@/utils/number"
import { Icon } from "@iconify/react"
import React from "react"
import vnpt from '@/assets/imgs/vnpt.png';
import { Image } from "antd";

export interface ServicesItemProps {
  dataItem: any,
  index: number
}

const ServicesItem: React.FC<ServicesItemProps> = ({ dataItem, index }) => {

  const { darkMode } = useContext(ThemeContext);
  const [particles, setParticles] = useState<any>([]);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = [];
      for (let i = 0; i < 15; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 3 + 1,
          delay: Math.random() * 2,
          duration: Math.random() * 3 + 2,
          opacity: Math.random() * 0.5 + 0.1
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [])

  return (
    <ACol
      key={dataItem?.id}
      xs={24}
      sm={24}
      md={12}
      lg={8}
      xl={6}
      className="w-full max-w-full"
    >
      <div className="w-full h-full fade-up-css"
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <a
          href={dataItem?.systemUrl}
          target="_blank"
          rel="noreferrer"
          className={`
              group block h-full relative transition-all duration-700 ease-out transform
              hover:-translate-y-2
              ${isHovered ? 'z-10' : 'z-0'}
            `}
          style={{
            animationDelay: `${index * 0.15}s`,
            // filter: isHovered ? 'drop-shadow(0 30px 60px rgba(59, 130, 246, 0.3))' : 'none'
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Outer glow effect */}
          <div className={`
              absolute inset-0 rounded-2xl transition-all duration-700 group-hover:scale-[1.04]
              ${isHovered ? 'bg-gradient-to-br from-[#dbeafe]/50 via-[#ecfeff]/40 to-[#bfdbfe]/50 blur-xl scale-110' : ''}
            `} />

          {dataItem.systemUrl?.toLowerCase().includes("zalo") && (
            <div className="absolute z-[1] top-0 right-3 flex items-center gap-1.5 flex-wrap">
              <span
                className={`
                  inline-flex items-center rounded-bl-[3px] rounded-br-[3px] px-2.5 pt-[3px] pb-[4px] text-[11px] leading-[1] font-bold
                  bg-blue-100 ${darkMode ? 'text-gray-400 group-hover:!text-white' : 'text-blue-900'}
                `}
                style={{
                  boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1.2px 1.2px 0px'
                }}
              >
                Zalo Mini App
              </span>
            </div>
          )}

          {/* Main card */}
          <div className={`
              relative flex flex-col justify-between rounded-lg cursor-pointer
              transition-all duration-700 overflow-hidden border h-full
              ${darkMode
              ? 'bg-gray-900/95 backdrop-blur-md border-gray-700/50'
              : 'bg-white/95 backdrop-blur-md border-gray-200/50'
            }
            `}
            style={{
              background: isHovered
                ? darkMode
                  ? 'linear-gradient(145deg, rgba(17,24,39,0.98), rgba(31,41,55,0.98))'
                  : 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))'
                : undefined,
              boxShadow: isHovered
                ? '0 25px 50px rgba(59, 130, 246, 0.15), 0 0 0 1px rgba(59, 130, 246, 0.2), inset 0 1px 0 rgba(255,255,255,0.1)'
                : '0 8px 30px rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.05)'
            }}
          >
            {/* Digital animated background particles */}
            <div className="absolute top-0px inset-0 overflow-hidden pointer-events-none">
              {/* Circuit-like lines */}
              <svg className="absolute top-34px inset-0 w-full h-full" style={{ opacity: isHovered ? 0.4 : 0.6 }}>
                <defs>
                  <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.6" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <path
                  d="M20,50 Q100,20 200,80 T350,40"
                  stroke="url(#circuitGradient)"
                  strokeWidth="1"
                  fill="none"
                  className={`transition-all duration-1000 ${isHovered ? 'opacity-100' : 'opacity-30'}`}
                />
                <path
                  d="M0,100 Q150,60 280,120 T400,90"
                  stroke="url(#circuitGradient)"
                  strokeWidth="0.5"
                  fill="none"
                  className={`transition-all duration-1000 delay-300 ${isHovered ? 'opacity-100' : 'opacity-20'}`}
                />
              </svg>

              {/* Floating digital particles */}
              {particles.map((particle: any) => (
                <div
                  key={particle.id}
                  className={`
                      absolute rounded-full bg-gradient-to-r from-blue-400 to-cyan-400
                      transition-all duration-1000
                      ${isHovered ? 'scale-150 opacity-60' : 'scale-100 opacity-30'}
                    `}
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    animationDelay: `${particle.delay}s`,
                    animation: isHovered
                      ? `float ${particle.duration}s ease-in-out infinite alternate, pulse ${particle.duration * 0.5}s ease-in-out infinite`
                      : `float ${particle.duration}s ease-in-out infinite alternate`
                  }}
                />
              ))}

              {/* Hexagon tech shapes */}
              <div className={`
                  absolute w-15 h-15 transition-all duration-1000
                  ${isHovered ? 'scale-125 opacity-20 rotate-45' : 'scale-100 opacity-10 rotate-12'}
                  -top-9 -right-9
                `}>
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-400 opacity-60"
                  style={{
                    clipPath: 'polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)'
                  }}
                />
              </div>

              <div className={`
                  absolute w-12 h-12 transition-all duration-1000 delay-200
                  ${isHovered ? 'scale-110 opacity-25 -rotate-45' : 'scale-100 opacity-15 -rotate-12'}
                  bottom-8 -left-8
                `}>
                <div className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-400 opacity-40"
                  style={{
                    clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)'
                  }}
                />
              </div>
            </div>

            {/* Content wrapper with glassmorphism effect */}
            <div className="relative z-10 flex flex-col h-full">

              {/* Header với icon */}
              <div className="px-6 pt-6 pb-3 flex justify-between items-start flex-1">
                <div className="flex-1 max-w-[75%]">
                  <h2
                    dangerouslySetInnerHTML={{
                      __html: dataItem.systemName.replace(/\n/g, '<br/>'),
                    }}
                    className={`
                      text-lg leading-6 font-bold transition-all duration-300 line-clamp-2
                      ${darkMode ? '!text-white/90' : 'text-primary'}
                      group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-blue-800
                      group-hover:bg-clip-text group-hover:text-transparent
                    `} />
                  {/* {dataItem.systemName} */}
                  {/* </h2> */}

                  <div className={`
                      flex items-center gap-1 text-xs transition-all duration-500 mt-1
                      ${darkMode ? 'text-gray-400 group-hover:!text-white' : 'text-gray-500'}
                      group-hover:text-primary
                    `}>
                    <span className="font-medium">{toHostname(dataItem.systemUrl)}</span>
                    <div className={`
                        w-4 h-4 rounded-sm flex items-center justify-center
                        transition-all duration-500
                        ${isHovered ? 'translate-x-1 -translate-y-1 rotate-12 scale-110' : ''}
                      `}>
                      <Icon icon={'iconamoon:arrow-top-right-1'} fontSize={14} />
                    </div>
                  </div>

                  {/* {dataItem.systemUrl?.toLowerCase().includes("zalo") && (
                    <div className="flex items-center gap-1.5 flex-wrap mt-2">
                      <span
                        className={`
                          inline-flex items-center rounded-[12px] px-2.5 py-1 text-[10px] leading-[1] font-semibold
                          bg-gray-200/80 ${darkMode ? 'text-gray-400 group-hover:!text-white' : 'text-gray-500'}
                        `}
                      >
                        Zalo Mini App
                      </span>
                      <span
                        className={`
                          inline-flex items-center rounded-[12px] px-2.5 py-1 text-[10px] leading-[1] font-semibold
                          bg-gray-200/80 ${darkMode ? 'text-gray-400 group-hover:!text-white' : 'text-gray-500'}
                        `}
                      >
                        Mobile App
                      </span>
                    </div>
                  )} */}
                </div>

                {/* Tech icon với digital effect */}
                <div className="relative">
                  <div className={`
                      w-12 h-12 rounded-lg transition-all duration-700 flex items-center justify-center relative overflow-hidden
                      ${isHovered ? 'scale-110 rotate-6' : 'scale-100'}
                      bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-purple-500/10
                      border border-blue-500/20
                    `}>
                    {/* Digital scanning lines */}
                    <div className={`
                        absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent
                        transition-all duration-1000 transform -skew-x-12
                        ${isHovered ? 'translate-x-full opacity-100' : '-translate-x-full opacity-0'}
                      `} />

                    <div className="relative z-10 w-7 h-7 rounded-md overflow-hidden flex items-center justify-center">
                      <Image src={dataItem.iconUrl || vnpt} alt="logo" />
                    </div>
                  </div>

                  {/* Orbital ring effect */}
                  <div className={`
                      absolute inset-0 rounded-lg border-2 border-blue-400/30 transition-all duration-1000
                      ${isHovered ? 'scale-125 opacity-100 animate-spin' : 'scale-100 opacity-0'}
                    `}
                    style={{ animationDuration: '8s' }} />
                </div>
              </div>

              {/* Description with tech styling */}
              <div className="px-6 mb-4 h-[50px]">
                <p className={`
                    text-sm leading-relaxed transition-all duration-500
                    ${darkMode ? 'text-gray-300' : 'text-gray-600'}
                    group-hover:text-opacity-90
                    line-clamp-2
                  `}>
                  {dataItem.systemDescription}
                </p>
              </div>


              {/* Tech CTA Footer */}
              <div
                className={`
                  px-6 py-2.5 mt-auto transition-all duration-700 relative overflow-hidden
                  ${isHovered
                    ? 'bg-gradient-to-r from-primary via-blue-800 to-blue-500'
                    : darkMode
                      ? 'bg-gray-800/50'
                      : 'bg-gradient-to-r from-primary via-blue-900 to-blue-800'}
                `}
              >
                {/* Digital scan line animation */}
                <div
                  className={`
                    absolute inset-0 transition-all duration-1000
                    ${isHovered ? 'opacity-100' : 'opacity-0'}
                  `}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-pulse" />
                </div>

                {/* White arrow background animation */}
                <div
                  className={`absolute z-0 top-1/2 left-[32px] -translate-y-1/2
                    transition-all duration-300 ${isHovered ? 'animate-arrow-move' : ''}`}
                >
                  <div
                    className={`flex items-center scale-[2.2]  ${isHovered ? 'opacity-10' : 'opacity-05'}`}
                  >
                    <Icon icon={'pixel:angle-right'} fontSize={48} color="white" />
                    <Icon icon={'pixel:angle-right'} fontSize={48} color="white" className="transform -translate-x-9" />
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className={`
                        w-2 h-2 rounded-full transition-all duration-500
                        ${isHovered ? 'bg-white animate-pulse scale-125' : darkMode ? 'bg-cyan-400' : 'bg-white'}
                      `}
                    />
                    <span
                      className={`
                        text-xs font-bold transition-all duration-500 tracking-wide
                        ${isHovered ? 'text-white' : darkMode ? 'text-white' : 'text-white'}
                      `}
                    >
                      Truy Cập Ngay
                    </span>
                  </div>

                  <div
                    className={`
                      p-2 rounded-lg transition-all duration-500 relative overflow-hidden
                      ${isHovered
                        ? 'bg-white/20 backdrop-blur-sm scale-110'
                        : darkMode
                          ? 'bg-blue-500/20'
                          : 'bg-blue-100'}
                    `}
                  >
                    <div
                      className={`
                        flex items-center justify-center w-4 h-4 transition-all duration-500
                        ${isHovered ? 'text-white rotate-45' : darkMode ? 'text-cyan-400' : 'text-blue-600'}
                      `}
                    >
                      <Icon icon={'solar:link-bold-duotone'} fontSize={18} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </a>
      </div>
    </ACol>
  )
}

export default ServicesItem

{/* <div className="w-full max-w-sm mx-auto">
        <div
          className="group relative transition-all duration-200 top-0 hover:-top-1 h-full fade-up-css"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <a
            href={dataItem?.systemUrl}
            target="_blank"
            className="flex flex-col justify-between border border-gray-200/50 rounded-xl cursor-pointer relative transition-all duration-300 overflow-hidden h-full hover:shadow-xl hover:scale-[1.01] bg-white dark:bg-zinc-900"
            style={{
              boxShadow: '0px 12px 32px rgba(0,0,0,0.05)',
            }}
          >
            <div className="absolute top-5 right-5">
              <Image
                width={36}
                src={dataItem?.iconUrl || vnpt}
                preview={false}
                className="rounded-lg logo"
              />
            </div>
            <div className="px-4 pt-6 pb-4">
              <div className="max-w-[80%]">
                <h2
                  className="text-[18px] leading-[24px] font-semibold mb-[4px]"
                  style={{ color: darkMode ? '#ffffffd9' : '#000000E0' }}
                >
                  {dataItem?.systemName}
                </h2>
                <div className="flex items-center gap-1 text-[13px] leading-[20px]"
                  style={{
                    color: darkMode ? '#ffffffd9' : '#6b7280'
                  }}>
                  {toHostname(dataItem?.systemUrl)}
                  <Icon icon='heroicons:arrow-top-right-on-square-20-solid' fontSize={16} />
                </div>
              </div>
              <div
                className="text-[15px] leading-[22px] mt-3 line-clamp-2 max-w-[90%] h-[44px]"
                style={{
                  color: darkMode ? '#ffffffd9' : '#6b7280'
                }}
              >
                {dataItem?.systemDescription}
              </div>
            </div>
            <div className="px-4 py-3 flex items-center justify-between border-t-[1px] border-gray-200 group-hover:bg-primary group-hover:text-white">
              <div className="text-[14px] leading-[1] text-primary font-medium dark:text-white group-hover:text-white">Truy cập ngay</div>
              <Icon icon='solar:round-arrow-right-down-line-duotone' fontSize={26} className="text-primary dark:text-white group-hover:text-white" />
            </div>
          </a >
        </div>
      </div> */}
