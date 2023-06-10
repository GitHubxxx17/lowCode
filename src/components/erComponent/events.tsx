import "@/sass/erComponent/events.scss";
import { defineComponent} from "vue";
export default defineComponent({
  setup() {
    return () => {
      return (
        <div class="events">
          <div class="addEvents">
            <span>添加事件</span>
          </div>
        </div>
      );
    };
  },
});
