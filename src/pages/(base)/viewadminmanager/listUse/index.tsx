import { Suspense, lazy, useEffect } from 'react';
import { ATG_MAP, TRANG_THAI_COLOR_MAP, TRANG_THAI_MAP } from "@/constants/common";
import { TableHeaderOperation, useTable, useTableOperate, useTableScroll } from "@/features/table";
import { fetchGetUserList, GetAllUserWithTenant } from "@/service/api";
import { DatePicker } from 'antd';
import { StatisticalUse } from '@/types/statistical';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Form, Row, Col, Input, Button, Flex, Collapse, Card, Table, Popconfirm } from 'antd';
import IconMdiRefresh from '@/components/SvgIcon';
import IconUilSearch from '@/components/SvgIcon';
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
            <Input placeholder={t('page.manage.user.form.userPhone')} />
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
            <AButton onClick={reset} icon={<IconIcRoundRefresh />}>
              {t('common.reset')}
            </AButton>
            {/* <Button
              ghost
              type="primary"
              onClick={search}
              icon={<IconIcRoundSearch />}
            >
              {t('common.search')}
            </Button> */}
          </AFlex>
        </ACol>
      </ARow>
    </AForm>
  );
};

const UserOperateDrawer = lazy(() => import('@/pages/(base)/manage/user/modules/UserOperateDrawer'));

const tagUserGenderMap: Record<Api.SystemManage.UserGender, string> = {
  1: 'processing',
  2: 'error'
};

const ListUse = () => {
  const { t } = useTranslation();
  const { scrollConfig, tableWrapperRef } = useTableScroll();
  const nav = useNavigate();
  const [datas, setDatas] = useState<StatisticalUse[]>([]);
  const isMobile = useMobile();
  // Thêm state cho form
  const [form] = Form.useForm();
  const [searchParams, setSearchParams] = useState({});
  
  // Thêm state cho tuỳ biến cột
  const [columnChecks, setColumnChecks] = useState<AntDesign.TableColumnCheck[]>([
    { checked: true, key: 'index', title: t('common.index') },
    { checked: true, key: 'userName', title: t('page.manage.user.userName') },
    { checked: true, key: 'tenGoiSuDung', title: 'Gói sử dụng' },
    { checked: true, key: 'ngayKeThuc', title: 'Ngày kết thúc' },
    { checked: true, key: 'operate', title: t('common.operate') }
  ]);
  
  const reset = () => {
    form.resetFields();
    setSearchParams({});
  };
  const search = () => {
    setSearchParams(form.getFieldsValue());
    // Gọi fetchData nếu cần
  };
  
  // Sửa hàm fetchData đóng ngoặc đúng
  const fetchData = async () => {
    try {
      const res = await GetAllUserWithTenant({
        Sorting: null,
        SkipCount: 0,
        MaxResultCount: '10'
      });
      console.log("res",res);
      const resData = res.data as any;
      // Bây giờ res đã là response.data trực tiếp từ transformBackendResponse
      if (resData && resData.result && resData.result.items && Array.isArray(resData.result.items)) {
        const data = resData.result as { items: Api.SystemManage.UserWithTenant[]; totalCount: number };
        setDatas(data.items);
      } else {
        // Fallback data nếu API chưa trả về đúng format
        console.warn('API response format không đúng, sử dụng fallback data');
       
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  
  // Sửa columns đúng kiểu
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
        <div className="flex-center gap-8px p-4px">
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
        </div>
      ),
      title: t('common.operate'),
      width: 220
    }
  ];
  
  // Lọc columns dựa trên columnChecks
  const filteredColumns = columns.filter(col => 
    columnChecks.find(check => check.key === col.key)?.checked
  );
  
  // Hàm xử lý thay đổi column checks
  const handleSetColumnChecks = (checks: AntDesign.TableColumnCheck[]) => {
    console.log("checks",checks);
    setColumnChecks(checks);
  };
  
  const handleDelete = (id: number) => {
    // request
    console.log(id);
  };
  const edit = (id: number) => {
    console.log(id);
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
            columns={columns}
            disabledDelete={false}
            loading={false}
            refresh={fetchData}
            setColumnChecks={handleSetColumnChecks}
            onDelete={() => {}}
            add={() => {}}
          />
        }
      >
        <ATable
          scroll={scrollConfig}
          size="small"
          dataSource={datas}
          columns={filteredColumns}
          bordered
        />
        {/* <Suspense>
          <UserOperateDrawer {...generalPopupOperation} />
        </Suspense> */}
      </ACard>
    </div>
  );
};

export default ListUse;