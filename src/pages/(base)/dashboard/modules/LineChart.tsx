import { Select } from 'antd';
import { type JSX } from 'react';

import { useLang } from '@/features/lang';
import { GetXuHuong } from '@/service/api';

const LineChart = () => {
  const { locale } = useLang();

  const [year, setYear] = useState(new Date().getFullYear());

  const { domRef, updateOptions } = useEcharts(() => ({
    grid: {
      bottom: '3%',
      containLabel: true,
      left: '3%',
      right: '4%'
    },
    legend: {
      data: ['Lượt cân']
    },
    series: [
      {
        areaStyle: {
          color: {
            colorStops: [
              {
                color: '#0798d7',
                offset: 0.25
              },
              {
                color: '#fff',
                offset: 1
              }
            ],
            type: 'linear',
            x: 0,
            x2: 0,
            y: 0,
            y2: 1
          }
        },
        color: '#0798d7',
        data: [] as number[],
        emphasis: {
          focus: 'series'
        },
        name: '',
        smooth: true,
        stack: 'Total',
        type: 'line'
      }
    ],
    tooltip: {
      axisPointer: {
        label: {
          backgroundColor: '#6a7985'
        },
        type: 'cross'
      },
      trigger: 'axis'
    },
    xAxis: {
      boundaryGap: false,
      data: [] as string[],
      type: 'category'
    },
    yAxis: {
      type: 'value'
    }
  }));

  async function fetchXuHuongData(nam: number) {
    try {
      // const response = await GetXuHuong(nam);
      const response = null;
      const result = (response as any)?.data?.result;

      // Chuyển đổi dữ liệu
      const months = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`);
      const data = months.map((_, i) => result[`thang${i + 1}`] || 0);

      // Cập nhật biểu đồ
      updateOptions(opts => {
        opts.xAxis.data = months;
        opts.series[0].data = data;
        return opts;
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Lỗi khi lấy dữ liệu xu hướng:', error);
    }
  }

  function updateLocale() {
    updateOptions((opts, factory) => {
      const originOpts = factory();
      opts.legend.data = originOpts.legend.data;
      opts.series[0].name = originOpts.series[0].name;

      return opts;
    });
  }

  useEffect(() => {
    fetchXuHuongData(year);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [year]);

  useUpdateEffect(() => {
    updateLocale();
  }, [locale, year]);

  const generateYearOptions = (): { label: JSX.Element; value: string }[] => {
    const currentYear = new Date().getFullYear();
    const years: { label: JSX.Element; value: string }[] = [];

    // eslint-disable-next-line no-plusplus
    for (let y = 2023; y <= currentYear; y++) {
      years.push({
        label: <span>{y}</span>,
        value: String(y)
      });
    }

    return years.reverse(); // Nếu muốn năm hiện tại hiển thị đầu tiên
  };

  return (
    <ACard
      className="card-wrapper"
      variant="borderless"
    >
      <h5 className="text-center">Biểu đồ line</h5>
      <Select
        className="absolute right-[10px] top-[10px] w-[150px]"
        options={generateYearOptions()}
        value={String(year)}
        onChange={value => {
          setYear(Number(value));
        }}
      />
      <div
        className="h-360px overflow-hidden"
        ref={domRef}
      />
    </ACard>
  );
};

export default LineChart;
