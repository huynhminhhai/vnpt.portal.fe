// import type { SVGProps } from 'react';
// props: SVGProps<SVGSVGElement>
import logo from '@/assets/imgs/vnpt.png';

const SystemLogo = (props: any) => {
  // return <IconLocalLogo {...props} />;

  return (
    <img
      alt=""
      src={logo}
      {...props}
    />
  );
};

export default SystemLogo;
