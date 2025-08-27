import ServicesItem from "./ServicesItem"
import ServiceHeading from "./ServiceHeading";
import { Icon } from "@iconify/react";
import { Input, Select } from "antd";
import { GetAllSystemWeb, GetSystemWebsByUser } from "@/service/api";
import ServiceSkeleton from "./ServiceSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";
import { useSelector } from "react-redux";
import { isStaticSuper } from "@/features/auth/authStore";

const ServicesList = () => {

  const { Search } = Input;
  const isSuper = useSelector(isStaticSuper);

  const [isShowAll, setIsShowAll] = useState(
    JSON.parse(localStorage.getItem("isShowAll") || "false")
  );
  const [listSystem, setListSystem] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchListSystem = async () => {
    setLoading(true);
    try {

      let data: any[] = [];

      if (!isSuper) {
        const res = await GetSystemWebsByUser();
        data = res.data?.result || [];
      } else {
        const apiParams = { MaxResultCount: 9999, SkipCount: 0, IsActive: true, Keyword: '' };
        const res = await GetAllSystemWeb(apiParams);
        data = res.data?.result?.items || [];
      }

      setListSystem(data);

    } catch (error) {
      console.error('Error fetching data:', error);
      setListSystem([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListSystem();
  }, []);

  useEffect(() => {
    localStorage.setItem("isShowAll", JSON.stringify(isShowAll));
  }, [isShowAll]);

  const handleToggleShowAll = () => {
    setIsShowAll(!isShowAll);
  }

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div
      className="px-3 md:px-10 pt-[20px] pb-[20px] grow-[1] relative z-10 bg-[#f7f9fc] dark:bg-transparent"
    >
      <ARow gutter={[16, 16]}>

        <ACol
          lg={4}
          md={12}
          span={24}
          className="mr-auto flex justify-start"
          data-aos="fade-right"
        >
          <div className="hidden md:flex items-center gap-4">
            <ButtonIcon
              triggerParent
              className="px-6px text-2xl border-[1px] border-[#e0e0e0] h-32px bg-white dark:bg-[#1c1c1c]"
              icon={isShowAll ? "circum:grid-4-1" : 'circum:grid-3-2'}
              tooltipContent={isShowAll ? 'Chế độ xem tất cả' : 'Chế độ xem theo loại'}
              onClick={handleToggleShowAll}
            />
          </div>
        </ACol>
        <ACol
          lg={4}
          md={12}
          span={24}
          data-aos="fade-left"
        >
          <Select
            className="w-full"
            size="middle"
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
          data-aos="fade-left"
          data-aos-delay="100"
        >
          <Search className="w-full" placeholder="Tìm kiếm nhanh" allowClear enterButton={<Icon icon={'ant-design:search-outlined'} fontSize={20} />} size="middle" />
        </ACol>
      </ARow>
      {
        loading ?
          <ARow gutter={[12, 12]} className="mt-8">
            {Array.from({ length: 4 }).map((_, index) => (
              <ACol
                key={index}
                xs={24}
                sm={24}
                md={12}
                lg={8}
                xl={6}
              >
                <ServiceSkeleton />
              </ACol>
            ))}
          </ARow>
          :
          isShowAll ?
            <>
              <ARow gutter={[12, 12]} className="mt-6">
                {
                  listSystem?.map((item, index) => (
                    <ServicesItem
                      key={index}
                      index={index}
                      dataItem={item}
                    />
                  ))
                }
              </ARow>
            </>
            :
            <>
              <ServiceHeading title="Dịch vụ số" />
              <ARow gutter={[12, 12]} className="mt-6">
                {
                  listSystem?.map((item, index) => (
                    <ServicesItem
                      key={index}
                      index={index}
                      dataItem={item}
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
