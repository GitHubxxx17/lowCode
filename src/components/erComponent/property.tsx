import "@/sass/erComponent/property.scss";
import { defineComponent } from "vue";
import { SelectProperty } from "./commons/select";
// import { Property } from "./containers/container-ordinary";
export default defineComponent({
  setup() {
    return () => {
      return (
        <div class="property">
            <SelectProperty></SelectProperty>
        </div>
      );
    };
  },
});
