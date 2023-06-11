import { defineComponent, reactive, ref } from "vue";
import { ElInput } from "element-plus";
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
        </>
      );
    };
  },
});

 
