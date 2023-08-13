import { defineComponent, reactive, inject, watch } from "vue";
import "@/sass/editor/ElIcon.scss";
import { usedragger } from "../../hooks/useDragger";
import ElSearch from "./ElSearch";

export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup() {
    const config: any = inject("editorConfig"); //组件配置

    const state: any = reactive({
      search: {
        value: "",
        searchKey: "iconSearch",
        searchDefault: {
          label: "图标分类",
          list: ["用户", "关闭", "哈哈哈"],
        },
        placeholder: "查找图标",
      },
      color: "#000",
      fontSize: 16,
      iconList: config.iconList,
    });

    watch(
      () => state.search.value,
      (newValue) => {
        if (newValue == "") {
          for (let item of state.iconList) {
            item.display = true;
          }
        } else {
          for (let item of state.iconList) {
            if (item.label.indexOf(newValue) >= 0) item.display = true;
            else item.display = false;
          }
        }
      }
    );

    return () => {
      return (
        <div class="ElIcon">
          <div class="ElIcon-top">
            <ElSearch search={state.search}></ElSearch>
          </div>
          <div class="ElIcon-comfig">
            <el-color-picker v-model={state.color}></el-color-picker>
            <el-input-number
              v-model={state.fontSize}
              controls-position="right"
              min={12}
              data-unit="px"
            ></el-input-number>
          </div>
          <div class="ElIcon-list">
            {state.iconList.map((item: any) => {
              return (
                item.display && (
                  <div
                    onMousedown={(e) => {
                      item.defaultData.style.fontSize = `${state.fontSize}px`;
                      item.defaultData.style.color = state.color;
                      usedragger.cloneMousedown(item, e);
                    }}
                  >
                    {item.preview()}
                  </div>
                )
              );
            })}
          </div>
        </div>
      );
    };
  },
});
