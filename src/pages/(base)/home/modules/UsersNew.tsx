import { Icon } from '@iconify/react';
import { List, Spin } from 'antd';

import { GetNewUserSuDung } from '@/service/api';
import { formatDate, getHourFromDate } from '@/utils/date';

const UsersNew = () => {
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await GetNewUserSuDung(10);

        const data = res?.data?.result;

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

    fetchData();
  }, []);

  return (
    <ACard
      className="card-wrapper"
      size="small"
    >
      <h5 className="mb-3">Danh sách người dùng mới</h5>
      <Spin spinning={loading}>
        <List
          dataSource={dataList}
          itemLayout="horizontal"
          locale={{ emptyText: 'Không có dữ liệu' }}
          renderItem={(item: any) => (
            <div
              className="mb-3 border rounded-lg p-4 transition-colors duration-200 hover:bg-blue-50"
              key={item.id}
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-600">
                {/* Timestamp */}
                <div className="flex items-center space-x-2">
                  <Icon
                    className="h-4 w-4"
                    icon="solar:calendar-minimalistic-broken"
                  />
                  <span className="font-medium">
                    {getHourFromDate(item.ngayBatDau)} {formatDate(item.ngayBatDau)}
                  </span>
                </div>

                {/* Phone */}
                {item.userName && (
                  <div className="flex items-center text-primary space-x-1">
                    <Icon
                      className="h-4 w-4"
                      icon="solar:phone-broken"
                    />
                    <span>{item.userName}</span>
                  </div>
                )}
              </div>

              {/* Additional info line */}
              <div className="mt-3 text-xs text-gray-600">
                🏢 Tenant: {item.tenantId}
                {item.id && ` • 📦 ID: ${item.id}`}
              </div>
            </div>
          )}
        />
      </Spin>
    </ACard>
  );
};

export default UsersNew;
