import { Skeleton } from "antd"

const ServiceSkeleton = () => {
  return (
    <>
      <div className="group relative transition-all duration-200 top-0 h-full">
        <div
          className="flex flex-col justify-between border-[1px] border-gray-200 rounded-lg overflow-hidden h-full px-4 py-2 bg-white dark:bg-[#292929]"
          style={{
            boxShadow: "0px 24px 84px 0px rgba(0,0,0,0.05)",
          }}
        >
          {/* Logo skeleton */}
          <div className="absolute top-4 right-5">
            <Skeleton.Avatar active size={36} shape="square" />
          </div>

          {/* Content skeleton */}
          <div className="pt-4 pb-4 space-y-3">
            <Skeleton.Input active size="small" className="!w-3/4 !h-5" />
            {/* <Skeleton.Input active size="small" className="!w-1/2 !h-4" /> */}
            <Skeleton paragraph={{ rows: 2, width: ["90%", "80%"] }} active />
          </div>

          {/* Footer skeleton */}
          <div className="pt-3 pb-1 flex items-center justify-between border-t-[1px] border-gray-200">
            <Skeleton.Button active size="small" className="!w-24" />
            <Skeleton.Avatar active size={24} shape="circle" />
          </div>
        </div>
      </div>
    </>
  )
}

export default ServiceSkeleton
