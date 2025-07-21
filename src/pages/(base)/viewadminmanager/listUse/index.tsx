import { Suspense, lazy, useEffect } from 'react';
import { ATG_MAP, TRANG_THAI_COLOR_MAP, TRANG_THAI_MAP } from "@/constants/common";
import { TableHeaderOperation, useTableScroll } from "@/features/table";
import { GetAllUserWithTenant } from "@/service/api";
import { Button, DatePicker } from 'antd';
import { StatisticalUse } from '@/types/statistical';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useMobile } from '@/hooks/common/mobile';

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
        gutter={[8, 0]}
        wrap
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
            label={'Ngày tạo'}
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
            <AButton onClick={reset} icon={<IconMdiRefresh />}>
              {t('common.reset')}
            </AButton>
            <AButton
              ghost
              type="primary"
              onClick={search}
              icon={<IconUilSearch />}
            >
              {t('common.search')}
            </AButton>
          </AFlex>
        </ACol>
      </ARow>
    </AForm>
  );
};

const UserOperateDrawer = lazy(() => import('@/pages/(base)/manage/user/modules/UserOperateDrawer'));

const ListUse = () => {
  const { t } = useTranslation();
  const { scrollConfig, tableWrapperRef } = useTableScroll();
  const nav = useNavigate();
  const [datas, setDatas] = useState<StatisticalUse[]>([]);
  const [loading, setLoading] = useState(false);
  const isMobile = useMobile();
  
  // Form state
  const [form] = AForm.useForm();
  const [searchParams, setSearchParams] = useState({});
  
  // Column visibility state
  const [columnChecks, setColumnChecks] = useState<AntDesign.TableColumnCheck[]>([
    { checked: true, key: 'index', title: t('common.index') },
    { checked: true, key: 'userName', title: t('page.manage.user.userName') },
    { checked: true, key: 'tenGoiSuDung', title: 'Gói sử dụng' },
    { checked: true, key: 'ngayKeThuc', title: 'Ngày kết thúc' },
    { checked: true, key: 'operate', title: t('common.operate') }
  ]);
  
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
  
  // Fetch data function
  const fetchData = async (params = {}) => {
    setLoading(true);
    try {
      const apiParams = {
        Sorting: null,
        SkipCount: 0,
        MaxResultCount: '10',
        ...params
      };
      
      const res = await GetAllUserWithTenant(apiParams);
      console.log("res", res);
      
      const resData = res.data as any;
      
      if (resData && resData.result && resData.result.items && Array.isArray(resData.result.items)) {
        const data = resData.result as { items: Api.SystemManage.UserWithTenant[]; totalCount: number };
        setDatas(data.items);
      } else {
        console.warn('API response format không đúng, sử dụng fallback data');
        setDatas([]); // Set empty array if no data
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      setDatas([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
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
      title: t('common.index'),
      width: 64,
      render: (_: any, __: any, idx: number) => idx + 1
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
      title: 'Gói sử dụng',
      render: (_: any, record: StatisticalUse) => record.tenGoiSuDung?.length > 0 ? record.tenGoiSuDung : '-'
    },
    {
      align: 'center' as const,
      key: 'ngayKeThuc',
      title: 'Ngày kết thúc',
      render: (_: any, record: StatisticalUse) => record.ngayKeThuc || '-'
    },
    {
      align: 'center' as const,
      key: 'operate',
      render: (_: any, record: StatisticalUse) => (
        <div className="flex-center gap-8px">
          <AButton
            ghost
            size="small"
            type="primary"
            onClick={() => edit(record.id)}
          >
            {t('common.edit')}
          </AButton>
          <AButton
            size="small"
            onClick={() => nav(`/manage/user/${record.id}`)}
          >
            {t('common.detail')}
          </AButton>
          <APopconfirm
            title={t('common.confirmDelete')}
            onConfirm={() => handleDelete(record.id)}
          >
            <AButton
              danger
              size="small"
            >
              {t('common.delete')}
            </AButton>
          </APopconfirm>
        </div>
      ),
      title: t('common.operate'),
      width: 260
    }
  ];
  
  // Filter columns based on visibility
  const filteredColumns = columns.filter(col => 
    columnChecks.find(check => check.key === col.key)?.checked
  );
  
  // Column visibility handler
  const handleSetColumnChecks = (checks: AntDesign.TableColumnCheck[]) => {
    console.log("checks", checks);
    setColumnChecks(checks);
  };
  
  // Action handlers
  const handleDelete = async (id: number) => {
    try {
      // TODO: Implement delete API call
      console.log('Deleting:', id);
      // await deleteUser(id);
      fetchData(); // Refresh data after delete
    } catch (error) {
      console.error('Error deleting:', error);
    }
  };
  
  const edit = (id: number) => {
    console.log('Editing:', id);
    // TODO: Implement edit functionality
    // nav(`/manage/user/edit/${id}`);
  };
  
  const handleAdd = () => {
    console.log('Adding new user');
    // TODO: Implement add functionality
    // nav('/manage/user/add');
  };
  
  return (
    <div className="h-full min-h-500px flex-col-stretch gap-16px overflow-hidden lt-sm:overflow-auto">
      <ACollapse
        bordered={false}
        className="card-wrapper"
        defaultActiveKey={isMobile ? undefined : '1'}
        items={[
          {
            children: <UserSearch form={form} reset={reset} search={search} searchParams={searchParams} />,
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
            columns={columnChecks}
            disabledDelete={true}
            loading={loading}
            refresh={() => fetchData()}
            setColumnChecks={handleSetColumnChecks}
            onDelete={() => {}}
            add={handleAdd}
            isShowAdd={false}
            isShowDelete={false}
          />
        }
      >
        <ATable
          scroll={scrollConfig}
          size="small"
          dataSource={datas}
          columns={filteredColumns}
          bordered
          loading={loading}
          rowKey="id"
          pagination={{
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total: number, range: number[]) => 
              `${range[0]}-${range[1]} of ${total} items`,
            defaultPageSize: 10,
            pageSizeOptions: ['10', '20', '50', '100']
          }}
        />
      </ACard>
    </div>
  );
};

export default ListUse;