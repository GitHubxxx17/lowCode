import "@/sass/erComponent/property.scss";
import { defineComponent } from "vue";
import { Property } from "./commons/select";
// import { Property } from "./containers/container-ordinary";
export default defineComponent({
  setup() {
    return () => {
      return (
        <div class="property">
            <Property></Property>
        </div>
      );
    };
  },
});
