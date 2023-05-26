import "@/sass/editor/EditorContainer.scss";
import { defineComponent } from "vue";
export default defineComponent({
    props:{
        EditorData:Object
    },
  setup(props) {
    console.log(props.EditorData.container);
    // props.EditorData.container.width = 600;
    return () => {
      return (
        <div class="EditorContainer">

        </div>
      );
    };
  },
});
