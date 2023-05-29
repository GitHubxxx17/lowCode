import "@/sass/editor/ErComponent.scss";
import { defineComponent, reactive } from "vue";
import property from "../erComponent/property";
import appearance from "../erComponent/appearance";
export default defineComponent({
  setup() {
    interface btn {
      label: String; // 标签
      active: boolean; // 是否被选择了
      isShow: boolean; // 是否显示
    }
    // 切换菜单
    const buttons: btn[] = reactive([
      { label: "属性", active: true, isShow: true },
      { label: "外观", active: false, isShow: true },
      { label: "事件", active: false, isShow: true },
    ]);

    // 选择按钮的点击事件selectBtn
    const selectBtn = (index: number) => {
      buttons.forEach((button, i) => {
        if (i == index) {
          button.active = true;
          return;
        }
        button.active = false;
      });
    };
    console.log(property);
    console.log(appearance);
    

    return () => {
      return (
        <div class="ErComponent">
          <div class="ErComponent-nav">
            {buttons.map((button, index) => {
              return (
                <label
                  v-show={button.isShow}
                  onClick={() => selectBtn(index)}
                  class={[
                    button.active ? "ErComponent-nav-active" : "",
                    "ErComponent-nav-btn",
                  ]}
                >
                  {button.label}
                </label>
              );
            })}
          </div>
          {buttons[0].active && <property></property>}
          {buttons[1].active && <appearance></appearance>}
          {/* {buttons[1].active && <appearance></appearance>} */}
          {buttons[2].active && <property></property>}
        </div>
      );
    };
  },
});
