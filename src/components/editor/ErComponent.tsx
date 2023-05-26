import "@/sass/editor/ErComponent.scss";
import { ErConfig as erConfig } from "../../utils/ErComponent-config";
import { defineComponent, reactive, ref } from "vue";
import { ElInput, ElSwitch } from "element-plus";
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
    console.log(erConfig.componentList);

    // 下拉器
    const activeNames: string[] = ["1", "2"];
    // 按钮
    const isOpen = ref(true);
    // 选择器
    const selectValue = ref("");

    const options = [
      {
        value: "Option1",
        label: "Option1",
      },
      {
        value: "Option2",
        label: "Option2",
      },
      {
        value: "Option3",
        label: "Option3",
      },
      {
        value: "Option4",
        label: "Option4",
      },
      {
        value: "Option5",
        label: "Option5",
      },
    ];

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
              <div class="elCollapseItem elCollapseInput">
                <div class="elCollapseInput-name">名称</div>
                <ElInput></ElInput>
              </div>
              <div class="elCollapseItem elCollapseButton">
                <div class="elCollapseButton-name">二次确认</div>
                {/* <ElButton></ElButton> */}
                <ElSwitch
                  v-model={isOpen.value}
                  style="--el-switch-on-color: #2468f2;"
                ></ElSwitch>
              </div>
              <div class="elCollapseItem elCollapseInput">
                <div class="elCollapseInput-name">左侧图标</div>
                <el-select
                  v-model={selectValue}
                  class="m-2"
                  placeholder="点击选择图标"
                  size="small"
                >
                  {options.map((item) => (
                    <el-option
                      key={item.value}
                      label={item.value}
                      value={item.value}
                    ></el-option>
                  ))}
                </el-select>
              </div>
              {/* {erConfig.componentList.map((component) => component.render())} */}
            </elCollapseItem>
            <elCollapseItem title="123" name="2">
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
