import ServicesItem from "./ServicesItem"
import ServiceHeading from "./ServiceHeading";
import { Icon } from "@iconify/react";
import { Input, Select } from "antd";
import { localStg } from "@/utils/storage";
import { GetAllSystemWeb } from "@/service/api";

const ServicesList = () => {

  const { Search } = Input;
  const userId = (localStg as any).get('userId');

  console.log(userId);

  const [isShowAll, setIsShowAll] = useState(
    JSON.parse(localStorage.getItem("isShowAll") || "false")
  );
  const [listSystem, setListSystem] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchListSystem = async () => {
    setLoading(true);
    try {

      const apiParams = {
        MaxResultCount: 9999,
        SkipCount: 0,
        IsActive: true,
        Keyword: ''
      };

      const res = await GetAllSystemWeb(apiParams);

      const resData = res.data as any;

      if (resData && resData.result && resData.result.items) {
        const data = resData.result.items;

        setListSystem(data);
      } else {
        console.warn('API response format không đúng, sử dụng fallback data');
        setListSystem([]);
      }
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

  return (
    <div
      className="px-3 md:px-10 pt-[20px] pb-[20px] grow-[1]"
    >
      <ARow gutter={[16, 16]}>

        <ACol
          lg={4}
          md={12}
          span={24}
          className="mr-auto flex justify-start"
        >
          <div className="hidden md:flex items-center gap-4">
            <ButtonIcon
              triggerParent
              className="px-6px text-2xl border-[1px] border-[#e0e0e0] h-32px"
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
        >
          <Search className="w-full" placeholder="Tìm kiếm nhanh" allowClear enterButton={<Icon icon={'ant-design:search-outlined'} fontSize={20} />} size="middle" />
        </ACol>
      </ARow>
      {
        isShowAll ?
          <>
            <ARow gutter={[12, 12]} className="mt-8">
              {
                listSystem?.map((item, index) => (
                  <ServicesItem
                    key={index}
                    dataItem={item}
                  />
                ))
              }
            </ARow>
          </>
          :
          <>
            <ServiceHeading title="Dịch vụ số" />
            <ARow gutter={[12, 12]} className="mt-8">
              {
                listSystem?.map((item, index) => (
                  <ServicesItem
                    key={index}
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
