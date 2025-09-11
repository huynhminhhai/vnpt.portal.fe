import ServicesItem from "./ServicesItem"
import ServiceHeading from "./ServiceHeading";
import { Icon } from "@iconify/react";
import { GetSystemWebsByUser, GetUserGroupOders, UpdateFavoriteSystem } from "@/service/api";
import ServiceSkeleton from "./ServiceSkeleton";
import AOS from "aos";
import "aos/dist/aos.css";
import ConfigUi from "../ConfigUi/ConfigUi";
import { message } from "antd";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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

  const [isShowFavorite, setIsShowFavorite] = useState<boolean>(() => {
    const stored = localStorage.getItem("showFavorite");
    if (stored !== null) {
      return stored === "true";
    }
    return true;
  });

  const [listSystem, setListSystem] = useState<any[]>([]);
  const [listFavoriteSystem, setListFavoriteSystem] = useState<any[]>([]);
  const [sortedIds, setSortedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParam, setSearchParam] = useState(defaultParams);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const scrollEl = document.getElementById("__SCROLL_EL_ID__");
    if (!scrollEl) return;

    const threshold = listFavoriteSystem.length > 0 ? 300 : 0;

    const handleScroll = () => {
      setVisible(scrollEl.scrollTop > threshold);
    };

    scrollEl.addEventListener("scroll", handleScroll);

    // chạy 1 lần để set trạng thái ban đầu
    handleScroll();

    return () => {
      scrollEl.removeEventListener("scroll", handleScroll);
    };
  }, [listFavoriteSystem.length]);

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

  useEffect(() => {
    const favoriteSystems = listSystem.flatMap((group: any) =>
      group.systemWebDtos
        .filter((system: any) => system.isFavorite)
        .map((system: any) => ({
          ...system,
          color: group.color,
        }))
    );

    setListFavoriteSystem(favoriteSystems);
  }, [listSystem]);

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

  const toggleFavorite = async (id: number) => {
    try {

      const system = listSystem.find((g: any) =>
        g.systemWebDtos.some((s: any) => s.id === id)
      )?.systemWebDtos.find((s: any) => s.id === id);

      const paramSubmit = {
        idPermission: system?.idPermission,
        isFavorite: !system?.isFavorite
      }

      await UpdateFavoriteSystem(paramSubmit);

      if (system?.isFavorite) {
        message.success(`Xóa ${system?.systemName} khỏi mục yêu thích thành công`);
      } else {
        message.success(`Thêm ${system?.systemName} vào mục yêu thích thành công`);
      }

      setListSystem((prev) =>
        prev.map((group) => ({
          ...group,
          systemWebDtos: group.systemWebDtos.map((system: any) =>
            system.id === id
              ? { ...system, isFavorite: !system.isFavorite }
              : system
          ),
        }))
      );

    } catch (error) {
      console.error(error);
    }
  };

  const toggleFavoriteList = () => {
    setIsShowFavorite((prev) => {
      const newValue = !prev;
      localStorage.setItem("showFavorite", String(newValue));
      return newValue;
    });
  };

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
          <ConfigUi viewMode={viewMode} setViewMode={setViewMode} onSuccess={() => fetchListSystem(searchParam)} sortedIds={sortedIds} toggleFavoriteList={toggleFavoriteList} isShowFavorite={isShowFavorite} />
        </ACol>
      </ARow>

      {
        (isShowFavorite && listFavoriteSystem.length > 0) &&
        <div
          className="bg-gradient-to-r from-white via-blue-800/3 to-white dark:bg-gradient-to-r dark:from-[rgba(17,24,38,0.8)] dark:to-[rgba(17,24,38,0.8)] pt-3 rounded-lg mt-6 mb-4"
        >

          {/* <div className="relative z-10 flex items-center justify-center space-x-4 mb-2">
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-60"></div>
            <div className="text-center text-[18px] leading-[1.2] font-bold">Mục yêu thích</div>
            <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/80 to-transparent opacity-60"></div>
          </div> */}
          {
            loading ?
              <ARow gutter={[22, 22]} className="mt-8 pb-8 px-3">
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
              <div className="relative">
                <Swiper
                  className="!pt-4 !pb-12 !px-3 [&_.swiper-pagination-bullet]:bg-primary [&_.swiper-pagination-bullet-active]:bg-primary dark:[&_.swiper-pagination-bullet]:bg-white dark:[&_.swiper-pagination-bullet-active]:bg-white"
                  modules={[Pagination, Navigation]}
                  pagination={{ clickable: true }}
                  spaceBetween={22}
                  loop
                  autoHeight
                  breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                    1280: { slidesPerView: 4 },
                  }}
                  navigation={{
                    nextEl: ".favorite-swiper-button-next",
                    prevEl: ".favorite-swiper-button-prev",
                    disabledClass: "swiper-button-disabled"
                  }}
                >
                  {listFavoriteSystem?.map((system: any, index: number) => (
                    <SwiperSlide key={`${system.id}-${index}`}>
                      <ServicesItem
                        key={index}
                        index={index}
                        dataItem={system}
                        toggleFavorite={() => toggleFavorite(system.id)}
                        // isShowShadow={false}
                        color={system.color}
                      />
                    </SwiperSlide>
                  ))}

                  <div
                    className="favorite-swiper-button-prev cursor-pointer absolute bottom-1.5 left-4 text-primary dark:text-white z-10 opacity-100 transform transition-all duration-300"
                  >
                    <Icon icon={'solar:round-alt-arrow-left-line-duotone'} className="w-8 h-8" />
                  </div>
                  <div
                    className="favorite-swiper-button-next cursor-pointer absolute bottom-1.5 right-4 text-primary dark:text-white z-10 opacity-100 transform transition-all duration-300"
                  >
                    <Icon icon={'solar:round-alt-arrow-right-line-duotone'} className="w-8 h-8" />
                  </div>
                </Swiper>
              </div>
          }
        </div>
      }

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
                        toggleFavorite={() => toggleFavorite(system.id)}
                        color={group.color}
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
                          toggleFavorite={() => toggleFavorite(system.id)}
                        />
                      ))}
                    </ARow>
                  </div>
                ))}
              </> :
              <div className="relative">
                <Swiper
                  className="!pb-8 [&_.swiper-pagination-bullet]:bg-primary [&_.swiper-pagination-bullet-active]:bg-primary dark:[&_.swiper-pagination-bullet]:bg-white dark:[&_.swiper-pagination-bullet-active]:bg-white"
                  modules={[Pagination ,Navigation]}
                  pagination={{ clickable: true }}
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
                  {listSystem.map((group) => {
                    const chunkSize = 6;
                    const chunks = [];
                    for (let i = 0; i < group.systemWebDtos.length; i += chunkSize) {
                      chunks.push(group.systemWebDtos.slice(i, i + chunkSize));
                    }

                    return chunks.map((chunk, colIndex) => (
                      <SwiperSlide key={`${group.id}-${colIndex}`}>
                        <div className="w-full">
                          {/* Chỉ hiện heading ở cột đầu tiên của loại */}
                          {colIndex === 0 ? (
                            <ServiceHeading title={group?.displayName} color={group.color} />
                          ) : (
                            <div className="h-13" />
                          )}
                          <div className="flex flex-col gap-[22px] mt-6 w-full">
                            {chunk.map((system: any, index: number) => (
                              <ServicesItem
                                color={group.color}
                                key={index}
                                index={index}
                                dataItem={system}
                                toggleFavorite={() => toggleFavorite(system.id)}
                              />
                            ))}
                          </div>
                        </div>
                      </SwiperSlide>
                    ));
                  })}

                </Swiper>
                <div
                  className="image-swiper-button-prev cursor-pointer w-7 h-7 fixed top-1/2 left-2.5 bg-white text-primary dark:text-gray-400 border border-primary p-2 rounded-full z-10 opacity-60 hover:opacity-100 transform transition-all duration-300"
                  style={{ opacity: visible ? 0.8 : 0, visibility: visible ? 'visible' : 'hidden' }}
                >
                  <Icon icon={'mynaui:arrow-long-left'} className="absolute top-1/2 left-2.5 -translate-y-1/2 w-6 h-6" />
                </div>
                <div
                  className="image-swiper-button-next cursor-pointer w-7 h-7 fixed top-1/2 right-2.5 bg-white text-primary dark:text-gray-400 border border-primary p-2 rounded-full z-10 opacity-60 hover:opacity-100 transform transition-all duration-300"
                  style={{ opacity: visible ? 0.8 : 0, visibility: visible ? 'visible' : 'hidden' }}
                >
                  <Icon icon={'mynaui:arrow-long-right'} className="absolute top-1/2 right-2.5 -translate-y-1/2 w-6 h-6" />
                </div>
              </div>
      }

    </div>
  )
}

export default ServicesList
