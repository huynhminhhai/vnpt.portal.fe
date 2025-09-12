import { selectUserInfo } from "@/features/auth/authStore";
import { ThemeContext } from "@/features/theme";
import React, { useState, useEffect } from "react";
import CardSkeleton from '@/components/Skeleton/CardSkeleton';
import { Skeleton } from "antd";

type WeatherData = {
  temperature: number;
  windspeed: number;
  winddirection: number;
  weathercode: number;
  is_day: 0 | 1;
};

type RainDrop = {
  id: number;
  left: number;
  delay: number;
  duration: number;
};

const HeroBanner: React.FC = () => {

  const { user } = useAppSelector(selectUserInfo);
  const { darkMode } = useContext(ThemeContext);

  const [weatherData, setWeatherData] = useState<any>();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {

    setLoading(true);

    // await fetch("https://api.open-meteo.com/v1/forecast?latitude=10.535403744708382&longitude=106.40037277301413&current_weather=true")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setWeatherData(data.current_weather);
    //   })
    //   .catch((err) => console.error(err));

    setLoading(false);
  };

  useEffect(() => {
    fetchList();
  }, []);

  // Cập nhật thời gian mỗi phút
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Hàm xác định loại thời tiết
  const getWeatherType = (weathercode: number): "clear" | "cloudy" | "rain" => {
    if (weathercode === 0) return "clear";
    if (weathercode <= 3) return "cloudy";
    if ((weathercode >= 51 && weathercode <= 67) || (weathercode >= 80 && weathercode <= 82)) {
      return "rain";
    }
    return "cloudy";
  };

  // Tạo hiệu ứng mưa
  useEffect(() => {
    if (getWeatherType(weatherData?.weathercode) === "rain") {
      const interval = setInterval(() => {
        const newDrops: RainDrop[] = Array.from({ length: 5 }, (_, i) => ({
          id: Date.now() + i,
          left: Math.random() * 100,
          delay: Math.random() * 2,
          duration: Math.random() * 0.5 + 0.5,
        }));

        setRainDrops((prev) => [...prev, ...newDrops]);

        // Xóa drops cũ sau 2s
        setTimeout(() => {
          setRainDrops((prev) =>
            prev.filter((drop) => !newDrops.some((newDrop) => newDrop.id === drop.id))
          );
        }, 2000);
      }, 200);

      return () => clearInterval(interval);
    }
  }, [weatherData?.weathercode]);

  const getTimeOfDay = (): "morning" | "afternoon" | "evening" | "night" => {
    const hour = currentTime.getHours();
    if (hour >= 6 && hour < 12) return "morning";
    if (hour >= 12 && hour < 18) return "afternoon";
    if (hour >= 18 && hour < 22) return "evening";
    return "night";
  };

  const getGreeting = (): string => {
    const hour = currentTime.getHours();
    if (hour >= 5 && hour < 12) return "Chào buổi sáng";
    if (hour >= 12 && hour < 18) return "Chào buổi chiều";
    return "Chào buổi tối";
  };

  const getFormattedDate = (): string => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return currentTime.toLocaleDateString("vi-VN", options);
  };

  const getWeatherDescription = (weatherType: "clear" | "cloudy" | "rain"): string => {
    const descriptions: Record<typeof weatherType, string> = {
      clear: "Trời quang",
      cloudy: "Có mây",
      rain: "Mưa",
    };
    return descriptions[weatherType];
  };

  const getThemeClasses = (): string => {

    if (!weatherData) {
      return "bg-gradient-to-t from-sky-400 to-sky-500";
    }

    const timeOfDay = getTimeOfDay();
    const weatherType = getWeatherType(weatherData?.weathercode);
    const isDay = weatherData?.is_day === 1;

    const themes: Record<string, string> = {
      // Morning
      "morning-clear": "bg-gradient-to-t from-sky-400 to-sky-500",
      "morning-cloudy": "bg-gradient-to-t from-blue-400 to-blue-600",
      "morning-rain": "bg-gradient-to-t from-gray-400 to-gray-600",

      // Afternoon
      "afternoon-clear": "bg-gradient-to-t from-yellow-300 to-orange-500",
      "afternoon-cloudy": "bg-gradient-to-t from-purple-300 to-purple-500",
      "afternoon-rain": "bg-gradient-to-t from-blue-400 to-blue-600",

      // Evening
      "evening-clear": "bg-gradient-to-t from-pink-300 to-pink-500",
      "evening-cloudy": "bg-gradient-to-t from-indigo-400 to-purple-600",
      "evening-rain": "bg-gradient-to-t from-gray-500 to-gray-700",

      // Night
      "night-clear": "bg-gradient-to-t from-gray-800 to-sky-900",
      "night-cloudy": "bg-gradient-to-t from-gray-700 to-gray-900",
      "night-rain": "bg-gradient-to-t from-gray-700 to-sky-800",
    };

    const themeKey = isDay ? `${timeOfDay}-${weatherType}` : `night-${weatherType}`;

    return themes[themeKey] || themes["morning-clear"];
  };

  const weatherType = getWeatherType(weatherData?.weathercode);
  const isDay = weatherData?.is_day === 1;
  const showClouds = weatherType === "cloudy" || weatherType === "rain";
  const showRain = weatherType === "rain";
  const showStars = !isDay;

  return (
    <>
      {
        loading ?
          <div
            className="relative w-full overflow-hidden rounded-xl p-3 py-6"
            style={{
              backgroundColor: darkMode ? '#292929' : '#fcfdfe',
              boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
            }}
          >
            <div className="flex items-center justify-between gap-2">
              <div>
                <Skeleton
                  active
                  title={false}
                  paragraph={{
                    rows: 2,
                    width: ['200px', '120px']
                  }}
                />
              </div>
              <div>
                <Skeleton
                  active
                  title={false}
                  paragraph={{
                    rows: 2,
                    width: ['100px', '120px']
                  }}
                />
              </div>
            </div>
          </div>
          :
          <ACard
            // className="card-wrapper"
            variant="borderless"
            className={`card-wrapper border-4 border-white relative overflow-hidden transition-all duration-700 ${getThemeClasses()}`}
          >
            <div
            >
              {/* Weather Effects */}
              <div className="absolute inset-0 overflow-hidden">
                {/* Clouds */}
                {showClouds && (
                  <>
                    <div
                      className="cloud h-10 absolute animate-pulse opacity-20"
                      style={{
                        top: "20%",
                        left: "-150px",
                        animation: "float-cloud-1 25s linear infinite",
                      }}
                    ></div>

                    <div
                      className="cloud h-8 absolute animate-pulse opacity-20"
                      style={{
                        top: "60%",
                        left: "-120px",
                        animation: "float-cloud-2 30s linear infinite",
                        animationDelay: "-10s",
                      }}
                    ></div>

                    <div
                      className="cloud h-12 absolute animate-pulse opacity-20"
                      style={{
                        top: "5%",
                        left: "-180px",
                        animation: "float-cloud-3 35s linear infinite",
                        animationDelay: "-20s",
                      }}
                    ></div>
                  </>
                )}

                {/* Rain */}
                {showRain &&
                  rainDrops.map((drop) => (
                    <div
                      key={drop.id}
                      className="absolute w-0.5 h-5 bg-white bg-opacity-60"
                      style={{
                        left: `${drop.left}%`,
                        animation: `rain-fall ${drop.duration}s linear infinite`,
                        animationDelay: `${drop.delay}s`,
                      }}
                    />
                  ))}

                {/* Stars */}
                {showStars &&
                  [...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-0.5 h-0.5 bg-white rounded-full animate-pulse"
                      style={{
                        top: `${20 + i * 10}%`,
                        left: `${10 + i * 12}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: "2s",
                      }}
                    />
                  ))}
              </div>

              {/* Header Content */}
              <div className="relative z-10 flex flex-col md:flex-row justify-between items-center p-1 md:py-0 md:px-6 h-full text-white">
                {/* Greeting Section */}
                <div className="flex-1">
                  <h1 className="text-xl md:text-2xl font-bold pb-2 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent drop-shadow-lg">
                    {getGreeting()}, {user?.name}!
                  </h1>
                  <p className="text-sm font-semibold drop-shadow-lg">{getFormattedDate()}</p>
                </div>

                {/* Weather Section */}
                <div className="flex items-center gap-6">
                  {/* Weather Icon */}
                  <div className="w-20 h-20 flex items-center justify-center">
                    {weatherType === "clear" && isDay && (
                      <div
                        className="w-14 h-14 bg-yellow-400 rounded-full shadow-lg animate-spin relative"
                        style={{ animation: "spin 10s linear infinite" }}
                      >
                        <div className="absolute inset-0 rounded-full shadow-yellow-400/50 shadow-lg animate-pulse"></div>
                        {/* Sun rays */}
                        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full -top-5 left-1/2 transform -translate-x-1/2"></div>
                        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full -bottom-5 left-1/2 transform -translate-x-1/2"></div>
                        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full -left-5 top-1/2 transform -translate-y-1/2"></div>
                        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full -right-5 top-1/2 transform -translate-y-1/2"></div>
                        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full -top-4 -left-4"></div>
                        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full -top-4 -right-4"></div>
                        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full -bottom-4 -left-4"></div>
                        <div className="absolute w-2 h-2 bg-yellow-400 rounded-full -bottom-4 -right-4"></div>
                      </div>
                    )}

                    {weatherType === "clear" && !isDay && (
                      <div className="w-14 h-14 bg-yellow-300 rounded-full shadow-lg animate-pulse relative">
                        <div className="absolute w-10 h-10 bg-gray-700 rounded-full top-1 right-1 opacity-30"></div>
                        <div className="absolute inset-0 rounded-full shadow-yellow-300/50 shadow-lg"></div>
                      </div>
                    )}

                    {weatherType !== "clear" && (
                      <div
                        className="cloud h-8 animate-bounce opacity-100"
                        style={{ animation: "bounce 3s ease-in-out infinite" }}
                      ></div>
                    )}
                  </div>

                  {/* Weather Info */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="text-2xl md:text-3xl font-bold drop-shadow-lg">
                      {weatherData?.temperature}°C
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-base drop-shadow-lg text-sm font-semibold">
                        {getWeatherDescription(weatherType)}
                      </div>
                      <div className="flex items-center justify-end gap-2 text-sm drop-shadow-lg font-semibold">
                        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8.5,7A1.5,1.5 0 0,0 7,8.5A1.5,1.5 0 0,0 8.5,10H18A0.5,0.5 0 0,1 18.5,10.5A0.5,0.5 0 0,1 18,11H14V13H18A2.5,2.5 0 0,0 20.5,10.5A2.5,2.5 0 0,0 18,8H8.5M10.5,11A1.5,1.5 0 0,0 9,12.5A1.5,1.5 0 0,0 10.5,14H16A0.5,0.5 0 0,1 16.5,14.5A0.5,0.5 0 0,1 16,15H12V17H16A2.5,2.5 0 0,0 18.5,14.5A2.5,2.5 0 0,0 16,12H10.5Z" />
                        </svg>
                        <span>{weatherData?.windspeed} km/h</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Custom CSS for animations */}
              <style>{`

                .cloud {
                    aspect-ratio: 1.8;
                    --g: radial-gradient(50% 50%, #000 98%, #0000) no-repeat;
                    mask: var(--g) 100% 100%/30% 60%,var(--g) 70% 0/50% 100%,var(--g) 0 100%/36% 68%,var(--g) 27% 18%/26% 40%,linear-gradient(#000 0 0) bottom/67% 58% no-repeat;
                    background: #ffffff;
                }

                @keyframes float-cloud-1 {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(calc(100vw + 200px));
                  }
                }

                @keyframes float-cloud-2 {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(calc(100vw + 200px));
                  }
                }

                @keyframes float-cloud-3 {
                  0% {
                    transform: translateX(0);
                  }
                  100% {
                    transform: translateX(calc(100vw + 200px));
                  }
                }

                @keyframes rain-fall {
                  0% {
                    transform: translateY(-220px);
                    opacity: 1;
                  }
                  100% {
                    transform: translateY(220px);
                    opacity: 0;
                  }
                }
            `}</style>
            </div>
          </ACard>
      }
    </>
  );
};

export default HeroBanner;
