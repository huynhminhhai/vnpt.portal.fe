import * as echarts from 'echarts';
import { useUpdateEffect } from 'ahooks';
import { GetSystemTraffic } from '@/service/api/dashboard';
import { useLang } from '@/features/lang';

const BarChart = () => {
  const { locale } = useLang();

  const { domRef, updateOptions } = useEcharts(() => ({
    title: {
      subtext: 'Biểu đồ lượt truy cập hệ thống',
      left: 'center',
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    grid: { left: '3%', right: '4%', bottom: '3%', containLabel: true },
    xAxis: {
      type: 'value',
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: { color: '#ccc' }
    },
    yAxis: {
      type: 'category',
      data: [],
      axisLabel: { inside: true, color: '#fff', fontWeight: 'bold' },
      axisTick: { show: false },
      axisLine: { show: false },
      z: 10
    },
    dataZoom: [{ type: 'inside' }],
    series: [
      {
        type: 'bar',
        showBackground: true,
        barWidth: 40,
        itemStyle: {
          borderRadius: [4, 4, 4, 4],
          color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
            { offset: 0, color: '#2563eb' },
            // { offset: 0.5, color: '#05d5c7' },
            { offset: 1, color: '#60a5fa' }
          ])
        },
        emphasis: {
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#2563eb' },
              // { offset: 0.7, color: '#83bff6' },
              { offset: 1, color: '#60a5fa' }
            ])
          }
        },
        data: []
      }
    ]
  }));

  async function fetchData() {
    try {
      const res = await GetSystemTraffic();
      const items = res?.data?.result?.items ?? [];

      const filtered = items.filter((item: any) => item.total > 0);
      filtered.sort((a: any, b: any) => b.total - a.total);
      const topItems = filtered.slice(0, 5);

      const dataAxis = topItems.map((item: any) => item.systemName);
      const data = topItems.map((item: any) => item.total);

      updateOptions((opts) => {
        opts.yAxis.data = dataAxis;
        opts.series[0].data = data;
        return opts;
      });

      // Đảm bảo chart instance tồn tại
      setTimeout(() => {
        if (!domRef.current) return;
        const chart = echarts.getInstanceByDom(domRef.current);
        if (!chart) return;

        const zoomSize = 3;
        chart.off('click');
        chart.on('click', (params: any) => {
          chart.dispatchAction({
            type: 'dataZoom',
            startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
          });
        });
      }, 0);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  useUpdateEffect(() => {
    // Cập nhật locale nếu cần (ví dụ đổi tên hệ thống)
  }, [locale]);

  return (
    <ACard className="card-wrapper" variant="borderless">
      <div className="h-360px overflow-hidden" ref={domRef} />
    </ACard>
  );
};

export default BarChart;
