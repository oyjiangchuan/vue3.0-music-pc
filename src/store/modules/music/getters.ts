import { isDef, playModeMap } from "@/utils";
import { MusicState } from "../../interface";

const getRandomIndex = (playlist: Song[], currentIndex: number) => {
  // 防止无限循环
  if (playlist.length === 1) {
    return currentIndex;
  }
  let index = Math.round(Math.random() * (playlist.length - 1));
  if (index === currentIndex) {
    index = getRandomIndex(playlist, currentIndex);
  }
  return index;
};

export const currentIndex = (state: MusicState) => {
  const { currentSong, playlist } = state;
  return playlist.findIndex(({ id }) => id === currentSong.id);
};

export const nextSong = (state: MusicState, getters: any) => {
  const { playlist, playMode } = state;
  // 顺序
  function getSequenceNextIndex() {
    let nextIndex = getters.currentIndex + 1;
    if (nextIndex > playlist.length - 1) {
      nextIndex = 0;
    }
    return nextIndex;
  }
  // 随机
  function getRandomNextIndex() {
    return getRandomIndex(playlist, getters.currentIndex);
  }
  // 单曲
  function getLoopNextIndex() {
    return getters.currentIndex;
  }
  const nextStratMap = {
    [playModeMap.sequence.code]: getSequenceNextIndex,
    [playModeMap.loop.code]: getLoopNextIndex,
    [playModeMap.random.code]: getRandomNextIndex
  };
  const getNextStrat = nextStratMap[playMode];
  const index = getNextStrat();

  return playlist[index];
};

// 上一首歌
export const prevSong = (state: MusicState, getters: any) => {
  const { playlist, playMode } = state;
  function genSequencePrevIndex() {
    let prevIndex = getters.currentIndex - 1;
    if (prevIndex < 0) {
      prevIndex = playlist.length - 1;
    }
    return prevIndex;
  }
  function getLoopPrevIndex() {
    return getters.currentIndex;
  }
  function getRandomPrevIndex() {
    return getRandomIndex(playlist, getters.currentIndex);
  }
  const prevStratMap = {
    [playModeMap.sequence.code]: genSequencePrevIndex,
    [playModeMap.loop.code]: getLoopPrevIndex,
    [playModeMap.random.code]: getRandomPrevIndex
  };
  const getPrevStrat = prevStratMap[playMode];
  const index = getPrevStrat();

  return playlist[index];
};

// 当前是否有歌曲在播放
export const hasCurrentSong = (state: MusicState) => {
  return isDef(state.currentSong.id);
};
