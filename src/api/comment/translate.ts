import { AxiosResponse } from "axios";

export const convertCommon = (res: AxiosResponse<any>) => {
  const { comments, hotComments, total } = res.data;
  return { comments, hotComments, total };
};
