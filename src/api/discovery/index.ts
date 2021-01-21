// 发现音乐相关API
import { request } from "../axios";
import { convertBanner, convertCommon } from "./translate";

const REQUEST_URL = {
  banner: "/banner?type=0",
  recommendLists: "/personalized",
  newSongs: "/personalized/newsong",
  mvs: "/personalized/mv"
};

// 获取轮播图数据
export const getBanner = () => {
  return request.get(REQUEST_URL.banner).then(convertBanner);
};

// 获取推荐歌单数据
export const getRecommendList = (params: any) => {
  return request
    .get(REQUEST_URL.recommendLists, { params })
    .then(convertCommon);
};

// 获取最新音乐数据
export const getNewSongs = () => {
  return request.get(REQUEST_URL.newSongs).then(convertCommon);
};

// 获取推荐mv数据
export const getPersonalizedMv = () => {
  return request.get(REQUEST_URL.mvs).then(convertCommon);
};
