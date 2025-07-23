import { useLang } from '@/features/lang';
import { GetThongTinTongQuat } from '@/service/api';

const PieChart = () => {
  const { t } = useTranslation();

  const { locale } = useLang();

  const { domRef, updateOptions } = useEcharts(() => ({
    legend: {
      bottom: '0%',
      icon: 'circle',
      itemHeight: 10,
      itemWidth: 10,
      left: 'center',
      textStyle: {
        color: '#6b7280',
        fontSize: 12
      }
    },
    series: [
      {
        center: ['50%', '45%'],
        color: ['#4eb1e4', '#0c90d3'],
        data: [
          { name: t('page.home.freeCount'), value: 0 },
          { name: t('page.home.paidCount'), value: 0 }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(0, 0, 0, 0.1)',
            shadowOffsetX: 0
          },
          label: {
            color: '#3e3e3e',
            fontSize: 16,
            fontWeight: 'normal',
            formatter: '{b}\n{d}%',
            show: true
          },
          scale: true,
          scaleSize: 10
        },
        itemStyle: {
          borderColor: '#ffffff',
          borderRadius: 8,
          borderWidth: 2
        },
        label: {
          position: 'center',
          show: false
        },
        labelLine: {
          show: false
        },
        name: 'Tài khoản',
        radius: ['55%', '75%'],
        type: 'pie'
      }
    ],
    // title: {
    //   left: 'center',
    //   text: 'Biểu đồ tài khoản',
    //   textStyle: {
    //     color: '#111827',
    //     fontSize: 12,
    //     fontWeight: 'normal'
    //   },
    //   top: '0%'
    // },
    tooltip: {
      backgroundColor: '#ffffff',
      borderColor: '#e5e7eb',
      borderWidth: 1,
      formatter: '{b}: {c} ({d}%)',
      textStyle: {
        color: '#111827',
        fontSize: 12
      },
      trigger: 'item'
    }
  }));

  async function fetchChartData() {
    try {
      const response = await GetThongTinTongQuat(); // thay URL bằng API thật
      const data = response.data.result;

      updateOptions(opts => {
        opts.series[0].data = [
          { name: t('page.home.freeCount'), value: data.soLuongMienPhi },
          { name: t('page.home.paidCount'), value: data.soLuongTraPhi }
        ];
        return opts;
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Lỗi khi gọi API dữ liệu biểu đồ:', error);
    }
  }

  function updateLocale() {
    updateOptions((opts, factory) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const originOpts = factory();

      // Giữ nguyên dữ liệu, chỉ cập nhật tên theo ngôn ngữ
      opts.series[0].data = opts.series[0].data.map(item => {
        if (item.name.includes('free')) {
          return { ...item, name: t('page.home.freeCount') };
        }
        if (item.name.includes('paid')) {
          return { ...item, name: t('page.home.paidCount') };
        }
        return item;
      });

      return opts;
    });
  }

  useMount(() => {
    fetchChartData();
  });

  useUpdateEffect(() => {
    updateLocale();
  }, [locale]);

  return (
    <ACard
      className="card-wrapper"
      variant="borderless"
    >
      <h5 className="text-center">Biểu đồ tài khoản</h5>
      <div
        className="h-360px overflow-hidden"
        ref={domRef}
      />
    </ACard>
  );
};

export default PieChart;
