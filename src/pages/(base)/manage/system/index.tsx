import { Card, Collapse, Dropdown, List, MenuProps, message, Select, Tag } from 'antd';

import { DeleteButton } from '@/components/button';
import { TableHeaderOperation, useTableScroll } from '@/features/table';
import { DeleteSystemWeb, GetAllSystemGroup, GetAllSystemWeb, UpdateActiveSystemWeb, UpdateSystemWeb } from '@/service/api';
import SystemAddForm from './modules/SystemAddForm';
import SystemUpdateForm from './modules/SystemUpdateForm';
import { useIsTabletResponsive } from '@/utils/responsive';
import { formatDate } from '@/utils/date';
import { isActiveOptions } from '@/utils/options';
import { Icon } from '@iconify/react';
import { getPaginationConfig } from '../modules/CommonPagination';
import vnpt from '@/assets/imgs/vnpt.png';

const UserSearch: FC<Page.SearchProps> = ({ form, reset, search, searchParams }) => {
  const { t } = useTranslation();

  const { Option } = Select;

  return (
    <AForm
      form={form}
      initialValues={searchParams}
      labelCol={{
        md: 7,
        span: 5
      }}
      onFinish={search}
    >
      <ARow
        wrap
        gutter={[8, 16]}
        className='justify-between'
      >
        <ACol
          lg={8}
          md={16}
          sm={24}
          span={24}
        >
          <div className='flex items-center gap-3 w-full'>
            <AForm.Item
              className="m-0 w-full"
              label=''
              name="Keyword"
            >
              <AInput allowClear placeholder='Tìm kiếm nhanh' prefix={<Icon icon="ant-design:search-outlined" />} />
            </AForm.Item>
            <AForm.Item
              className="m-0 w-full"
              label=''
              name="IsActive"
            >
              <Select allowClear placeholder="Chọn trạng thái" size="middle">
                {isActiveOptions
                  .filter((item: any) => !item.type)
                  .map((item: any) => (
                    <Option key={item.key.toString()} value={item.key}>
                      {item.label}
                    </Option>
                  ))}
              </Select>
            </AForm.Item>
          </div>
        </ACol>

        <ACol
          lg={6}
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
              htmlType="submit"
              className='w-full'
              ghost
              icon={<IconUilSearch />}
              type="primary"
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
  const isTabletRes = useIsTabletResponsive();

  const defaultParams = {
    MaxResultCount: 10,
    SkipCount: 0,
    IsActive: null,
    Keyword: "",
  };

  const [searchParams, setSearchParams] = useState(defaultParams);
  const [datas, setDatas] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState<any[]>([]);

  const handleStatusMenuClick = async (info: any, record: any) => {
    setLoading(true);
    try {
      await UpdateActiveSystemWeb(record.id, info.key);

      message.success('Cập nhật trạng thái dịch vụ thành công!');

    } catch (error) {
      console.log(error);
      message.error(error as string);
    } finally {
      setLoading(false);
      fetchList(searchParams);
    }
  };

  // Fetch data function
  const fetchList = async (params: any) => {
    setLoading(true);
    try {

      const res = await GetAllSystemWeb(params);

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

  // Search functions
  const reset = () => {
    form.resetFields();
    setSearchParams(defaultParams);
  };

  const search = () => {
    const values = form.getFieldsValue();
    setSearchParams({
      ...defaultParams,
      ...values,
    });
  };

  // Initial data fetch
  useEffect(() => {
    fetchList(searchParams);
  }, [searchParams]);

  // Action handlers
  const handleDelete = async (id: number) => {
    try {
      await DeleteSystemWeb(id);

      message.success('Xóa dịch vụ thành công!');

      fetchList(searchParams);
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
        IsActive: true,
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
      render: (_: any, record: any) => <div className='w-full flex items-center justify-center'><AImage className='rounded-md' width={20} src={record.iconUrl || vnpt} /></div>,
      title: 'Logo'
    },
    {
      align: 'left' as const,
      key: 'systemCode',
      render: (_: any, record: any) => record.systemCode || '-',
      title: 'Mã dịch vụ'
    },
    {
      align: 'left' as const,
      key: 'systemName',
      render: (_: any, record: any) => record.systemName || '-',
      title: 'Tên hiển thị'
    },
    {
      align: 'left' as const,
      key: 'systemUrl',
      render: (_: any, record: any) => <div className='line-clamp-1'> {record.systemUrl || '-'} </div>,
      title: 'Đường dẫn'
    },
    {
      align: 'left' as const,
      title: "Nhóm dịch vụ",
      key: "groupSystemId",
      render: (_: any, record: any) => record?.groupSystemFk?.displayName || "-"
    },
    {
      align: 'center' as const,
      key: 'systemStatus',
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
          <SystemUpdateForm
            id={record.id}
            onSuccess={() => fetchList(searchParams)}
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
        className="card-wrapper mt-2 mx-1 md:mx-0 md:mt-0"
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
        className="mt-1 mx-1 md:mx-0 md:mt-0 flex-col-stretch sm:flex-1-hidden card-wrapper table-custom"
        ref={tableWrapperRef}
        title="Danh sách hệ thống"
        variant="borderless"
        extra={
          <TableHeaderOperation
            addForm={<SystemAddForm onSuccess={() => fetchList(searchParams)} groupData={groups} />}
            columns={columns}
            disabledDelete={true}
            isShowDelete={false}
            loading={loading}
            refresh={() => fetchList(searchParams)}
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
              dataSource={datas?.items}
              loading={loading}
              rowKey="id"
              scroll={scrollConfig}
              size="small"
              className='h-full'
              pagination={getPaginationConfig({ searchParams, setSearchParams, total: datas?.totalCount })}
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
                dataSource={datas?.items}
                loading={loading}
                pagination={getPaginationConfig({ searchParams, setSearchParams, total: datas?.totalCount })}
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
                            <div className='flex items-center gap-3 mb-2'>
                              <AImage className='rounded-md' width={24} src={item?.iconUrl || vnpt} />
                              <h3 className="text-[17px] leading-[24px] font-semibold">
                                {item.systemName}
                              </h3>
                            </div>
                          }
                        >
                          {/* Description */}
                          {
                            item.systemDescription && (
                              <div className="mb-3 mt-1">
                                <p className="text-sm leading-relaxed md:min-h-[44px] md:line-clamp-2">
                                  {item.systemDescription}
                                </p>
                              </div>
                            )
                          }

                          {/* Dates */}
                          <div className="space-y-2 pt-3 border-t">
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600 whitespace-nowrap">Đường dẫn: </span>
                              <p className="text-sm font-medium line-clamp-1">
                                {item?.systemUrl || "-"}
                              </p>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Nhóm dịch vụ: </span>
                              <p className="text-sm font-medium">
                                {item?.groupSystemFk?.displayName || "-"}
                              </p>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex justify-center gap-3 pt-3 border-t mt-3">
                            <SystemUpdateForm id={item.id} onSuccess={() => fetchList(searchParams)} groupData={groups} />
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
