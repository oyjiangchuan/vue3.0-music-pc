<template>
  <div class="pagination" v-if="total > pageSize">
    <el-pagination
      :pageSize="pageSize"
      :total="total"
      layout="prev, pager, next"
      v-bind="$attrs"
    ></el-pagination>
    <!-- vue3中移除了v-on="$listeners" 合并到v-bind="$attrs"上面 -->
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "Pagination",
  props: {
    pageSize: {
      type: Number as PropType<number>
    },
    total: {
      type: Number as PropType<number>
    }
  }
});
</script>

<style lang="scss" scoped>
.pagination {
  text-align: right;
}
</style>
