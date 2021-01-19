import { AxiosResponse } from "axios";

export const convertBanner = (res: AxiosResponse<any>) => {
  const { banners } = res.data;
  return { banners };
};

export const convertRecommendList = (res: AxiosResponse<any>) => {
  const { result } = res.data;
  return { result };
};
