<template>
  <div class="recommend">
    <Title>推荐歌单</Title>
    <div class="list-wrap">
      <PlaylistCard
        v-for="item in list"
        :desc="item.copywriter"
        :id="item.id"
        :img="item.picUrl"
        :key="item.id"
        :name="item.name"
      />
    </div>
  </div>
</template>

<script lang="ts">
import PlaylistCard from "@/components/playlist-card.vue";
import { defineComponent, reactive, toRefs } from "vue";
import { getRecommendList } from "@/api/index";

export default defineComponent({
  setup() {
    const state = reactive({
      list: new Array<any>()
    });
    const getData = async () => {
      const { result } = await getRecommendList({ limit: 10 });
      state.list = result;
    };
    getData();
    return {
      ...toRefs(state)
    };
  },
  components: { PlaylistCard }
});
</script>

<style lang="scss" scoped>
.list-wrap {
  margin: 0 -4px;
  display: flex;
  flex-wrap: wrap;
}
</style>
