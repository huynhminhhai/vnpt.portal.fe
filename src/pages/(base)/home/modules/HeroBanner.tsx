import { ThemeContext } from "@/features/theme";

const HeroBanner = () => {

  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      style={{
        backgroundColor: darkMode ? '#1c1c1c' : '#ffffff'
      }}
    >
      <ACard
        className="relative overflow-hidden border-none px-10 py-[52px] rounded-0"
        style={{
          background: "linear-gradient(135deg, #0059a9, #e6f4ff 100%)",
          color: "white",
        }}
      >
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent capitalize">
              Xã Cần Đước
            </h1>
            <p className="text-white mt-3 max-w-[60%] text-[18px] font-light leading-[28px]">
              Chào mừng bạn đến với <b>Cổng dịch vụ số cấp xã</b> — nơi bạn có thể quản lý và sử dụng các giải pháp chuyển đổi số được thiết kế chuyên biệt cho địa phương của mình.
            </p>
          </div>
        </div>
        <img className="absolute z-[1] top-1/2 right-[40px] transform -translate-y-[50%] w-[320px] h-auto" src="/src/assets/imgs/digital.png" alt="vnpt" />
        <img src="/src/assets/imgs/sky.avif" alt="bg gradient" className="absolute top-0 left-0 w-full h-full object-cover opacity-40" />
      </ACard>
    </div>
  )
}

export default HeroBanner
