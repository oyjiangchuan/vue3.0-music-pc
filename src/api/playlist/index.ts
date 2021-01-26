// 推荐歌单相关API
import { request } from "../axios";

import { convertPlayLists, convertCommon } from "./translate";

const REQUEST_URL = {
  playLists: "/top/playlist",
  topPlayLists: "/top/playlist/highquality",
  simiPlayLists: "/simi/playlist?id=",
  listDetail: "/playlist/detail",
  songDetail: "/song/detail?ids="
};

// 获取歌单列表
export const getPlaylists = (params: any) =>
  request.get(REQUEST_URL.playLists, { params }).then(convertPlayLists);

// 获取头部精品歌单信息
export const getTopPlaylists = (params: any) =>
  request.get(REQUEST_URL.topPlayLists, { params }).then(convertCommon);

// 获取相似歌单
export const getSimiPlaylists = (id: number, option: any) =>
  request.get(REQUEST_URL.simiPlayLists + id, option);

// 获取歌单详情页数据
export const getListDetail = (params: any) =>
  request.get(REQUEST_URL.listDetail, { params });

// 获取音乐详情
export const getSongDetail = (ids: number) =>
  request.get(REQUEST_URL.songDetail + ids);
