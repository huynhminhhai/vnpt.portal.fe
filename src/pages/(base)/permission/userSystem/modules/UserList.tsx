import { AssignSystemPermissionsToUser, GetAllUserWithTenantInfo } from "@/service/api";
import { message, Table, TableColumnsType } from "antd";

interface UserListProps {
  selectedTenant: number | null,
  setSelectedTenant: React.Dispatch<React.SetStateAction<number | null>>
  checkedList: number[],
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

const UserList: React.FC<UserListProps> = ({ selectedTenant, setSelectedTenant, checkedList }) => {

  const [datas, setDatas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

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

  const data: TenantType[] = datas.map((tenant) => ({
    key: tenant.tenantId,
    tenantId: tenant.tenantId,
    tenantName: tenant.name,
    children: tenant.lstUser.map((user: UserType) => ({
      key: user.id,
      userName: user.userName,
      name: user.name,
    })),
  }));

  const columns: TableColumnsType<any> = [
    {
      title: "Xã / Tài khoản",
      dataIndex: "tenantName",
      key: "tenantName",
      render: (_, record: any) => record.tenantName || record.userName,
    },
  ];

  const rowSelection = {
    type: "radio" as const,
    selectedRowKeys: selectedTenant ? [selectedTenant] : [],
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedTenant(selectedRowKeys[0] as number);
    },
    getCheckboxProps: (record: any) => ({
      style: record.tenantName ? { display: "none" } : {},
      disabled: !!record.tenantName,
    }),
  };

  const handleSubmit = async (checkedList: number[]) => {
    setLoading(true);
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
      setLoading(false);
    }
  }

  return (
    <ACard
      className="card-wrapper min-h-500px h-100px overflow-y-unset md:overflow-y-auto md:overflow-x-hidden table-custom card-wrapper
        [&_.ant-card-body]:flex [&_.ant-card-body]:flex-col [&_.ant-card-body]:h-full
        [&_.ant-card-body]:justify-between [&_.ant-card-body]:gap-3"
      variant="borderless"
    >
      <Table
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        size="small"
        loading={loading}
        pagination={false}
        className="grow-1"
      />
      <AButton type="primary" className="w-full" onClick={() => handleSubmit(checkedList)} loading={loading}>
        Lưu lại
      </AButton>
    </ACard>
  )
}

export default UserList
