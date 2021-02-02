declare type Nullable<T> = T | null;

declare interface TabItem {
  path: string;
  content: string;
}

declare interface SingerSelectArgs {
  label: string;
  value: number | string;
}

declare interface OwnerSendItem {
  id: number;
  name: string;
  picUrl: string;
  [propName: string]: any;
}

declare type Album = {
  id: number;
  name: string;
  picUrl?: string;
  songs?: Song[];
  isTop?: boolean;
  publishTime?: string;
  [propName: string]: any;
};

declare type Artist = {
  id: number;
  name: string;
  picUrl?: string;
};

declare interface Mv {
  id: number;
  name: string;
  picUrl: string;
  artistId: number;
  artistName?: string;
  duration?: number;
  durationStr?: string;
  playCount?: number;
  [propName: string]: any;
}

// rank
declare interface CommonRank {
  id: number;
  name: string;
  coverImgUrl: string;
  backgroundImgUrl: string;
  updateTime: string;
  playCount: string | number;
  songs: Song[];
}

declare interface SingerRank {
  coverImgUrl: string;
  backgroundImgUrl: string;
  updateTime: string;
  artists: Artist[];
}

// 已用接口
declare interface CommonInterFace {
  [propName: string]: any;
}
declare interface Song {
  id: number;
  name: string;
  picUrl?: string;
  alias?: string;
  artists: Artist[];
  album?: Album;
  sq?: boolean;
  duration: number;
  durationStr?: string;
  mvId?: number;
  [propName: string]: any;
}
declare interface PlayListItem {
  name: string;
  coverImgUrl: string;
  createTime: number;
  description: string;
  [propName: string]: any;
}
declare interface Comment {
  id: number;
  name: string;
  commentId: number;
  avatarUrl: string;
  content: string;
  time: string | number;
  likedCount: number;
  beReplied: Replied[];
  [propName: string]: any;
}

declare type Replied = {
  id: number;
  name: string;
  commentId: number;
  avatarUrl: string;
  content: string;
  time: string;
  likedCount: number;
};
