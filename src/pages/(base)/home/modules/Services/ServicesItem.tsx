import { ThemeContext } from "@/features/theme"
import { toHostname } from "@/utils/number"
import { Icon } from "@iconify/react"
import { Image } from "antd"
import React from "react"
import AOS from "aos";
import "aos/dist/aos.css";

export interface ServicesItemProps {
  dataItem: any,
  index: number
}

const ServicesItem: React.FC<ServicesItemProps> = ({ dataItem, index }) => {

  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <ACol
      key={dataItem?.id}
      xs={24}
      sm={24}
      md={12}
      lg={8}
      xl={6}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div
        className="group relative transition-all duration-200 top-0 hover:-top-1 h-full"
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
              src={dataItem?.iconUrl || '/src/assets/imgs/vnpt.png'}
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
            <Icon icon='si:arrow-right-line' fontSize={24} className="text-primary dark:text-white group-hover:text-white" />
          </div>
        </a >
      </div>
    </ACol>
  )
}

export default ServicesItem
