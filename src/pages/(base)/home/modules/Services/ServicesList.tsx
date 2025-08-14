import ServicesItem, { ServicesItemProps } from "./ServicesItem"

const servicesData: ServicesItemProps[] = [
  {
    title: "Quản lý Bộ chỉ số",
    link: "https://bochiso.vnpt.me",
    desc: "Quản lý và theo dõi Bộ chỉ số cải cách hành chính cấp xã, cập nhật tiến độ và kết quả theo từng đợt đánh giá.",
    gradientColor: "rgba(0, 89, 169, 1)",
    logo: ""
  },
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
  {
    title: "Khu phố thông minh",
    link: "https://qlkhupho.vnpt.me",
    desc: "Khu phố thông minh giúp cư dân dễ dàng quản lý thông tin, gửi yêu cầu, nhận thông báo và kết nối nhanh chóng với ban quản lý ngay trên Zalo.",
    gradientColor: "rgba(0, 36, 70, 1)",
    logo: "https://photo-logo-mapps.zadn.vn/4bde6285c4c02d9e74d1.jpg"
  },
]

const ServicesList = () => {
  return (
    <ARow gutter={[16, 16]}>
      {
        servicesData.map(({...rest }, index) => (
          <ServicesItem
            key={index}
            {...rest}
          />
        ))
      }
    </ARow>
  )
}

export default ServicesList
