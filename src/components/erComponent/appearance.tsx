import "@/sass/erComponent/appearance.scss";
import { defineComponent } from "vue"
// import { TextAppearance } from "./commons/text";
import { MultilineTextAppearance } from "./form/multilineText";
export default defineComponent({
  setup() {
    return () => {
      return (
        <div class="appearance">
          <MultilineTextAppearance></MultilineTextAppearance>
        </div>  
      );
    };
  },
});
