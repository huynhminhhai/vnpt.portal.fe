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
          className="flex flex-col justify-between border-[1px] border-[#e0e0e0e] rounded-lg cursor-pointer relative transition-all duration-300 service-item overflow-hidden h-full"
          style={{
            backgroundColor: darkMode ? '#292929' : '#ffffff',
            boxShadow: '0px 24px 84px 0px rgba(0,0,0,0.05)'
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
                className="text-[18px] leading-[24px] font-semibold mb-[4px]"
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
            <div className="text-[14px] leading-[1] text-primary font-medium dark:text-white group-hover:text-white">Truy cập ngay</div>
            <Icon icon='si:arrow-right-line' fontSize={24} className="text-primary dark:text-white group-hover:text-white" />
          </div>
        </a >
      </div>
    </ACol>
  )
}

export default ServicesItem
