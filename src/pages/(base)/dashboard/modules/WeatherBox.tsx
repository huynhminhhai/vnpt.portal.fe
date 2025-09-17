import { selectUserInfo } from "@/features/auth/authStore";
import { ThemeContext } from "@/features/theme";
import React, { useState, useEffect } from "react";
import { Skeleton } from "antd";
import { Icon } from "@iconify/react";

type RainDrop = {
  id: number;
  left: number;
  delay: number;
  duration: number;
};

const WeatherBox: React.FC = () => {

  const { darkMode } = useContext(ThemeContext);

  const [weatherData, setWeatherData] = useState<any>();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchList = async () => {
    const now = Date.now();
    const lastFetch = localStorage.getItem("lastFetch");

    // Nếu chưa đủ 30p thì không gọi lại
    if (lastFetch && now - Number(lastFetch) < 30 * 60 * 1000) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        "https://api.open-meteo.com/v1/forecast?latitude=10.535403744708382&longitude=106.40037277301413&current_weather=true"
      );
      const data = await res.json();
      setWeatherData(data.current_weather);

      // Lưu lại thời gian gọi và dữ liệu
      localStorage.setItem("lastFetch", String(now));
      localStorage.setItem("weatherData", JSON.stringify(data.current_weather));
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    const now = Date.now();
    const lastFetch = localStorage.getItem("lastFetch");
    const savedData = localStorage.getItem("weatherData");

    // Nếu có dữ liệu cũ → load lên trước
    if (savedData) {
      setWeatherData(JSON.parse(savedData));
    }

    // Nếu chưa gọi lần nào hoặc đã quá 30p → gọi ngay
    if (!lastFetch || now - Number(lastFetch) >= 30 * 60 * 1000) {
      fetchList();
    }
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
    return "clear";
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
    return "afternoon";
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
      return "bg-gradient-to-t from-sky-200 via-sky-300 to-blue-400";
    }

    const timeOfDay = getTimeOfDay();
    const weatherType = getWeatherType(weatherData?.weathercode);
    const isDay = weatherData?.is_day === 1;

    const themes: Record<string, string> = {
      // Morning
      "morning-clear": "bg-gradient-to-t from-sky-200 via-sky-300 to-blue-400",
      "morning-cloudy": "bg-gradient-to-t from-blue-100 via-blue-300 to-slate-400",
      "morning-rain": "bg-gradient-to-t from-slate-300 via-slate-400 to-blue-500",

      // Afternoon
      "afternoon-clear": "bg-gradient-to-t from-amber-200 via-orange-300 to-orange-500",
      "afternoon-cloudy": "bg-gradient-to-t from-orange-100 via-gray-200 to-gray-400",
      "afternoon-rain": "bg-gradient-to-t from-gray-300 via-gray-400 to-gray-600",

      // Evening
      "evening-clear": "bg-gradient-to-t from-pink-200 via-rose-300 to-orange-400",
      "evening-cloudy": "bg-gradient-to-t from-indigo-300 via-purple-400 to-slate-600",
      "evening-rain": "bg-gradient-to-t from-slate-400 via-slate-600 to-blue-700",

      // Night
      "night-clear": "bg-gradient-to-t from-indigo-800 via-purple-900 to-slate-900",
      "night-cloudy": "bg-gradient-to-t from-slate-700 via-slate-800 to-slate-900",
      "night-rain": "bg-gradient-to-t from-slate-600 via-blue-800 to-slate-900",
    };

    const themeKey = isDay ? `${timeOfDay}-${weatherType}` : `morning-${weatherType}`;

    return themes[themeKey] || themes["morning-clear"];
  };

  const weatherType = getWeatherType(weatherData?.weathercode);
  const isDay = weatherData ? weatherData?.is_day === 1 : 1;
  const showClouds = weatherType === "cloudy" || weatherType === "rain";
  const showRain = weatherType === "rain";
  const showStars = weatherData && !isDay;

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
          <>
            <div className={`relative border-4 border-white text-white flex items-center justify-end gap-3 h-full w-full md:w-[100%] rounded-xl py-3 px-8 ${getThemeClasses()}`}>
              {/* Weather Icon */}
              <div className="w-20 h-10 flex items-center justify-center">
                {weatherType === "clear" && isDay && (
                  <div className="sun w-10 h-10">
                    <div className="ray_box">
                      <div className="ray ray1"></div>
                      <div className="ray ray2"></div>
                      <div className="ray ray3"></div>
                      <div className="ray ray4"></div>
                      <div className="ray ray5"></div>
                      <div className="ray ray6"></div>
                      <div className="ray ray7"></div>
                      <div className="ray ray8"></div>
                      <div className="ray ray9"></div>
                      <div className="ray ray10"></div>
                    </div>
                  </div>
                )}

                {weatherType === "clear" && !isDay && (
                  <div className="moon w-10 h-10 animate-pulse"></div>
                )}

                {weatherType !== "clear" && (
                  <div
                    className="cloud h-8 animate-bounce opacity-100"
                    style={{ animation: "bounce 3s ease-in-out infinite" }}
                  ></div>
                )}
              </div>

              {/* Weather Info */}
              <div className="flex flex-col items-center gap-1 h-full">
                <div className="text-2xl md:text-2xl font-bold drop-shadow-lg">
                  {weatherData?.temperature}°C
                </div>
                <div className="flex items-center gap-4 whitespace-nowrap">
                  <div className="text-base drop-shadow-lg text-sm font-semibold">
                    {getWeatherDescription(weatherType)}
                  </div>
                  <div className="flex items-center justify-end gap-2 text-sm drop-shadow-lg font-semibold">
                    <Icon icon={'carbon:wind-gusts'} fontSize={16} color="white" />
                    <span>{weatherData?.windspeed} km/h</span>
                  </div>
                </div>
              </div>

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
                  [...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="star absolute w-1 h-1 bg-white rounded-full animate-pulse"
                      style={{
                        top: `${20 + i * 10}%`,
                        left: `${10 + i * 12}%`,
                        animationDelay: `${i * 0.5}s`,
                        animationDuration: "2s",
                      }}
                    />
                  ))}
              </div>
            </div>

            {/* Custom CSS for animations */}
            <style>{`

                  .sun {
                    position: relative;
                    margin: auto;
                    border-radius:50%;
                    background:white;
                    opacity:0.9;
                    box-shadow: 0px 0px 40px 15px white;
                  }

                  .ray_box {
                    position: absolute;
                    margin: auto;
                    top:0px;
                    left:0;
                    right:0;
                    bottom:0;
                    width:70px;
                    -webkit-animation: ray_anim 120s linear infinite;
                    animation: ray_anim 120s linear infinite;
                  }
                  .ray {
                      background: -webkit-linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
                      background: linear-gradient(top, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%);
                      margin-left:10px;
                      border-radius:80% 80% 0 0;
                      position:absolute;
                      opacity:0.1;
                  }

                  .ray1 {
                      height:170px;
                      width:30px;
                    -webkit-transform: rotate(180deg);
                      top:-175px;
                      left: 15px;
                  }
                  .ray2 {
                      height:100px;
                      width:8px;
                    -webkit-transform: rotate(220deg);
                      top:-90px;
                      left: 75px;
                  }
                  .ray3 {
                      height:170px;
                      width:50px;
                    -webkit-transform: rotate(250deg);
                      top:-80px;
                      left: 100px;
                  }
                  .ray4 {
                      height:120px;
                      width:14px;
                    -webkit-transform: rotate(305deg);
                      top:30px;
                      left: 100px;
                  }
                  .ray5 {
                      height:140px;
                      width:30px;
                    -webkit-transform: rotate(-15deg);
                      top:60px;
                      left: 40px;
                  }
                  .ray6 {
                      height:90px;
                      width:50px;
                    -webkit-transform: rotate(30deg);
                      top:60px;
                      left: -40px;
                  }
                  .ray7 {
                      height:180px;
                      width:10px;
                    -webkit-transform: rotate(70deg);
                      top:-35px;
                      left: -40px;
                  }
                  .ray8 {
                      height:120px;
                      width:30px;
                    -webkit-transform: rotate(100deg);
                      top:-45px;
                      left:-90px;
                  }
                  .ray9 {
                      height:80px;
                      width:10px;
                    -webkit-transform: rotate(120deg);
                      top:-65px;
                      left:-60px;
                  }
                  .ray10 {
                      height:190px;
                      width:23px;
                    -webkit-transform: rotate(150deg);
                      top:-185px;
                      left: -60px;
                  }


                  @-webkit-keyframes ray_anim {
                      0% { -webkit-transform: rotate(0deg); transform: rotate(0deg);}
                      100% { -webkit-transform: rotate(360deg); transform: rotate(360deg);}
                  }

                  .star {
                    aspect-ratio: 1;
                    clip-path: polygon(50% 0,
                      calc(50%*(1 + sin(.4turn))) calc(50%*(1 - cos(.4turn))),
                      calc(50%*(1 - sin(.2turn))) calc(50%*(1 - cos(.2turn))),
                      calc(50%*(1 + sin(.2turn))) calc(50%*(1 - cos(.2turn))),
                      calc(50%*(1 - sin(.4turn))) calc(50%*(1 - cos(.4turn)))
                    );
                    /* or more simple
                    clip-path: polygon(50% 0,79% 90%,2% 35%,98% 35%,21% 90%);
                    */
                  }

                  .moon {
                    border-radius: 50%;
                    box-shadow: 9px 9px 0 0 #fff;
                    margin-left: -25px;
                    margin-top: -25px;
                    transform: rotate(-30deg);
                  }

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
                      transform: translateX(calc(100% + 600px));
                    }
                  }

                  @keyframes float-cloud-2 {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(calc(100% + 600px));
                    }
                  }

                  @keyframes float-cloud-3 {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(calc(100% + 600px));
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
          </>
      }
    </>
  );
};

export default WeatherBox;
