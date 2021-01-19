<template>
  <div :style="wrapStyle" class="play-icon-wrap">
    <Icon :size="iconSize" class="play-icon" type="play" />
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
export default defineComponent({
  name: "PlayIcon",
  props: {
    size: {
      type: Number,
      default: 24
    }
  },
  setup(props) {
    const wrapStyle = computed(() => {
      return { width: `${props.size}px`, height: `${props.size}px` };
    });
    const iconSize = computed(() => {
      const iconSize = props.size * 0.6;
      return iconSize;
    });
    return {
      wrapStyle,
      iconSize
    };
  }
});
</script>

<style lang="scss" scoped>
.play-icon-wrap {
  @include flex-center();
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.5);

  .play-icon {
    color: $theme-color;
  }
}
</style>
