const HeroBanner = () => {

  return (
    <div
      className="relative"
    >
      <ACard
        className="relative overflow-hidden border-none px-0 md:px-10 py-[12px] md:py-[20px] rounded-0 bg-primary dark:bg-[#2b2b2b] text-white"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[22px] md:text-[28px] leading:[34px] md:leading-[40px] font-semibold capitalize ">
              Cổng dịch vụ số <br /> Xã Cần Đước
            </h1>
            <p className="mt-1 md:mt-2 max-w-[90%] md:max-w-[60%] text-[15px] font-normal leading-[26px]">
              Nơi bạn có thể quản lý và sử dụng các giải pháp chuyển đổi số được thiết kế chuyên biệt cho địa phương của mình.
            </p>
          </div>
        </div>
        <img className="absolute z-[1] top-1/2 right-[-65%] md:right-[100px] transform -translate-y-[50%] w-[620px] h-auto" src="https://prometheoncloud.com/wp-content/uploads/2022/06/map-2.png" alt="vnpt" style={{filter: "brightness(0) invert(1)"}} />
      </ACard>
    </div>
  )
}

export default HeroBanner
