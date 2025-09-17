import { Icon } from '@iconify/react';
import { InputNumber, List, Spin } from 'antd';
import { formatDate, getHourFromDate } from '@/utils/date';
import { GetAllLoginLog } from '@/service/api/dashboard';

const LoginLog = () => {

  const defaultParams = {
    SkipCount: 0,
    MaxResultCount: 20,
  }

  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useState(defaultParams);

  const fetchData = async (params: any) => {
    setLoading(true);
    try {
      const res = await GetAllLoginLog(params);

      const data = res?.data?.result?.items;

      if (data) {
        setDataList(data);
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Lỗi gọi API:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(searchParams);
  }, [searchParams]);

  return (
    <ACard
      className="card-wrapper"
      size="small"
    >
      <div className='flex items-center justify-between mb-3'>
        <h5>Lịch sử đăng nhập</h5>
        <InputNumber type='number' min={1} defaultValue={20} onChange={(value) => setSearchParams({ ...searchParams, MaxResultCount: Number(value) })} />
      </div>
      <Spin spinning={loading}>
        <div className="h-[450px] overflow-y-auto">
          <List
            dataSource={dataList}
            itemLayout="horizontal"
            locale={{ emptyText: 'Không có dữ liệu' }}
            renderItem={(item: any) => (
              <div
                className="mb-2 border rounded-lg p-4 transition-colors duration-200 hover:bg-blue-50"
                key={item.id}
              >
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-primary">
                  {/* Timestamp */}
                  <div className="flex items-center space-x-2">
                    <Icon
                      className="h-4 w-4"
                      icon="solar:clock-circle-linear"
                    />
                    <span className="font-medium">
                      {getHourFromDate(item.creationTime)} {formatDate(item.creationTime)}
                    </span>
                  </div>

                  {item.userNameOrEmailAddress && (
                    <div className="flex items-center text-primary space-x-1">
                      <Icon
                        className="h-4 w-4"
                        icon="solar:user-rounded-linear"
                      />
                      <span>{item.userNameOrEmailAddress}</span>
                    </div>
                  )}

                  {item.userId && (
                    <div className="flex items-center text-primary space-x-1">
                      <Icon
                        className="h-4 w-4"
                        icon="solar:hashtag-linear"
                      />
                      <span>{item.userId}</span>
                    </div>
                  )}
                </div>

                {/* Additional info line */}
                <div className="mt-1 text-xs text-gray-600">
                  {item.browserInfo}
                </div>
              </div>
            )}
          />
        </div>
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-6">
            </div>
            <div className="text-xs">Cập nhật mới nhất: {new Date().toLocaleString('vi-VN')}</div>
          </div>
        </div>
      </Spin>
    </ACard>
  );
};

export default LoginLog;
