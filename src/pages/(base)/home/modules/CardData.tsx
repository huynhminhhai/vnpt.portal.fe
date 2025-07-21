import NumberTicker from '@/components/NumberTicker';

interface CardDataProps {
  color: {
    end: string;
    start: string;
  };
  icon: string;
  key: string;
  title: string;
  unit: string;
  value: number;
}

function getGradientColor(color: CardDataProps['color']) {
  return `linear-gradient(to bottom right, ${color.start}, ${color.end})`;
}

function useGetCardData() {
  const { t } = useTranslation();

  const cardData: CardDataProps[] = [
    {
      color: {
        end: '#0059a9',
        start: '#3b82f6'
      },
      icon: 'ant-design:bar-chart-outlined',
      key: 'visitCount',
      title: t('page.home.visitCount'),
      unit: '',
      value: 725
    },
    {
      color: {
        end: '#0059a9',
        start: '#3b82f6'
      },
      icon: 'ant-design:money-collect-outlined',
      key: 'turnover',
      title: t('page.home.turnover'),
      unit: '$',
      value: 1026
    },
    {
      color: {
        end: '#0059a9',
        start: '#3b82f6'
      },
      icon: 'carbon:document-download',
      key: 'freeCount',
      title: t('page.home.freeCount'),
      unit: '',
      value: 525
    },
    {
      color: {
        end: '#0059a9',
        start: '#3b82f6'
      },
      icon: 'ant-design:trademark-circle-outlined',
      key: 'paidCount',
      title: t('page.home.paidCount'),
      unit: '',
      value: 227
    }
  ];

  return cardData;
}

const CardItem = (data: CardDataProps) => {
  return (
    <ACol
      key={data.key}
      lg={6}
      md={12}
      span={24}
    >
      <div
        className="flex-1 rd-8px px-16px pb-4px pt-8px text-white"
        style={{ backgroundImage: getGradientColor(data.color) }}
      >
        <h3 className="text-16px">{data.title}</h3>
        <div className="flex justify-between pt-12px">
          <SvgIcon
            className="text-32px"
            icon={data.icon}
          />
          <NumberTicker
            className="text-30px"
            prefix={data.unit}
            value={data.value}
          />
        </div>
      </div>
    </ACol>
  );
};

const CardData = () => {
  const data = useGetCardData();

  return (
    <ACard
      className="card-wrapper"
      size="small"
      variant="borderless"
    >
      <ARow gutter={[16, 16]}>{data.map(CardItem)}</ARow>
    </ACard>
  );
};

export default CardData;
