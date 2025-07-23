import { TableHeaderOperation, useTableScroll } from "@/features/table";
import { GetAllLoginLog } from "@/service/api/system";
import { title } from "node:process";
type Pagination = {
    current: number;
    pageSize: number;
    total: number;
}
const LichSuDangNhap = () => {
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
            title: '#',
            key: 'index',
            width: 60,
            ellipsis: true,
            align: 'center',
            render: (_: any, __: any, index: number) => {
                const { current, pageSize } = pagination;
                return (current - 1) * pageSize + index + 1;
            }
        },
        {
            title: 'Tên đăng nhập',
            dataIndex: 'userNameOrEmailAddress',
            key: 'userNameOrEmailAddress', ellipsis: true, width: 200
        },
        {
            title: 'Email',
            dataIndex: 'userNameOrEmailAddress',
            key: 'email', ellipsis: true
        },
        {
            title: 'Thời gian',
            dataIndex: 'creationTime', ellipsis: true,
            render: (text: Date) => {
                // Assuming text is a valid date string or timestamp
                const date = new Date(text);
                return new Intl.DateTimeFormat('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                }).format(date);
            }
            , width: 200,
            align: 'center'
        },
        {
            title: 'IP',
            dataIndex: 'clientIpAddress',
            key: 'clientIpAddress', ellipsis: true, width: 150
        },
        {
            title: 'BrowserInfo',
            dataIndex: 'browserInfo',
            key: 'browserInfo',
            ellipsis: true
        }
    ]

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
                        columns={columns as any}
                        disabledDelete={true}
                        isShowAdd={true}
                        isShowDelete={false}
                        loading={loading}
                        refresh={() => fetchData()}
                        setColumnChecks={() => { }}
                        onDelete={() => { }}
                    />
                }
                ref={tableWrapperRef}>
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



export default LichSuDangNhap;