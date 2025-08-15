import { ThemeContext } from "@/features/theme";
import ServicesItem, { ServicesItemProps } from "./ServicesItem"
import ServiceHeading from "./ServiceHeading";
import { Icon } from "@iconify/react";
import { Input, Select } from "antd";

const servicesData: ServicesItemProps[] = [
  // {
  //   title: "Quản lý Bộ chỉ số",
  //   link: "https://bochiso.vnpt.me",
  //   desc: "Quản lý và theo dõi Bộ chỉ số cải cách hành chính cấp xã, cập nhật tiến độ và kết quả theo từng đợt đánh giá.",
  //   gradientColor: "rgba(0, 89, 169, 1)",
  //   logo: ""
  // },
  {
    title: "Đặt lịch hẹn",
    link: "https://lichhen.vnpt.me",
    desc: "Quản lý hệ thống hỗ trợ đặt lịch hẹn, bốc số",
    gradientColor: "rgba(0, 71, 171, 1)",
    logo: "https://photo-logo-mapps.zadn.vn/2eb14e96e8d3018d58c2.jpg"
  },
  {
    title: "Quản lý chợ",
    link: "https://emarket.vnpt.me",
    desc: "Phần mềm giúp tiết kiệm thời gian trong việc quản lý thu phí dịch vụ; tổng hợp, quản lý các số liệu về sổ bộ, kế hoạch, hóa đơn điện tử một các",
    gradientColor: "rgba(0, 71, 171, 1)",
    logo: "https://emarket.vnpt.me/assets/MatBang-usQaCZta.png"
  },
  {
    title: "Quản lý thu phí cấp nước",
    link: "https://capnuoccanduoc.vnpt.me",
    desc: "Giải pháp số hóa quản lý và thu phí nước nhanh chóng, chính xác, hiệu quả.",
    gradientColor: "rgba(139, 215, 250, 1)",
    logo: "https://capnuoccanduoc.vnpt.me/assets/water-management-CfC5ER0q.png"
  },
  // {
  //   title: "Khu phố thông minh",
  //   link: "https://qlkhupho.vnpt.me",
  //   desc: "Khu phố thông minh giúp cư dân dễ dàng quản lý thông tin, gửi yêu cầu, nhận thông báo và kết nối nhanh chóng với ban quản lý ngay trên Zalo.",
  //   gradientColor: "rgba(0, 36, 70, 1)",
  //   logo: "https://photo-logo-mapps.zadn.vn/4bde6285c4c02d9e74d1.jpg"
  // },
]

const servicesDataOthers: ServicesItemProps[] = [
  {
    title: "Khu phố thông minh",
    link: "https://qlkhupho.vnpt.me",
    desc: "Khu phố thông minh giúp cư dân dễ dàng quản lý thông tin, gửi yêu cầu, nhận thông báo và kết nối nhanh chóng với ban quản lý ngay trên Zalo.",
    gradientColor: "rgba(0, 36, 70, 1)",
    logo: "https://photo-logo-mapps.zadn.vn/4bde6285c4c02d9e74d1.jpg"
  },
]

const ServicesList = () => {

  const { darkMode } = useContext(ThemeContext);
  const { Search } = Input;

  const [isShowAll, setIsShowAll] = useState(
    JSON.parse(localStorage.getItem("isShowAll") || "false")
  );

  useEffect(() => {
    localStorage.setItem("isShowAll", JSON.stringify(isShowAll));
  }, [isShowAll]);

  const handleToggleShowAll = () => {
    setIsShowAll(!isShowAll);
  }

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  return (
    <div
      className="bg-white rounded-lg p-5 shadow-2xl shadow-primary/25 min-h-[400px]"
      style={{
        backgroundColor: darkMode ? '#1c1c1c' : '#ffffff'
      }}
    >
      <ARow gutter={[16, 16]}>
        <ACol
          lg={4}
          md={12}
          span={24}
        >
          <Select
            className="w-full"
            size="large"
            showSearch
            placeholder="Chọn loại dịch vụ"
            optionFilterProp="label"
            onChange={onChange}
            options={[
              {
                value: 'Y tế',
                label: 'Y tế',
              },
              {
                value: 'Giáo dục',
                label: 'Giáo dục',
              },
              {
                value: 'Khác',
                label: 'Khác',
              },
            ]}
          />
        </ACol>
        <ACol
          lg={6}
          md={12}
          span={24}
        >
          <Search className="w-full" placeholder="Tìm kiếm nhanh" allowClear enterButton={<Icon icon={'ant-design:search-outlined'} fontSize={20} />} size="large" />
        </ACol>
        <ACol
          lg={4}
          md={12}
          span={24}
          className="ml-auto flex justify-end"
        >
          <div className="flex items-center gap-4">
            <ButtonIcon
              triggerParent
              className="px-10px text-2xl border-[1px] border-[#e0e0e0] h-40px"
              icon={isShowAll ? "circum:grid-4-1" : 'circum:grid-3-2'}
              tooltipContent={isShowAll ? 'Chế độ xem tất cả' : 'Chế độ xem theo loại'}
              onClick={handleToggleShowAll}
            />
          </div>
        </ACol>
      </ARow>
      {
        isShowAll ?
          <>
            <ARow gutter={[16, 16]} className="mt-10">
              {
                [...servicesData, ...servicesDataOthers].map(({ ...rest }, index) => (
                  <ServicesItem
                    key={index}
                    {...rest}
                  />
                ))
              }
            </ARow>
          </>
          :
          <>
            <ServiceHeading title="Dịch vụ số" />
            <ARow gutter={[16, 16]}>
              {
                servicesData.map(({ ...rest }, index) => (
                  <ServicesItem
                    key={index}
                    {...rest}
                  />
                ))
              }
            </ARow>
            <ServiceHeading title="Dịch vụ khác" />
            <ARow gutter={[16, 16]}>
              {
                servicesDataOthers.map(({ ...rest }, index) => (
                  <ServicesItem
                    key={index}
                    {...rest}
                  />
                ))
              }
            </ARow>
          </>
      }

    </div>
  )
}

export default ServicesList
