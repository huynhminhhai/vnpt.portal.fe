import { motion } from 'framer-motion';

import wave2 from '@/assets/imgs/wave-2.webp';
import wave3 from '@/assets/imgs/wave-3.png';
import NumberTicker from '@/components/NumberTicker';
import { ThemeContext } from '@/features/theme';

interface CardDataProps {
  color: {
    end: string;
    start: string;
  };
  icon: string;
  image?: string;
  key: string;
  title: string;
  unit: string;
  value: number;
}

// function getGradientColor(color: CardDataProps['color']) {
//   return `linear-gradient(135deg, ${color.start}, ${color.end})`;
// }

function useGetCardData() {
  const { t } = useTranslation();

  const cardData: CardDataProps[] = [
    {
      color: {
        end: '#f1f2f7',
        start: '#f1f2f7'
      },
      icon: 'ant-design:bar-chart-outlined',
      image: wave3,
      key: 'visitCount',
      title: t('page.home.visitCount'),
      unit: '',
      value: 725
    },
    {
      color: {
        end: '#f1f2f7',
        start: '#f1f2f7'
      },
      icon: 'carbon:document-download',
      image: wave3,
      key: 'freeCount',
      title: t('page.home.freeCount'),
      unit: '',
      value: 525
    },
    {
      color: {
        end: '#f1f2f7',
        start: '#f1f2f7'
      },
      icon: 'ant-design:trademark-circle-outlined',
      image: wave2,
      key: 'paidCount',
      title: t('page.home.paidCount'),
      unit: '',
      value: 227
    },
    {
      color: {
        end: '#f1f2f7',
        start: '#f1f2f7'
      },
      icon: 'ant-design:money-collect-outlined',
      image: wave2,
      key: 'turnover',
      title: t('page.home.turnover'),
      unit: 'đ',
      value: 10260000
    }
  ];

  return cardData;
}

const CardItem = (data: CardDataProps) => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <ACol
      key={data.key}
      lg={6}
      md={12}
      span={24}
    >
      {/* <div
        className="flex-1 rd-8px px-16px pb-4px pt-8px text-white shadow-md"
        style={{ backgroundImage: getGradientColor(data.color) }}
      >
        <h3 className="text-16px text-primary font-medium">{data.title}</h3>
        <div className="flex justify-between pt-12px">
          <div className="h-fit rounded-2xl bg-white p-2">
            <SvgIcon
              className="text-24px text-primary"
              icon={data.icon}
            />
          </div>
          <NumberTicker
            className="text-30px text-primary font-medium"
            prefix={data.unit}
            value={data.value}
          />
        </div>
      </div> */}
      <div
        className="relative w-[100%] overflow-hidden rounded-xl bg-blue-50 p-3 py-6"
        style={{
          backgroundColor: darkMode ? '#292929' : '#fcfdfe',
          boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'
        }}
      >
        <div className="absolute top-[60%] w-[100%] translate-y-[-50%] transform -left-[-18%]">
          <motion.img
            alt="shape"
            animate={{ opacity: 0.4, WebkitMaskSize: '100% 100%' }}
            className="rotate-[-25deg] scale-[1]"
            initial={{ opacity: 0, WebkitMaskSize: '0% 100%' }}
            src={data.image}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
        <div className="flex items-center gap-1">
          <div>
            <h5
              className="text-[16px] text-primary font-semibold"
              style={{ color: darkMode ? '#ffffffd9' : '#0059a9' }}
            >
              {data.title}
            </h5>
            <NumberTicker
              className="text-26px font-semibold"
              style={{ color: darkMode ? '#ffffffd9' : '#0059a9' }}
              suffix={data.unit}
              value={data.value}
            />
          </div>
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
