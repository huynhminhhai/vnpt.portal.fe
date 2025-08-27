import { setUserInfo } from '@/features/auth/authStore';
import { useRouter } from '@/features/router';
import BaseLayout from '@/layouts/base-layout';
import { localStg } from '@/utils/storage';
import { globalConfig } from '@/config';
import { GetCurrentLoginInformations, GetUserInfo } from '@/service/api';

const BlankLayout = () => {

  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const { replace } = useRouter();

  const redirectUrl = searchParams.get('redirect');

  const fetchUserInfo = async () => {
    const { data: info, error: userInfoError } = await GetCurrentLoginInformations();

    if (!userInfoError) {
      localStg.set('userInfo', info?.result);

      dispatch(setUserInfo(info?.result));

    } else {
      replace('/login');
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);


  return <BaseLayout />;
};

export default BlankLayout;
