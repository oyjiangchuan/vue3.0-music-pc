<template>
  <div class="layout">
    <LayoutHeader />
    <div class="layout-body">
      <!-- <div class="layout-menu" v-show="isMenuShow"> -->
      <div class="layout-menu">
        <LayoutMenu />
      </div>
      <div class="content" id="page-content">
        <router-view :class="routerViewCls" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, reactive, toRefs } from "vue";
import { useRoute } from "vue-router"; // 在组合式API中使用路由，还有useRouter用来跳转
import { layoutCenterNames } from "@/router";
import LayoutHeader from "./header.vue";
import LayoutMenu from "./menu.vue";

export default defineComponent({
  setup() {
    // 获取route对象
    const route = useRoute();
    const state: any = reactive({
      routerViewCls: computed(() => {
        return layoutCenterNames.find(name => name === route.name)
          ? "router-view-center"
          : "router-view-center";
      })
    });
    return {
      ...toRefs(state)
    };
  },
  components: { LayoutHeader, LayoutMenu }
});
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;

  .layout-body {
    display: flex;
    height: calc(100% - #{$header-height});

    .layout-menu {
      // 这个100%已经减去了头部height
      height: calc(100% - #{$mini-player-height});
    }

    .content {
      flex: 1;
      overflow-y: auto;
      min-width: $layout-content-min-width;
      margin-bottom: $mini-player-height;

      .router-view-center {
        max-width: $center-content-max-width;
        margin: auto;
      }
    }
  }
}
</style>
