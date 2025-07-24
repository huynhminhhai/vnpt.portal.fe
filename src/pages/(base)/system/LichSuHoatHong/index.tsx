import { TableHeaderOperation, useTableScroll } from '@/features/table';
import { GetAllAuditLog } from '@/service/api/system';

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
const LichSuHoatDong = () => {
  const isMobile = useMobile();
  const { scrollConfig, tableWrapperRef } = useTableScroll();
  const { t } = useTranslation();

  console.log(scrollConfig);
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
      dataIndex: 'id',
      fixed: 'left',
      key: 'id',
      title: 'ID',
      width: 60
    },
    {
      dataIndex: 'serviceName',
      key: 'serviceName',
      minWidth: 100,
      title: 'Tên dịch vụ'
    },
    {
      dataIndex: 'methodName',
      key: 'methodName',
      title: 'Tên phương thức'
    },
    {
      dataIndex: 'parameters',
      title: 'Tham số'
    },
    {
      dataIndex: 'returnValue',
      ellipsis: true,
      key: 'returnValue',
      title: 'Kết quả',
      width: 150
    },
    {
      align: 'center',
      dataIndex: 'executionTime',
      ellipsis: true,
      key: 'executionTime',
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
      title: 'Thời gian'
    },
    {
      dataIndex: 'executionDuration',
      ellipsis: true,
      key: 'executionDuration',
      title: 'Thời gian thực thi'
    },
    {
      dataIndex: 'clientIpAddress',
      ellipsis: true,
      key: 'clientIpAddress',
      title: 'IP'
    },
    {
      dataIndex: 'clientName',
      ellipsis: true,
      key: 'clientName',
      title: 'Tên máy chủ'
    },
    {
      dataIndex: 'browserInfo',
      ellipsis: true,
      key: 'browserInfo',
      title: 'BrowserInfo'
    },
    {
      dataIndex: 'exceptionMessage',
      ellipsis: true,
      key: 'exceptionMessage',
      title: 'Lỗi'
    },
    {
      dataIndex: 'exception',
      ellipsis: true,
      key: 'exception',
      minWidth: 100,
      title: 'Trạng thái'
    },
    {
      dataIndex: 'customData',
      ellipsis: true,
      key: 'customData',
      title: 'Dữ liệu tùy chỉnh',
      width: 200
    }
  ];

  const [columnChecks, setColumnChecks] = useState<AntDesign.TableColumnCheck[]>([
    {
      checked: true,
      key: 'id',
      title: 'ID'
    },
    {
      checked: true,
      key: 'serviceName',
      title: 'Tên dịch vụ'
    },
    {
      checked: true,
      key: 'methodName',
      title: 'Tên phương thức'
    },
    {
      checked: true,
      key: 'parameters',
      title: 'Tham số'
    },
    {
      checked: false,
      key: 'returnValue',
      title: 'Kết quả'
    },
    {
      checked: true,
      key: 'executionTime',
      title: 'Thời gian'
    },
    {
      checked: true,
      key: 'executionDuration',
      title: 'Thời gian thực thi'
    },
    {
      checked: true,
      key: 'clientIpAddress',
      title: 'IP'
    },
    {
      checked: false,
      key: 'clientName',
      title: 'Tên máy chủ'
    },
    {
      checked: false,
      key: 'browserInfo',
      title: 'BrowserInfo'
    },
    {
      checked: true,
      key: 'exceptionMessage',
      title: 'Lỗi'
    },
    {
      checked: true,
      key: 'exception',
      title: 'Trạng thái'
    },
    {
      checked: false,
      key: 'customData',
      title: 'Dữ liệu tùy chỉnh'
    }
  ]);
  const handleSetColumnChecks = (checks: AntDesign.TableColumnCheck[]) => {
    setColumnChecks(checks);
  };
  const filteredColumns = columnChecks
    .filter(check => check.checked) // Chỉ lấy những cột được check
    .map(check => {
      // Tìm column config tương ứng từ mảng columns gốc
      const columnConfig = columns.find(col => col.key === check.key);
      return columnConfig;
    })
    .filter(Boolean);
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const apiParams = {
        MaxResultCount: pagination.pageSize,
        SkipCount: (pagination.current - 1) * pagination.pageSize,
        Sorting: null,
        ...params
      };

      const res = await GetAllAuditLog(apiParams as any);

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
    <div className="h-full min-h-500px flex-col-stretch gap-16px overflow-y-auto lt-sm:overflow-auto">
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
            columns={columnChecks as any}
            disabledDelete={true}
            isShowAdd={false}
            isShowColumnChecks={true}
            isShowDelete={false}
            loading={loading}
            refresh={() => fetchData()}
            setColumnChecks={handleSetColumnChecks}
            onDelete={() => {}}
          />
        }
      >
        <ATable
          bordered
          columns={filteredColumns as any}
          dataSource={datas}
          loading={loading}
          rowKey="id"
          scroll={scrollConfig}
          size="small"
          // tableLayout="auto"
          pagination={{
            current: pagination.current,
            pageSize: pagination.pageSize,
            pageSizeOptions: ['10', '20', '50', '100'],
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} của ${total} dòng`,
            total: pagination.total
          }}
          onChange={handleTableChange}
        />
      </ACard>
    </div>
  );
};

export default LichSuHoatDong;
