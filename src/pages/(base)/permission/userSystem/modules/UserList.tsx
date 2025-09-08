import { AssignSystemPermissionsToUser, GetAllUserWithTenantInfo } from "@/service/api";
import { message, Switch, Tree } from "antd";
import { DataNode } from "antd/es/tree";

interface UserListProps {
  selectedTenant: number | null,
  setSelectedTenant: React.Dispatch<React.SetStateAction<number | null>>
  checkedList: number[],
  oldChecked: number[],
  setOldChecked: React.Dispatch<React.SetStateAction<number[]>>
  multiMode: boolean,
  setMultiMode: React.Dispatch<React.SetStateAction<boolean>>,
  selectedTenants: number[],
  setSelectedTenants: React.Dispatch<React.SetStateAction<number[]>>
}

interface UserType {
  id: number;
  userName: string;
  name: string;
}

const UserList: React.FC<UserListProps> = ({
  selectedTenant,
  setSelectedTenant,
  checkedList,
  oldChecked,
  setOldChecked,
  multiMode,
  setMultiMode,
  selectedTenants,
  setSelectedTenants
}) => {

  const [datas, setDatas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingAssign, setLoadingAssign] = useState(false);

  const fetchList = async (params = {}) => {
    setLoading(true);
    try {
      const apiParams = {
        MaxResultCount: 999,
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
      if (multiMode) {
        // nhiều user
        for (const userId of selectedTenants) {
          await AssignSystemPermissionsToUser({
            userId,
            systemWebIds: checkedList,
            permissionLevel: ''
          });
        }
        message.success("Cập nhật phân quyền cho nhiều người thành công!");
      } else {
        // 1 user
        await AssignSystemPermissionsToUser({
          userId: selectedTenant as number,
          systemWebIds: checkedList,
          permissionLevel: ''
        });
        message.success("Cập nhật phân quyền thành công!");
        setOldChecked(checkedList);
      }
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra khi cập nhật quyền!");
    } finally {
      setLoadingAssign(false);
    }
  };

  const getLeafKeys = (nodes: any[]): string[] => {
    let keys: string[] = [];
    nodes.forEach((node) => {
      if (node.children && node.children.length) {
        keys = keys.concat(getLeafKeys(node.children));
      } else {
        keys.push(String(node.key));
      }
    });
    return keys;
  };

  return (
    <div className="flex flex-col gap-3">
      <ACard
        className="card-wrapper h-[40vh] md:h-[calc(100vh-212px)] overflow-y-auto overflow-x-hidden"
        variant="borderless"
        loading={loading}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Danh sách người dùng</h3>
          <Switch
            checked={multiMode}
            onChange={(checked) => {
              setMultiMode(checked);
              setSelectedTenant(null);
              setSelectedTenants([]);
            }}
            checkedChildren="Chọn nhiều"
            unCheckedChildren="Chọn 1"
          />
        </div>
        <Tree
          className="grow-1"
          treeData={treeData}
          showLine
          selectable
          multiple={multiMode}
          checkable={multiMode}
          checkedKeys={multiMode ? selectedTenants.map(String) : []}
          selectedKeys={
            multiMode ? selectedTenants.map(String) : selectedTenant ? [String(selectedTenant)] : []
          }
          onCheck={(checkedKeys) => {
            if (multiMode) {
              const leafKeys = getLeafKeys(treeData);
              const onlyLeafChecked = (checkedKeys as React.Key[]).filter((k) =>
                leafKeys.includes(String(k))
              );
              setSelectedTenants(onlyLeafChecked.map(Number));
            }
          }}
          onSelect={(keys) => {
            if (multiMode) {
              setSelectedTenants(keys.map(Number));
            } else {
              if (keys.length && keys[0]) {
                setSelectedTenant(Number(keys[0]));
              }
            }
          }}
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
