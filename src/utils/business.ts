/**
 * 业务工具方法
 */

import { isDef } from "./common";
import { getAlbum } from "@/api";

function genSongPlayUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

export const genArtistisText = (artists: any[]) => {
  return (artists || []).map(({ name }) => name).join("/");
};

export const createSong = (song: Song) => {
  const {
    id,
    name,
    img,
    artists,
    duration,
    albumId,
    albumName,
    mvId,
    ...rest
  } = song;

  return {
    id,
    name,
    img,
    artists,
    duration,
    albumName,
    url: genSongPlayUrl(song.id as number),
    artistsText: genArtistisText(artists as any[]),
    durationSecond: duration / 1000,
    // 专辑 如果需要额外请求封面的话必须加上
    albumId,
    // mv的id 如果有的话 会在songTable组件中加上mv链接。
    mvId,
    ...rest
  };
};

export async function getSongImg(id: number, albumId: number) {
  if (!isDef(albumId)) {
    throw new Error("need albumId");
  }
  const { songs } = await getAlbum(albumId);
  const {
    al: { picUrl }
  } = songs.find(({ id: songId }: { id: number }) => songId === id) || {};
  return picUrl;
}
