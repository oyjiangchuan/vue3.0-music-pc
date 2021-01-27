<template>
  <div class="title-wrap">
    <p class="title">
      <slot></slot>
    </p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Title"
});
</script>

<style lang="scss" scoped>
.title-wrap {
  display: flex;
  padding: 12px 0;

  .title {
    font-size: $font-size-title;
    color: var(--font-color-white);
  }
}
</style>
