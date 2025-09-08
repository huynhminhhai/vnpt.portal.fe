import ServicesItem from "./ServicesItem"
import ServiceHeading from "./ServiceHeading";
import { Icon } from "@iconify/react";
import { GetAllSystemGroup, GetSystemWebsByUser } from "@/service/api";
import ServiceSkeleton from "./ServiceSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";

type ViewMode = "byType" | "all" | "list";

const ServicesList = () => {

  const [form] = AForm.useForm();

  const defaultParams = {
    MaxResultCount: 9999,
    SkipCount: 0,
    IsActive: true,
    Keyword: "",
  };

  const [viewMode, setViewMode] = useState<ViewMode>(
    (localStorage.getItem("viewMode") as ViewMode) || "byType"
  );

  const [listSystem, setListSystem] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useState(defaultParams);

  const fetchListSystem = async (params: any) => {
    setLoading(true);
    try {
      const res = await GetSystemWebsByUser(params);
      const data = res.data?.result || [];

      const resGroups = await GetAllSystemGroup(defaultParams);
      const groups = resGroups.data?.result?.items || [];

      const systemsWithColor = data.map((system: any) => {
        const group = groups.find((g: any) => g.id === system.id);
        return {
          ...system,
          color: group?.color || 'blue',
        };
      });

      setListSystem(systemsWithColor);

    } catch (error) {
      console.error('Error fetching data:', error);
      setListSystem([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListSystem(searchParam);
  }, [searchParam]);

  useEffect(() => {
    localStorage.setItem("viewMode", viewMode);
  }, [viewMode]);

  const handleToggleViewMode = () => {
    setViewMode((prev) =>
      prev === "byType" ? "all" : prev === "all" ? "list" : "byType"
    );
  };

  const onChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  const search = () => {
    const values = form.getFieldsValue();
    setSearchParam({
      ...defaultParams,
      ...values,
    });
  };

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <div
      className="px-3 md:px-10 pt-[20px] pb-[20px] grow-[1] relative z-10"
    >
      <ARow align="middle" className="items-center flex-nowrap md:flex-wrap gap-[10px] md:gap-[22px]">
        {/* Form nằm giữa */}
        <ACol flex="auto" className="flex justify-center" data-aos="fade-up" data-aos-delay="100">
          <AForm
            form={form}
            initialValues={searchParam}
            labelCol={{ md: 7, span: 5 }}
            size="middle"
            onFinish={search}
            className="form-custom bg-white dark:bg-[#111826] w-full lg:w-[620px] border dark:border-[#37415180] md:border-none"
          >
            <ARow wrap gutter={[8, 16]} className="justify-between">
              <ACol lg={19} md={18} sm={16} span={16}>
                <div className="flex items-center gap-3 w-full">
                  <AForm.Item className="m-0 w-full" label="" name="Keyword">
                    <AInput
                      allowClear
                      placeholder="Tìm kiếm nhanh..."
                      className="text-primary dark:text-white"
                      prefix={<Icon fontSize={20} icon="lucide:search" className="text-primary dark:text-white mr-2" />}
                      onClear={() => setSearchParam({ ...searchParam, Keyword: '' })}
                    />
                  </AForm.Item>
                </div>
              </ACol>

              <ACol lg={5} md={6} span={8}>
                <AFlex className="w-full" gap={16} justify="flex-end">
                  <AButton className="border-none bg-blue-800/10 dark:bg-[#1f3456] text-primary dark:text-[#ffffffe6] font-medium w-full rounded-[24px] !shadow-none" type="primary" onClick={search} loading={loading}>
                    Tìm kiếm
                  </AButton>
                </AFlex>
              </ACol>
            </ARow>
          </AForm>
        </ACol>

        {/* Toggle Button sát lề phải */}
        <ACol flex="none" className="flex justify-end" data-aos="fade-up-left" data-aos-delay="200">
          <ButtonIcon
            triggerParent
            className="w-[40px] h-[40px] px-6px text-2xl border-[1px] border-[#e0e0e0] dark:border-gray-700/50 bg-white dark:bg-[#1f3456]"
            icon={
              viewMode === "byType"
                ? "circum:grid-3-2"
                : viewMode === "all"
                  ? "circum:grid-4-1"
                  : "circum:view-list"
            }
            tooltipContent={
              viewMode === "byType"
                ? "Chế độ xem theo loại"
                : viewMode === "all"
                  ? "Chế độ xem tất cả"
                  : "Chế độ xem danh sách"
            }
            tooltipPlacement="topLeft"
            onClick={handleToggleViewMode}
          />
        </ACol>
      </ARow>

      {
        loading ?
          <ARow gutter={[22, 22]} className="mt-8">
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
          viewMode === "all" ?
            <>
              <ARow gutter={[22, 22]} className="mt-10">
                {listSystem.map((group, groupIndex) =>
                  group.systemWebDtos.map((system: any, systemIndex: number) => {
                    const globalIndex =
                      listSystem
                        .slice(0, groupIndex)
                        .reduce((sum, g) => sum + g.systemWebDtos.length, 0) + systemIndex;

                    return (
                      <ServicesItem
                        key={globalIndex}
                        index={globalIndex}
                        dataItem={system}
                      />
                    );
                  })
                )}
              </ARow>
            </>
            :
            viewMode === "byType" ?
              <>
                {listSystem.map((group) => (
                  <div key={group.id}>
                    <ServiceHeading title={group?.displayName} color={group.color} />
                    <ARow gutter={[22, 22]} className="mt-6">
                      {group.systemWebDtos.map((system: any, index: number) => (
                        <ServicesItem
                          color={group.color}
                          key={index}
                          index={index}
                          dataItem={system}
                        />
                      ))}
                    </ARow>
                  </div>
                ))}
              </> :
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[22px]">
                  {listSystem.map((group) => (
                    <div key={group.id} className="w-full">
                      <ServiceHeading title={group?.displayName} color={group.color} />
                      <div className="flex flex-col gap-[22px] mt-6 w-full">
                        {group.systemWebDtos.map((system: any, index: number) => (
                          <ServicesItem color={group.color} key={index} index={index} dataItem={system} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </>
      }

    </div>
  )
}

export default ServicesList
