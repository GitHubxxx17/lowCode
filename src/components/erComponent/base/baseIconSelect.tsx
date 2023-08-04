import { defineComponent } from "vue";
import pinia from "../../../stores/index.ts";
import dragStore from "../../../stores/dragStore.ts";
import mainStore from "../../../stores/mainStore.ts";
export default defineComponent({
  props: {
    label: { type: String },
    setting: { type: Object },
    otherShow: { type: Boolean },
  },
  setup(props) {
    const dragData = dragStore(pinia); //拖拽数据
    const mainData = mainStore(pinia); //拖拽数据
    // 初始化渲染
    (() => {
      if (props.setting.icon && props.setting.iconText) {
        props.setting.isFill = true;
        props.setting.clearable = true;
      }
    })();

    // 点击显示列表
    const showIconList = (e:any) => {
      if (props.setting.isShowList) {
        props.setting.isShowList = false;
      } else {
        props.setting.isShowList = true;
      }
      e.stopPropagation();
    };

    // 渲染icon
    const renderIcon = () => {
      return (
        <>
          <span class={["icon iconfont", props.setting.icon]}></span>
          <span class="context">{props.setting.iconText}</span>
        </>
      );
    };

    // 点击清除
    const handleIsFill = (e:any) => {
      props.setting.isShowList = false;
      props.setting.isFill = !props.setting.isFill;
      props.setting.clearable = !props.setting.clearable;
      if (props.label == "左侧图标") {
        mainData.EditorDataMap.get(dragData.selectKey).icon.leftIcon = "";
      }
      if (props.label == "右侧图标") {
        mainData.EditorDataMap.get(dragData.selectKey).icon.rightIcon = "";
      }
      e.stopPropagation();
    };

    // 选择的按钮列表
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
    const selectIcon = (item:string) => {
      props.setting.isShowList = false;
      props.setting.clearable = true;
      props.setting.isFill = true;
      props.setting.icon = item;
      props.setting.iconText = item.replace("icon-", "");
      if (props.label == "左侧图标") {
        mainData.EditorDataMap.get(dragData.selectKey).icon.leftIcon = item;
      }
      if (props.label == "右侧图标") {
        mainData.EditorDataMap.get(dragData.selectKey).icon.rightIcon = item;
      }
    };

    // 页面点击时关闭按钮列表
    document.addEventListener("click", () => {
      if (props.setting.isShowList) {
        props.setting.isShowList = false;
      }
    });
    return () => {
      return (
        <div class="elCollapseItem base-settings flexSelectContainer">
          <p>{props.label}</p>
          <div class="flexSelect" onClick={(e) => showIconList(e)}>
            <div class="iconContext">
              {props.setting.isFill ? renderIcon() : "请选择图标"}
            </div>
            <span
              class={["clear icon iconfont", props.setting.clearIcon]}
              v-show={props.setting.clearable}
              onClick={(e) => handleIsFill(e)}
              onMouseover={() => (props.setting.clearIcon = "icon-cha1")}
              onMouseout={() => (props.setting.clearIcon = "icon-cha")}
            ></span>
          </div>
          <ul class="flexSelectUl" v-show={props.setting.isShowList}>
            {iconNames.map((item: any) => (
              <li class="flexSelectUl-option" onClick={_ => selectIcon(item)}>
                <span class={["icon iconfont", item]}></span>
              </li>
            ))}
          </ul>
        </div>
      );
    };
  },
});
