import storage from "good-storage";
import { PLAY_HISTORY_KEY, getSongImg } from "@/utils";
import { musicTypes } from "../../actionTypes";
import { MusicState } from "../../interface";
import { Commit, Dispatch } from "vuex";

interface Actions {
  state: MusicState;
  commit: Commit;
  dispatch: Dispatch;
}

export default {
  // 整合歌曲信息 并且开始播放
  async startSong({ commit, state }: Actions, rawSong: Song) {
    // 浅拷贝一份 改变引用
    // 1.不污染元数据
    // 2.单曲循环为了触发watch
    const song = Object.assign({}, rawSong);
    if (!song.img) {
      if (song.albumId) {
        song.img = await getSongImg(song.id, song.albumId);
      }
    }
    commit(musicTypes.SET_CURRENT_SONG, song);
    commit(musicTypes.SET_PLAYING_STATE, true);
    // 历史记录
    const { playHistory } = state;
    const playHistoryCopy = playHistory.slice();
    const findedIndex = playHistoryCopy.findIndex(({ id }) => song.id === id);
    if (findedIndex !== -1) {
      // 删除旧那一项, 插入到最前面
      playHistoryCopy.splice(findedIndex, 1);
    }
    playHistoryCopy.unshift(song);
    commit(musicTypes.SET_PLAY_HISTORY, playHistoryCopy);
    storage.set(PLAY_HISTORY_KEY, playHistoryCopy);
  },
  clearCurrentSong({ commit }: Actions) {
    console.log("dispatch/clearCurrentSong");
    commit(musicTypes.SET_CURRENT_SONG, {});
    commit(musicTypes.SET_PLAYING_STATE, false);
    commit(musicTypes.SET_CURRENT_TIME, 0);
  },
  clearPlaylist({ commit, dispatch }: Actions) {
    commit(musicTypes.SET_PLAY_LIST, []);
    dispatch("clearCurrentSong");
  },
  clearHistory({ commit }: Actions) {
    const history: any[] = [];
    commit(musicTypes.SET_PLAY_HISTORY, history);
    storage.set(PLAY_HISTORY_KEY, history);
  },
  addToPlaylist({ commit, state }: Actions, song: Song) {
    const { playlist } = state;
    const copy = playlist.slice();
    if (!copy.find(({ id }) => id === song.id)) {
      copy.unshift(song);
      commit(musicTypes.SET_PLAY_LIST, copy);
    }
  }
};
