import { TableHeaderOperation, useTableScroll } from "@/features/table";
import { GetAllAuditLog, GetAllLoginLog } from "@/service/api/system";

type Pagination = {
  current: number;
  pageSize: number;
  total: number;
}

const LichSuHoatDong = () => {
  const isMobile = useMobile();
  const { scrollConfig, tableWrapperRef } = useTableScroll();
  const { t } = useTranslation();

  console.log(scrollConfig)
  const [loading, setLoading] = useState(false);
  const [datas, setDatas] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
      fixed: 'left',
      align: 'center'
    },
    {
      title: 'Tên dịch vụ',
      dataIndex: 'serviceName',
      key: 'serviceName',   minWidth:100
    },
    {
      title: 'Tên phương thức',
      dataIndex: 'methodName',
      key: 'methodName', 
 },
    {
      title: 'Tham số',
      dataIndex: 'parameters', 
    },
    {
      title: 'Kết quả',
      dataIndex: 'returnValue',
      key: 'returnValue', ellipsis: true, width: 150
    },
    {
      title: 'Thời gian',
      dataIndex: 'executionTime',
      key: 'executionTime',
      ellipsis: true
    },
    {
      title: 'Thời gian thực thi',
      dataIndex: 'executionDuration',
      key: 'executionDuration',
      ellipsis: true
    },
    {
      title: 'IP',
      dataIndex: 'clientIpAddress',
      key: 'clientIpAddress',
      ellipsis: true
    },
    {
      title: 'Tên máy chủ',
      dataIndex: 'clientName',
      key: 'clientName',
      ellipsis: true
    },
    {
      title: 'BrowserInfo',
      dataIndex: 'browserInfo',
      key: 'browserInfo',
      ellipsis: true
    },
    {
      title: 'Lỗi',
      dataIndex: 'exceptionMessage',
      key: 'exceptionMessage',
      ellipsis: true,

    },
    {
      title: 'Trạng thái',
      dataIndex: 'exception',
      key: 'exception',
      ellipsis: true,
      minWidth: 100
    },
    {
      title: 'Dữ liệu tùy chỉnh',
      dataIndex: 'customData',
      key: 'customData',
      ellipsis: true,
      width: 200
    }
  ]


  const [columnChecks, setColumnChecks] = useState<AntDesign.TableColumnCheck[]>([
    {
      key: 'id',
      checked: true,
      title: 'ID'
    },
    {
      key: 'serviceName',
      checked: true,
      title: 'Tên dịch vụ'
    },
    {
      key: 'methodName',
      checked: true,  
      title: 'Tên phương thức'
    },
    {
      key: 'parameters',
      checked: true,
      title: 'Tham số'  
    },
    {
      key: 'returnValue',
      checked: false,
      title: 'Kết quả'
    },  
    {
      key: 'executionTime',
      checked: true,
      title: 'Thời gian'
    },
    {
      key: 'executionDuration',
      checked: true,
      title: 'Thời gian thực thi'
    },
    {
      key: 'clientIpAddress', 
      checked: true,
      title: 'IP'
    },
    {
      key: 'clientName',
      checked: false,
      title: 'Tên máy chủ'
    },
    {
      key: 'browserInfo',
      checked: false,
      title: 'BrowserInfo'
    },
    {
      key: 'exceptionMessage',
      checked: true,
      title: 'Lỗi'
    },
    {
      key: 'exception',
      checked: true,
      title: 'Trạng thái'
    },
    {
      key: 'customData',
      checked: false,
      title: 'Dữ liệu tùy chỉnh'
    }
  ]);
  const handleSetColumnChecks = (checks: AntDesign.TableColumnCheck[]) => {
    setColumnChecks(checks);
  };
  const filteredColumns = columns.filter(col => 
    columnChecks.find(check => check.key === col.key)?.checked  
  );
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
        setPagination((prev) => ({
          ...prev,
          total: resData.result.totalCount || 0,
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
  }

  const handleTableChange = (
    pagination: { current?: number; pageSize?: number; total?: number },
    filters: any,
    sorter: any,
    extra: any
  ) => {
    const current = pagination.current || 1;
    const pageSize = pagination.pageSize || 10;
    setPagination((prev) => ({
      ...prev,
      current,
      pageSize,
    }));
    fetchData({
      MaxResultCount: pageSize,
      SkipCount: (current - 1) * pageSize,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="h-full min-h-500px flex-col-stretch gap-16px overflow-y-auto lt-sm:overflow-auto">
      <ACollapse
        bordered={false}
        className="card-wrapper"
        defaultActiveKey={isMobile ? undefined : '1'}
        items={[
          {
            children: (
              <div>
                <AForm>
                  <ASpace>
                    <AForm.Item label="Tên đăng nhập" name="userNameOrEmailAddress">
                      <AInput />
                    </AForm.Item>
                    <AForm.Item label="Thời gian" name="creationTime">
                      <ADatePicker.RangePicker />
                    </AForm.Item>
                    <AForm.Item >
                      <AButton
                        ghost
                        icon={<IconUilSearch />}
                        type="primary"
                        onClick={() => { }}
                      >
                        {t('common.search')}
                      </AButton>
                    </AForm.Item>
                  </ASpace>

                </AForm>
              </div>
            ),
            key: '1',
            label: t('common.search')
          }
        ]}

      />
      <ACard className="flex-col-stretch sm:flex-1-hidden card-wrapper" title="Danh sách lịch sử đăng nhập"
        extra={
          <TableHeaderOperation
            add={() => { }}
            columns={columnChecks as any}
            disabledDelete={true}
            isShowAdd={false}
            isShowDelete={false}
            loading={loading}
            refresh={() => fetchData()}
            setColumnChecks={handleSetColumnChecks}
            onDelete={() => { }}
            isShowColumnChecks={true}
          />
        }
        ref={tableWrapperRef}>
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
            total: pagination.total,
            pageSizeOptions: ['10', '20', '50', '100'],
            showQuickJumper: true,
            showSizeChanger: true,
            showTotal: (total: number, range: number[]) => `${range[0]}-${range[1]} of ${total} items`
          }}
          onChange={handleTableChange}
        />
      </ACard>
    </div>
  )
};



export default LichSuHoatDong;