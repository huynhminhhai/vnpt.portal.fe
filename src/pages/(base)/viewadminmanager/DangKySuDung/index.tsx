import { TableHeaderOperation } from "@/features/table";
import { StatisticalUse } from "@/types/statistical";
import { Table } from "antd";
const DanhSachDangKySuDung = () => {
  const [datas, setDatas] = useState<StatisticalUse[]>([]);
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const isMobile = useMobile();
  const [form] = AForm.useForm();
  const columns = [
    {
      title: 'STT',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Tên',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Ngày đăng ký',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Trạng thái',
    },
    {
      title: 'Hành động',
    }
  ]

  const [columnChecks, setColumnChecks] = useState<AntDesign.TableColumnCheck[]>([
    { checked: true, key: 'index', title: t('common.index') },
    { checked: true, key: 'userName', title: t('page.manage.user.userName') },
    { checked: true, key: 'tenGoiSuDung', title: 'Gói sử dụng' },
    { checked: true, key: 'ngayKeThuc', title: 'Ngày kết thúc' },
    { checked: true, key: 'operate', title: t('common.operate') }
  ]);
  // Column visibility handler
  const handleSetColumnChecks = (checks: AntDesign.TableColumnCheck[]) => {
    console.log("checks", checks);
    setColumnChecks(checks);
  };

  const [searchParams, setSearchParams] = useState<any>({});

  const UserSearch: FC<Page.SearchProps> = ({ form, reset, search, searchParams }) => {
    return <AForm
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
          name="userPhone"
        >
         <ASegmented options={[{label: 'Tất cả', value: ''}, {label: 'Đã thanh toán', value: '1'}, {label: 'Chưa thanh toán', value: '2'}]} />
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
  }
  const reset = () => {
    setSearchParams({});
  }
  const search = () => {
    setSearchParams(searchParams);
  }
  return <div className="h-full min-h-500px flex-col-stretch gap-8px overflow-hidden lt-sm:overflow-auto">
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
    <ACard title={'Danh sách đăng ký nâng cấp tài khoản'} extra={
      <TableHeaderOperation
        columns={columnChecks}
        disabledDelete={true}
        loading={loading}
        refresh={() => { }}
        setColumnChecks={handleSetColumnChecks}
        onDelete={() => { }}
        add={() => { }}
        isShowAdd={false}
        isShowDelete={false}
      />
    }>
      <Table columns={columns} dataSource={[]}></Table>

    </ACard>;
  </div>
};


export default DanhSachDangKySuDung;
