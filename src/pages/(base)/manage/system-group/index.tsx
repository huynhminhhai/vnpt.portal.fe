import { Card, Collapse, List, message } from 'antd';
import { DeleteButton } from '@/components/button';
import { TableHeaderOperation, useTableScroll } from '@/features/table';
import SystemGroupAddForm from './modules/SystemGroupAddForm';
import SystemGroupUpdateForm from './modules/SystemGroupUpdateForm';
import { formatDate } from '@/utils/date';
import { DeleteGroupSystem, GetAllSystemGroup, UpdateSystemGroup } from '@/service/api';
import { useIsTabletResponsive } from '@/utils/responsive';
import { isActiveOptions } from '@/utils/options';

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
            label='Tên nhóm'
            name="keyword"
          >
            <AInput placeholder='Nhập tên nhóm' />
          </AForm.Item>
        </ACol>

        <ACol
          lg={8}
          md={12}
          sm={24}
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

const SystemGroupManagePage = () => {
  const { t } = useTranslation();
  const { scrollConfig, tableWrapperRef } = useTableScroll();

  // const nav = useNavigate();
  const [datas, setDatas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMobile();
  const isTabletRes = useIsTabletResponsive();

  // Form state
  const [form] = AForm.useForm();
  const [searchParams, setSearchParams] = useState({});

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

      const res = await GetAllSystemGroup(apiParams);

      const resData = res.data as any;

      if (resData && resData.result && resData.result.items) {
        const data = (resData.result.items).reverse();

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

  const handleStatusMenuClick = async (info: any, record: any) => {
    setLoading(true);
    try {
      const dataSubmit = { ...record, status: info.key };

      await UpdateSystemGroup(dataSubmit);

      message.success('Cập nhật trạng thái nhóm dịch vụ thành công!');

    } catch (error) {
      console.log(error);
      message.error(error as string);
    } finally {
      setLoading(false);
      fetchList();
    }
  };

  // Action handlers
  const handleDelete = async (id: number) => {
    try {
      await DeleteGroupSystem(id);
      message.success('Xóa nhóm dịch vụ thành công!');

      fetchList();
    } catch (error) {
      console.log(error);
      message.error(error as string);
    }
  };

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
      key: 'displayName',
      render: (_: any, record: any) => <div>{record.displayName}</div>,
      title: 'Tên nhóm dịch vụ'
    },
    // {
    //   align: 'center' as const,
    //   key: 'description',
    //   render: (_: any, record: any) => <div className='line-clamp-2'>{record?.description || '-'}</div>,
    //   title: 'Mô tả',
    // },
    {
      align: 'center' as const,
      key: 'creationTime',
      render: (_: any, record: any) => <div>{record?.creationTime && formatDate(record.creationTime)}</div>,
      title: 'Ngày tạo',
      width: 140
    },
    {
      align: 'center' as const,
      key: 'lastModificationTime',
      render: (_: any, record: any) => <div>{record?.lastModificationTime && formatDate(record.lastModificationTime)}</div>,
      title: 'Ngày chỉnh sửa',
      width: 140
    },
    {
      align: 'center' as const,
      key: 'status',
      render: (_: any, record: any) =>
        <IsActiveDropdown
          record={record}
          isActive={record.isActive}
          isActiveOptions={isActiveOptions}
          handleStatusMenuClick={handleStatusMenuClick}
        />,
      title: 'Trạng thái',
      width: 160
    },
    {
      align: 'center' as const,
      key: 'operate',
      render: (_: any, record: any) => (
        <div className="flex-center gap-8px">
          <SystemGroupUpdateForm
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
            label: t('common.search'),
          }
        ]}
      />
      <ACard
        className="flex-col-stretch sm:flex-1-hidden card-wrapper table-custom"
        ref={tableWrapperRef}
        title="Danh sách nhóm dịch vụ"
        variant="borderless"
        extra={
          <TableHeaderOperation
            addForm={<SystemGroupAddForm onSuccess={fetchList} />}
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
                      className="h-full shadow-sm border-[1px] border-[#e0e0e0] px-1"
                    >
                      {/* Header với ID và Status */}
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 bg-blue-50 rounded-lg flex items-center justify-center">
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
                              {item.displayName}
                            </h3>
                          }
                        >
                          {/* Description */}
                          {
                            item.description && (
                              <div className="mb-3">
                                <p className="text-gray-600 text-sm leading-relaxed md:min-h-[44px] md:line-clamp-2">
                                  {item.description}
                                </p>
                              </div>
                            )
                          }

                          {/* Dates */}
                          <div className="space-y-2 pt-3 border-t">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Ngày tạo: </span>
                              <p className="text-sm font-medium">
                                {item?.creationTime ? formatDate(item.creationTime) : "-"}
                              </p>
                            </div>

                            {item?.lastModificationTime && (
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-600">Ngày chỉnh sửa: </span>
                                <p className="text-sm font-medium">
                                  {formatDate(item.lastModificationTime)}
                                </p>
                              </div>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex justify-center gap-3 pt-3 border-t mt-3">
                            <SystemGroupUpdateForm id={item.id} onSuccess={fetchList} />
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

export default SystemGroupManagePage;
