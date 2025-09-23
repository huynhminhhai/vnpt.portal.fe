import { Navigate } from 'react-router-dom';

import { globalConfig } from '@/config';

const Index = () => {

  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const service = params.get("service");
  // const query = service ? `?service=${service}` : "";

  useEffect(() => {
    if (service) {
      localStorage.setItem('serviceUrl', service);
    } else {
      localStorage.removeItem('serviceUrl');
    }
  }, [service]);

  return (
    <Navigate
      replace
      to={`${globalConfig.homePath}`}
    />
  );
};

export default Index;
