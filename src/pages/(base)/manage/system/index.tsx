import { DatePicker, message } from 'antd';

import { DeleteButton } from '@/components/button';
import { TableHeaderOperation, useTableScroll } from '@/features/table';
import { GetAllSystem } from '@/service/api';
import SystemAddForm from './modules/SystemAddForm';
import SystemUpdateForm from './modules/SystemUpdateForm';

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
        gutter={[8, 0]}
      >
        <ACol
          lg={8}
          md={12}
          span={24}
        >
          <AForm.Item
            className="m-0"
            label={t('page.manage.user.userPhone')}
            name="userPhone"
          >
            <AInput placeholder={t('page.manage.user.form.userPhone')} />
          </AForm.Item>
        </ACol>
        <ACol
          lg={8}
          md={12}
          span={24}
        >
          <AForm.Item
            className="m-0"
            label="Ngày tạo"
            name="dateRange"
          >
            <DatePicker.RangePicker />
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
              icon={<IconMdiRefresh />}
              onClick={reset}
            >
              {t('common.reset')}
            </AButton>
            <AButton
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
  // const nav = useNavigate();
  const [datas, setDatas] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMobile();

  // Form state
  const [form] = AForm.useForm();
  const [searchParams, setSearchParams] = useState({});

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

      const res = await GetAllSystem(apiParams);

      const resData = res.data as any;

      if (resData && resData.result && resData.result.items) {
        const data = resData.result.items;

        console.log(data)
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
      // await DeleteGoiSudung(id);

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
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, idx: number) => idx + 1,
      title: '#',
      width: 64
    },
    {
      align: 'center' as const,
      key: 'iconUrl',
      width: 100,
      render: (_: any, record: any) => record.iconUrl ? <div className='w-full flex items-center justify-center'><AImage className='rounded-md' width={40} src={record.iconUrl} /></div> : '',
      title: 'Logo'
    },
    {
      align: 'center' as const,
      key: 'systemCode',
      width: 180,
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
      key: 'systemDescription',
      render: (_: any, record: any) => record.systemDescription ? <div className='line-clamp-2'>{record.systemDescription}</div> : '-',
      title: 'Mô tả'
    },
    {
      align: 'center' as const,
      key: 'operate',
      render: (_: any, record: any) => (
        <div className="flex-center gap-8px">
          <SystemUpdateForm
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
    <div className="h-full min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
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
        className="flex-col-stretch sm:flex-1-hidden card-wrapper"
        ref={tableWrapperRef}
        title="Danh sách hệ thống"
        variant="borderless"
        extra={
          <TableHeaderOperation
            addForm={<SystemAddForm onSuccess={fetchList} />}
            columns={columns}
            disabledDelete={true}
            isShowDelete={false}
            loading={loading}
            refresh={() => fetchList()}
            setColumnChecks={() => {}}
            onDelete={() => {}}
          />
        }
      >
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
        />
      </ACard>
    </div>
  );
};

export default SystemManagePage;
