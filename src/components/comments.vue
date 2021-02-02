<template>
  <div class="commonts-wrap">
    <template v-if="loading">
      <Loading :loading="loading" />
    </template>
    <template v-else>
      <div class="block" v-if="shouldHotCommentShow">
        <p class="title">精彩评论</p>
        <Comment
          :border="!$utils.isLast(index, hotComments)"
          :comment="comment"
          v-for="(comment, index) in hotComments"
          :key="comment.id"
        />
      </div>
      <div class="block" v-if="shouldCommentShow">
        <p class="title" ref="commentTitle">
          最新评论<span class="count">({{ total }})</span>
        </p>
        <Comment
          :border="!$utils.isLast(index, comments)"
          :comment="comment"
          :key="comment.id"
          v-for="(comment, index) in comments"
        />
      </div>
      <Pagination
        :current-page="currentPage"
        :pageSize="PAGE_SIZE"
        :total="total"
        @current-change="onPageChange"
        class="pagination"
      />
    </template>
    <empty v-if="!loading && !shouldHotCommentShow && !shouldCommentShow"
      >还没有评论哦~</empty
    >
  </div>
</template>

<script lang="ts">
import {
  getSongComment,
  getPlaylistComment,
  getHotComment,
  getMvComment
} from "@/api";
import { getPageOffset, scrollInto } from "@/utils";
import Comment from "./comment.vue";
import {
  defineComponent,
  reactive,
  PropType,
  watch,
  computed,
  ref,
  toRefs,
  nextTick
} from "vue";

const SONG_TYPE = "song";
const PLAYLIST_TYPE = "playlist";
const MV_TYPE = "mv";
const PAGE_SIZE = 20;

export default defineComponent({
  components: { Comment },
  props: {
    id: {
      type: Number as PropType<number>,
      required: true
    },
    type: {
      // SONG_TYPE, PLAYLIST_TYPE, MV_TYPE 之一
      type: String as PropType<string>,
      default: SONG_TYPE
    }
  },
  emit: ["update"],
  setup(props, { emit }) {
    const commentTitle = ref<HTMLElement | null>(null);
    const state = reactive({
      PAGE_SIZE: PAGE_SIZE,
      loading: false,
      hotComments: [] as Comment[],
      comments: [] as Comment[],
      total: 0,
      currentPage: 1
    });
    const shouldHotCommentShow = computed(() => {
      return state.hotComments.length > 0 && state.currentPage === 1;
    });
    const id = computed(() => {
      return props.id;
    });
    const shouldCommentShow = computed(() => {
      return state.comments.length > 0;
    });
    const getComment = async () => {
      state.loading = true;
      const commentRequestMap: CommonInterFace = {
        [PLAYLIST_TYPE]: getPlaylistComment,
        [SONG_TYPE]: getSongComment,
        [MV_TYPE]: getMvComment
      };
      const commentRequest = commentRequestMap[props.type];
      const {
        hotComments = [],
        comments = [],
        total
      }: {
        hotComments: Comment[];
        comments: Comment[];
        total: number;
      } = await commentRequest({
        id: props.id,
        pageSize: PAGE_SIZE,
        offset: getPageOffset(state.currentPage, PAGE_SIZE)
      }).finally(() => {
        state.loading = false;
      });

      // 歌单的热评需要单独请求接口获取
      if (props.type === PLAYLIST_TYPE && state.currentPage === 1) {
        const {
          hotComments: exactHotComments = []
        }: { hotComments: Comment[] } = await getHotComment({
          id: props.id,
          type: 2 // 歌单type
        });
        state.hotComments = exactHotComments;
      } else {
        state.hotComments = hotComments;
      }

      state.comments = comments;
      state.total = total;
      emit("update", { comments, hotComments, total });
    };
    const onPageChange = async () => {
      await getComment();
      // 组合式使用$nextTick 在挂载完之后执行回调
      nextTick(() => {
        scrollInto(commentTitle.value);
      });
    };
    watch(
      id,
      newId => {
        if (newId) {
          state.currentPage = 1;
          getComment();
        }
      },
      { immediate: true }
    );
    return {
      ...toRefs(state),
      shouldHotCommentShow,
      shouldCommentShow,
      commentTitle,
      onPageChange
    };
  }
});
</script>

<style lang="scss" scoped>
.block {
  margin-bottom: 48px;

  .title {
    font-size: $font-size-lg;
    font-weight: $font-weight-bold;
    margin-bottom: 4px;
  }
}
</style>
