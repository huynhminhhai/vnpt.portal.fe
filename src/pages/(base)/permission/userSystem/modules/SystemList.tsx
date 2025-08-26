import { ThemeContext } from "@/features/theme";
import { GetAllSystemWeb, GetUserSystemPermissions } from "@/service/api";
import { toHostname } from "@/utils/number";
import { Icon } from "@iconify/react";
import { Checkbox, Image, Input, List } from "antd";

interface SystemListProps {
  selectedTenant: number | null,
  checkedList: number[],
  setCheckedList: React.Dispatch<React.SetStateAction<number[]>>
}

const SystemList: React.FC<SystemListProps> = ({ selectedTenant, checkedList, setCheckedList }) => {
  const { darkMode } = useContext(ThemeContext);

  const [datas, setDatas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [listSystem, setListSystem] = useState<any[]>([]);

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

  return (
    <ACard
      className="card-wrapper min-h-fit md:min-h-500px h-full overflow-y-unset md:overflow-y-auto md:overflow-x-hidden"
      variant="borderless"
      loading={loading}
    >
      <List
        grid={{
          gutter: [12, 12],
          xs: 1,
          sm: 1,
          md: 2,
          lg: 2,
          xl: 3,
        }}
        dataSource={listSystem}
        // pagination={{
        //   pageSize: 10,
        //   showSizeChanger: true,
        //   showQuickJumper: true,
        //   showTotal: (total, range) =>
        //     `${range[0]}-${range[1]} của ${total} mục`,
        //   pageSizeOptions: ['6', '12', '24', '48'],
        // }}
        renderItem={(item: any) => (
          <List.Item className="!mb-0">
            <label className="block group relative transition-all duration-200 top-0 hover:-top-1 h-full cursor-pointer sle">
              <div
                className="flex flex-col justify-between border border-[#e0e0e0] rounded-lg relative transition-all duration-300 service-item overflow-hidden h-full"
                style={{
                  backgroundColor: checkedList.includes(item.id)
                    ? "#e6ebf0"
                    : darkMode
                      ? "#292929"
                      : "#ffffff",
                }}
              >
                {
                  selectedTenant &&
                  <div className="absolute top-1 right-2">
                    <Checkbox
                      checked={checkedList.includes(item.id)}
                      onChange={(e) =>
                        handleCheckboxChange(e.target.checked, item.id)
                      }
                      onClick={(e) => e.stopPropagation()}
                    />
                  </div>
                }
                <div className="px-4 pt-3 pb-3 flex items-center gap-4">
                  <div>
                    <Image
                      width={28}
                      src={item?.iconUrl || "/src/assets/imgs/vnpt.png"}
                      preview={false}
                      className="rounded-sm logo"
                    />
                  </div>
                  <div className="max-w-[80%]">
                    <h2
                      className="text-[16px] leading-[22px] font-semibold mb-[2px]"
                      style={{
                        color: darkMode ? "#ffffffd9" : "#000000E0",
                      }}
                    >
                      {item?.systemName}
                    </h2>
                    <div
                      className="flex items-center gap-1 text-[13px] leading-[20px]"
                      style={{
                        color: darkMode ? "#ffffffd9" : "#6b7280",
                      }}
                    >
                      {toHostname(item?.systemUrl)}
                      <Icon
                        icon="heroicons:arrow-top-right-on-square-20-solid"
                        fontSize={16}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </label>
          </List.Item>
        )}
      />
    </ACard>
  )
}

export default SystemList
