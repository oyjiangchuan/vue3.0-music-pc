import { AxiosResponse } from "axios";

export const convertPlayLists = (res: AxiosResponse<any>) => {
  const { playlists, total } = res.data;
  return { playlists, total };
};

export const convertCommon = (res: AxiosResponse<any>) => {
  const { playlists } = res.data;
  return { playlists };
};
