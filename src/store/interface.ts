// state接口
export interface MusicState {
  currentSong: Song;
  currentTime: number;
  playing: boolean;
  playMode: string;
  isPlaylistShow: boolean;
  isPlaylistPromptShow: boolean;
  isPlayerShow: boolean;
  playlist: Song[];
  playHistory: Song[];
  isMenuShow: boolean;
  [propName: string]: any; // 表示可以任意添加属性个数，添加的属性类型为 any
}
