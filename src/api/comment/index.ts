// 评论相关API
import { request } from "../axios";
import { convertCommon } from "./translate";

const REQUEST_URL = {
  songComment: "/comment/music",
  playlistComment: "/comment/playlist",
  hotComment: "/comment/hot",
  mvComment: "/comment/mv"
};

// 歌曲评论
export const getSongComment = (params: any) => {
  return request.get(REQUEST_URL.songComment, { params }).then(convertCommon);
};

// 歌单评论
export const getPlaylistComment = (params: any) => {
  return request
    .get(REQUEST_URL.playlistComment, { params })
    .then(convertCommon);
};

// 热门评论
export const getHotComment = (params: any) => {
  return request.get(REQUEST_URL.hotComment, { params }).then(convertCommon);
};

// mv评论
export const getMvComment = (params: any) => {
  return request.get(REQUEST_URL.mvComment, { params }).then(convertCommon);
};
