import ServicesItem from "./ServicesItem"
import ServiceHeading from "./ServiceHeading";
import { Icon } from "@iconify/react";
import { GetSystemWebsByUser, GetUserGroupOders } from "@/service/api";
import ServiceSkeleton from "./ServiceSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";
import ConfigUi from "../ConfigUi/ConfigUi";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

export type ViewMode = "byType" | "all" | "list";

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
  const [sortedIds, setSortedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useState(defaultParams);

  const fetchListSystem = async (params: any) => {
    setLoading(true);
    try {

      const resSortOrder = await GetUserGroupOders();
      const sortedIds = (resSortOrder as any)?.data?.result?.listGroup;

      const res = await GetSystemWebsByUser(params);
      const data = res.data?.result || [];

      const sorted = sortedIds
        .map((id: number, index: number) => {
          const sys = data.find((s: any) => s.id === id);
          return sys ? { ...sys, sortOrder: index + 1 } : null;
        })
        .filter(Boolean);

      setSortedIds(sortedIds);

      setListSystem(sorted);

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
          <ConfigUi viewMode={viewMode} setViewMode={setViewMode} onSuccess={() => fetchListSystem(searchParam)} sortedIds={sortedIds} />
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
              <div className="relative">
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={22}
                  loop
                  autoHeight
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                  }}
                  navigation={{
                    nextEl: ".image-swiper-button-next",
                    prevEl: ".image-swiper-button-prev",
                    disabledClass: "swiper-button-disabled"
                  }}
                >
                  {listSystem.map((group) => (
                    <SwiperSlide key={group.id}>
                      <div className="w-full">
                        <ServiceHeading title={group?.displayName} color={group.color} />
                        <div className="flex flex-col gap-[22px] mt-6 w-full">
                          {group.systemWebDtos.map((system: any, index: number) => (
                            <ServicesItem
                              color={group.color}
                              key={index}
                              index={index}
                              dataItem={system}
                            />
                          ))}
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <div className="image-swiper-button-prev cursor-pointer w-7 h-7 fixed top-1/2 left-2 bg-white text-primary border border-primary p-2 rounded-full z-10 opacity-60 hover:opacity-100 transform hover:scale-[1.04] transition-all duration-300">
                  <Icon icon={'guidance:right-arrow'} className="absolute top-1/2 left-2.5 -translate-y-1/2 w-6 h-6" />
                </div>
                <div className="image-swiper-button-next cursor-pointer w-7 h-7 fixed top-1/2 right-2 bg-white text-primary border border-primary p-2 rounded-full z-10 opacity-60 hover:opacity-100 transform hover:scale-[1.04] transition-all duration-300">
                  <Icon icon={'guidance:left-arrow'} className="absolute top-1/2 right-2.5 -translate-y-1/2 w-6 h-6" />
                </div>
              </div>
      }

    </div>
  )
}

export default ServicesList
