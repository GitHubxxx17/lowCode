import "@/sass/editor/ErComponent.scss";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    interface btn {
      label: String; // 标签
      active: boolean; // 是否被选择了
    }

    const buttons: btn[] = reactive([
      { label: "属性", active: true },
      { label: "外观", active: false },
      { label: "事件", active: false },
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

    const activeNames: string[] = ["1", "2"];
    return () => {
      return (
        <div class="ErComponent">
          <div class="ErComponent-nav">
            {buttons.map((button, index) => {
              return (
                <label
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
          <elCollapse v-model={activeNames}>
            <elCollapseItem title="基本" name="1">
              <div class="elCollapseItem">名称</div>
              <div class="elCollapseItem">二次确认</div>
              <div class="elCollapseItem">名称</div>
              <div class="elCollapseItem">名称</div>
              <div class="elCollapseItem">名称</div>
            </elCollapseItem>
          </elCollapse>
        </div>
      );
    };
  },
});
