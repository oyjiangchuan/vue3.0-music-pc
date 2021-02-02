<template>
  <div
    class="loading"
    element-loading-background="transparent"
    element-loading-spinner="el-icon-loading"
    element-loading-text="载入中"
    v-loading="loading"
    v-show="loading"
  ></div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
export default defineComponent({
  name: "Loading",
  props: {
    loading: {
      type: Boolean as PropType<boolean>
    }
  }
});
</script>

<style lang="scss" scoped>
.loading {
  height: 200px;
}
</style>
