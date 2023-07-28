import "@/sass/editor/EditorContainer.scss";
import { defineComponent, onMounted, ref } from "vue";
import { usedragger } from "../../hooks/useDragger";
import { renderer } from "../../hooks/useRender.ts";

export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup(props) {
    let containerRef = ref(null);

    onMounted(() => {
      containerRef.value.attributes.childrenList = props.EditorData.body;
      const determineScope = () => {
        // let { clientX, clientY } = e; // 获取鼠标松开的坐标
        // let { top, left } = containerRef.getBoundingClientRect();
        // console.log(top, left);

        // if (clientX > 0) console.log(clientX, clientY);
        return false;
      };
      console.log(usedragger.deterWhetherToMoveUp(determineScope));
    });

    return () => {
      return (
        <div
          class="Editorcontainer"
          ref={containerRef}
          onMouseenter={(e) => usedragger.mouseenter(e)}
          onClick={(e) => usedragger.onclickToDrag(e)}
          style={props.EditorData.style}
        >
          {renderer(props.EditorData.body)}
        </div>
      );
    };
  },
});
