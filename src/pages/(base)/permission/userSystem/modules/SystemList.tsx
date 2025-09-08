import { GetAllSystemWeb, GetUserSystemPermissions } from "@/service/api";
import { toHostname } from "@/utils/number";
import { Icon } from "@iconify/react";
import { Checkbox, Image, Input, Skeleton } from "antd";
import vnpt from '@/assets/imgs/vnpt.png';

interface SystemListProps {
  selectedTenant: number | null,
  checkedList: number[],
  setCheckedList: React.Dispatch<React.SetStateAction<number[]>>
  setOldChecked: React.Dispatch<React.SetStateAction<number[]>>
}

const SystemList: React.FC<SystemListProps> = ({ selectedTenant, checkedList, setCheckedList, setOldChecked }) => {
  const { Search } = Input;

  const [datas, setDatas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [listSystem, setListSystem] = useState<any[]>([]);

  const fetchListSystem = async (params = {}) => {
    setLoading(true);
    try {

      const apiParams = {
        MaxResultCount: 9999,
        SkipCount: 0,
        IsActive: null,
        Keyword: '',
        ...params
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

  const fetchList = async () => {
    setLoading(true);
    try {
      const res = await GetUserSystemPermissions(selectedTenant as number);
      const resData = res.data as any;

      if (resData?.result) {
        setDatas(resData.result);

        // default checked = danh sách systemWebId trong datas
        const defaultChecked = resData.result.map((d: any) => d.systemWebId);
        setCheckedList(defaultChecked);
        setOldChecked(defaultChecked);
      } else {
        setDatas([]);
        setCheckedList([]);
      }

    } catch (error) {
      console.error('Error fetching data:', error);
      setDatas([]);
      setCheckedList([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListSystem();
  }, []);

  useEffect(() => {
    if (!selectedTenant) {
      return;
    }

    fetchList();
  }, [selectedTenant]);

  const handleCheckboxChange = (checked: boolean, id: number) => {
    let newCheckedList;
    if (checked) {
      newCheckedList = [...checkedList, id];
    } else {
      newCheckedList = checkedList.filter((cid) => cid !== id);
    }
    setCheckedList(newCheckedList);
    console.log("Danh sách đã chọn:", newCheckedList);
  };

  const handleCheckAll = () => {
    const allIds = listSystem.map((item: any) => item.id);
    setCheckedList(allIds);
  };

  const handleUncheckAll = () => {
    setCheckedList([]);
  };

  const isAllChecked = checkedList.length === listSystem.length;
  const isIndeterminate =
    checkedList.length > 0 && checkedList.length < listSystem.length;

  return (
    <ACard
      className="card-wrapper h-[calc(100vh-144px)] overflow-y-unset md:overflow-y-auto md:overflow-x-hidden"
      variant="borderless"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {
            selectedTenant && (
              <Checkbox
                indeterminate={isIndeterminate}
                checked={isAllChecked}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleCheckAll();
                  } else {
                    handleUncheckAll();
                  }
                }}
              >
                {isAllChecked ? "Bỏ chọn tất cả" : "Chọn tất cả"}
              </Checkbox>
            )
          }

        </div>

        <Search className="w-full md:w-[300px]" placeholder="Tìm kiếm nhanh" allowClear enterButton={<Icon icon={'ant-design:search-outlined'} fontSize={20} />} size="middle" onSearch={(value) => fetchListSystem({ Keyword: value })} />
      </div>

      <ARow gutter={[6, 6]}>
        {
          loading ? (
            Array.from({ length: 12 }).map((_, index) => (
              <ACol
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={8}
              >
                <div
                  className={`
                    flex flex-col justify-between relative h-full
                    rounded-lg border overflow-hidden
                    bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700
                    p-4
                  `}
                  style={{ boxShadow: "0px 12px 32px rgba(0,0,0,0.05)" }}
                >
                  {/* Skeleton nội dung */}
                  <div className="flex items-center gap-4">
                    {/* Logo skeleton */}
                    <Skeleton.Image
                      active
                      style={{ width: 28, height: 28, borderRadius: 6 }}
                    />

                    <div className="flex-1 min-w-0">
                      <Skeleton.Input
                        active
                        size="small"
                        style={{ width: "40%" }}
                      />
                    </div>
                  </div>
                </div>
              </ACol>
            ))
          ) :
            (
              listSystem.map((item: any, index: number) => (
                <ACol
                  key={item.id || index}
                  xs={24}
                  sm={24}
                  md={12}
                  lg={12}
                  xl={8}
                >
                  <label className="group relative cursor-pointer block h-full w-full fade-up-css"
                    style={{ animationDelay: `${index * 0.02}s` }}
                  >
                    <div
                      className={`
                    flex flex-col justify-between relative h-full
                    rounded-lg border transition-all duration-300 overflow-hidden
                    hover:scale-[1.01]
                    ${checkedList.includes(item.id)
                          ? "bg-gradient-to-r from-blue-100 to-blue-50 border-primary shadow-md"
                          : "bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700"}
                  `}
                      style={{
                        boxShadow: '0px 12px 32px rgba(0,0,0,0.05)',
                      }}
                    >
                      {/* Check icon khi chọn */}
                      {checkedList.includes(item.id) && (
                        <div className="absolute top-1 right-1">
                          <Icon
                            icon="solar:check-circle-line-duotone"
                            fontSize={20}
                            className="text-primary"
                          />
                        </div>
                      )}

                      {/* Checkbox ẩn (khi có tenant) */}
                      {selectedTenant && (
                        <div className="absolute top-2 left-2">
                          <Checkbox
                            className="hidden"
                            checked={checkedList.includes(item.id)}
                            onChange={(e) => handleCheckboxChange(e.target.checked, item.id)}
                            onClick={(e) => e.stopPropagation()}
                          />
                        </div>
                      )}

                      {/* Nội dung card */}
                      <div className="flex items-center gap-4 px-4 py-3">
                        {/* Logo */}
                        <Image
                          width={28}
                          src={item?.iconUrl || vnpt}
                          preview={false}
                          className="rounded-md"
                        />

                        {/* Text */}
                        <div className="flex-1 min-w-0">
                          <h2
                            className="text-sm font-semibold truncate text-gray-900 dark:text-gray-100 group-hover:text-primary transition-colors"
                          >
                            {item?.systemName}
                          </h2>
                          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400 truncate">
                            {toHostname(item?.systemUrl)}
                            <Icon
                              icon="heroicons:arrow-top-right-on-square-20-solid"
                              fontSize={12}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>

                </ACol>
              ))
            )
        }
      </ARow>

    </ACard>
  )
}

export default SystemList
