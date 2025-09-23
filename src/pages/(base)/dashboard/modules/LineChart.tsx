import { useLang } from '@/features/lang';
import { GetAllSystemWeb } from '@/service/api';
import { GetSystemTrafficChartData } from '@/service/api/dashboard';
import { DatePicker, Select } from 'antd';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

const LineChart = () => {
  const { t } = useTranslation();

  const { locale } = useLang();

  const defaultParams = {
    GroupBy: 1,
    StartDate: dayjs().subtract(30, "day").format("YYYY-MM-DD"),
    EndDate: dayjs().format("YYYY-MM-DD"),
    SystemIds: [] as number[]
  };

  const generateUniqueBlueColors = (numColors: number): string[] => {
    const colors: string[] = [];
    const baseHue = 210; // xanh lam
    const saturation = 80; // độ bão hòa cao để màu rõ nét
    const startLightness = 30; // bắt đầu từ màu đậm
    const endLightness = 80;   // đến màu nhạt

    const step = (endLightness - startLightness) / Math.max(numColors - 1, 1);

    for (let i = 0; i < numColors; i++) {
      const lightness = startLightness + i * step;
      colors.push(`hsl(${baseHue}, ${saturation}%, ${lightness}%)`);
    }

    return colors;
  };

  const [searchParams, setSearchParams] = useState(defaultParams);
  const [loading, setLoading] = useState(false);
  const [systemWebs, setSystemWebs] = useState<any>([]);

  const { domRef, updateOptions } = useEcharts(() => ({
    grid: {
      bottom: '3%',
      containLabel: true,
      left: '3%',
      right: '4%'
    },
    legend: {
      data: [t('page.home.downloadCount'), t('page.home.registerCount')]
    },
    series: [
      {

        color: '#0071fe',
        data: [] as number[],
        emphasis: {
          focus: 'series'
        },
        name: t('page.home.downloadCount'),
        smooth: true,
        stack: 'Total',
        type: 'line'
      },
      {
        color: '#05d5c7',
        data: [],
        emphasis: {
          focus: 'series'
        },
        name: t('page.home.registerCount'),
        smooth: true,
        stack: 'Total',
        type: 'line'
      }
    ],
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      textStyle: {
        fontSize: 14,
        fontFamily: 'Mulish, sans-serif'
      },
      formatter: (params: any) => {
        if (!params || params.length === 0) return '';

        const validItems = params.filter((p: any) => p.value !== null && p.value !== undefined && p.value !== 0);

        if (validItems.length === 0) return '';

        const title = `Dịch vụ`;

        const seriesContent = validItems
          .map((p: any) => `${p.marker} ${p.seriesName} &nbsp; <span style="font-weight: 900;">${p.value}</span>`)
          .join('<br/>');

        return `${title}<br/>${seriesContent}`;
      }
    },
    xAxis: {
      boundaryGap: false,
      data: [] as string[],
      type: 'category'
    },
    yAxis: {
      type: 'value',
      splitLine: {
        lineStyle: {
          color: '#f5f5f5',
          type: 'dashed',
          width: 1
        }
      }
    }
  }));

  async function mockData(params: any) {
    try {

      const res = await GetSystemTrafficChartData(params);
      const data = res?.data?.result;

      if (!data) return;

      const colors = generateUniqueBlueColors(data.datasets.length);

      updateOptions(opts => {
        opts.xAxis.data = data?.labels.map((d: string) => {
          const [year, month, day] = d.split("-");
          return `${day}-${month}-${year}`;
        });

        opts.series = data.datasets.map((ds: any, index: number) => {

          return ({
            name: ds.label,
            type: "line",
            data: ds.data,
            smooth: true,
            stack: "Total",
            emphasis: {
              focus: "series"
            },
            showSymbol: false,
            color: colors[index], // line màu chính
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0.25,
                    color: colors[index] // màu đậm hơn ở trên
                  },
                  {
                    offset: 1,
                    color: "#fff" // màu nhạt dần xuống
                  }
                ]
              }
            },
            itemStyle: {
              color: colors[index]
            }
          })
        });

        return opts;
      });

    } catch (error) {
      console.log(error);
    }

  }

  function init() {
    mockData(searchParams);
  }

  function updateLocale() {
    updateOptions((opts, factory) => {
      const originOpts = factory();

      // cập nhật lại legend
      opts.legend.data = originOpts.legend.data;

      // cập nhật lại name cho tất cả series thay vì hardcode
      opts.series.forEach((s, idx) => {
        if (originOpts.series[idx]) {
          s.name = originOpts.series[idx].name;
        }
      });

      return opts;
    });
  }
  // init

  useMount(() => {
    init();
  });

  useUpdateEffect(() => {
    updateLocale();
  }, [locale]);

  useEffect(() => {
    mockData(searchParams);
  }, [searchParams]);

  const getPickerType = (groupBy: number) => {
    switch (groupBy) {
      case 1:
        return "date";
      case 2:
        return "week";
      case 3:
        return "month";
      case 4:
        return "year";
      default:
        return "date";
    }
  };

  useEffect(() => {
    const fetchGroups = async () => {
      setLoading(true);
      const apiParams = {
        MaxResultCount: 9999,
        SkipCount: 0,
        IsActive: true,
        Keyword: "",
      };

      try {
        const res = await GetAllSystemWeb(apiParams);

        const resData = res.data as any;

        if (resData && resData.result && resData.result.items) {
          setSystemWebs(resData.result.items);
        }
      } catch (err) {
        console.error("Fetch groups error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  const allValues = systemWebs.map((item: any) => item.id);

  useEffect(() => {
    if (systemWebs.length > 0 && searchParams.SystemIds.length === 0) {
      setSearchParams({
        ...searchParams,
        SystemIds: allValues,
      });
    }
  }, [systemWebs]);

  const handleChange = (values: number[]) => {
    // Nếu user chọn option "Tất cả"
    if (values.includes(-1)) {
      // Nếu đang chọn đủ tất cả rồi thì bỏ hết
      if (searchParams.SystemIds.length === allValues.length) {
        setSearchParams({ ...searchParams, SystemIds: [] });
      } else {
        // Nếu chưa chọn hết thì set tất cả
        setSearchParams({ ...searchParams, SystemIds: allValues });
      }
    } else {
      setSearchParams({ ...searchParams, SystemIds: values });
    }
  };

  return (
    <ACard
      className="card-wrapper"
      variant="borderless"
    >
      <h5 className="mb-3 text-center">Lưu lượng truy cập</h5>
      <div className='flex items-end justify-end gap-3'>
        <Select<number[]>
          style={{ width: "100%", flex: 1 }}
          loading={loading}
          mode="multiple"
          allowClear
          placeholder="Chọn dịch vụ"
          value={searchParams.SystemIds}
          onChange={handleChange}
          options={[
            { value: -1, label: "Tất cả" }, // option "Tất cả"
            ...systemWebs.map((item: any) => ({
              value: item.id,
              label: item.systemName,
            })),
          ]}
          // Nếu chọn hết thì chỉ hiển thị "Tất cả"
          maxTagCount={
            searchParams.SystemIds.length === allValues.length ? 0 : undefined
          }
          maxTagPlaceholder={() =>
            searchParams.SystemIds.length === allValues.length ? "Tất cả" : null
          }
        />
        <style>{`
          .ant-select-selector {
            max-height: 32px !important;
            overflow-y: auto !important;
          }
        `}</style>
        <Select
          defaultValue={1}
          style={{ width: 120 }}
          onChange={(value: number) => setSearchParams({
            ...searchParams,
            GroupBy: value
          })}
          placeholder="Chọn phạm vi"
          options={[
            { value: 1, label: 'Ngày' },
            { value: 2, label: 'Tuần' },
            { value: 3, label: 'Tháng' },
            { value: 4, label: 'Năm' },
          ]}
        />
        <RangePicker
          defaultValue={[dayjs().subtract(7, "day"), dayjs()]}
          picker={getPickerType(searchParams.GroupBy)}
          onChange={(_, dateStrings) => {
            setSearchParams({
              ...searchParams,
              StartDate: dateStrings[0],
              EndDate: dateStrings[1],
            });
          }}
        />
      </div>
      <div
        className="h-360px overflow-hidden"
        ref={domRef}
      />
    </ACard>
  );
};

export default LineChart;
