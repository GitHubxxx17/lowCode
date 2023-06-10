import { defineComponent, reactive, ref } from "vue";
import { ElInput, ElSwitch } from "element-plus";
export const appearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    return () => {
      return <div></div>;
    };
  },
});

export const Property = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {

    // 普通输入框
    const inputValue = ref("");
    
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

    const changeSelectValue = (value: any, index: number): void => {
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

    return () => {
      return (
        <>
          {/* 输入框 */}
          <div class="elCollapseItem elCollapseInput">
            <div class="elCollapseInput-name">名称</div>
            <ElInput
              v-model={inputValue.value}
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
              <div></div>
              <el-select
                v-model={selectValue.value}
                class="m-2"
                placeholder="点击选择图标"
                size="small"
                clearable
                clear-icon={() => (
                  <span
                    class="icon iconfont icon-yuanxingdacha"
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
                    onClick={(): void => changeSelectValue(item, index)}
                  ></el-option>
                ))}
              </el-select>
            </div>
          </div>
        </>
      );
    };
  },
});

 
