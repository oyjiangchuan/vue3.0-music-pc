<template>
  <div @click="onClick" class="n-button">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "NButton",
  props: {
    type: {
      type: String as PropType<string>,
      default: "common"
    }
  },
  emit: ["click"],
  setup(props, { emit }) {
    const onClick = (e: any) => {
      emit("click", e); // 好像无用
    };
    return {
      onClick
    };
  }
});
</script>

<style lang="scss" scoped>
.n-button {
  padding: 5px 16px;
  display: inline-block;
  border: 1px solid var(--button-border-color);
  border-radius: 2px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background: var(--button-hover-bgcolor);
  }
}
</style>
