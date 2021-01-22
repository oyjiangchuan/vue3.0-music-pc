import { shallowEqual } from "@/utils";
import { musicTypes } from "@/store/actionTypes";
import { MusicState } from "../../interface";

export default {
  [musicTypes.SET_CURRENT_SONG](state: MusicState, song: Song) {
    state.currentSong = song;
  },
  [musicTypes.SET_CURRENT_TIME](state: MusicState, time: number) {
    state.currentTime = time;
  },
  [musicTypes.SET_PLAYING_STATE](state: MusicState, playing: boolean) {
    state.playing = playing;
  },
  [musicTypes.SET_PLAY_MODE](state: MusicState, mode: string) {
    state.playMode = mode;
  },
  [musicTypes.SET_PLAYER_SHOW](state: MusicState, show: boolean) {
    state.isPlaylistShow = show;
  },
  [musicTypes.SET_PLAYER_SHOW](state: MusicState, show: boolean) {
    state.isPlayerShow = show;
  },
  [musicTypes.SET_PLAY_LIST_PROMPT_SHOW](state: MusicState, show: boolean) {
    state.isPlaylistPromptShow = show;
  },
  [musicTypes.SET_PLAY_LIST](state: MusicState, playlist: Song[]) {
    const { isPlaylistShow, playlist: oldPlaylist } = state;
    state.playlist = playlist;
    // 播放列表未显示 并且两次播放列表的不一样 则弹出提示
    if (!isPlaylistShow && !shallowEqual(oldPlaylist, playlist, "id")) {
      state.isPlaylistPromptShow = true;
      setTimeout(() => {
        state.isPlaylistPromptShow = false;
      }, 2000);
    }
  },
  [musicTypes.SET_PLAY_HISTORY](state: MusicState, history: Song[]) {
    state.playHistory = history;
  },
  [musicTypes.SET_MENU_SHOW](state: MusicState, show: boolean) {
    state.isMenuShow = show;
  },
  [musicTypes.UPDATE_STATE](state: MusicState, payload: any) {
    Object.keys(payload).forEach(key => {
      state[key] = payload[key];
    });
  }
};
