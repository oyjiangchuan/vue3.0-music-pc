<template>
  <div class="playlists-root">
    <div
      v-if="route.path === '/playlists'"
      class="playlists-wrapper"
      ref="playlistsDOM"
    >
      <div class="top-play-list-card">
        <TopPlaylistCard
          :desc="topPlaylist.description"
          :id="topPlaylist.id"
          :img="topPlaylist.coverImgUrl"
          :name="topPlaylist.name"
        />
      </div>
      <!-- <div class="tabs">
        <Tabs
          :tabs="tabs"
          v-model="activeTabIndex"
          @tabChange="onTabChange"
          align="right"
          type="small"
        />
      </div> -->
      <div class="playlist-cards">
        <PlaylistCard
          v-for="item in playlists"
          :key="item.id"
          :desc="`播放量：${$utils.formatNumber(item.playCount)}`"
          :id="item.id"
          :img="item.coverImgUrl"
          :name="item.name"
        />
      </div>
      <!-- <Pagination
        class="pagination"
        :current-page="currentPage"
        :page-size="PAGE_SIZE"
        :total="total"
        @current-change="onPageChange"
      ></Pagination> -->
    </div>
    <router-view v-else></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import { useRoute } from "vue-router";
import { getPlaylists, getTopPlaylists } from "@/api";
import { getPageOffset, scrollInto } from "@/utils";
import PlaylistCard from "@/components/playlist-card.vue";
import TopPlaylistCard from "@/components/top-playlist-card.vue";

export default defineComponent({
  name: "playlists",
  setup() {
    const PAGE_SIZE = 50;
    const tabs = [
      "全部",
      "欧美",
      "华语",
      "流行",
      "说唱",
      "摇滚",
      "民谣",
      "电子",
      "轻音乐",
      "影视原声",
      "ACG",
      "怀旧",
      "治愈",
      "旅行"
    ];
    const route = useRoute();
    const playlistsDOM = ref<HTMLElement | null>(null);
    const state = reactive({
      PAGE_SIZE,
      tabs,
      activeTabIndex: 0,
      playlists: [],
      currentPage: 0,
      total: 0,
      topPlaylist: {}
    });
    // 获取Playlist数据
    const getPlaylistData = async () => {
      const { playlists, total } = await getPlaylists({
        limit: PAGE_SIZE,
        offset: getPageOffset(state.currentPage, PAGE_SIZE),
        cat: state.tabs[state.activeTabIndex]
      });
      state.playlists = playlists;
      state.total = total;
    };
    // 获取TopPlaylist数据
    const getTopPlaylistData = async () => {
      const { playlists } = await getTopPlaylists({
        limit: 1,
        cat: state.tabs[state.activeTabIndex]
      });
      state.topPlaylist = playlists[0] || {};
    };
    // 分页只重新获取歌单列表
    const onPageChange = async (page: number) => {
      state.currentPage = page;
      getPlaylistData();
      scrollInto(playlistsDOM.value);
    };
    // 获取数据
    const initData = () => {
      getPlaylistData();
      getTopPlaylistData();
    };
    // 翻页
    const onTabChange = () => {
      initData();
    };
    // 初始化数据
    initData();

    return {
      ...toRefs(state),
      route,
      playlistsDOM,
      onPageChange,
      onTabChange
    };
  },
  components: {
    PlaylistCard,
    TopPlaylistCard
  }
});
</script>

<style lang="scss">
.playlists-wrapper {
  padding: 12px;

  .top-play-list-card {
    margin-bottom: 16px;
  }

  .playlist-cards {
    display: flex;
    flex-wrap: wrap;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 36px;
  }
}
</style>
