const HeroBanner = () => {

  return (
    <div
      className="relative"
    >
      <ACard
        className="relative overflow-hidden border-none px-0 md:px-10 py-[12px] md:py-[24px] rounded-0 bg-primary dark:bg-[#2b2b2b] text-white"
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-[24px] md:text-[32px] leading:[32px] md:leading-[46px] font-semibold capitalize ">
              Cổng dịch vụ số <br /> Xã Cần Đước
            </h1>
            <p className="mt-1 md:mt-3 max-w-[90%] md:max-w-[60%] text-[16px] font-normal leading-[28px]">
              Nơi bạn có thể quản lý và sử dụng các giải pháp chuyển đổi số được thiết kế chuyên biệt cho địa phương của mình.
            </p>
            {/* <div className="flex items-center w-fit pt-3">
              <div className="flex items-center gap-3">
                <Icon icon='streamline-plump:web' width={32} height={32} color="#285bd4" />
                <div >
                  <div className="text-[22px] leading-[32px] font-medium">3</div>
                  <div className="uppercase text-[13px] font-semibold">Dịch vụ đang sử dụng</div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
        <img className="absolute z-[1] top-1/2 right-[-65%] md:right-[100px] transform -translate-y-[50%] w-[620px] h-auto" src="https://prometheoncloud.com/wp-content/uploads/2022/06/map-2.png" alt="vnpt" style={{filter: "brightness(0) invert(1)"}} />
      </ACard>
    </div>
  )
}

export default HeroBanner
