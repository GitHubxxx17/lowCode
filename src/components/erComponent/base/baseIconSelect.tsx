import { defineComponent, reactive } from "vue";
export default defineComponent({
  props: {
    label: { type: String },
  },
  setup(props) {
    const gridselectSetting = reactive({
      isShowList: false, // 是否展示列表
      clearable: false, // 是否有清除键
      isFill: false, // 是否有内容
      icon: "",
      iconText: "点击选择图标",
      clearIcon: "icon-cha",
    });

    // 渲染icon
    const renderIcon = () => {
      return (
        <>
          <span class={["icon iconfont", gridselectSetting.icon]}></span>
          <span class="context">{gridselectSetting.iconText}</span>
        </>
      );
    };

    // 点击清除
    const handleIsFill = (e) => {
      gridselectSetting.isShowList = false;
      gridselectSetting.isFill = !gridselectSetting.isFill;
      gridselectSetting.clearable = !gridselectSetting.clearable;
      e.stopPropagation();
    };

    // 选择的按钮
    const iconNames = [
      "icon-yuanxingdacha",
      "icon-xiaolian",
      "icon-a-Displayinline",
      "icon-yuanxingdacha",
      "icon-xiaolian",
      "icon-a-Displayinline",
      "icon-yuanxingdacha",
      "icon-xiaolian",
      "icon-a-Displayinline",
    ];

    // 选择按钮
    const selectIcon = (item) => {
      gridselectSetting.isShowList = false;
      gridselectSetting.clearable = true;
      gridselectSetting.isFill = true;
      gridselectSetting.icon = item;
      gridselectSetting.iconText = item.replace("icon-", "");
    };
    return () => {
      return (
        <div class="elCollapseItem base-settings flexSelectContainer">
          <p>{props.label}</p>
          <div
            class="flexSelect"
            onClick={() => (gridselectSetting.isShowList = true)}
          >
            <div class="iconContext">
              {gridselectSetting.isFill && renderIcon()}
            </div>
            <span
              class={["clear icon iconfont", gridselectSetting.clearIcon]}
              v-show={gridselectSetting.clearable}
              onClick={(e) => handleIsFill(e)}
              onMouseover={() => (gridselectSetting.clearIcon = "icon-cha1")}
              onMouseout={() => (gridselectSetting.clearIcon = "icon-cha")}
            ></span>
          </div>
          <ul class="flexSelectUl" v-show={gridselectSetting.isShowList}>
            {iconNames.map((item: any) => (
              <li class="flexSelectUl-option" onClick={() => selectIcon(item)}>
                <span class={["icon iconfont", item]}></span>
              </li>
            ))}
          </ul>
        </div>
      );
    };
  },
});
