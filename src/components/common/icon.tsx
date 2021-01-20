// Icon组件
import { defineComponent, PropType } from "vue";
import { toRem } from "@/utils";
import "./style/icon.scss";

interface IProps {
  size: number;
  type: string;
  color: string;
  backdrop: boolean;
}

export default defineComponent({
  name: "Icon",
  props: {
    size: {
      type: Number as PropType<number>,
      default: 16
    },
    type: {
      type: String as PropType<string>,
      required: true
    },
    color: {
      type: String as PropType<string>,
      default: ""
    },
    backdrop: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },
  setup(props: IProps, context) {
    const getIconCls = () => {
      let cls = `icon-${props.type}`
      if (props.color) {
        cls += ` icon-color-${props.color}`
      }
      return cls
    }
    // const onClick = (e: any) => {
    //   context.emit("click", e)
    // }
    const getIconStyle = () => {
      const chromeMinSize = 12
      // 支持小于12px
      const retStyle = { fontSize: toRem(props.size), transform: "" }
      if (props.size < chromeMinSize) {
        const ratio = props.size / chromeMinSize
        retStyle.transform = `scale(${ratio})`
      }
      return retStyle
    }
    return () => {
      const Icon = (
        <i
          // onClick={onClick}
          class={`iconfont icon-component ${getIconCls()}`}
          style={getIconStyle()}
        />
      )
      if (props.backdrop) {
        const backDropSizeRatio = 1.56
        const backDropSize = toRem(backDropSizeRatio * props.size)
        return (
          <span
            style={{ width: backDropSize, height: backDropSize }}
            class="backdrop"
          >
            {Icon}
          </span>
        )
      }
      return Icon
    };
  },
});
