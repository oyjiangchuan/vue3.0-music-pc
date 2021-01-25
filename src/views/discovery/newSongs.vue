<template>
  <div class="newSongs">
    <Title>最新音乐</Title>
    <div class="list-wrap">
      <div
        class="list"
        v-for="(list, listIndex) in thunkedList"
        :key="listIndex"
      >
        <SongCard
          v-for="(item, index) in list"
          :key="item.id"
          class="song-card"
          :order="getSongOrder(listIndex, index)"
          v-bind="nomalizeSong(item)"
          @click="onClickSong(listIndex, index)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive } from "vue";
import SongCard from "@/components/song-card.vue";
import { getNewSongs } from "@/api";
import { createSong } from "@/utils";
import { useStore } from "vuex";
import { musicTypes } from "@/store/actionTypes";

export default defineComponent({
  setup() {
    const store = useStore();

    const songsLimit = 10;
    const state = reactive({
      list: new Array<any>(),
      chunkLimit: Math.ceil(songsLimit / 2)
    });

    const getData = async () => {
      const { result } = await getNewSongs();
      state.list = result;
    };
    const nomalizeSong = (song: any) => {
      const {
        id,
        name,
        song: {
          mvid,
          artists,
          album: { blurPicUrl },
          duration
        }
      } = song;
      return createSong({
        id,
        name,
        img: blurPicUrl,
        artists,
        duration,
        mvId: mvid
      });
    };

    const thunkedList = computed(() => {
      return [
        state.list.slice(0, state.chunkLimit),
        state.list.slice(state.chunkLimit, state.list.length)
      ];
    });
    const normalizedSongs: ArrayList = computed<Song[]>(() => {
      return state.list.map(song => nomalizeSong(song));
    });

    const getSongOrder = (listIndex: number, index: number) => {
      return listIndex * state.chunkLimit + index + 1;
    };
    const onClickSong = (listIndex: number, index: number) => {
      // 这里因为getSongOrder是从1开始显示, 所以当做数组下标需要减一
      const nomalizedSongIndex = getSongOrder(listIndex, index) - 1;
      const nomalizedSong = normalizedSongs[nomalizedSongIndex];
      store.dispatch("music/startSong", nomalizedSong);
      store.commit(`music/${musicTypes.SET_PLAY_LIST}`, normalizedSongs);
    };

    getData();

    return {
      thunkedList,
      getSongOrder,
      nomalizeSong,
      onClickSong
    };
  },
  components: { SongCard }
});
</script>

<style lang="scss" scoped>
.newSongs {
  margin-bottom: 36px;
  .list-wrap {
    display: flex;

    .list {
      flex: 1;
      overflow: hidden;
    }
  }
}
</style>
