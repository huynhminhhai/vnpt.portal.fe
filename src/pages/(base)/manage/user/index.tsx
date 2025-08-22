import { Card, Collapse, Dropdown, List, message, Tag } from 'antd';

import { DeleteButton } from '@/components/button';
import { TableHeaderOperation, useTableScroll } from '@/features/table';
import { DeleteUser, GetAllTenant, GetAllUser, UpdateUser } from '@/service/api';
import { useIsTabletResponsive } from '@/utils/responsive';
import { formatDate } from '@/utils/date';
import { isActiveOptions } from '@/utils/options';
import IsActiveDropdown from '@/components/dropdown/IsActiveDropdown';
import UserAddForm from './modules/UserAddForm';
import UserUpdateForm from './modules/UserUpdateForm';

const UserSearch: FC<Page.SearchProps> = ({ form, reset, search, searchParams }) => {
  const { t } = useTranslation();

  return (
    <AForm
      form={form}
      initialValues={searchParams}
      labelCol={{
        md: 7,
        span: 5
      }}
    >
      <ARow
        wrap
        gutter={[8, 16]}
        className='justify-between'
      >
        <ACol
          lg={8}
          md={12}
          sm={24}
          span={24}
        >
          <AForm.Item
            className="m-0"
            label='Tên đơn vị'
            name="keyword"
          >
            <AInput placeholder='Nhập tên đơn vị' />
          </AForm.Item>
        </ACol>

        <ACol
          lg={8}
          md={12}
          span={24}
        >
          <AFlex
            className="w-full"
            gap={16}
            justify="flex-end"
          >
            <AButton
              className='w-full'
              icon={<IconMdiRefresh />}
              onClick={reset}
            >
              {t('common.reset')}
            </AButton>
            <AButton
              className='w-full'
              ghost
              icon={<IconUilSearch />}
              type="primary"
              onClick={search}
            >
              {t('common.search')}
            </AButton>
          </AFlex>
        </ACol>
      </ARow>
    </AForm>
  );
};

const UserManagePage = () => {
  const { t } = useTranslation();
  const { scrollConfig, tableWrapperRef } = useTableScroll();
  const isMobile = useMobile();
  const [form] = AForm.useForm();
  // const nav = useNavigate();
  const isTabletRes = useIsTabletResponsive();

  const [datas, setDatas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState({});
  const [tenants, setTenants] = useState<any[]>([]);

  const handleStatusMenuClick = async (info: any, record: any) => {
    setLoading(true);
    try {
      const dataSubmit = { ...record, isActive: info.key };

      await UpdateUser(dataSubmit);

      message.success('Cập nhật trạng thái người dùng thành công!');

    } catch (error) {
      console.log(error);
      message.error(error as string);
    } finally {
      setLoading(false);
      fetchList();
    }
  };

  // Fetch data function
  const fetchList = async (params = {}) => {
    setLoading(true);
    try {
      const apiParams = {
        MaxResultCount: '9999',
        SkipCount: 0,
        Sorting: null,
        IsActive: null,
        Keyword: '',
        ...params
      };

      const res = await GetAllUser(apiParams);

      const resData = res.data as any;

      if (resData && resData.result && resData.result.items) {
        const data = resData.result.items;

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

  // Search functions
  const reset = () => {
    form.resetFields();
    setSearchParams({});
    fetchList();
  };

  const search = () => {
    const values = form.getFieldsValue();
    setSearchParams(values);
    fetchList(values);
  };

  // Initial data fetch
  useEffect(() => {
    fetchList();
  }, []);

  // Action handlers
  const handleDelete = async (id: number) => {
    try {
      await DeleteUser(id);

      message.success('Xóa người dùng thành công!');

      fetchList();
    } catch (error) {
      console.log(error);
      message.error(error as string);
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      const apiParams = {
        MaxResultCount: "9999",
        SkipCount: 0,
        Sorting: null,
        IsActive: true,
        Keyword: "",
      };

      try {
        const res = await GetAllTenant(apiParams);

        const resData = res.data as any;

        if (resData && resData.result && resData.result.items) {
          setTenants(resData.result.items);
        }
      } catch (err) {
        console.error("Fetch groups error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  // Column definitions
  const columns: any[] = [
    {
      align: 'center' as const,
      key: 'index',
      render: (_: any, record: any) => record.id,
      title: 'ID',
      width: 64
    },
    {
      align: 'center' as const,
      key: 'name',
      render: (_: any, record: any) => record.name || '-',
      title: 'Tên người dùng'
    },
    {
      align: 'center' as const,
      key: 'userName',
      render: (_: any, record: any) => record.userName || '-',
      title: 'Tên đăng nhập'
    },
    {
      align: 'center' as const,
      key: 'name',
      render: (_: any, record: any) => {
        const tenancyKey = record.userName?.split(".")[0];

        const tenant = tenants.find(t => t.tenancyName === tenancyKey);

        return tenant?.name || '-';
      },
      title: 'Tên đơn vị'
    },
    {
      align: 'center' as const,
      key: 'creationTime',
      render: (_: any, record: any) => <div>{record?.creationTime && formatDate(record.creationTime)}</div>,
      title: 'Ngày tạo',
      width: 140
    },
    {
      align: 'center' as const,
      key: 'isActive',
      render: (_: any, record: any) =>
        <IsActiveDropdown
          record={record}
          isActive={record.isActive}
          isActiveOptions={isActiveOptions}
          handleStatusMenuClick={handleStatusMenuClick}
        />
      ,
      title: 'Trạng thái',
      width: 160
    },
    {
      align: 'center' as const,
      key: 'operate',
      render: (_: any, record: any) => (
        <div className="flex-center gap-8px">
          <UserUpdateForm
            id={record.id}
            onSuccess={fetchList}
          />
          <DeleteButton onClick={() => handleDelete(record.id)} />
        </div>
      ),
      title: t('common.operate'),
      width: 160
    }
  ];

  return (
    <div className="h-full min-h-500px flex-col-stretch gap-2px md:gap-12px overflow-hidden lt-sm:overflow-auto">
      <ACollapse
        bordered={false}
        className="card-wrapper"
        defaultActiveKey={isMobile ? undefined : []}
        items={[
          {
            children: (
              <UserSearch
                form={form}
                reset={reset}
                search={search}
                searchParams={searchParams}
              />
            ),
            key: '1',
            label: t('common.search')
          }
        ]}
      />
      <ACard
        className="flex-col-stretch sm:flex-1-hidden card-wrapper table-custom"
        ref={tableWrapperRef}
        title="Danh sách người dùng"
        variant="borderless"
        extra={
          <TableHeaderOperation
            addForm={<UserAddForm onSuccess={fetchList} groupData={tenants} />}
            columns={columns}
            disabledDelete={true}
            isShowDelete={false}
            loading={loading}
            refresh={() => fetchList()}
            setColumnChecks={() => { }}
            onDelete={() => { }}
          />
        }
      >
        {
          !isTabletRes ?
            <ATable
              bordered
              columns={columns}
              dataSource={datas}
              loading={loading}
              rowKey="id"
              scroll={scrollConfig}
              size="small"
              pagination={{
                defaultPageSize: 10,
                pageSizeOptions: ['10', '20', '50', '100'],
                showQuickJumper: true,
                showSizeChanger: true,
                showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} items`
              }}
            /> :
            <div className='h-full overflow-y-unset md:overflow-y-auto md:overflow-x-hidden'>
              <List
                grid={{
                  gutter: [16, 0],
                  column: 1,
                  sm: 1,
                  md: 2,
                  xl: 3,
                }}
                dataSource={datas}
                pagination={{
                  pageSize: 10,
                  showSizeChanger: true,
                  showQuickJumper: true,
                  showTotal: (total, range) =>
                    `${range[0]}-${range[1]} của ${total} mục`,
                  pageSizeOptions: ['6', '12', '24', '48']
                }}
                renderItem={(item: any) => (
                  <List.Item className='!mb-2'>
                    <Card
                      className="h-full border-[1px] border-[#e0e0e0] px-1"
                    >
                      {/* Header với ID và Status */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div className="py-1 px-3 bg-blue-50 rounded-lg flex items-center justify-center">
                            <span className="text-xs font-semibold text-primary">#{item.id}</span>
                          </div>
                        </div>
                        <IsActiveDropdown
                          record={item}
                          isActive={item.isActive}
                          isActiveOptions={isActiveOptions}
                          handleStatusMenuClick={handleStatusMenuClick}
                        />
                      </div>

                      {/* Title + Collapse */}
                      <Collapse ghost expandIconPosition="end">
                        <Collapse.Panel
                          key="panel"
                          header={
                            <h3 className="text-[17px] leading-[24px] font-semibold mb-2">
                              {item.name}
                            </h3>
                          }
                        >
                          {/* Dates */}
                          <div className="space-y-2 pt-3 border-t">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Mã đơn vị: </span>
                              <p className="text-sm font-medium">
                                {item?.tenancyName || "-"}
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex justify-center gap-3 pt-3 border-t mt-3">
                            <UserUpdateForm id={item.id} onSuccess={fetchList} />
                            <DeleteButton onClick={() => handleDelete(item.id)} />
                          </div>
                        </Collapse.Panel>
                      </Collapse>
                    </Card>
                  </List.Item>
                )}
              />
            </div>
        }
      </ACard>
    </div>
  );
};

export default UserManagePage;
