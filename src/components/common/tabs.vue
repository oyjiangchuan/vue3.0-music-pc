<template>
  <ul class="tab-wrap" :class="{ [align]: true }">
    <template v-if="isRouteMode">
      <router-link
        v-for="(tab, index) in normalizedTabs"
        :key="index"
        :active-class="`${ROUTE_ACTIVE_CLS} ${activeItemClass}`"
        :to="tab.to"
        class="tab-item"
        ref="routerLinks"
        tag="li"
      >
        <span class="title">{{ tab.title }}</span>
      </router-link>
    </template>
    <template v-else>
      <li
        class="tab-item"
        v-for="(tab, index) in normalizedTabs"
        :key="index"
        :class="getItemCls(tab, index)"
        :style="getItemStyle(tab, index)"
        @click="onChangeTab(tab, index)"
      >
        <span class="title">{{ tab.title }}</span>
      </li>
    </template>
  </ul>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, computed, PropType } from "vue";
import { useRouter, useRoute } from "vue-router";
import { isDef } from "@/utils";

const ACTIVE_PROP = "active";
// const ACTIVE_CHANGE = "tabChange";
const ROUTE_ACTIVE_CLS = "active";

export default defineComponent({
  name: "Tabs",
  props: {
    // 组件使用时v-model的值
    active: {
      type: Number as PropType<number>,
      default: 0
    },
    tabs: {
      type: Array as PropType<Array<string | any>>,
      default: () => []
    },
    align: {
      type: String as PropType<string>,
      default: "left"
    },
    itemStyle: {
      type: Object as PropType<object>, // 这里可以使用一个接口
      default: () => ({})
    },
    activeItemStyle: {
      type: Object as PropType<object>,
      default: () => ({})
    },
    itemClass: {
      type: String as PropType<string>
    },
    activeItemClass: {
      type: String as PropType<string>
    },
    // 不传的话对应大号字体 高亮加粗
    // small对应小号字体 高亮红色
    // split对应小号字体 分割线分隔 高亮背景色变灰文字变红
    type: {
      type: String as PropType<string>
    }
    // vue3中的写法
    // modelValue: {
    //   type: Number as PropType<number>
    // }
  },
  // vue2x中的用法
  // model: {
  //   // 这里的prop选项是代表组件使用时v-model的值？
  //   prop: ACTIVE_PROP,
  //   event: ACTIVE_CHANGE
  // },
  emits: ["update:active"],
  setup(props, { emit }) {
    const router = useRouter();
    const route = useRoute();
    const state = reactive({
      ROUTE_ACTIVE_CLS
    });
    const isRouteMode = computed(() => {
      return props.tabs.length && isDef(props.tabs[0].to);
    });
    const normalizedTabs = computed(() => {
      return typeof props.tabs[0] === "string"
        ? props.tabs.map(tab => ({ title: tab }))
        : props.tabs;
    });
    // 点击切换事件
    const onChangeTab = (tab: any, index: number) => {
      if (isRouteMode.value) {
        router.push(tab.to);
      } else {
        emit("update:active", index);
      }
    };
    // 判断是否点击选中
    const isActive = (tab: string | any, index: number) => {
      // 路由模式
      if (isRouteMode.value) {
        const { path: resolvedPath } = router.resolve(tab.to);
        return resolvedPath === route.path;
      } else {
        return index === props[ACTIVE_PROP];
      }
    };
    // 赋类名
    const getItemCls = (tab: string | any, index: number) => {
      const base: string[] = [];
      if (props.itemClass) {
        base.push(props.itemClass);
      }
      if (props.type) {
        base.push(props.type);
      }
      if (isActive(tab, index)) {
        if (props.activeItemClass) {
          base.push(props.activeItemClass);
        }
        base.push("active");
      }
      return base.join(" ");
    };
    // 赋样式
    const getItemStyle = (tab: string | any, index: number) => {
      return Object.assign(
        {},
        props.itemStyle,
        isActive(tab, index) ? Object.assign({}, props.activeItemStyle) : null
      );
    };
    return {
      ...toRefs(state),
      isRouteMode,
      normalizedTabs,
      getItemCls,
      getItemStyle,
      onChangeTab
    };
  }
});
</script>

<style lang="scss" scoped>
.tab-wrap {
  display: flex;

  &.center {
    justify-content: center;
  }

  &.right {
    justify-content: flex-end;
  }

  .tab-item {
    padding: 12px 0;
    margin: 0 12px;
    color: var(--tab-item-color);
    font-size: $font-size-medium;
    white-space: nowrap;
    cursor: pointer;

    &.active {
      color: var(--tab-item-active-color);
      &:hover {
        color: var(--tab-item-active-color);
      }
    }

    // 对应prop中的type字段
    &.small {
      font-size: $font-size-sm;

      &.active {
        color: $theme-color;
      }
    }

    &.theme {
      font-size: $font-size;

      &.active {
        color: $theme-color;
        border-bottom: 2px solid $theme-color;
        font-weight: $font-weight-bold;
      }
    }

    &.split {
      font-size: $font-size-sm;
      padding: 4px 12px;
      margin: 0 16px;
      border-radius: 999em;

      &.active {
        color: $theme-color;
        background: var(--shallow-theme-bgcolor);
      }

      &:not(:last-child) {
        &::after {
          position: relative;
          left: 28px;
          width: 1px;
          height: 100%;
          background: var(--border);
          display: inline-block;
          vertical-align: middle;
          content: " ";
        }

        .title {
          vertical-align: middle;
        }
      }
    }

    &:hover {
      color: var(--tab-item-hover-color);
    }
  }
}
</style>
