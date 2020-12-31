<template>
  <div class="search">
    <a-input-search
      @click="
        () => {
          searchPanelShow = true;
        }
      "
      @input="onInput"
      @keypress.enter="onEnterPress"
      placeholder="搜索"
      ref="input"
      v-model="searchKeyword"
    ></a-input-search>
  </div>
</template>

<script lang="ts">
import storage from "good-storage";
// import { getSearchHot, getSearchSuggest } from "@/api"
import { debounce } from "@/utils";
// import { genArtistisText, debounce } from "@/utils"
const SEARCH_HISTORY_KEY = "__search_history__";
import { defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  name: "Search",
  setup() {
    const state = reactive({
      searchKeyword: "",
      searchPanelShow: false,
      searchHots: [],
      searchHistorys: storage.get(SEARCH_HISTORY_KEY, []),
      suggest: {}
    });

    const onInput = debounce(e => {
      if (!e.target.value.trim()) {
        return;
      }
      console.log(e.target.value);
      // getSearchSuggest(value).then(({ result }) => {
      //   this.suggest = result
      // })
    }, 500);
    const onEnterPress = () => {
      console.log("回车按钮");
    };

    return {
      ...toRefs(state),
      onInput,
      onEnterPress
    };
  }
});
// export default {
//   async created () {
//     const { result: { hots } } = await getSearchHot()
//     this.searchHots = hots
//   },
//   methods: {
//     // value的就是searchKeyword的值,输入框使用防抖函数
//     onInput: debounce(function (value) {
//       if (!value.trim()) {
//         return
//       }
//       getSearchSuggest(value).then(({ result }) => {
//         this.suggest = result
//       })
//     }, 500),
//     // 搜索框按下回车
//     onEnterPress () {
//       if (this.searchKeyword) {
//         this.goSearch(this.searchKeyword)
//       }
//     },
//     // 点击热门搜索标签
//     onClickHot (hot) {
//       const { first } = hot
//       this.goSearch(first)
//     },
//     goSearch (keywords) {
//       this.searchHistorys.push({ first: keywords })
//       storage.set(SEARCH_HISTORY_KEY, this.searchHistorys)
//       this.$router.push(`/search/${keywords}`)
//       this.searchPanelShow = false
//     },
//     // 点击搜索单曲列表item
//     onClickSong () {},
//     // 点击搜索歌单列表item
//     onClickPlaylist () {},
//     // 点击搜索mv列表item
//     onClickMv () {}
//   },
//   computed: {
//     suggestShow () {
//       return (this.searchKeyword.length && ["songs", "playlists"].find(key => { return (this.suggest[key] && this.suggest[key].length) }))
//     },
//     normalizedSuggests () {
//       return [
//         {
//           title: "单曲",
//           icon: "music",
//           data: this.suggest.songs,
//           renderName (song) {
//             return `${song.name} - ${genArtistisText(song.artists)}`
//           },
//           onClick: this.onClickSong.bind(this)
//         },
//         {
//           title: "歌单",
//           icon: "playlist",
//           data: this.suggest.playlists,
//           onClick: this.onClickPlaylist.bind(this)
//         },
//         {
//           title: "mv",
//           icon: "mv",
//           data: this.suggest.mvs,
//           renderName (mv) {
//             return `${mv.name} - ${genArtistisText(mv.artists)}`
//           },
//           onClick: this.onClickMv.bind(this)
//         }
//       ].filter(item => item.data && item.data.length)
//     }
//   }
// }
</script>

<style lang="scss" scoped>
.search {
  width: 150px;
  position: relative;

  .search-panel {
    position: fixed;
    top: $header-height;
    bottom: $mini-player-height;
    right: 0;
    width: 350px;
    background: var(--search-bgcolor);
    z-index: $search-panel-z-index;
    font-size: $font-size-sm;
    overflow-y: auto;
    @include box-shadow;

    .block {
      padding: 16px 24px;

      .title {
        color: var(--font-color-grey);
        margin-bottom: 16px;
      }

      .tags {
        display: flex;
        flex-wrap: wrap;

        .button {
          margin-bottom: 12px;
          margin-right: 6px;
          font-size: $font-size-sm;
        }
      }

      .empty {
        @include flex-center();
        color: var(--font-color-grey);
        font-size: $font-size;
        height: 100px;
      }
    }

    .suggest-item {
      margin-bottom: 16px;

      .title {
        margin: 16px 8px 8px;
        color: var(--font-color-grey-shallow);
      }

      .list {
        .item {
          padding: 12px 24px;
          cursor: pointer;
          @include text-ellipsis();

          &:hover {
            background: var(--light-bgcolor);
          }
        }
      }
    }
  }
}
</style>
