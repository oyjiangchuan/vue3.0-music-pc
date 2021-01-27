import { AxiosResponse } from "axios";

export const convertCommon = (res: AxiosResponse<any>) => {
  const { playlists, total } = res.data;
  return { playlists, total };
};

export const convertListDetail = (res: AxiosResponse<any>) => {
  const { playlist, privileges } = res.data;
  return { playlist, privileges };
};

export const convertSongDetail = (res: AxiosResponse<any>) => {
  const { songs, privileges } = res.data;
  return { songs, privileges };
};
