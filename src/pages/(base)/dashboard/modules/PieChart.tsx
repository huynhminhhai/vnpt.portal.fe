import { useLang } from '@/features/lang';
import { GetGroupSystemCharts } from '@/service/api/dashboard';

const PieChart = () => {
  const { t } = useTranslation();

  const { locale } = useLang();

  const { domRef, updateOptions } = useEcharts(() => ({
    legend: {
      bottom: '0%',
      itemStyle: {
        borderWidth: 0
      },
      left: 'center'
    },
    series: [
      {
        avoidLabelOverlap: false,
        color: ['#0071fe', '#05d5c7', '#9384ff', '#389fea'],
        data: [] as { name: string; value: number }[],
        emphasis: {
          label: {
            show: true,
            fontSize: 16,
            fontWeight: 'normal',
            color: '#4b5563',
            formatter: (params: any) => {
              return `${params.name}\n \n${params.value}`;
            }
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderRadius: 5,
          borderWidth: 5
        },
        label: {
          position: 'center',
          show: false
        },
        labelLine: {
          show: false
        },
        name: 'Nhóm dịch vụ',
        radius: ['55%', '75%'],
        type: 'pie'
      }
    ],
    tooltip: {
      trigger: 'item'
    }
  }));

  async function mockData() {

    try {

      const res = await GetGroupSystemCharts();
      const data = res?.data?.result;

      if (!data) return;

      const chartData = data.map((item: any) => ({
        name: item.displayName,
        value: item.totalSystemWeb
      }));

      updateOptions((opts) => {
        opts.series[0].data = chartData;
        return opts;
      });

    } catch (error) {
      console.error(error);
    }
  }

  function updateLocale() {
    updateOptions((opts, factory) => {
      const originOpts = factory();

      opts.series[0].name = originOpts.series[0].name;

      opts.series[0].data = [
        { name: t('page.home.study'), value: 20 },
        { name: t('page.home.entertainment'), value: 10 },
        { name: t('page.home.work'), value: 40 },
        { name: t('page.home.rest'), value: 30 }
      ];

      return opts;
    });
  }

  async function init() {
    mockData();
  }

  useMount(() => {
    init();
  });

  useUpdateEffect(() => {
    updateLocale();
  }, [locale]);
  return (
    <ACard
      className="card-wrapper"
      variant="borderless"
    >
      <h5 className="mb-3 text-center">Lượt truy cập dịch vụ</h5>
      <div
        className="h-390px overflow-hidden"
        ref={domRef}
      />
    </ACard>
  );
};

export default PieChart;
