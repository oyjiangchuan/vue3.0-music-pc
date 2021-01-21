/**
 * 业务工具方法
 */

function genSongPlayUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`;
}

export const genArtistisText = (artists: any[]) => {
  return (artists || []).map(({ name }) => name).join("/");
};

export const createSong = (song: any) => {
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
