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
        : "rgba(0,0,0)",
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
      oldValue: "",
    });
    const fontFamilyList = [
      {
        value: "黑体",
      },
      {
        value: "宋体",
      },
      {
        value: "楷体",
      },
      {
        value: "微软雅黑",
      },
    ];

    const fontWeightList = [
      {
        value: "normal",
      },
      {
        value: "bold",
      },
      {
        value: "bolder",
      },
      {
        value: "lighter",
      },
      {
        value: "100",
      },
      {
        value: "200",
      },
      {
        value: "300",
      },
      {
        value: "400",
      },
      {
        value: "500",
      },
      {
        value: "600",
      },
      {
        value: "700",
      },
      {
        value: "800",
      },
      {
        value: "900",
      },
    ];

    const lineHeightList = [
      {
        value: "1.3倍",
      },
      {
        value: "1.5倍",
      },
      {
        value: "1.7倍",
      },
    ];

    //背景颜色
    let bgColor = reactive({
      value: props.option.style.backgroundColor
        ? props.option.style.backgroundColor
        : "rgba(255, 255, 255,0)",
    });

    // 边框 border
    const border = reactive({
      isBorderActive: "border", //选中的边框位置
      borderValue: 0, // 记录输入的border值
      selectInputValue: "", // 选择器框的内容
      showSelect: false, //是否显示下拉框
      color: "rgba(0,0,0)",
    });
    const setBorder = (pos: string): void => {
      border.isBorderActive = pos;
      handleBorder(pos);
    };
    // 处理border数值的修改
    const handlePadValueChange = (borderValue: number): void => {
      border.borderValue = borderValue;
    };
    //选择器
    const selectContent = [
      {
        text: "——————",
        value: "solid",
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
        value: "dashed",
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
        value: "dotted",
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
    const handleBorder = (key: string) => {
      console.log(props.option.style[key], key);
      if (props.option.style[key]) {
        let borderList = props.option.style[key].match(/^(\d+px) (.*?) (.*?)$/);
        border.borderValue = parseInt(borderList[1].match(/^\d+/)[0]);
        selectContent.forEach((item) => {
          if (item.value == borderList[2]) border.selectInputValue = item.text;
        });
        border.color = borderList[3];
      }
    };
    handleBorder("border");
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
      tipIsshow: false,
      tip: "",
      radiusValue: "", // 记录radius的值
      radiusTLValue: "", // 记录radius-top-left的值
      radiusTRValue: "", // 记录radius-top-right的值
      radiusBLValue: "", // 记录radius-bottom-left的值
      radiusBRValue: "", // 记录radius-bottom-right的值
      oldValue: "",
    });
    const changeRadiusValue = () => {
      const {
        radiusTLValue: tl,
        radiusTRValue: tr,
        radiusBLValue: bl,
        radiusBRValue: br,
      } = radius;
      radius.tip = `${tl ? tl : "0px"} ${tr ? tr : "0px"} ${bl ? bl : "0px"} ${
        br ? br : "0px"
      }`;
    };

    const handleBorderRadius = () => {
      const {
        borderRadius,
        borderTopLeftRadius: tl,
        borderTopRightRadius: tr,
        borderBottomLeftRadius: bl,
        borderBottomRightRadius: br,
      } = props.option.style;

      if (borderRadius) {
        radius.radiusValue = borderRadius;
        radius.radiusTLValue =
          radius.radiusTRValue =
          radius.radiusBLValue =
          radius.radiusBRValue =
            borderRadius;
        radius.tipIsshow = false;
      }
      if (tl || tr || bl || br) {
        let borderRadiusStr = `${tl ? tl : "0px"} ${tr ? tr : "0px"} ${
          bl ? bl : "0px"
        } ${br ? br : "0px"}`;
        radius.tip = borderRadiusStr;
        radius.tipIsshow = true;
        if (tl) radius.radiusTLValue = tl;
        if (tr) radius.radiusTRValue = tr;
        if (bl) radius.radiusBLValue = bl;
        if (br) radius.radiusBRValue = br;
      }
    };
    handleBorderRadius();
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
     * @param {number} obj 处理的对象
     * @param {string} key 对应的键值
     */
    const numericalProcessing = (newValue: string, key: string, obj: any) => {
      if (newValue == "") {
        obj[key] = "0px";
      } else if (/^\d+$/.test(newValue)) {
        //如果为数字
        obj[key] = `${newValue}px`;
      } else if (/^\d+px$/.test(newValue)) {
        //如果为有px单位
        obj[key] = newValue;
      } else {
        //否则数值不改变
        obj[key] = obj.oldValue;
      }
    };
    const saveOldValue = (oldValue: string, obj: any) => {
      //保存改变前的数值
      obj.oldValue = oldValue;
    };

    watchEffect(() => {
      // 文字样式
      (() => {
        if (writingStyle.color != "rgba(0,0,0)")
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
        if (writingStyle.lineHeight != "") {
          if (/^\d+px$/.test(writingStyle.lineHeight)) {
            props.option.style.lineHeight = writingStyle.lineHeight
          } else
            props.option.style.lineHeight = writingStyle.lineHeight.match(
              /^\d+(\.\d+)?/
            )[0];
        } else delete props.option.style.lineHeight;
      })();
      // 背景颜色
      (() => {
        if (bgColor.value != "rgba(255, 255, 255,0)")
          props.option.style.backgroundColor = bgColor.value;
        else delete props.option.style.backgroundColor;
      })();
      //边框
      const borderKey: string[] = [
        "border",
        "borderTop",
        "borderLeft",
        "borderRight",
        "borderBottom",
      ];
      (() => {
        let borderStyle = "solid";
        if (border.selectInputValue != "") {
          selectContent.forEach((item) => {
            if (item.text.includes(border.selectInputValue))
              borderStyle = item.value;
          });
        }
        borderKey.forEach((item) => {
          if (border.isBorderActive == item) {
            if (border.borderValue != 0)
              props.option.style[
                item
              ] = `${border.borderValue}px ${borderStyle} ${border.color}`;
            else delete props.option.style[item];
          }
        });
      })();

      //边距
      // margin
      const mpKey: string[] = ["top", "left", "right", "bottom"];
      const marginKey: string[] = [
        "marginTop",
        "marginLeft",
        "marginRight",
        "marginBottom",
      ];
      (() => {
        marginKey.forEach((item, i) => {
          if (marginAndPadding[0][mpKey[i]] != "0px")
            props.option.style[item] = marginAndPadding[0][mpKey[i]];
          else delete props.option.style[item];
        });
      })();
      // padding
      const paddingKey: string[] = [
        "paddingTop",
        "paddingLeft",
        "paddingRight",
        "paddingBottom",
      ];
      (() => {
        paddingKey.forEach((item, i) => {
          if (marginAndPadding[1][mpKey[i]] != "0px")
            props.option.style[item] = marginAndPadding[1][mpKey[i]];
          else delete props.option.style[item];
        });
      })();

      //圆角
      const radiusKey: string[] = [
        "radiusTLValue",
        "radiusTRValue",
        "radiusBLValue",
        "radiusBRValue",
      ];
      const propsRadius: string[] = [
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
      ];
      (() => {
        if (radius.isRadiusAllActive) {
          if (radius.radiusValue != "" && !radius.tipIsshow) {
            props.option.style.borderRadius = radius.radiusValue;
            propsRadius.forEach((item) => delete props.option.style[item]);
          } else delete props.option.style.borderRadius;
        } else {
          if (
            radius.radiusTLValue == radius.radiusTRValue &&
            radius.radiusTRValue == radius.radiusBLValue &&
            radius.radiusBLValue == radius.radiusBRValue
          ) {
            props.option.style.borderRadius = radius.radiusTRValue;
            propsRadius.forEach((item) => delete props.option.style[item]);
          } else {
            delete props.option.style.borderRadius;
            radiusKey.forEach((item, i) => {
              if (!["", "0px"].includes(radius[item])) {
                props.option.style[propsRadius[i]] = radius[item];
              } else delete props.option.style[propsRadius[i]];
            });
          }
        }
      })();

      //阴影
      (() => {
        if (
          !(
            shadow[0].x == "0px" &&
            shadow[0].y == "0px" &&
            shadow[0].fuzzy == "0px" &&
            shadow[0].extension == "0px"
          ) &&
          !(
            shadow[1].x == "0px" &&
            shadow[1].y == "0px" &&
            shadow[1].fuzzy == "0px" &&
            shadow[1].extension == "0px"
          )
        ) {
          props.option.style.boxShadow = `${shadow[0].x} ${shadow[0].y} ${shadow[0].fuzzy} ${shadow[0].extension} ${shadow[0].color} ,inset ${shadow[1].x} ${shadow[1].y} ${shadow[1].fuzzy} ${shadow[1].extension} ${shadow[1].color}`;
        } else {
          if (
            !(
              shadow[0].x == "0px" &&
              shadow[0].y == "0px" &&
              shadow[0].fuzzy == "0px" &&
              shadow[0].extension == "0px"
            )
          ) {
            props.option.style.boxShadow = `${shadow[0].x} ${shadow[0].y} ${shadow[0].fuzzy} ${shadow[0].extension} ${shadow[0].color}`;
          }
          if (
            !(
              shadow[1].x == "0px" &&
              shadow[1].y == "0px" &&
              shadow[1].fuzzy == "0px" &&
              shadow[1].extension == "0px"
            )
          ) {
            props.option.style.boxShadow = `inset ${shadow[1].x} ${shadow[1].y} ${shadow[1].fuzzy} ${shadow[1].extension} ${shadow[1].color}`;
          }
        }
      })();
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
                      <ElInput
                        v-model={writingStyle.fontSize}
                        onChange={(value) =>
                          numericalProcessing(value, "fontSize", writingStyle)
                        }
                        onFocus={(_) =>
                          saveOldValue(writingStyle.fontSize, writingStyle)
                        }
                      />
                      <label>字号</label>
                    </div>
                  </div>
                  <div class="shadow-setting">
                    <div class="shadow-setting-item">
                      <el-select
                        v-model={writingStyle.fontWeight}
                        filterable
                        allow-create
                        remote
                        default-first-option
                        placeholder=" "
                      >
                        {fontWeightList.map((item: any) => {
                          return (
                            <el-option
                              key={item.value}
                              value={item.value}
                            ></el-option>
                          );
                        })}
                      </el-select>
                      <label>字重</label>
                    </div>
                    <div class="shadow-setting-item">
                      <el-select
                        v-model={writingStyle.fontFamily}
                        filterable
                        allow-create
                        remote
                        default-first-option
                        placeholder=" "
                      >
                        {fontFamilyList.map((item: any) => {
                          return (
                            <el-option
                              key={item.value}
                              value={item.value}
                            ></el-option>
                          );
                        })}
                      </el-select>
                      <label>字体</label>
                    </div>
                    <div class="shadow-setting-item">
                      <el-select
                        v-model={writingStyle.lineHeight}
                        filterable
                        allow-create
                        remote
                        default-first-option
                        placeholder=" "
                      >
                        {lineHeightList.map((item: any) => {
                          return (
                            <el-option
                              key={item.value}
                              value={item.value}
                            ></el-option>
                          );
                        })}
                      </el-select>
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
                        border.isBorderActive == "borderTop"
                          ? "active-top"
                          : "",
                      ]}
                      onClick={() => setBorder("borderTop")}
                    ></div>
                  </div>
                  <div></div>
                  <div class="common">
                    <div
                      class={[
                        "left",
                        border.isBorderActive == "borderLeft"
                          ? "active-left"
                          : "",
                      ]}
                      onClick={() => setBorder("borderLeft")}
                    ></div>
                  </div>
                  <div class="common">
                    <div
                      class={[
                        "middle",
                        border.isBorderActive == "border"
                          ? "active-middle"
                          : "",
                      ]}
                      onClick={() => setBorder("border")}
                    ></div>
                  </div>
                  <div class="common">
                    <div
                      class={[
                        "right",
                        border.isBorderActive == "borderRight"
                          ? "active-right"
                          : "",
                      ]}
                      onClick={() => setBorder("borderRight")}
                    ></div>
                  </div>
                  <div></div>
                  <div class="common">
                    <div class="bottom"></div>
                    <div
                      class={[
                        "bottom",
                        border.isBorderActive == "borderBottom"
                          ? "active-bottom"
                          : "",
                      ]}
                      onClick={() => setBorder("borderBottom")}
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
                            numericalProcessing(
                              value,
                              "top",
                              marginAndPadding[i]
                            )
                          }
                          onFocus={(_) =>
                            saveOldValue(item.top, marginAndPadding[i])
                          }
                        />
                        <label>top</label>
                      </div>
                      <div class="marginAndPadding-setting-item">
                        <ElInput
                          v-model={item.bottom}
                          onChange={(value) =>
                            numericalProcessing(
                              value,
                              "bottom",
                              marginAndPadding[i]
                            )
                          }
                          onFocus={(_) =>
                            saveOldValue(item.bottom, marginAndPadding[i])
                          }
                        />
                        <label>bottom</label>
                      </div>
                      <div class="marginAndPadding-setting-item">
                        <ElInput
                          v-model={item.left}
                          onChange={(value) =>
                            numericalProcessing(
                              value,
                              "left",
                              marginAndPadding[i]
                            )
                          }
                          onFocus={(_) =>
                            saveOldValue(item.left, marginAndPadding[i])
                          }
                        />
                        <label>left</label>
                      </div>
                      <div class="marginAndPadding-setting-item">
                        <ElInput
                          v-model={item.right}
                          onChange={(value) =>
                            numericalProcessing(
                              value,
                              "right",
                              marginAndPadding[i]
                            )
                          }
                          onFocus={(_) =>
                            saveOldValue(item.right, marginAndPadding[i])
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
                    onClick={() => {
                      radius.isRadiusAllActive = true;
                      radius.isRadiusSelfActive = false;
                      handleBorderRadius();
                    }}
                  ></div>
                  <div
                    class={[
                      "common self",
                      radius.isRadiusSelfActive ? "active" : "",
                    ]}
                    onClick={() => {
                      radius.isRadiusAllActive = false;
                      radius.isRadiusSelfActive = true;
                      handleBorderRadius();
                    }}
                  ></div>
                </div>
                <div class="elCollapseRadius-setting">
                  <ElInput
                    v-model={radius.radiusValue}
                    disabled={!radius.isRadiusAllActive}
                    onChange={(value) => {
                      numericalProcessing(value, "radiusValue", radius);
                      radius.radiusTLValue =
                        radius.radiusTRValue =
                        radius.radiusBLValue =
                        radius.radiusBRValue =
                          radius.radiusValue;
                      console.log(radius);
                    }}
                    onFocus={(_) => saveOldValue(radius.radiusValue, radius)}
                  />
                  {radius.tipIsshow && (
                    <div class="elCollapseRadius-setting-tip">
                      <span>{radius.tip}</span>
                      {radius.isRadiusAllActive && (
                        <i
                          class="icon iconfont icon-cha"
                          onClick={(_) => {
                            radius.tipIsshow = false;
                          }}
                        ></i>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div
                class="elCollapseItem elCollapseRadius"
                v-show={radius.isRadiusSelfActive}
              >
                <ElInput
                  v-model={radius.radiusTLValue}
                  onChange={(value) => {
                    numericalProcessing(value, "radiusTLValue", radius);
                    changeRadiusValue();
                  }}
                  onFocus={(_) => saveOldValue(radius.radiusTLValue, radius)}
                />
                <ElInput
                  class="radiusSelfInput"
                  v-model={radius.radiusTRValue}
                  onChange={(value) => {
                    numericalProcessing(value, "radiusTRValue", radius);
                    changeRadiusValue();
                  }}
                  onFocus={(_) => saveOldValue(radius.radiusTRValue, radius)}
                />
                <ElInput
                  class="radiusSelfInput"
                  v-model={radius.radiusBLValue}
                  onChange={(value) => {
                    numericalProcessing(value, "radiusBLValue", radius);
                    changeRadiusValue();
                  }}
                  onFocus={(_) => saveOldValue(radius.radiusBLValue, radius)}
                />
                <ElInput
                  class="radiusSelfInput"
                  v-model={radius.radiusBRValue}
                  onChange={(value) => {
                    numericalProcessing(value, "radiusBRValue", radius);
                    changeRadiusValue();
                  }}
                  onFocus={(_) => saveOldValue(radius.radiusBRValue, radius)}
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
                            numericalProcessing(value, "x", shadow[i])
                          }
                          onFocus={(_) => saveOldValue(item.x, shadow[i])}
                        />
                        <label>X值</label>
                      </div>
                      <div class="shadow-setting-item">
                        <ElInput
                          v-model={item.y}
                          onChange={(value) =>
                            numericalProcessing(value, "y", shadow[i])
                          }
                          onFocus={(_) => saveOldValue(item.y, shadow[i])}
                        />
                        <label>Y值</label>
                      </div>
                      <div class="shadow-setting-item">
                        <ElInput
                          v-model={item.fuzzy}
                          onChange={(value) =>
                            numericalProcessing(value, "fuzzy", shadow[i])
                          }
                          onFocus={(_) => saveOldValue(item.fuzzy, shadow[i])}
                        />
                        <label>模糊值</label>
                      </div>
                      <div class="shadow-setting-item">
                        <ElInput
                          v-model={item.extension}
                          onChange={(value) =>
                            numericalProcessing(value, "extension", shadow[i])
                          }
                          onFocus={(_) =>
                            saveOldValue(item.extension, shadow[i])
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
