import { ThemeContext } from "@/features/theme"
import { toHostname } from "@/utils/number"
import { Icon } from "@iconify/react"
import { Image } from "antd"

export interface ServicesItemProps {
  cardKey?: string
  title: string
  link: string
  desc: string
  gradientColor: string
  logo?: string
}

const ServicesItem = (props: ServicesItemProps) => {

  const { cardKey, title, link, desc, gradientColor, logo } = props

  const { darkMode } = useContext(ThemeContext);

  return (
    <ACol
      key={cardKey}
      lg={6}
      md={12}
      span={24}
    >
      <div className="group relative transition-all duration-200 top-0 hover:-top-1 h-full">
        <a
          href={link}
          target="_blank"
          className="flex flex-col justify-between border-[0px] border-[#e0e0e0e] rounded-lg cursor-pointer relative transition-all duration-300 service-item overflow-hidden shadow-[0_0_0.25em_rgba(0,89,169,0.20),_0_0.25em_1em_rgba(0,89,169,0.05)] h-full"
          style={{
            backgroundColor: darkMode ? '#292929' : '#ffffff'
          }}
        >
          <div className="absolute top-4 right-5">
            <Image
              width={48}
              src={logo || '/src/assets/imgs/vnpt.png'}
              preview={false}
              className="rounded-lg logo"
            />
          </div>
          <div className="px-4 pt-6 pb-4">
            <div className="max-w-[80%]">
              <h2
                className="text-[18px] leading-[24px] font-medium mb-[4px]"
                style={{ color: darkMode ? '#ffffffd9' : '#000000E0' }}
              >
                {title}
              </h2>
              <div className="flex items-center gap-1 text-[13px] leading-[20px]"
                style={{
                  color: darkMode ? '#ffffffd9' : '#6b7280'
                }}>
                {toHostname(link)}
                <Icon icon='heroicons:arrow-top-right-on-square-20-solid' fontSize={16} />
              </div>
            </div>
            <div
              className="text-[15px] leading-[22px] mt-3 line-clamp-2 max-w-[90%] h-[44px]"
              style={{
                color: darkMode ? '#ffffffd9' : '#6b7280'
              }}
            >
              {desc}
            </div>
          </div>
          <div className="px-4 py-3 flex items-center justify-between border-t-[1px] border-gray-200 group-hover:bg-primary group-hover:text-white">
            {/* <div className="text-[14px] leading-[1] text-primary font-medium bg-white px-5 py-2 rounded-md border-[1px] border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">Truy cập ngay</div> */}
            <div className="text-[14px] leading-[1] text-primary font-medium group-hover:text-white">Truy cập ngay</div>
            <Icon icon='si:arrow-right-line' fontSize={24} className="text-primary group-hover:text-white" />
          </div>
        </a >
      </div>
    </ACol>
  )
}

export default ServicesItem
