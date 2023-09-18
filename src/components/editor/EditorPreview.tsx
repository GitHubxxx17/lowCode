import "@/sass/editor/EditorContainer.scss";
import "@/sass/editor/EditorPreview.scss";
import "@/sass/common/common.scss";
import { defineComponent } from "vue";
import { mapRenderer } from "../../hooks/useRender.ts";

export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup(props) {
    return () => {
      return (
        <div class="EditorPreview">
          <div id="body" style={props.EditorData.get("page").style}>
            {mapRenderer("page")}
          </div>
          <div class="EditorPreview-leftMessage">按ESC可退出预览</div>
        </div>
      );
    };
  },
});
