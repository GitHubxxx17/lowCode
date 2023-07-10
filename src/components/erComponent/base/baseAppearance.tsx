import "@/sass/erComponent/appearance.scss";
import { defineComponent, reactive, watchEffect } from "vue";
import { ElColorPicker, ElInputNumber, ElInput } from "element-plus";
export default defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    //文字样式
    const writingStyle = reactive({
      color: props.option.style.color
        ? props.option.style.color
        : "rgba(255, 255, 255,0)",
      fontSize: props.option.style.fontSize ? props.option.style.fontSize : "",
      fontWeight: props.option.style.fontWeight
        ? props.option.style.fontWeight
        : "",
      lineHeight: props.option.style.lineHeight
        ? props.option.style.lineHeight
        : "",
      fontFamily: props.option.style.fontFamily
        ? props.option.style.fontFamily
        : "",
    });


    //背景颜色
    let bgColor = reactive({
      value: props.option.style.backgroundColor
        ? props.option.style.backgroundColor
        : "rgba(255, 255, 255,0)",
    });

    // 边框 border
    const border = reactive({
      isBorderActive: "middle", //选中的边框位置
      borderValue: 0, // 记录输入的border值
      selectInputValue: "", // 选择器框的内容
      showSelect: false, //是否显示下拉框
      color: "rgba(255, 255, 255, 0)",
    });
    const setBorder = (pos: string): void => {
      border.isBorderActive = pos;
    };
    // 处理border数值的修改
    const handlePadValueChange = (borderValue: number): void => {
      border.borderValue = borderValue;
    };
    //选择器
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
    const changeSelectValue = (newValue: string) => {
      border.selectInputValue = newValue;
    };
    //处理边框
    (() => {

    })()

    // 边距 margin
    const marginAndPadding = reactive([
      {
        label: "外边距(margin)",
        top: props.option.style.marginTop
          ? props.option.style.marginTop
          : "0px",
        bottom: props.option.style.marginBottom
          ? props.option.style.marginBottom
          : "0px",
        left: props.option.style.marginLeft
          ? props.option.style.marginLeft
          : "0px",
        right: props.option.style.marginRight
          ? props.option.style.marginRight
          : "0px",
        oldValue: "",
      },
      {
        label: "内边距(padding)",
        top: props.option.style.paddingTop
          ? props.option.style.paddingTop
          : "0px",
        bottom: props.option.style.paddingBottom
          ? props.option.style.paddingBottom
          : "0px",
        left: props.option.style.paddingLeft
          ? props.option.style.paddingLeft
          : "0px",
        right: props.option.style.paddingRight
          ? props.option.style.paddingRight
          : "0px",
        oldValue: "",
      },
    ]);

    // 圆角 radius
    const radius = reactive({
      isRadiusAllActive: true,
      isRadiusSelfActive: false,
      radiusValue: props.option.style.borderRadius ? props.option.style.borderRadius : '', // 记录radius的值
      radiusTLValue: "", // 记录radius-top-left的值
      radiusTRValue: "", // 记录radius-top-right的值
      radiusBLValue: "", // 记录radius-bottom-left的值
      radiusBRValue: "", // 记录radius-bottom-right的值
    });
    const changeRadiusValue = () => {
      radius.radiusValue += "px";
      radius.radiusTLValue = radius.radiusValue;
      radius.radiusTRValue = radius.radiusValue;
      radius.radiusBLValue = radius.radiusValue;
      radius.radiusBRValue = radius.radiusValue;
    };

    //阴影
    const shadow = reactive([
      {
        label: "外阴影",
        color: "rgba(255, 255, 255)",
        x: "0px",
        y: "0px",
        fuzzy: "0px",
        extension: "0px",
        oldValue: "",
      },
      {
        label: "内阴影",
        color: "rgba(255, 255, 255)",
        x: "0px",
        y: "0px",
        fuzzy: "0px",
        extension: "0px",
        oldValue: "",
      },
    ]);
    /**数值处理
     * @param {string} newValue 新数值
     * @param {number} i 数组下标
     * @param {string} key 对应的键值
     */
    const numericalProcessingShadow = (
      newValue: string,
      i: number,
      key: string,
      obj: Object
    ) => {
      if (newValue == "") {
        obj[i][key] = "0px";
      } else if (/^\d+$/.test(newValue)) {
        //如果为数字
        obj[i][key] = `${newValue}px`;
      } else if (/^\d+px$/.test(newValue)) {
        //如果为有px单位
        obj[i][key] = newValue;
      } else {
        //否则数值不改变
        obj[i][key] = obj[i].oldValue;
      }
    };
    const shadowOldValue = (oldValue: string, i: number, obj: Object) => {
      //保存改变前的数值
      obj[i].oldValue = oldValue;
    };

    watchEffect(() => {
      // 文字样式
      if (writingStyle.color != "")
        props.option.style.color = writingStyle.color;
      else delete props.option.style.color;
      if (writingStyle.fontSize != "")
        props.option.style.fontSize = writingStyle.fontSize;
      else delete props.option.style.fontSize;
      if (writingStyle.fontWeight != "")
        props.option.style.fontWeight = writingStyle.fontWeight;
      else delete props.option.style.fontWeight;
      if (writingStyle.fontFamily != "")
        props.option.style.fontFamily = writingStyle.fontFamily;
      else delete props.option.style.fontFamily;
      // 背景颜色
      if (bgColor.value != "rgba(255, 255, 255,0)")
        props.option.style.backgroundColor = bgColor.value;
      else delete props.option.style.backgroundColor;
      //边框
      if (border.isBorderActive == "middle") {
        if (border.borderValue != 0)
          props.option.style.borderWidth = `${border.borderValue}px`;
        else delete props.option.style.borderWidth;
        if (border.selectInputValue != "") {
          if ("————————————".includes(border.selectInputValue)) {
            props.option.style.borderStyle = "solid";
          } else if ("------------------".includes(border.selectInputValue)) {
            props.option.style.borderStyle = "dashed";
          } else {
            props.option.style.borderStyle = "dotted";
          }
        }
        if (border.color != "rgba(255, 255, 255, 0)")
          props.option.style.borderColor = border.color;
        else delete props.option.style.borderColor;
      }
      //边距
      if (marginAndPadding[0].top != "0px")
        props.option.style.marginTop = marginAndPadding[0].top;
      else delete props.option.style.marginTop;
      if (marginAndPadding[0].left != "0px")
        props.option.style.marginLeft = marginAndPadding[0].left;
      else delete props.option.style.marginLeft;
      if (marginAndPadding[0].right != "0px")
        props.option.style.marginRight = marginAndPadding[0].right;
      else delete props.option.style.marginRight;
      if (marginAndPadding[0].bottom != "0px")
        props.option.style.marginBottom = marginAndPadding[0].bottom;
      else delete props.option.style.marginBottom;

      if (marginAndPadding[1].top != "0px")
        props.option.style.paddingTop = marginAndPadding[1].top;
      else delete props.option.style.paddingTop;
      if (marginAndPadding[1].left != "0px")
        props.option.style.paddingLeft = marginAndPadding[1].left;
      else delete props.option.style.paddingLeft;
      if (marginAndPadding[1].right != "0px")
        props.option.style.paddingRight = marginAndPadding[1].right;
      else delete props.option.style.paddingRight;
      if (marginAndPadding[1].bottom != "0px")
        props.option.style.paddingBottom = marginAndPadding[1].bottom;
      else delete props.option.style.paddingBottom;

      //圆角
      if (radius.isRadiusAllActive) {
        if (radius.radiusValue != "")
          props.option.style.borderRadius = radius.radiusValue;
        else delete props.option.style.borderRadius;
      } else {
        if (
          !(
            radius.radiusTLValue == radius.radiusTRValue &&
            radius.radiusTRValue == radius.radiusBLValue &&
            radius.radiusBLValue == radius.radiusBRValue
          )
        )
          props.option.style.borderRadius = `${radius.radiusTLValue} ${radius.radiusTRValue} ${radius.radiusBLValue} ${radius.radiusBRValue}`;
        else {
          if (radius.radiusValue != "")
            props.option.style.borderRadius = radius.radiusValue;
          else delete props.option.style.borderRadius;
        }
      }

      //阴影

    });
    return () => {
      return (
        <>
          {/* 文字样式 */}
          {props.option.writingStyle && (
            <div>
              <div class="elCollapseItem title">文字样式</div>
              <div class="elCollapseItem">
                <div class="shadow">
                  <div class="shadow-setting">
                    <div class="shadow-setting-item">
                      <div class="shadowColor">
                        <el-color-picker
                          show-alpha
                          v-model={writingStyle.color}
                        ></el-color-picker>
                      </div>
                      <label>颜色</label>
                    </div>
                    <div class="shadow-setting-item">
                      <ElInput v-model={writingStyle.fontSize} />
                      <label>字号</label>
                    </div>
                    <div class="shadow-setting-item">
                      <ElInput v-model={writingStyle.fontWeight} />
                      <label>字重</label>
                    </div>
                    <div class="shadow-setting-item">
                      <ElInput v-model={writingStyle.fontFamily} />
                      <label>字体</label>
                    </div>
                    <div class="shadow-setting-item">
                      <ElInput v-model={writingStyle.lineHeight} />
                      <label>行间距</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* 背景颜色 */}
          {props.option.bgColor && (
            <div>
              <div class="elCollapseItem title">背景颜色</div>
              <div class="elCollapseItem bgColorPicker">
                <el-color-picker
                  show-alpha
                  v-model={bgColor.value}
                ></el-color-picker>
              </div>
            </div>
          )}
          {/* 边框 */}
          {props.option.border && (
            <div>
              <div class="elCollapseItem title">边框</div>
              <div class="elCollapseItem elCollapseBorder">
                <div class="elCollapseBorder-icon">
                  <div></div>
                  <div class="common">
                    <div
                      class={[
                        "top",
                        border.isBorderActive == "top" ? "active-top" : "",
                      ]}
                      onClick={() => setBorder("top")}
                    ></div>
                  </div>
                  <div></div>
                  <div class="common">
                    <div
                      class={[
                        "left",
                        border.isBorderActive == "left" ? "active-left" : "",
                      ]}
                      onClick={() => setBorder("left")}
                    ></div>
                  </div>
                  <div class="common">
                    <div
                      class={[
                        "middle",
                        border.isBorderActive == "middle"
                          ? "active-middle"
                          : "",
                      ]}
                      onClick={() => setBorder("middle")}
                    ></div>
                  </div>
                  <div class="common">
                    <div
                      class={[
                        "right",
                        border.isBorderActive == "right" ? "active-right" : "",
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
                        border.isBorderActive == "bottom"
                          ? "active-bottom"
                          : "",
                      ]}
                      onClick={() => setBorder("bottom")}
                    ></div>
                  </div>
                  <div></div>
                </div>
                <div class="elCollapseBorder-setting">
                  <ElInputNumber
                    modelValue={border.borderValue}
                    onChange={handlePadValueChange}
                  ></ElInputNumber>
                  <div class="lineAndColor">
                    <div class="line">
                      <ElInput
                        readonly
                        v-model={border.selectInputValue}
                        placeholder="请选择"
                        onFocus={() => {
                          border.showSelect = true;
                        }}
                        onBlur={() => {
                          border.showSelect = false;
                        }}
                      ></ElInput>
                      <ul class="select" v-show={border.showSelect}>
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
                        v-model={border.color}
                        show-alpha
                      ></ElColorPicker>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* 边距 */}
          {props.option.marginAndPadding && (
            <div>
              <div class="elCollapseItem title">边距</div>
              {marginAndPadding.map((item, i) => (
                <div class="elCollapseItem">
                  <div class="marginAndPadding">
                    <p>{item.label}</p>
                    <div class="marginAndPadding-setting">
                      <div class="marginAndPadding-setting-item">
                        <ElInput
                          v-model={item.top}
                          onChange={(value) =>
                            numericalProcessingShadow(
                              value,
                              i,
                              "top",
                              marginAndPadding
                            )
                          }
                          onFocus={(_) =>
                            shadowOldValue(item.top, i, marginAndPadding)
                          }
                        />
                        <label>top</label>
                      </div>
                      <div class="marginAndPadding-setting-item">
                        <ElInput
                          v-model={item.bottom}
                          onChange={(value) =>
                            numericalProcessingShadow(
                              value,
                              i,
                              "bottom",
                              marginAndPadding
                            )
                          }
                          onFocus={(_) =>
                            shadowOldValue(item.bottom, i, marginAndPadding)
                          }
                        />
                        <label>bottom</label>
                      </div>
                      <div class="marginAndPadding-setting-item">
                        <ElInput
                          v-model={item.left}
                          onChange={(value) =>
                            numericalProcessingShadow(
                              value,
                              i,
                              "left",
                              marginAndPadding
                            )
                          }
                          onFocus={(_) =>
                            shadowOldValue(item.left, i, marginAndPadding)
                          }
                        />
                        <label>left</label>
                      </div>
                      <div class="marginAndPadding-setting-item">
                        <ElInput
                          v-model={item.right}
                          onChange={(value) =>
                            numericalProcessingShadow(
                              value,
                              i,
                              "right",
                              marginAndPadding
                            )
                          }
                          onFocus={(_) =>
                            shadowOldValue(item.right, i, marginAndPadding)
                          }
                        />
                        <label>right</label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div class="margin-border-self"></div>
            </div>
          )}
          {/* 圆角 */}
          {props.option.radius && (
            <div>
              <div class="elCollapseItem title">圆角</div>
              <div class="elCollapseItem elCollapseRadius">
                <div class="elCollapseRadius-icon">
                  <div
                    class={[
                      "common all",
                      radius.isRadiusAllActive ? "active" : "",
                    ]}
                    onClick={() => (
                      (radius.isRadiusAllActive = true),
                      (radius.isRadiusSelfActive = false)
                    )}
                  ></div>
                  <div
                    class={[
                      "common self",
                      radius.isRadiusSelfActive ? "active" : "",
                    ]}
                    onClick={() => (
                      (radius.isRadiusAllActive = false),
                      (radius.isRadiusSelfActive = true)
                    )}
                  ></div>
                </div>
                <div class="elCollapseRadius-setting">
                  <ElInput
                    v-model={radius.radiusValue}
                    disabled={!radius.isRadiusAllActive}
                    onChange={() => changeRadiusValue()}
                  />
                </div>
              </div>
              <div
                class="elCollapseItem elCollapseRadius"
                v-show={radius.isRadiusSelfActive}
              >
                <ElInput v-model={radius.radiusTLValue} />
                <ElInput
                  class="radiusSelfInput"
                  v-model={radius.radiusTRValue}
                />
                <ElInput
                  class="radiusSelfInput"
                  v-model={radius.radiusBLValue}
                />
                <ElInput
                  class="radiusSelfInput"
                  v-model={radius.radiusBRValue}
                />
              </div>
              <div
                class="elCollapseItem elCollapseRadius"
                v-show={radius.isRadiusSelfActive}
              >
                <div class="radiusCommon radius-top-left"></div>
                <div class="radiusCommon radius-top-right"></div>
                <div class="radiusCommon radius-bottom-left"></div>
                <div class="radiusCommon  radius-bottom-right"></div>
              </div>
            </div>
          )}
          {/* 阴影 */}
          {props.option.shadow && (
            <div>
              <div class="elCollapseItem title">阴影</div>
              {shadow.map((item, i) => (
                <div class="elCollapseItem">
                  <div class="shadow">
                    <p>{item.label}</p>
                    <div class="shadow-setting">
                      <div class="shadow-setting-item">
                        <div class="shadowColor">
                          <el-color-picker
                            show-alpha
                            v-model={item.color}
                          ></el-color-picker>
                        </div>
                        <label>颜色</label>
                      </div>
                      <div class="shadow-setting-item">
                        <ElInput
                          v-model={item.x}
                          onChange={(value) =>
                            numericalProcessingShadow(value, i, "x", shadow)
                          }
                          onFocus={(_) => shadowOldValue(item.x, i, shadow)}
                        />
                        <label>X值</label>
                      </div>
                      <div class="shadow-setting-item">
                        <ElInput
                          v-model={item.y}
                          onChange={(value) =>
                            numericalProcessingShadow(value, i, "y", shadow)
                          }
                          onFocus={(_) => shadowOldValue(item.y, i, shadow)}
                        />
                        <label>Y值</label>
                      </div>
                      <div class="shadow-setting-item">
                        <ElInput
                          v-model={item.fuzzy}
                          onChange={(value) =>
                            numericalProcessingShadow(value, i, "fuzzy", shadow)
                          }
                          onFocus={(_) => shadowOldValue(item.fuzzy, i, shadow)}
                        />
                        <label>模糊值</label>
                      </div>
                      <div class="shadow-setting-item">
                        <ElInput
                          v-model={item.extension}
                          onChange={(value) =>
                            numericalProcessingShadow(
                              value,
                              i,
                              "extension",
                              shadow
                            )
                          }
                          onFocus={(_) =>
                            shadowOldValue(item.extension, i, shadow)
                          }
                        />
                        <label>扩展值</label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      );
    };
  },
});
