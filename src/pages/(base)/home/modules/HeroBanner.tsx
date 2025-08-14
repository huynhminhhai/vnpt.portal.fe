const HeroBanner = () => {
  return (
    <ACard
      className="relative overflow-hidden rounded-2xl border-none mb-6 p-4"
      style={{
        background: "linear-gradient(135deg, #1890ff 0%, #70cfff 100%)",
        color: "white",
      }}
    >
      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-[250px] h-[250px] bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.3)_0%,_transparent_70%)] pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold">
            Xin chào, 👋
          </h1>
          <p className="text-white/90 mt-2 max-w-xl text-lg">
            Chào mừng bạn đến với Cổng dịch vụ trực tuyến.
            Quản lý và sử dụng các dịch vụ chuyên biệt dành riêng cho địa phương của bạn.
          </p>
        </div>


      </div>
    </ACard>
  )
}

export default HeroBanner
