import NumberTicker from '@/components/NumberTicker';
import CardSkeleton from '@/components/Skeleton/CardSkeleton';
import { ThemeContext } from '@/features/theme';
import { Icon } from '@iconify/react';
import AOS from "aos";
import "aos/dist/aos.css";
import WeatherBox from './WeatherBox';
import { GetStatistics } from '@/service/api/dashboard';

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

function useGetCardData() {
  const { t } = useTranslation();
  const [cardData, setCardData] = useState<CardDataProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      try {
        const response = await GetStatistics();

        const data = response?.data?.result;

        if (!data) return;

        // Map API data vào card
        const mappedData: CardDataProps[] = [
          {
            cardKey: 'soLuongSuDung',
            color: { end: '#60a5fa', start: '#2563eb' },
            icon: 'solar:buildings-2-bold-duotone',
            key: 'soLuongSuDung',
            title: 'Đơn vị',
            unit: '',
            value: data.totalTenants ?? 0
          },
          {
            cardKey: 'danhThu',
            color: { end: '#38bdf8', start: '#0369a1' },
            icon: 'streamline:web-solid',
            key: 'danhThu',
            title: 'Dịch vụ',
            unit: '',
            value: data.totalSystemWebs ?? 0
          },
          {
            cardKey: 'soLuongMienPhi',
            color: { end: '#2dd4bf', start: '#0f766e' },
            icon: 'solar:user-bold-duotone',
            key: 'soLuongMienPhi',
            title: 'Người dùng',
            unit: '',
            value: data.totalUsers ?? 0
          },
        ];

        setCardData(mappedData);
      } catch (error) {
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
      <ARow gutter={[16, 16]}>
        {isLoading ? (
          <>
            <CardSkeleton darkMode={darkMode} />
            <CardSkeleton darkMode={darkMode} />
            <CardSkeleton darkMode={darkMode} />
            <CardSkeleton darkMode={darkMode} />
          </>
        ) : (
          <>
            {
              data.map(({ key: cardKey, ...rest }, index) => (
                <CardItem
                  index={index}
                  key={cardKey}
                  {...rest}
                />
              ))
            }
            <ACol
              lg={6}
              md={12}
              span={24}
              data-aos="fade-up"
              data-aos-delay={data.length * 100}
            >
              <WeatherBox />
            </ACol>
          </>
        )}
      </ARow>
    </div>
  );
};

export default CardData;
