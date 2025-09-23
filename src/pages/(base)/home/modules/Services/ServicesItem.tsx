import { ThemeContext } from "@/features/theme"
import { toHostname } from "@/utils/number"
import { Icon } from "@iconify/react"
import React from "react"
import vnpt from '@/assets/imgs/vnpt.png';
import { Image, Tooltip } from "antd";
import { PortalRedirect } from "@/service/api";

export interface ServicesItemProps {
  dataItem: any,
  index: number,
  color?: string,
  toggleFavorite: (id: number) => void,
  isShowShadow?: boolean
}

const ServicesItem: React.FC<ServicesItemProps> = ({ dataItem, index, color = 'blue', toggleFavorite, isShowShadow = true }) => {

  const { darkMode } = useContext(ThemeContext);
  const [particles, setParticles] = useState<any>([]);
  const [isHovered, setIsHovered] = useState(false);
  const [isLoadingRedirect, setIsLoadingRedirect] = useState(false);

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
  }, []);

  const newTabRef = useRef<Window | null>(null);

  const openNewTab = (url: string): Window | null => {
    if (!newTabRef.current || newTabRef.current.closed) {
      newTabRef.current = window.open(url, "_blank");
    }
    return newTabRef.current;
  };

  const postMessageToTab = (tab: Window | null, message: any, targetOrigin: string) => {
    if (!tab) return console.warn("Tab not ready");

    setTimeout(() => {
      tab.postMessage(message, targetOrigin);
      console.log("Sent message to new tab");
    }, 1000); // đợi tab kịp load
  };

  const handleRedirectUrl = async ({ url, systemWebId, isCallApi = true }: { url: string, systemWebId: number, isCallApi: boolean }) => {
    setIsLoadingRedirect(true);

    try {
      if (!isCallApi) {
        openNewTab(url);
        return;
      }

      const res = await PortalRedirect(systemWebId);
      const portalToken = res?.data?.result?.portalToken;

      const tab = openNewTab(url);
      postMessageToTab(tab, portalToken, url);
      localStorage.removeItem('serviceUrl');
    } catch (error) {
      console.error("Redirect error:", error);
    } finally {
      setIsLoadingRedirect(false);
    }
  }

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
        <div
          rel="noreferrer"
          className={`
              group block h-full relative transition-all duration-700 ease-out transform cursor-pointer
              ${isHovered ? 'z-10 -translate-y-2' : 'z-0'}
            `}
          style={{
            animationDelay: `${index * 0.15}s`,
          }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Outer glow effect */}
          <div className={`
              absolute inset-0 rounded-2xl transition-all duration-700
              ${isHovered ? `bg-gradient-to-br from-${color}-100/40 via-${color}-200/40 to-${color}-300/50 blur-xl scale-[1.04]` : ''}
            `} />

          {/* Tag */}
          <Tooltip
            title={dataItem?.isFavorite ? "Xóa khỏi mục yêu thích" : "Thêm vào mục yêu thích"}
            placement="topLeft"
            className={`absolute -top-0 -right-0 z-20 transition-all duration-300 border-1 border-primary/10
                ${dataItem?.isFavorite ? "opacity-100" : "opacity-45 hover:opacity-100"}
                }
              `}>
            <div
              onClick={(e) => {
                e.preventDefault();
                toggleFavorite(dataItem.id);
              }}
              className="absolute -top-1 -right-1 p-1.5 rounded-full bg-white"
            >
              <Icon
                icon={dataItem?.isFavorite ? "bi:bookmark-star-fill" : "bi:bookmark-star"}
                className="text-primary/90"
                fontSize={18}
              />
            </div>
          </Tooltip>

          {/* Main card */}
          <div className={`
              relative flex flex-col justify-between rounded-lg cursor-pointer
              transition-all duration-700 overflow-hidden border h-full
              ${isShowShadow ?
              `shadow-[0_8px_30px_rgba(0,0,0,0.12),0_0_0_1px_rgba(255,255,255,0.05)]
                  hover:shadow-[rgba(50,50,93,0.25)_0px_13px_27px_-5px,rgba(0,0,0,0.3)_0px_8px_16px_-8px]` : 'shadow-sm'
            }
              ${darkMode
              ? `${isHovered ? 'bg-gray-900/95 border-gray-700/50' : 'bg-gray-900/95 border-gray-700/50'}`
              : `${isHovered ? `bg-white/95 border-${color}-500/30` : 'bg-white/95 border-gray-200/50'}`
            }
            `}
            style={{
              background: isHovered
                ? darkMode
                  ? 'linear-gradient(145deg, rgba(17,24,39,0.98), rgba(31,41,55,0.98))'
                  : 'linear-gradient(145deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))'
                : undefined,
            }}
            onClick={() => {
              if (!isLoadingRedirect) {
                handleRedirectUrl({
                  url: dataItem?.systemUrl,
                  systemWebId: dataItem?.id,
                  isCallApi: dataItem?.secretKey ? true : false
                })
              }
            }}
          >
            {/* Digital animated background particles */}
            <div className="absolute top-0px inset-0 overflow-hidden pointer-events-none">
              {/* Circuit-like lines */}
              <svg className="absolute top-30px inset-0 w-full h-full" style={{ opacity: isHovered ? 0.4 : 0.6 }}>
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
                      absolute rounded-full bg-gradient-to-r from-${color}-400 to-${color}-200
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
                <div className={`w-full h-full bg-gradient-to-br from-${color}-500 to-${color}-400 opacity-60`}
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
                <div className={`w-full h-full bg-gradient-to-br from-${color}-500 to-${color}-400 opacity-40`}
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
                      ${darkMode ? '!text-white/90' : `text-${color}-900`}
                      ${isHovered ? `
                        bg-gradient-to-r from-${color}-900 to-${color}-500
                        bg-clip-text text-transparent
                      ` : ''}
                    `} />

                  <div className={`
                      flex items-center gap-1 text-xs transition-all duration-500 mt-1
                      ${darkMode
                      ? `${isHovered ? '!text-white' : 'text-gray-400'}`
                      : `${isHovered ? `text-${color}-900` : 'text-gray-600'}`
                    }
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
                </div>

                {/* Tech icon với digital effect */}
                <div className="relative">
                  <div className={`
                      w-12 h-12 rounded-lg transition-all duration-700 flex items-center justify-center relative overflow-hidden
                      ${isHovered ? 'scale-110 rotate-6' : 'scale-100'}
                      bg-gradient-to-br from-${color}-800/10 to-${color}-500/10
                      border border-${color}-500/20
                    `}>

                    <div className="relative z-10 w-7 h-7 rounded-md overflow-hidden flex items-center justify-center">
                      <Image src={dataItem.iconUrl || vnpt} alt="logo" />
                    </div>
                  </div>

                  {/* Orbital ring effect */}
                  <div className={`
                      absolute inset-0 rounded-lg border-2 border-${color}-400/30 transition-all duration-1000
                      ${isHovered ? 'scale-125 opacity-100 animate-spin' : 'scale-100 opacity-0'}
                    `}
                    style={{ animationDuration: '8s' }} />
                </div>
              </div>

              {/* Description with tech styling */}
              <div className="px-6 mb-4 h-[50px]">
                <p className={`
                    text-sm leading-relaxed transition-all duration-500
                    ${darkMode ? 'text-gray-300' : 'text-gray-600'} line-clamp-2
                  `}>
                  {dataItem.systemDescription}
                </p>
              </div>


              {/* Tech CTA Footer */}
              <div
                className={`
                  px-6 py-2.5 mt-auto transition-all duration-700 relative overflow-hidden
                  ${isHovered
                    ? `bg-gradient-to-r from-${color}-900 via-${color}-800 to-${color}-500`
                    : `bg-gradient-to-r from-${color}-900 via-${color}-800 to-${color}-800`}
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
                        ${dataItem?.secretKey ? "bg-green-600" : "bg-white"}
                        ${isHovered ? "animate-pulse scale-125" : ""}
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
                      p-2 rounded-md transition-all duration-500 relative overflow-hidden flex items-center gap-2
                      ${isHovered
                        ? 'bg-white/20 backdrop-blur-sm scale-110'
                        : darkMode
                          ? `bg-${color}-500/20`
                          : `bg-${color}-100`}
                    `}
                  >
                    {
                      dataItem?.platformTypes?.length > 0 ?
                        <div className={`text-[10px] leading-[1] font-bold
                          ${isHovered ? 'text-white' : darkMode ? `text-white` : `text-${color}-800`}
                        `}>
                          {
                            dataItem.platformTypes[0] === 'Web App' ?
                              <div
                                className={`
                                  flex items-center justify-center w-4 h-3 transition-all duration-500
                                  ${isHovered ? 'text-white' : darkMode ? `text-white` : `text-${color}-800`}
                                `}
                              >
                                <Icon icon={'streamline-plump:web'} fontSize={16} />
                              </div> :
                              dataItem.platformTypes[0]
                          }
                        </div> :
                        <div
                          className={`
                        flex items-center justify-center w-4 h-3 transition-all duration-500
                        ${isHovered ? 'text-white' : darkMode ? `text-white` : `text-${color}-800`}
                      `}
                        >
                          <Icon icon={'streamline-plump:web'} fontSize={16} />
                        </div>
                    }
                    {
                      isLoadingRedirect && (
                        <Icon icon={'eos-icons:loading'} fontSize={16} />
                      )
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ACol>
  )
}

export default ServicesItem
