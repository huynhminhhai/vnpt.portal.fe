import { AssignSystemPermissionsToUser, GetAllUserWithTenantInfo, UserType } from '@/service/api';
import { Button, Drawer, message } from 'antd';
import { DataNode } from 'antd/es/tree';
import { Tree } from 'antd/lib';
import React, { useState } from 'react';

type Props = {
  onSuccess?: () => void;
  checkList: number[];
  userSelected: number;
};

const CopyPermission: React.FC<Props> = ({ onSuccess, checkList, userSelected }) => {
  const [open, setOpen] = useState(false);
  const [selectedTenants, setSelectedTenants] = useState<number[]>([]);
  const [datas, setDatas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  function removeUserFromData(data: any[], userSelected: number) {
    return data.map(tenant => ({
      ...tenant,
      lstUser: tenant.lstUser.filter((user: any) => user.id !== userSelected)
    }));
  }

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

        const newData = removeUserFromData(data, userSelected);

        setDatas(newData);
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

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      for (const userId of selectedTenants) {
        await AssignSystemPermissionsToUser({
          userId,
          systemWebIds: checkList,
          permissionLevel: ''
        });
      }
      message.success("Cập nhật phân quyền cho nhiều người thành công!");

      setSelectedTenants([]);

      onClose();
    } catch (error) {
      console.error(error);
      message.error("Có lỗi xảy ra khi cập nhật quyền!");
    } finally {
      setLoading(false);
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
    <>
      <ButtonIcon className="px-2 border border-[#e0e0e0]" icon="solar:copy-line-duotone" tooltipContent="Sao chép quyền" onClick={showDrawer} />
      <Drawer
        className='p-0'
        open={open}
        title="Sao chép quyền"
        width={480}
        styles={{
          body: {
            paddingBottom: 80
          }
        }}
        onClose={onClose}
      >
        <Tree
          className="grow-1"
          treeData={treeData}
          showLine
          selectable
          multiple
          checkable
          checkedKeys={selectedTenants.map(String)}
          selectedKeys={
            selectedTenants.map(String)
          }
          onCheck={(checkedKeys) => {
            const leafKeys = getLeafKeys(treeData);
            const onlyLeafChecked = (checkedKeys as React.Key[]).filter((k) =>
              leafKeys.includes(String(k))
            );
            setSelectedTenants(onlyLeafChecked.map(Number));

          }}
          onSelect={(keys) => {
            setSelectedTenants(keys.map(Number));
          }}
        />

        <div className='absolute bottom-0 left-0 p-3 shadow-md w-full border-t-[1px] bg-white'>
          <Button
            className="w-full"
            loading={loading}
            size="middle"
            type="primary"
            onClick={() => handleSubmit()}
          >
            Lưu lại
          </Button>
        </div>
      </Drawer>
    </>
  );
};

export default CopyPermission;
