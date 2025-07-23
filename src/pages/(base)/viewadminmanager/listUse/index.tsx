import { DatePicker } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { TableHeaderOperation, useTableScroll } from '@/features/table';
import { useMobile } from '@/hooks/common/mobile';
import { GetAllUserWithTenant } from '@/service/api';
import type { StatisticalUse } from '@/types/statistical';
import { formatDate } from '@/utils/date';

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

const ListUse = () => {
  const { t } = useTranslation();
  const { scrollConfig, tableWrapperRef } = useTableScroll();
  // const nav = useNavigate();
  const [datas, setDatas] = useState<StatisticalUse[]>([]);
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

      const res = await GetAllUserWithTenant(apiParams);

      const resData = res.data as any;

      if (resData && resData.result && resData.result.items && Array.isArray(resData.result.items)) {
        const data = resData.result as { items: Api.SystemManage.UserWithTenant[]; totalCount: number };
        setDatas(data.items);
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
    fetchData();
  };

  const search = () => {
    const values = form.getFieldsValue();
    setSearchParams(values);
    fetchData(values);
  };

  // Initial data fetch
  useEffect(() => {
    fetchData();
  }, []);

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
      dataIndex: 'userName',
      key: 'userName',
      minWidth: 100,
      title: t('page.manage.user.userName')
    },
    {
      align: 'center' as const,
      key: 'tenGoiSuDung',
      render: (_: any, record: StatisticalUse) => (record.tenGoiSuDung?.length > 0 ? record.tenGoiSuDung : '-'),
      title: 'Gói sử dụng'
    },
    {
      align: 'center' as const,
      key: 'ngayKeThuc',
      render: (_: any, record: StatisticalUse) => (record.ngayKeThuc ? formatDate(record.ngayKeThuc) : '-'),
      title: 'Ngày kết thúc'
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
        title={t('page.manage.user.title')}
        variant="borderless"
        extra={
          <TableHeaderOperation
            columns={columns}
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

export default ListUse;
