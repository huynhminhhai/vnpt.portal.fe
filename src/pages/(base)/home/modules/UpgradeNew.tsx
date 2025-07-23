import { Icon } from '@iconify/react';
import { List, Spin } from 'antd';

import { GetNewDangKySuDung } from '@/service/api';
import { formatDate, getHourFromDate } from '@/utils/date';
import { formatCurrencyVN } from '@/utils/number';

const UpgradeNew = () => {
  const [dataList, setDataList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await GetNewDangKySuDung(10);

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
      <h5 className="mb-3">Danh sách nâng cấp gói mới</h5>
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
                    {getHourFromDate(item.thoiGianTao)} {formatDate(item.thoiGianTao)}
                  </span>
                </div>

                {/* Phone */}
                {item.dienThoai && (
                  <div className="flex items-center text-primary space-x-1">
                    <Icon
                      className="h-4 w-4"
                      icon="solar:phone-broken"
                    />
                    <span>{item.dienThoai}</span>
                  </div>
                )}

                {/* Package info */}
                {item.tenGoi && (
                  <div className="flex items-center space-x-1">
                    <Icon
                      className="h-4 w-4"
                      icon="solar:box-broken"
                    />
                    <span>{item.tenGoi}</span>
                    <span className="text-gray-600">•</span>
                    <span className="font-medium">{formatCurrencyVN(item.giaTien)} đ</span>
                  </div>
                )}

                {/* Status indicator */}
                <div className="flex items-center space-x-1">
                  {item.trangThai ? (
                    <>
                      <Icon
                        className="h-4 w-4 text-green-600"
                        icon="solar:check-circle-broken"
                      />
                      <span className="text-green-600 font-medium">ACTIVE</span>
                    </>
                  ) : (
                    <>
                      <Icon
                        className="h-4 w-4 text-red-600"
                        icon="solar:close-circle-broken"
                      />
                      <span className="text-red-600 font-medium">INACTIVE</span>
                    </>
                  )}
                </div>
              </div>

              {/* Additional info line */}
              <div className="mt-3 text-xs text-gray-600">
                🏢 Tenant: {item.tenantId}
                {item.id && ` • 📦 ID: ${item.id}`}
              </div>
            </div>
          )}
        />
        <div className="mt-4 border-t pt-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2">
                <Icon
                  className="h-5 w-5 text-green-600"
                  icon="solar:check-circle-broken"
                />
                <span>Active: {dataList.filter(u => u.trangThai).length}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon
                  className="h-5 w-5 text-red-600"
                  icon="solar:close-circle-broken"
                />
                <span>Inactive: {dataList.filter(u => !u.trangThai).length}</span>
              </div>
            </div>
            <div>Cập nhật mới nhất: {new Date().toLocaleString('vi-VN')}</div>
          </div>
        </div>
      </Spin>
    </ACard>
  );
};

export default UpgradeNew;
