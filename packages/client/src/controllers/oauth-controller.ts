import { oauthApi } from '@/api';
import { IOAuthRequest } from '@/types/user';

const getServiceInfo = async (data: IOAuthRequest) => {
  const response = await oauthApi.getServiceInfo(data);

  return response.data;
};

const getServiceIDInfo = async (redirect_id: string) => {
  const response = await oauthApi.getAppId(redirect_id);

  return response.data;
};

export { getServiceInfo, getServiceIDInfo };
