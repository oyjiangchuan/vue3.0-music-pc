import { AxiosResponse } from "axios";

export const convertBanner = (res: AxiosResponse<any>) => {
  const { banners } = res.data;
  return { banners };
};

export const convertCommon = (res: AxiosResponse<any>) => {
  const { result } = res.data;
  return { result };
};

export const convertAlbum = (res: AxiosResponse<any>) => {
  const { songs } = res.data;
  return { songs };
};
