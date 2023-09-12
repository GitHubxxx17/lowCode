import "@/sass/editor/EditorContainer.scss";
import { defineComponent } from "vue";
import { mapRenderer } from "../../hooks/useRender.ts";

export default defineComponent({
  setup() {
    return () => {
      return mapRenderer('page');
    };
  },
});
