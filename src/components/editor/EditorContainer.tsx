import "@/sass/editor/EditorContainer.scss";
import { defineComponent, onMounted, ref } from "vue";
import { usedragger } from "../../hooks/useDragger.ts";
// import { usedrag } from "../../hooks/useDragg.ts";
// import { mapRenderer } from "../../hooks/useRender.ts";s
// import { findSelectNode } from "../../hooks/useMenu.ts";
import { showMenu } from "../../hooks/useMenu.ts";
// import dragStore from "../../stores/dragStore.ts";
import pinia from "../../stores/index.ts";
import mainStore from "../../stores/mainStore.ts";
import TransitionDrag from "../renderer/transitionDrag.vue";

export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup(props) {
    const mainData = mainStore(pinia);
    let containerRef = ref(null);
    // const dragData = dragStore(pinia);
    onMounted(() => {
      containerRef.value.attributes.childrenList =
        props.EditorData.get("page").children;
      mainData.rootNode = containerRef;

      // watch(
      //   () => dragData.selectKey,
      //   (newVal) => {
      //     dragData.dragEl = findSelectNode(containerRef.value.children, newVal);
      //   }
      // );
    });
    return () => {
      return (
        <div
          v-contextmenu={showMenu}
          class="Editorcontainer"
          ref={containerRef}
          onMouseenter={(e) => usedragger.mouseenter(e)}
          onClick={(e) => usedragger.onclickToDrag(e)}
          style={props.EditorData.style}
          data-key="page"
        >
          <TransitionDrag dataKey={"page"}></TransitionDrag>
        </div>
      );
    };
  },
});
