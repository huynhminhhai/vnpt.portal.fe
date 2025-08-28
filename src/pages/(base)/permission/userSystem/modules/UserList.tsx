import { AssignSystemPermissionsToUser, GetAllUserWithTenantInfo } from "@/service/api";
import { Icon } from "@iconify/react";
import { message, Tree } from "antd";
import { DataNode } from "antd/es/tree";

interface UserListProps {
  selectedTenant: number | null,
  setSelectedTenant: React.Dispatch<React.SetStateAction<number | null>>
  checkedList: number[],
  oldChecked: number[]
}

interface UserType {
  id: number;
  userName: string;
  name: string;
}

interface TenantType {
  key: number;
  tenantId: number;
  tenantName: string;
  children: UserType[];
}

const UserList: React.FC<UserListProps> = ({ selectedTenant, setSelectedTenant, checkedList, oldChecked }) => {

  const [datas, setDatas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAssign, setLoadingAssign] = useState(false);

  const fetchList = async (params = {}) => {
    setLoading(true);
    try {
      const apiParams = {
        MaxResultCount: 10,
        SkipCount: 0,
        IsActive: null,
        Keyword: '',
        ...params
      };

      const res = await GetAllUserWithTenantInfo(apiParams);

      const resData = res.data as any;

      if (resData && resData.result) {
        const data = resData.result;

        setDatas(data);
      } else {
        console.warn('API response format không đúng, sử dụng fallback data');
        setDatas([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setDatas([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const treeData: DataNode[] = datas.map((tenant) => ({
    title: tenant.name,
    key: `${tenant.tenantId}`,
    selectable: false,
    children: tenant.lstUser.map((user: UserType) => ({
      title: `${user.name} (${user.userName})`,
      key: `${user.id}`,
    })),
  }));

  const handleSubmit = async (checkedList: number[]) => {
    setLoadingAssign(true);
    try {
      const dataSubmit = {
        userId: selectedTenant as number,
        systemWebIds: checkedList,
        permissionLevel: ''
      };

      await AssignSystemPermissionsToUser(dataSubmit);

      message.success('Cập nhật phân quyền thành công!');

    } catch (error) {
      console.log(error);
      message.error(error as string);
    } finally {
      setLoadingAssign(false);
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <ACard
        className="card-wrapper [&_.ant-card-body]:!overflow-y-auto [&_.ant-card-body]:overflow-x-hidden table-custom card-wrapper
          [&_.ant-card-body]:flex [&_.ant-card-body]:flex-col [&_.ant-card-body]:h-[calc(100vh-210px)]
          [&_.ant-card-body]:justify-between [&_.ant-card-body]:gap-3"
        variant="borderless"
        loading={loading}
      >
        <Tree
          treeData={treeData}
          showLine
          selectable
          multiple={false}
          selectedKeys={selectedTenant ? [selectedTenant] : []}
          onSelect={(keys) => {
            if (keys.length && keys[0]) {
              setSelectedTenant(keys[0] as number);
            }
          }}
          className="grow-1"
        />
      </ACard>
      <ACard>
        <AButton disabled={oldChecked.length === checkedList.length && oldChecked.every(v => checkedList.includes(v))} size="middle" type="primary" className="w-full" onClick={() => handleSubmit(checkedList)} loading={loadingAssign}>
          Lưu lại
        </AButton>
      </ACard>
    </div>
  )
}

export default UserList
