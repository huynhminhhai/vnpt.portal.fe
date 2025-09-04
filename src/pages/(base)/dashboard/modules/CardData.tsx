import wave2 from '@/assets/imgs/wave-2.webp';
import wave3 from '@/assets/imgs/wave-3.png';
import wave4 from '@/assets/imgs/wave-4.webp';
import wave5 from '@/assets/imgs/wave-5.avif';
import NumberTicker from '@/components/NumberTicker';
import CardSkeleton from '@/components/Skeleton/CardSkeleton';
import { ThemeContext } from '@/features/theme';
import { Icon } from '@iconify/react';
import AOS from "aos";
import "aos/dist/aos.css";

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
            color: { end: 'rgba(0, 114, 254, 0.6)', start: '#0071fe' },
            icon: 'solar:buildings-2-bold-duotone',
            image: wave3,
            key: 'soLuongSuDung',
            title: 'Đơn vị',
            unit: '',
            value: 100
          },
          {
            cardKey: 'soLuongMienPhi',
            color: { end: 'rgba(5, 213, 199, 0.6)', start: '#05d5c7' },
            icon: 'solar:user-bold-duotone',
            image: wave4,
            key: 'soLuongMienPhi',
            title: 'Người dùng',
            unit: '',
            value: 100
          },
          {
            cardKey: 'soLuongTraPhi',
            color: { end: 'rgba(147, 132, 255, 0.6)', start: '#9384ff' },
            icon: 'solar:server-2-bold-duotone',
            image: wave2,
            key: 'soLuongTraPhi',
            title: 'Nhóm dịch vụ',
            unit: '',
            value: 100
          },
          {
            cardKey: 'danhThu',
            color: { end: 'rgba(56, 159, 234, 0.6)', start: '#389fea' },
            icon: 'streamline:web-solid',
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

const CardItem = (props: CardDataProps & { index: number }) => {
  const { darkMode } = useContext(ThemeContext);
  const { cardKey, title, unit, value, icon, color, index } = props;

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  return (
    <ACol
      key={cardKey}
      lg={6}
      md={12}
      span={24}
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div
        className={`relative w-[100%] overflow-hidden rounded-xl bg-blue-50 p-6 shadow-sm border-4 border-white`}
        style={{
          background: darkMode ? `linear-gradient(135deg, #292929, #292929)` : `linear-gradient(135deg, ${color.start}, ${color.end})`,
        }}
      >
        <div className="absolute -bottom-3 -right-3" data-aos="zoom-in-left" data-aos-delay={index * 150}>
          <Icon icon={icon} className='text-white/60' fontSize={80} />
        </div>
        <div className="flex items-center gap-3">
          <div className='flex items-center justify-center bg-white w-12 h-12 rounded-full'>
            <Icon icon={icon} color={color.start} fontSize={24} />
          </div>
          <div>
            <NumberTicker
              className="font-number text-24px leading-[28px] font-bold"
              style={{ color: darkMode ? '#ffffff' : '#ffffff' }}
              suffix={unit}
              value={value}
            />
            <h5
              className="text-14px text-primary font-semibold"
              style={{ color: darkMode ? '#ffffffd9' : '#ffffffd9' }}
            >
              {title}
            </h5>
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
          data.map(({ key: cardKey, ...rest }, index) => (
            <CardItem
              index={index}
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
