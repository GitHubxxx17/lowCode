import "@/sass/editor/EditorContainer.scss";
import { defineComponent, onMounted, ref } from "vue";
import { usedragger } from "../../hooks/useDragger";
import { mapRenderer } from "../../hooks/useRender.ts";

export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup(props) {
    let containerRef = ref(null);

    onMounted(() => {
      containerRef.value.attributes.childrenList = props.EditorData.get('page').children;
    });

    return () => {
      return (
        <div
          class="Editorcontainer"
          ref={containerRef}
          onMouseenter={(e) => usedragger.mouseenter(e)}
          onClick={(e) => usedragger.onclickToDrag(e)}
          style={props.EditorData.style}
          data-id='page'
        >
          {mapRenderer('page')}
        </div>
      );
    };
  },
});
