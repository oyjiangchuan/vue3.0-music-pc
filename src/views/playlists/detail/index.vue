<template>
  <div class="playlist-detail">
    <Header :playlist="playlist" :songs="songs" ref="header" />
    <div class="tabs-wrap">
      <Tabs :tabs="tabs" type="theme" v-model:active="activeTab" />
      <el-input
        :class="getInputCls()"
        class="input"
        @blur="onInputBlur"
        @focus="onInputFocus"
        placeholder="搜索歌单音乐"
        prefix-icon="el-icon-search"
        v-model="searchValue"
        v-show="activeTab === SONG_IDX"
      />
    </div>
    <div class="empty" v-if="searchValue && !filteredSongs.length">
      未找到和
      <span class="keyword">{{ searchValue }}</span>
      相关的任何音乐
    </div>
    <div class="comments" v-show="activeTab === COMMENT_IDX">
      <Comments :id="id" @update="onCommentsUpdate" type="playlist" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, watch, ref } from "vue";
import { useRoute, onBeforeRouteLeave } from "vue-router";
import { getListDetail, getSongDetail } from "@/api";
import { scrollInto, createSong } from "@/utils";
import Comments from "@/components/comments.vue";

import Header from "./header.vue";
const MAX = 500;
const SONG_IDX = 0;
const COMMENT_IDX = 1;

export default defineComponent({
  name: "playlistDetail",
  components: { Header, Comments },
  setup() {
    const route = useRoute();
    const header = ref<HTMLElement | null>(null);
    const state = reactive({
      SONG_IDX,
      COMMENT_IDX,
      tabs: ["歌曲列表", "评论"],
      activeTab: SONG_IDX,
      playlist: {},
      songs: new Array<Song>(),
      searchValue: "",
      inputFocus: false
    });
    const id = computed(() => {
      return Number(route.params.id);
    });
    const filteredSongs = computed(() => {
      return state.songs.filter(({ name, artistsText, albumName }) =>
        `${name}${artistsText}${albumName}`
          .toLowerCase()
          .includes(state.searchValue.toLowerCase())
      );
    });
    const getSonglist = async (playlist: any) => {
      const trackIds = playlist.trackIds.map(({ id }: { id: number }) => id);
      const { songs: songDetails } = await getSongDetail(
        trackIds.slice(0, MAX)
      );
      const songs = songDetails.map(({ id, name, al, ar, mv, dt }: Song) =>
        createSong({
          id,
          name,
          artists: ar,
          duration: dt,
          mvId: mv,
          albumName: al.name,
          img: al.picUrl
        })
      );
      state.songs = songs;
    };
    // 获取数据
    const init = async () => {
      const { playlist } = await getListDetail({ id: id.value });
      state.playlist = playlist;
      getSonglist(playlist);
    };
    // 置顶
    const scrollToHeader = () => {
      if (header.value) {
        scrollInto(header.value);
      }
    };
    // 添加类名
    const getInputCls = () => {
      return !state.inputFocus ? "inactive" : "";
    };
    // 失焦事件
    const onInputBlur = () => {
      state.inputFocus = false;
    };
    // 聚焦事件
    const onInputFocus = () => {
      state.inputFocus = true;
    };
    // 修改tabs
    const onCommentsUpdate = ({ total }: { total: number }) => {
      state.tabs.splice(COMMENT_IDX, 1, `评论(${total})`);
    };
    // watch与watchEffect会返回一个unwatch函数,用于取消监听
    const unWatch = watch(
      id,
      () => {
        state.searchValue = "";
        init();
        scrollToHeader();
      },
      { immediate: true }
    );
    // 这里的bug是路由切换之后,watch还在执行,是因为watch的是route的参数？
    // onBeforeRouteUpdat不触发（触发时机）
    onBeforeRouteLeave(() => {
      unWatch(); // 取消监听
    });

    return {
      ...toRefs(state),
      id,
      filteredSongs,
      getInputCls,
      onInputBlur,
      onInputFocus,
      onCommentsUpdate
    };
  }
});
</script>

<style lang="scss" scoped>
.playlist-detail {
  width: 100%;

  .tabs-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 24px;
    border-bottom: 1px solid var(--border);

    .input {
      width: 125px;

      &:not(:hover) {
        &.inactive {
          ::v-deep.el-input__inner {
            background-color: transparent !important;
          }
        }
      }
    }
  }

  .empty {
    @include flex-center;
    height: 200px;

    .keyword {
      color: $blue;
    }
  }

  .comments {
    padding: 16px 32px;
  }
}
</style>
