import { Skeleton } from 'antd';

export default function CardSkeleton({ darkMode }: { darkMode: boolean }) {
  return (
    <ACol
      lg={6}
      md={12}
      span={24}
    >
      <div
        className="relative w-full overflow-hidden rounded-xl p-3 py-6"
        style={{
          backgroundColor: darkMode ? '#292929' : '#fcfdfe',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
        }}
      >
        {/* Background Image Skeleton */}
        <div className="absolute top-[60%] w-full translate-y-[-50%] transform -left-[-68%]">
          <Skeleton.Image
            active
            style={{
              height: 80,
              opacity: 0.25,
              transform: 'rotate(-25deg) scale(1)',
              width: 80
            }}
          />
        </div>

        {/* Title + Number Skeleton */}
        <div className="flex items-center gap-2">
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
    </ACol>
  );
}
