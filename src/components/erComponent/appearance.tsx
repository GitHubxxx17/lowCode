import "@/sass/editor/ErComponent.scss";
import { defineComponent, ref } from "vue";
import { ElInputNumber } from "element-plus";
export default defineComponent({
  setup() {
    // 下拉器
    const activeNames: string[] = ["1", "2"];

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
        <div class="appearance">
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="1">
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
