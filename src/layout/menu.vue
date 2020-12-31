<template>
  <div class="menu">
    <!-- <user /> -->
    <div class="menu-wrapper">
      <div
        class="menu-block"
        v-for="(menu, index) in menusWithPlaylist"
        :key="index"
      >
        <p class="menu-block-title" v-if="menu.title">{{ menu.title }}</p>
        <ul class="menu-list">
          <!-- router-link 在vue-router4.0中去除了tag属性 https://next.router.vuejs.org/api/#router-link-props -->
          <router-link
            :key="index"
            :to="item.path"
            active-class="menu-item-active"
            class="menu-item"
            v-for="(item, index) in menu.children"
          >
            <Icon :size="16" :type="item.meta.icon" class="iconfont" />
            <span class="menu-title">{{ item.meta.title }}</span>
          </router-link>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { menuRoutes } from "@/router";
import { computed, defineComponent, reactive, toRefs } from "vue";

export default defineComponent({
  setup() {
    const state: any = reactive({
      menus: [
        {
          type: "root",
          children: menuRoutes
        }
      ],
      menusWithPlaylist: computed(() => {
        return state.menus;
      })
    });
    return {
      ...toRefs(state)
    };
  }
});
</script>

<style lang="scss" scoped>
.menu {
  width: 250px;
  height: 100%;
  display: flex;
  flex-direction: column;
  background-color: var(--menu-bgcolor);

  .menu-wrapper {
    flex: 1;
    overflow: hidden;
    overflow-y: auto;

    .menu-block {
      margin-bottom: 16px;

      .menu-block-title {
        font-size: $font-size-sm;
        color: var(--font-color-grey2);
        padding-left: 16px;
        margin-bottom: 8px;
      }

      .menu-list {
        .menu-item {
          display: block;
          color: var(--font-color);
          @include text-ellipsis;

          padding: 12px 18px;
          cursor: pointer;

          &:hover {
            background: var(--menu-item-hover-bg);
          }

          &-active {
            color: $theme-color;
            background: var(--menu-item-active-bg);

            i {
              color: $theme-color;
            }
          }

          .iconfont {
            font-size: $font-size-medium-sm;
          }

          .menu-title {
            font-size: $font-size-medium-sm;
            margin-left: 8px;
          }
        }
      }
    }
  }
}
</style>
