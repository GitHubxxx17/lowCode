import "@/sass/erComponent/property.scss";
import { defineComponent, ref } from "vue";
import { ElInput } from "element-plus";
export default defineComponent({
  setup() {
    // 下拉器
    const activeNames: string[] = ["basic"];
    const pageTitle = ref('')
    return () => {
      return (
        <div class="property">
        <elCollapse modelValue={activeNames}>
          <elCollapseItem title="基本" name="basic">
          <div class="elCollapseItem defaultTitle">
            <p>页面标题</p>
            <ElInput v-model={pageTitle.value}/>
          </div>
          </elCollapseItem>
          {/* <elCollapseItem title="123" name="2">
            <div class="elCollapseItem">名称</div>
            <div class="elCollapseItem">二次确认</div>
            <div class="elCollapseItem">名称</div>
            <div class="elCollapseItem">名称</div>
            <div class="elCollapseItem">名称</div>
          </elCollapseItem> */}
        </elCollapse>
        </div>
      );
    };
  },
});
