<template>
  <div class="header">
    <div class="left">
      <div class="buttons">
        <div class="mac-button red" @click="goHomePage">
          <Icon :size="9" type="home" />
        </div>
        <div class="mac-button yellow" @click="exitFullscreen">
          <Icon :size="9" type="minus" />
        </div>
        <div class="mac-button green" @click="fullscreen">
          <Icon :size="9" type="fullscreen" />
        </div>
      </div>
      <!-- 缩起播放器 -->
      <div class="shrink-player" v-show="isPlayerShow" @click="onClickDown">
        <Icon :backdrop="true" type="down" />
      </div>
      <!-- 路由记录器 -->
      <div class="history" v-show="!isPlayerShow">
        <RoutesHistory />
      </div>
    </div>
    <div class="right">
      <div class="search-wrap">
        <Search />
      </div>
      <Theme />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import Theme from "@/components/theme.vue";
import Search from "@/components/search.vue";
import RoutesHistory from "@/components/routes-history.vue";

export default defineComponent({
  setup() {
    const state = reactive({
      isPlayerShow: false
    });
    // 返回主页
    const goHomePage = () => {
      console.log("goHomePage");
    };
    // 关闭全屏
    const exitFullscreen = () => {
      console.log("exitFullscreen");
    };
    // 打卡全屏
    const fullscreen = () => {
      console.log("fullscreen");
    };
    // 收起播放详情页
    const onClickDown = () => {
      console.log("onClickDown");
    };
    return {
      ...toRefs(state),
      goHomePage,
      exitFullscreen,
      fullscreen,
      onClickDown
    };
  },
  components: { Theme, RoutesHistory, Search }
});
</script>

<style lang="scss" scoped>
@import "~@/style/antd-overwrite.scss";

.header {
  display: flex;
  justify-content: space-between;
  height: $header-height;
  background-color: var(--header-bgcolor);
  padding-right: 36px;

  @include ant-input-theme(
    var(--header-input-color),
    var(--header-input-bgcolor),
    var(--header-input-placeholder-color)
  );

  /* ::v-deep.iconfont {
    // 这里的样式没有生效 使用/deep/ 又出现了错误。待解决
    // ===> 已解决: 使用::v-deep代替/deep/
    // 有些像 Sass 之类的预处理器无法正确解析 >>>。这种情况下你可以使用 /deep/ 或 ::v-deep 操作符取而代之——两者都是 >>> 的别名，同样可以正常工作(vue-loader官方文档：https://vue-loader.vuejs.org/zh/guide/scoped-css.html#%E5%AD%90%E7%BB%84%E4%BB%B6%E7%9A%84%E6%A0%B9%E5%85%83%E7%B4%A0)
    color: var(--header-font-color);
  } */

  .left {
    padding: 14px 14px 0 8px;
    display: flex;

    .font-weight {
      white-space: nowrap;
    }

    .buttons {
      display: flex;

      &:hover {
        .mac-button > i {
          opacity: 1;
        }
      }

      .mac-button {
        @include round(12px);
        @include flex-center;
        margin-right: 8px;
        cursor: pointer;

        &.red {
          background: #ed655a;
        }

        &.green {
          background: #72be47;
        }

        &.yellow {
          background: #e0c04c;
        }

        i {
          opacity: 0;
          transition: opacity 0.3s;
          color: $black;
          font-weight: $font-weight-bold;
          transform-origin: center center;
        }
      }
    }

    .shrink-player {
      position: relative;
      top: -6px;
      margin-left: 16px;
    }

    .history {
      margin-left: 65px;
    }

    .actions {
      margin-left: 70px;
    }
  }

  .right {
    display: flex;
    align-items: center;

    .search-wrap {
      margin-right: 16px;
    }
  }
}
</style>
