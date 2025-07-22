import { useLang } from '@/features/lang';

const PieChart = () => {
  const { t } = useTranslation();

  const { locale } = useLang();

  const { domRef, updateOptions } = useEcharts(() => ({
    legend: {
      bottom: '1%',
      itemStyle: {
        borderWidth: 0
      },
      left: 'center'
    },
    series: [
      {
        avoidLabelOverlap: false,
        color: ['#1976D2', '#0D47A1'],
        data: [] as { name: string; value: number }[],
        emphasis: {
          label: {
            fontSize: '12',
            show: true
          }
        },
        itemStyle: {
          borderColor: '#fff',
          borderWidth: 1
        },
        label: {
          position: 'center',
          show: false
        },
        labelLine: {
          show: false
        },
        name: 'Tài khoản',
        radius: ['45%', '75%'],
        type: 'pie'
      }
    ],
    tooltip: {
      trigger: 'item'
    }
  }));

  async function mockData() {
    await new Promise(resolve => {
      setTimeout(resolve, 1000);
    });

    updateOptions(opts => {
      opts.series[0].data = [
        { name: t('page.home.freeCount'), value: 40 },
        { name: t('page.home.paidCount'), value: 30 }
      ];

      return opts;
    });
  }

  function updateLocale() {
    updateOptions((opts, factory) => {
      const originOpts = factory();

      opts.series[0].name = originOpts.series[0].name;

      opts.series[0].data = [
        { name: t('page.home.freeCount'), value: 40 },
        { name: t('page.home.paidCount'), value: 30 }
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
      <div
        className="h-360px overflow-hidden"
        ref={domRef}
      />
    </ACard>
  );
};

export default PieChart;
