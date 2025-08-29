import { motion } from 'framer-motion';

import wave2 from '@/assets/imgs/wave-2.webp';
import wave3 from '@/assets/imgs/wave-3.png';
import wave4 from '@/assets/imgs/wave-4.webp';
import wave5 from '@/assets/imgs/wave-5.avif';
import NumberTicker from '@/components/NumberTicker';
import CardSkeleton from '@/components/Skeleton/CardSkeleton';
import { ThemeContext } from '@/features/theme';
import { GetThongTinTongQuat } from '@/service/api';

interface CardDataProps {
  cardKey: string;
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
  const [cardData, setCardData] = useState<CardDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        // const response = await GetThongTinTongQuat();
        // const data = response?.data?.result;

        // Map API data vào card
        const mappedData: CardDataProps[] = [
          {
            cardKey: 'soLuongSuDung',
            color: { end: '#f1f2f7', start: '#f1f2f7' },
            icon: 'ant-design:bar-chart-outlined',
            image: wave3,
            key: 'soLuongSuDung',
            title: 'Đơn vị',
            unit: '',
            value: 100
          },
          {
            cardKey: 'soLuongMienPhi',
            color: { end: '#f1f2f7', start: '#f1f2f7' },
            icon: 'carbon:document-download',
            image: wave4,
            key: 'soLuongMienPhi',
            title: 'Người dùng',
            unit: '',
            value: 100
          },
          {
            cardKey: 'soLuongTraPhi',
            color: { end: '#f1f2f7', start: '#f1f2f7' },
            icon: 'ant-design:trademark-circle-outlined',
            image: wave2,
            key: 'soLuongTraPhi',
            title: 'Nhóm dịch vụ',
            unit: '',
            value: 100
          },
          {
            cardKey: 'danhThu',
            color: { end: '#f1f2f7', start: '#f1f2f7' },
            icon: 'ant-design:money-collect-outlined',
            image: wave5,
            key: 'danhThu',
            title: 'Dịch vụ',
            unit: '',
            value: 100
          }
        ];

        setCardData(mappedData);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error fetching card data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [t]);

  return { cardData, isLoading };
}

const CardItem = (props: CardDataProps) => {
  const { darkMode } = useContext(ThemeContext);
  const { cardKey, image, title, unit, value } = props;

  return (
    <ACol
      key={cardKey}
      lg={6}
      md={12}
      span={24}
    >
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
            animate={{ opacity: 0.25, WebkitMaskSize: '100% 100%' }}
            className="rotate-[-25deg] scale-[1]"
            initial={{ opacity: 0, WebkitMaskSize: '0% 100%' }}
            src={image}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          />
        </div>
        <div className="flex items-center gap-2">
          <div>
            <h5
              className="mb-1 text-16px text-primary font-medium"
              style={{ color: darkMode ? '#ffffffd9' : '#000000E0' }}
            >
              {title}
            </h5>
            <NumberTicker
              className="font-number text-26px font-semibold"
              style={{ color: darkMode ? '#ffffffd9' : '#0059a9' }}
              suffix={unit}
              value={value}
            />
          </div>
        </div>
      </div>
    </ACol>
  );
};

const CardData = () => {
  const { cardData: data, isLoading } = useGetCardData();
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      // className="card-wrapper"
      // size="small"
      // variant="borderless"
    >
      <ARow gutter={[24, 16]}>
        {isLoading ? (
          <>
            <CardSkeleton darkMode={darkMode} />
            <CardSkeleton darkMode={darkMode} />
            <CardSkeleton darkMode={darkMode} />
            <CardSkeleton darkMode={darkMode} />
          </>
        ) : (
          data.map(({ key: cardKey, ...rest }) => (
            <CardItem
              key={cardKey}
              {...rest}
            />
          ))
        )}
      </ARow>
    </div>
  );
};

export default CardData;
