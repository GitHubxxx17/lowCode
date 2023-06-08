import "@/sass/erComponent/appearance.scss";
import { defineComponent, ref } from "vue";
import { ElColorPicker, ElInputNumber, ElInput } from "element-plus";
export default defineComponent({
  setup() {
    // 下拉器
    const activeNames: string[] = ["1", "2"];

    // 边框 border
    let isBorderActive = ref("middle");
    const setBorder = (pos: string): void => {
      isBorderActive.value = pos;
    };
    const borderValue = ref(0); // 记录输入的padding值
    // 处理padding数值的修改
    const handlePadValueChange = (borderValue: number): void => {
      console.log(borderValue);
    };
    //选择器
    const selectInputValue = ref(""); // 选择器框的内容
    const selectContent = [
      {
        text: "——————",
        render: () => {
          return (
            <>
              <span class="solidLine">————&nbsp;&nbsp;</span>
              <span> 实线 </span>
            </>
          );
        },
      },
      {
        text: "------------------",
        render: () => {
          return (
            <>
              <span class="dottedLine">---------- &nbsp;&nbsp;</span>
              <span> 虚线 </span>
            </>
          );
        },
      },
      {
        text: "···················",
        render: () => {
          return (
            <>
              <span class="pointLine">···················&nbsp;&nbsp;</span>
              <span> 点线 </span>
            </>
          );
        },
      },
    ];
    let showSelect = ref(false);
    const changeSelectValue = (newValue) => {
      selectInputValue.value = newValue;
    };
    // 取色器
    let color = ref("rgba(255, 255, 255, 0.68)");

    // 边距 margin
    let isMarginAllActive = ref(true);
    let isMarginselfActive = ref(false);
    let marginValue = ref(""); // 记录margin的值
    let paddingValue = ref(""); // 记录padding的值

    // 圆角 radius
    let isRadiusAllActive = ref(true);
    let isRadiusSelfActive = ref(false);
    let radiusValue = ref(""); // 记录radius的值
    const changeRadiusValue = () => {
      radiusValue.value += "px";
      radiusTLValue.value = radiusValue.value;
      radiusTRValue.value = radiusValue.value;
      radiusBLValue.value = radiusValue.value;
      radiusBRValue.value = radiusValue.value;
    };
    let radiusTLValue = ref(""); // 记录radius-top-left的值
    let radiusTRValue = ref(""); // 记录radius-top-right的值
    let radiusBLValue = ref(""); // 记录radius-bottom-left的值
    let radiusBRValue = ref(""); // 记录radius-bottom-right的值
    return () => {
      return (
        <div class="appearance">
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="1">
              {/* padding */}
              <div class="elCollapseItem title">边框</div>
              <div class="elCollapseItem elCollapseBorder">
                <div class="elCollapseBorder-icon">
                  <div></div>
                  <div class="common">
                    <div
                      class={[
                        "top",
                        isBorderActive.value == "top" ? "active-top" : "",
                      ]}
                      onClick={() => setBorder("top")}
                    ></div>
                  </div>
                  <div></div>
                  <div class="common">
                    <div
                      class={[
                        "left",
                        isBorderActive.value == "left" ? "active-left" : "",
                      ]}
                      onClick={() => setBorder("left")}
                    ></div>
                  </div>
                  <div class="common">
                    <div
                      class={[
                        "middle",
                        isBorderActive.value == "middle" ? "active-middle" : "",
                      ]}
                      onClick={() => setBorder("middle")}
                    ></div>
                  </div>
                  <div class="common">
                    <div
                      class={[
                        "right",
                        isBorderActive.value == "right" ? "active-right" : "",
                      ]}
                      onClick={() => setBorder("right")}
                    ></div>
                  </div>
                  <div></div>
                  <div class="common">
                    <div class="bottom"></div>
                    <div
                      class={[
                        "bottom",
                        isBorderActive.value == "bottom" ? "active-bottom" : "",
                      ]}
                      onClick={() => setBorder("bottom")}
                    ></div>
                  </div>
                  <div></div>
                </div>
                <div class="elCollapseBorder-setting">
                  <ElInputNumber
                    modelValue={borderValue.value}
                    onChange={handlePadValueChange}
                  ></ElInputNumber>
                  <div class="lineAndColor">
                    <div class="line">
                      <ElInput
                        readonly
                        v-model={selectInputValue.value}
                        placeholder="请选择"
                        onFocus={() => {
                          showSelect.value = true;
                        }}
                        onBlur={() => {
                          showSelect.value = false;
                        }}
                      ></ElInput>
                      <ul class="select" v-show={showSelect.value}>
                        {selectContent.map((item) => (
                          <li
                            onMousedown={() => {
                              changeSelectValue(item.text);
                            }}
                          >
                            {item.render()}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div class="color">
                      <ElColorPicker
                        v-model={color.value}
                        show-alpha
                      ></ElColorPicker>
                    </div>
                  </div>
                </div>
              </div>
              <div class="elCollapseItem title">边距</div>
              <div class="elCollapseItem elCollapseMargin">
                <div class="elCollapseMargin-icon">
                  <div
                    class={[
                      "common all",
                      isMarginAllActive.value ? "active" : "",
                    ]}
                    onClick={() => (
                      (isMarginAllActive.value = true),
                      (isMarginselfActive.value = false)
                    )}
                  ></div>
                  <div
                    class="common self"
                    onClick={() => (
                      (isMarginAllActive.value = false),
                      (isMarginselfActive.value = true)
                    )}
                  >
                    <div
                      class={[
                        "zuoshang",
                        isMarginselfActive.value ? "active" : "",
                      ]}
                    ></div>
                    <div
                      class={[
                        "youxia",
                        isMarginselfActive.value ? "active" : "",
                      ]}
                    ></div>
                  </div>
                </div>
                <div class="elCollapseMargin-setting">
                  <div class="box">
                    <ElInput v-model={marginValue.value} />
                    <span>Margin</span>
                  </div>
                  <div class="box right">
                    <ElInput v-model={paddingValue.value} />
                    <span>Padding</span>
                  </div>
                </div>
              </div>
              <div class="margin-border-self"></div>
              <div class="elCollapseItem title">圆角</div>
              <div class="elCollapseItem elCollapseRadius">
                <div class="elCollapseRadius-icon">
                  <div
                    class={[
                      "common all",
                      isRadiusAllActive.value ? "active" : "",
                    ]}
                    onClick={() => (
                      (isRadiusAllActive.value = true),
                      (isRadiusSelfActive.value = false)
                    )}
                  ></div>
                  <div
                    class={[
                      "common self",
                      isRadiusSelfActive.value ? "active" : "",
                    ]}
                    onClick={() => (
                      (isRadiusAllActive.value = false),
                      (isRadiusSelfActive.value = true)
                    )}
                  ></div>
                </div>
                <div class="elCollapseRadius-setting">
                  <ElInput
                    v-model={radiusValue.value}
                    disabled={!isRadiusAllActive.value}
                    onChange={() => changeRadiusValue()}
                  />
                </div>
              </div>
              <div
                class="elCollapseItem elCollapseRadius"
                v-show={isRadiusSelfActive.value}
              >
                <ElInput v-model={radiusTLValue.value} />
                <ElInput
                  class="radiusSelfInput"
                  v-model={radiusTRValue.value}
                />
                <ElInput
                  class="radiusSelfInput"
                  v-model={radiusBLValue.value}
                />
                <ElInput
                  class="radiusSelfInput"
                  v-model={radiusBRValue.value}
                />
              </div>
              <div
                class="elCollapseItem elCollapseRadius"
                v-show={isRadiusSelfActive.value}
              >
                <div class="radiusCommon radius-top-left"></div>
                <div class="radiusCommon radius-top-right"></div>
                <div class="radiusCommon radius-bottom-left"></div>
                <div class="radiusCommon  radius-bottom-right"></div>
              </div>
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
