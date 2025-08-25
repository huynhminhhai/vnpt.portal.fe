import { Card, Collapse, Dropdown, List, MenuProps, message, Tag } from 'antd';

import { DeleteButton } from '@/components/button';
import { TableHeaderOperation, useTableScroll } from '@/features/table';
import { DeleteSystemWeb, GetAllSystemGroup, GetAllSystemWeb, UpdateSystemWeb } from '@/service/api';
import SystemAddForm from './modules/SystemAddForm';
import SystemUpdateForm from './modules/SystemUpdateForm';
import { useIsTabletResponsive } from '@/utils/responsive';
import { formatDate } from '@/utils/date';

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
            label='Tên dịch vụ'
            name="keyword"
          >
            <AInput placeholder='Nhập tên dịch vụ' />
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

const SystemManagePage = () => {
  const { t } = useTranslation();
  const { scrollConfig, tableWrapperRef } = useTableScroll();
  const isMobile = useMobile();
  const [form] = AForm.useForm();
  // const nav = useNavigate();
  const isTabletRes = useIsTabletResponsive();

  const [datas, setDatas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);
  const [searchParams, setSearchParams] = useState({});

  const items: MenuProps['items'] = [
    {
      label: 'Hoạt động',
      key: 1,
    },
    {
      type: 'divider',
    },
    {
      label: 'Ngừng hoạt động',
      key: 2,
    },
  ];

  const handleStatusMenuClick = async (info: any, record: any) => {
    setLoading(true);
    try {
      const dataSubmit = { ...record, systemStatus: info.key };

      await UpdateSystemWeb(dataSubmit);

      message.success('Cập nhật trạng thái dịch vụ thành công!');

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
        MaxResultCount: 10,
        SkipCount: 0,
        IsActive: null,
        Keyword: '',
        ...params
      };

      const res = await GetAllSystemWeb(apiParams);

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
      await DeleteSystemWeb(id);

      message.success('Xóa dịch vụ thành công!');

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
        MaxResultCount: 9999,
        SkipCount: 0,
        IsActive: null,
        Keyword: "",
      };

      try {
        const res = await GetAllSystemGroup(apiParams);

        const resData = res.data as any;

        if (resData && resData.result && resData.result.items) {
          setGroups(resData.result.items.filter((item: any) => item.status === 1));
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
      key: 'iconUrl',
      width: 80,
      render: (_: any, record: any) => <div className='w-full flex items-center justify-center'><AImage className='rounded-md' width={24} src={record.iconUrl || '/src/assets/imgs/vnpt.png'} /></div>,
      title: 'Logo'
    },
    {
      align: 'center' as const,
      key: 'systemCode',
      width: 160,
      render: (_: any, record: any) => record.systemCode || '-',
      title: 'Mã dịch vụ'
    },
    {
      align: 'center' as const,
      key: 'systemName',
      render: (_: any, record: any) => record.systemName || '-',
      title: 'Tên hiển thị'
    },
    {
      align: 'center' as const,
      key: 'systemUrl',
      render: (_: any, record: any) => record.systemUrl || '-',
      title: 'Đường dẫn'
    },
    {
      align: 'center' as const,
      title: "Nhóm dịch vụ",
      key: "groupSystemId",
      render: (_: any, record: any) => record?.groupSystemFk?.displayName || "-"
    },
    {
      align: 'center' as const,
      key: 'systemStatus',
      render: (_: any, record: any) =>
        <Dropdown menu={{ items, onClick: (info) => handleStatusMenuClick(info, record) }} trigger={['click']}>
          <div className='cursor-pointer'>{record.systemStatus === 1 ? <Tag color="green">Hoạt động</Tag> : <Tag color="orange">Ngừng hoạt động</Tag>}</div>
        </Dropdown>
      ,
      title: 'Trạng thái',
      width: 160
    },
    {
      align: 'center' as const,
      key: 'operate',
      render: (_: any, record: any) => (
        <div className="flex-center gap-8px">
          <SystemUpdateForm
            id={record.id}
            onSuccess={fetchList}
            groupData={groups}
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
        title="Danh sách hệ thống"
        variant="borderless"
        extra={
          <TableHeaderOperation
            addForm={<SystemAddForm onSuccess={fetchList} groupData={groups} />}
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
                            <span className="text-xs font-semibold text-primary">#{item.systemCode}</span>
                          </div>
                        </div>
                        <Dropdown
                          menu={{
                            items,
                            onClick: (info) => handleStatusMenuClick(info, item)
                          }}
                          trigger={["click"]}
                          placement="bottomRight"
                        >
                          <div className="cursor-pointer">
                            {item.systemStatus === 1 ? (
                              <Tag color="green" className="mr-0">
                                Hoạt động
                              </Tag>
                            ) : (
                              <Tag color="orange" className="mr-0">
                                Ngừng hoạt động
                              </Tag>
                            )}
                          </div>
                        </Dropdown>
                      </div>

                      {/* Title + Collapse */}
                      <Collapse ghost expandIconPosition="end">
                        <Collapse.Panel
                          key="panel"
                          header={
                            <h3 className="text-[17px] leading-[24px] font-semibold mb-2">
                              {item.systemName}
                            </h3>
                          }
                        >
                          {/* Description */}
                          {
                            item.systemDescription && (
                              <div className="mb-3">
                                <p className="text-gray-600 text-sm leading-relaxed md:min-h-[44px] md:line-clamp-2">
                                  {item.systemDescription}
                                </p>
                              </div>
                            )
                          }

                          {/* Dates */}
                          <div className="space-y-2 pt-3 border-t">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Logo: </span>
                              <p className="text-sm font-medium">
                                <AImage className='rounded-md' width={24} src={item?.iconUrl || '/src/assets/imgs/vnpt.png'} />
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Đường dẫn: </span>
                              <p className="text-sm font-medium">
                                {item?.systemUrl || "-"}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Nhóm dịch vụ: </span>
                              <p className="text-sm font-medium">
                                {item?.groupSystemFk?.displayName || "-"}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Ngày tạo: </span>
                              <p className="text-sm font-medium">
                                {item?.createdDate ? formatDate(item.createdDate) : "-"}
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex justify-center gap-3 pt-3 border-t mt-3">
                            <SystemUpdateForm id={item.id} onSuccess={fetchList} groupData={groups} />
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

export default SystemManagePage;
