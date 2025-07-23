import { TableHeaderOperation, useTableScroll } from '@/features/table';
import { GetAllLoginLog } from '@/service/api/system';

// type Pagination = {
//   current: number;
//   pageSize: number;
//   total: number;
// };

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
            label="Điện thoại"
            name="dateRange"
          >
            <AInput />
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
            <ADatePicker.RangePicker />
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
const LichSuDangNhap = () => {
  const isMobile = useMobile();
  const { scrollConfig, tableWrapperRef } = useTableScroll();
  const { t } = useTranslation();

  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0
  });
  const [form] = AForm.useForm();
  const [searchParams, setSearchParams] = useState({});
  const columns = [
    {
      align: 'center',
      ellipsis: true,
      key: 'index',
      render: (_: any, __: any, index: number) => {
        const { current, pageSize } = pagination;
        return (current - 1) * pageSize + index + 1;
      },
      title: '#',
      width: 60
    },
    {
      dataIndex: 'userNameOrEmailAddress',
      ellipsis: true,
      key: 'userNameOrEmailAddress',
      title: 'Tên đăng nhập',
      width: 200
    },
    {
      dataIndex: 'userNameOrEmailAddress',
      ellipsis: true,
      key: 'email',
      title: 'Email'
    },
    {
      align: 'center',
      dataIndex: 'creationTime',
      ellipsis: true,
      render: (text: Date) => {
        // Assuming text is a valid date string or timestamp
        const date = new Date(text);
        return new Intl.DateTimeFormat('vi-VN', {
          day: '2-digit',
          hour: '2-digit',
          hour12: false,
          minute: '2-digit',
          month: '2-digit',
          year: 'numeric'
        }).format(date);
      },
      title: 'Thời gian',
      width: 200
    },
    {
      dataIndex: 'clientIpAddress',
      ellipsis: true,
      key: 'clientIpAddress',
      title: 'IP',
      width: 150
    },
    {
      dataIndex: 'browserInfo',
      ellipsis: true,
      key: 'browserInfo',
      title: 'BrowserInfo'
    }
  ];

  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const apiParams = {
        MaxResultCount: '9999',
        SkipCount: 0,
        Sorting: null,
        ...params
      };

      const res = await GetAllLoginLog(apiParams);

      const resData = res.data as any;
      if (resData && resData.result) {
        const data = resData.result.items;
        setDatas(data);
        setPagination(prev => ({
          ...prev,
          total: resData.result.totalCount || 0
        }));
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
  const handleTableChange = (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    pagination: { current?: number; pageSize?: number; total?: number },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filters: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sorter: any,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    extra: any
    // eslint-disable-next-line max-params
  ) => {
    const current = pagination.current || 1;
    const pageSize = pagination.pageSize || 10;
    setPagination(prev => ({
      ...prev,
      current,
      pageSize
    }));
    fetchData({
      MaxResultCount: pageSize,
      SkipCount: (current - 1) * pageSize
    });
  };
  useEffect(() => {
    fetchData();
  }, []);

  const reset = () => {
    form.resetFields();
    setSearchParams({});
    fetchData();
  };

  const search = () => {
    const values = form.getFieldsValue();
    setSearchParams(values);
    fetchData(values);
  };
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
        title="Danh sách lịch sử đăng nhập"
        extra={
          <TableHeaderOperation
            add={() => {}}
            columns={columns as any}
            disabledDelete={true}
            isShowAdd={false}
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
          columns={columns as any}
          dataSource={datas}
          loading={loading}
          rowKey="id"
          scroll={scrollConfig}
          size="small"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            pageSizeOptions: ['10', '20', '50', '100'],
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} của ${total} items`,
            total: pagination.total
          }}
          onChange={handleTableChange}
        />
      </ACard>
    </div>
  );
};

export default LichSuDangNhap;
