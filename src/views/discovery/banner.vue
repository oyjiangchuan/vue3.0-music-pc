<template>
  <el-carousel :interval="4000" type="card" class="banner-carousel">
    <el-carousel-item v-for="banner in banners" :key="banner.scm">
      <img
        :src="$utils.genImgUrl(banner.imageUrl, 1000, 400)"
        class="banner-img"
      />
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs, onMounted } from "vue";
import { getBanner } from "@/api/index";

export default defineComponent({
  setup() {
    const state = reactive({
      banners: new Array<any>()
    });
    const getData = async () => {
      const { banners } = await getBanner();
      state.banners = banners;
    };
    onMounted(() => {
      getData();
    });
    return {
      ...toRefs(state)
    };
  }
});
</script>

<style style lang="scss" scoped>
.banner-carousel {
  .banner-img {
    width: 100%;
    height: 100%;
    border-radius: 4px;
  }
}
::v-deep(.el-carousel__container) {
  height: 200px;
}
</style>
