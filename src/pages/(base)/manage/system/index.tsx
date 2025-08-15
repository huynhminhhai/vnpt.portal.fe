import { DatePicker, message } from 'antd';

import { DeleteButton } from '@/components/button';
import { TableHeaderOperation, useTableScroll } from '@/features/table';
import { DeleteGoiSudung, GetGoiDangKy } from '@/service/api';
import ServiceAddForm from './modules/ServiceAddForm';
import ServiceUpdateForm from './modules/ServiceUpdateForm';

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
  const fetchList = async (params = {}) => {
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
      // eslint-disable-next-line no-console
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
      key: 'giaTien',
      render: (_: any, record: any) => record.giaTien || '-',
      title: 'Giá tiền'
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
          <ServiceUpdateForm
            id={record.id}
            onSuccess={fetchList}
          />
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
        title="Danh sách dịch vụ"
        variant="borderless"
        extra={
          <TableHeaderOperation
            addForm={<ServiceAddForm onSuccess={fetchList} />}
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

export default DanhSachDangKySuDung;
