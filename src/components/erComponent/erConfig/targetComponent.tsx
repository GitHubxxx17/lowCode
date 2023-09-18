import { defineComponent, reactive, watchEffect } from "vue";
import {
  BaseSwitch,
  BaseSelect,
  BaseTextArea,
  BaseAppearance,
} from "../base/index";
export default defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    import { inject, reactive, ref } from "vue";
    import mainStore from "../../../stores/mainStore";
    import pinia from "../../../stores";
    import { ElInput } from "element-plus";

    const props = defineProps({
      option: Object,
    });
    console.log(props);

    const mainData = mainStore(pinia);
    const editorConfig = inject("editorConfig");
    let targetComTree = ref(null);
    const state: any = reactive({
      targetComPath: "",
      selectTarget: null,
      isShowTree: false,
      data: [
        {
          id: 1,
          label: "页面",
          "node-key": "page",
          children: mainData.OutlineData,
        },
      ],
      defaultProps: {
        children: "children",
        "node-key": "node-key",
        label: "label",
      },
    });

    // 跟踪聚焦
    const trackingFocus = (node) => {
      state.selectTarget = node ? node["node-key"] : null;
      console.log(state.selectTarget);
      // 获取面包屑的数据
      mainData.getBreadcrumbData(
        mainData.EditorDataMap.get("page").children,
        editorConfig,
        state.selectTarget,
        0
      );
      state.targetComPath = "";
      for (let i = 0; i < mainData.targetComPath.length; i++) {
        state.targetComPath += mainData.targetComPath[i] + " > ";
      }
      state.targetComPath += "(" + state.selectTarget + ")";
      state.isShowTree = false;
    };

    document.addEventListener("click", (e) => {
      state.isShowTree = false;
      e.stopPropagation();
    });

    // 是否隐藏
    const isHidden = ref("0");

    return () => {
      return (
        <div class="events-targetCom">
        <div class="events-targetCom-item">
          <div class="events-targetCom-title">
            <p>目标组件</p>
          </div>
          <div class="events-targetCom-select">
            <ElInput
              placeholder="输入关键字进行过滤"
              clearable
              v-model="state.targetComPath"
              onfocus="() => (state.isShowTree = true)"
              onlick="(e) => e.stopPropagation()"
            ></ElInput>
            <div class="events-targetCom-select-content" v-show="state.isShowTree">
              <el-tree
                ref="targetComTree"
                class="filter-tree"
                :data="state.data"
                :props="state.defaultProps"
                node-key="node-key"
                highlight-current
                default-expand-all
                @current-change="trackingFocus"
              >
              </el-tree>
            </div>
          </div>
        </div>
        <div class="events-targetCom-item">
          <div class="events-targetCom-title">
            <p>隐藏/显示</p>
          </div>
          <div class="events-targetCom-select">
            <el-radio v-model="isHidden" label="0">显示</el-radio>
            <el-radio v-model="isHidden" label="1">隐藏</el-radio>
          </div>
        </div>
      </div>
      );
    };
  },
});
