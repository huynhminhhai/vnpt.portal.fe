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

  return (
    <ACol
      key={cardKey}
      lg={6}
      md={12}
      span={24}
    >
      <div className="group relative transition-all duration-200 top-0 hover:-top-1">
        <a
          href={link}
          target="_blank"
          className="block border-[1px] border-[#e0e0e0e] bg-white rounded-lg cursor-pointer shadow-sm hover:shadow-md relative transition-all duration-300 service-item overflow-hidden hover:border-primary"
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
            <div className="max-w-[300px]">
              <h2 className="text-[18px] leading-[24px] font-medium text-[#222222] mb-[4px]">
                {title}
              </h2>
              <div className="flex items-center gap-1 text-[13px] leading-[20px] text-gray-500">
                {toHostname(link)}
                <Icon icon='heroicons:arrow-top-right-on-square-20-solid' fontSize={16} />
              </div>
            </div>
            <div className="text-[15px] leading-[22px] mt-3 line-clamp-2 max-w-[90%] text-gray-500 h-[44px]">
              {desc}
            </div>
          </div>
          <div className="px-4 py-3 flex items-center justify-between border-t-[1px] border-gray-200">
            <div className="text-[14px] leading-[1] text-primary font-medium bg-white px-5 py-2 rounded-md border-[1px] border-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">Truy cập ngay</div>
            {/* <div>Truy cập ngay</div>
            <div>
              <Icon icon='si:arrow-right-line' fontSize={24} className="text-gray-500"  />
            </div> */}
          </div>
        {/* <div
          className="absolute inset-x-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `${gradientColor}`
          }}
        /> */}
        </a >
      </div>
    </ACol>
  )
}

export default ServicesItem
