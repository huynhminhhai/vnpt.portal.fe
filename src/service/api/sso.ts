import { newRequest } from "../request";

export const PortalRedirect = async (systemWebId: number) => {
  const res = await newRequest<any>({
    method: 'post',
    url: `/api/SSOPortal/PortalRedirect?systemWebId=${systemWebId}`
  });

  return res as any;
};
