import "@/sass/editor/EditorContainer.scss";
import { defineComponent } from "vue";
import { renderer } from "../../hooks/useRender.ts";

export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup(props) {
    return () => {
      return renderer(props.EditorData?.body);
    };
  },
});
