import "@/sass/editor/ErComponent.scss";
import { ErConfig as erConfig } from "../../utils/ErComponent-config";
import { defineComponent, reactive, ref } from "vue";
import { ElInput, ElInputNumber, ElSwitch } from "element-plus";
export default defineComponent({
  props: {
    modelValue: { type: Object },
  },
  setup(props) {
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

    // 普通输入框
    const inputValue = ref("");

    // 下拉器
    const activeNames: string[] = ["1", "2"];

    // switch按钮
    const isOpen = ref(true);

    // 选择器
    // value: "icon iconfont icon-xiaolian",
    let selectValue = ref(""); // 记录选择的内容
    let selectIndex = ref(-1);
    const options = reactive([
      {
        value: "icon iconfont icon-xiaolian",
        label: "icon-xiaolian",
        selected: false,
        render: () => {
          return <span class="icon iconfont icon-xiaolian"></span>;
        },
      },
      {
        value: "icon iconfont icon-xiaolian",
        label: "icon-xiaolian",
        selected: false,
        render: () => {
          return <span class="icon iconfont icon-xiaolian"></span>;
        },
      },
    ]);

    const changeSelectValue = (value: any,index:number): void => {
      selectValue.value = value.label;
      options.map((option) => {
        option.selected = false;
      });
      value.selected = true; // 标记选中的图标
      selectIndex.value = index;
    };

    const clearIcon = (): void => {
      selectValue.value = "";
      options.map((option) => {
        option.selected = false;
      });
    }; // 清除选择的图标内容
    // padding
    let isActive = ref("middle");
    const setPadding = (pos: string): void => {
      isActive.value = pos;
    };
    const padValue = ref(0); // 记录输入的padding值
    const handlePadValueChange = (padValue: number): void => {
      console.log(padValue);
    };

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
          <elCollapse v-model={activeNames}>
            <elCollapseItem title="基本" name="1">
              {/* 输入框 */}
              <div class="elCollapseItem elCollapseInput">
                <div class="elCollapseInput-name">名称</div>
                <ElInput
                  modelValue={inputValue.value}
                  placeholder="请输入名称"
                  clearable
                ></ElInput>
              </div>
              {/* switch按钮 */}
              <div class="elCollapseItem elCollapseButton">
                <div class="elCollapseButton-name">二次确认</div>
                {/* <ElButton></ElButton> */}
                <ElSwitch
                  v-model={isOpen.value}
                  style="--el-switch-on-color: #2468f2;"
                ></ElSwitch>
              </div>
              {/* 选择器 */}
              <div class="elCollapseItem elCollapseSelect">
                <div class="elCollapseSelect-name">左侧图标</div>
                <div class="elCollapseSelect-select">
                  <el-select
                    modelValue={selectValue.value}
                    class="m-2"
                    placeholder="点击选择图标"
                    size="small"
                    clearable
                    clear-icon={() => (
                      <span
                        class="icon iconfont icon-xiaolian"
                        onClick={clearIcon}
                      ></span>
                    )}
                  >
                    {(options || []).map((item, index) => (
                      <el-option
                        class={[item.value, item.selected ? "active" : ""]}
                        key={index}
                        // 将字符串转为标签 (new DOMParser).parseFromString(selectValue.value,"text/html").body
                        label={selectValue.value ? selectValue.value : null}
                        value=""
                        onClick={(): void => changeSelectValue(item,index)}
                      ></el-option>
                    ))}
                  </el-select>
                </div>
              </div>
              {/* padding */}
              <div class="elCollapseItem title">边框</div>
              <div class="elCollapseItem elCollapsePad">
                <div class="elCollapsePad-icon">
                  <div></div>
                  <div class="common">
                    <div
                      class={[
                        "top",
                        isActive.value == "top" ? "active-top" : "",
                      ]}
                      onClick={() => setPadding("top")}
                    ></div>
                  </div>
                  <div></div>
                  <div class="common">
                    <div
                      class={[
                        "left",
                        isActive.value == "left" ? "active-left" : "",
                      ]}
                      onClick={() => setPadding("left")}
                    ></div>
                  </div>
                  <div class="common">
                    <div
                      class={[
                        "middle",
                        isActive.value == "middle" ? "active-middle" : "",
                      ]}
                      onClick={() => setPadding("middle")}
                    ></div>
                  </div>
                  <div class="common">
                    <div
                      class={[
                        "right",
                        isActive.value == "right" ? "active-right" : "",
                      ]}
                      onClick={() => setPadding("right")}
                    ></div>
                  </div>
                  <div></div>
                  <div class="common">
                    <div class="bottom"></div>
                    <div
                      class={[
                        "bottom",
                        isActive.value == "bottom" ? "active-bottom" : "",
                      ]}
                      onClick={() => setPadding("bottom")}
                    ></div>
                  </div>
                  <div></div>
                </div>
                <div class="elCollapsePad-setting">
                  <ElInputNumber
                    modelValue={padValue.value}
                    onChange={handlePadValueChange}
                  ></ElInputNumber>
                  <div class="lineAndColor"></div>
                </div>
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
