<template>
  <div class="recommendMV">
    <Title>推荐MV</Title>
    <ul class="list-wrap">
      <li class="list-item" v-for="mv in mvs" :key="mv.id">
        <MvCard
          :author="mv.artistName"
          :id="mv.id"
          :img="mv.picUrl"
          :name="mv.name"
          :playCount="mv.playCount"
        />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { getPersonalizedMv } from "@/api";
import MvCard from "@/components/mv-card.vue";

export default defineComponent({
  setup() {
    const state = reactive({
      mvs: Array<any>()
    });
    const getMvs = async () => {
      const { result } = await getPersonalizedMv();
      state.mvs = result;
    };
    getMvs();

    return {
      ...toRefs(state)
    };
  },
  components: { MvCard }
});
</script>

<style lang="scss" scoped>
.recommendMV {
  @include list(25%);
}
</style>
