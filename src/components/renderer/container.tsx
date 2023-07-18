import "@/sass/editor/EditorContainer.scss";
import { defineComponent, onMounted, ref } from "vue";
import { usedragger } from "../../hooks/useDragger";

export default defineComponent({
  props: {
    style: Object, //样式
    children: Object, //子节点
    childrenList: Array<Object>, //子节点json数据
    text: String, //无组件时显示的文本内容
    class: String, //类名
  },
  setup(props) {
    let containerRef = ref(null);
    onMounted(() => {
      containerRef.value.attributes.childrenList = props.childrenList;
    });
    return () => {
      return (
        <div
          class={props.class}
          style={props.style}
          ref={containerRef}
          datatype={props.class}
          onMouseenter={(e) => usedragger.mouseenter(e)}
          onMouseleave={(e) => usedragger.mouseleave(e)}
        >
          {props.children.length != 0 ? (
            props.children
          ) : (
            <span class="nochild">{props.text}</span>
          )}
        </div>
      );
    };
  },
});
