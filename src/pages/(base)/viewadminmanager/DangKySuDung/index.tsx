import { DatePicker } from 'antd';

import { DeleteButton, DetailButton, EditButton } from '@/components/button';
import { TableHeaderOperation, useTableScroll } from '@/features/table';
import { GetGoiDangKy } from '@/service/api';

// eslint-disable-next-line react/prop-types
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

const DanhSachDangKySuDung = () => {
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
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const apiParams = {
        MaxResultCount: '9999',
        SkipCount: 0,
        Sorting: null,
        ...params
      };

      const res = await GetGoiDangKy(apiParams);

      // eslint-disable-next-line no-console
      console.log('res', res);

      const resData = res.data as any;

      if (resData && resData.result) {
        const data = resData.result;
        setDatas(data);
      } else {
        // eslint-disable-next-line no-console
        console.warn('API response format không đúng, sử dụng fallback data');
        setDatas([]); // Set empty array if no data
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
      setDatas([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Search functions
  const reset = () => {
    form.resetFields();
    setSearchParams({});
    fetchData(); // Reload data after reset
  };

  const search = () => {
    const values = form.getFieldsValue();
    setSearchParams(values);
    fetchData(values); // Fetch data with search params
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

  const detail = (id: number) => {
    // eslint-disable-next-line no-console
    console.log('Detailing:', id);
  };

  const edit = (id: number) => {
    // eslint-disable-next-line no-console
    console.log('Editing:', id);
  };

  const handleAdd = () => {
    // eslint-disable-next-line no-console
    console.log('Adding new user');
  };

  // Action handlers
  const handleDelete = async (id: number) => {
    try {
      // eslint-disable-next-line no-console
      console.log('Deleting:', id);
      // await deleteUser(id);
      fetchData(); // Refresh data after delete
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error deleting:', error);
    }
  };

  // Column definitions
  const columns: any[] = [
    {
      align: 'center' as const,
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, idx: number) => idx + 1,
      title: t('common.index'),
      width: 64
    },
    {
      align: 'center' as const,
      key: 'tenGoi',
      minWidth: 100,
      render: (_: any, record: any) => record.tenGoi || '-',
      title: 'Tên gói'
    },
    {
      align: 'center' as const,
      key: 'tenHienThi',
      render: (_: any, record: any) => record.tenHienThi || '-',
      title: 'Tên hiển thị'
    },
    {
      align: 'center' as const,
      key: 'soLuongMua',
      render: (_: any, record: any) => record.soLuongMua || '0',
      title: 'Số lượng mua'
    },
    {
      align: 'center' as const,
      key: 'operate',
      render: (_: any, record: any) => (
        <div className="flex-center gap-8px">
          <DetailButton onClick={() => detail(record.id)} />
          <EditButton onClick={() => edit(record.id)} />
          {/* <APopconfirm
            title={t('common.confirmDelete')}
            onConfirm={() => handleDelete(record.id)}
          >
            <AButton
              danger
              size="small"
            >
              {t('common.delete')}
            </AButton>
          </APopconfirm> */}
          <DeleteButton onClick={() => handleDelete(record.id)} />
        </div>
      ),
      title: t('common.operate'),
      width: 260
    }
  ];

  return (
    <div className="h-full min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
      <ACollapse
        bordered={false}
        className="card-wrapper"
        defaultActiveKey={isMobile ? undefined : '1'}
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
        title="Danh sách gói nâng cấp"
        variant="borderless"
        extra={
          <TableHeaderOperation
            add={handleAdd}
            columns={columns}
            disabledDelete={true}
            isShowAdd={true}
            isShowDelete={false}
            loading={loading}
            refresh={() => fetchData()}
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

export default DanhSachDangKySuDung;
