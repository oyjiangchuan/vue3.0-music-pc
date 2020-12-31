<template>
  <div class="routes-history">
    <Icon class="icon" :backdrop="true" type="back" @click="back" />
    <Icon :backdrop="true" type="forward" @click="forward" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  setup() {
    const router = useRouter();
    const back = () => {
      router.back();
    };
    const forward = () => {
      router.forward();
    };
    return {
      back,
      forward
    };
  }
});
</script>

<style lang="scss" scoped>
.routes-history {
  display: flex;
  align-items: center;

  .icon {
    margin-right: 16px;
  }
}
</style>
