import "@/sass/erComponent/appearance.scss";
import { defineComponent, reactive, ref } from "vue";
import { ElColorPicker, ElInputNumber, ElInput } from "element-plus";
export default defineComponent({
  setup() {
    // 下拉器
    const activeNames: string[] = ["basic", "styleSource"];

    //背景颜色
    let bgColor = ref("rgba(255, 255, 255)");

    // 边框 border
    const border = reactive({
      isBorderActive: "middle", //选中的边框位置
      borderValue: 0, // 记录输入的border值
      selectInputValue: "", // 选择器框的内容
      showSelect: false, //是否显示下拉框
      color: "rgba(255, 255, 255, 0.68)",
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
    const changeSelectValue = (newValue) => {
      border.selectInputValue = newValue;
    };

    // 边距 margin
    // const marginAndPadding = reactive({
    //   isMarginAllActive: true,
    //   isMarginselfActive: false,
    //   marginValue: "", // 记录margin的值
    //   paddingValue: "", // 记录padding的值
    // });
    const marginAndPadding = reactive([
      {
        label:'外边距(margin)',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        oldValue: "",
      },
      {
        label:'内边距(padding)',
        top: '0px',
        bottom: '0px',
        left: '0px',
        right: '0px',
        oldValue: "",
      }
    ])


    // 圆角 radius
    const radius = reactive({
      isRadiusAllActive: true,
      isRadiusSelfActive: false,
      radiusValue: "", // 记录radius的值
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
    /**阴影数值处理
     * @param {string} newValue 新数值
     * @param {number} i 数组下标
     * @param {string} key 对应的键值
     */
    const numericalProcessingShadow = (
      newValue: string,
      i: number,
      key: string,
      obj:Object
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
    const shadowOldValue = (oldValue: string, i: number,obj:Object) => {
      //保存改变前的数值
      obj[i].oldValue = oldValue;
    };
    return () => {
      return (
        <div class="appearance">
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="basic">
              <div class="elCollapseItem title">背景颜色</div>
              <div class="elCollapseItem bgColorPicker">
                <el-color-picker
                  show-alpha
                  v-model={bgColor.value}
                ></el-color-picker>
              </div>
              {/* padding */}
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
              <div class="elCollapseItem title">边距</div>
              {/* <div class="elCollapseItem elCollapseMargin">
                <div class="elCollapseMargin-icon">
                  <div
                    class={[
                      "common all",
                      marginAndPadding.isMarginAllActive ? "active" : "",
                    ]}
                    onClick={() => (
                      (marginAndPadding.isMarginAllActive = true),
                      (marginAndPadding.isMarginselfActive = false)
                    )}
                  ></div>
                  <div
                    class="common self"
                    onClick={() => (
                      (marginAndPadding.isMarginAllActive = false),
                      (marginAndPadding.isMarginselfActive = true)
                    )}
                  >
                    <div
                      class={[
                        "zuoshang",
                        marginAndPadding.isMarginselfActive ? "active" : "",
                      ]}
                    ></div>
                    <div
                      class={[
                        "youxia",
                        marginAndPadding.isMarginselfActive ? "active" : "",
                      ]}
                    ></div>
                  </div>
                </div>
                <div class="elCollapseMargin-setting">
                  <div class="box">
                    <ElInput v-model={marginAndPadding.marginValue} />
                    <span>Margin</span>
                  </div>
                  <div class="box right">
                    <ElInput v-model={marginAndPadding.paddingValue} />
                    <span>Padding</span>
                  </div>
                </div>
              </div> */}
              {
                marginAndPadding.map((item,i)=>(
                  <div class="elCollapseItem">
                  <div class="marginAndPadding">
                    <p>{item.label}</p>
                    <div class="marginAndPadding-setting">
                  
                      <div class="marginAndPadding-setting-item">
                        <ElInput
                          v-model={item.top}
                          onChange={(value) =>
                            numericalProcessingShadow(value, i, "top",marginAndPadding)
                          }
                          onFocus={(_) => shadowOldValue(item.top, i,marginAndPadding)}
                        />
                        <label>top</label>
                      </div>
                      <div class="marginAndPadding-setting-link">
                        <i class="icon iconfont icon-ai70"></i>
                      </div>
                      <div class="marginAndPadding-setting-item">
                        <ElInput
                          v-model={item.bottom}
                          onChange={(value) =>
                            numericalProcessingShadow(value, i, "bottom",marginAndPadding)
                          }
                          onFocus={(_) => shadowOldValue(item.bottom, i,marginAndPadding)}
                        />
                        <label>bottom</label>
                      </div>
                      <div class="marginAndPadding-setting-item">
                        <ElInput
                          v-model={item.left}
                          onChange={(value) =>
                            numericalProcessingShadow(value, i, "left",marginAndPadding)
                          }
                          onFocus={(_) => shadowOldValue(item.left, i,marginAndPadding)}
                        />
                        <label>left</label>
                      </div>
                      <div class="marginAndPadding-setting-link">
                        <i class="icon iconfont icon-ai70"></i>
                      </div>
                      <div class="marginAndPadding-setting-item">
                        <ElInput
                          v-model={item.right}
                          onChange={(value) =>
                            numericalProcessingShadow(value, i, "right",marginAndPadding)
                          }
                          onFocus={(_) => shadowOldValue(item.right, i,marginAndPadding)}
                        />
                        <label>right</label>
                      </div>
                    </div>
                  </div>
                </div>
                ))
              }
              <div class="margin-border-self"></div>
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
                            numericalProcessingShadow(value, i, "x",shadow)
                          }
                          onFocus={(_) => shadowOldValue(item.x, i,shadow)}
                        />
                        <label>X值</label>
                      </div>
                      <div class="shadow-setting-item">
                        <ElInput
                          v-model={item.y}
                          onChange={(value) =>
                            numericalProcessingShadow(value, i, "y",shadow)
                          }
                          onFocus={(_) => shadowOldValue(item.y, i,shadow)}
                        />
                        <label>Y值</label>
                      </div>
                      <div class="shadow-setting-item">
                        <ElInput
                          v-model={item.fuzzy}
                          onChange={(value) =>
                            numericalProcessingShadow(
                              value,
                              i,
                              "fuzzy",
                              shadow
                            )
                          }
                          onFocus={(_) => shadowOldValue(item.fuzzy, i,shadow)}
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
                          onFocus={(_) => shadowOldValue(item.extension, i,shadow)}
                        />
                        <label>扩展值</label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </elCollapseItem>
            <elCollapseItem title="样式源码" name="styleSource">
              <div class="elCollapseItem editStyle">
                <div class="editStyleSource">
                  <i class="icon iconfont icon-daimajishufuwu"></i>
                  <span>编辑样式源码</span>
                </div>
              </div>
            </elCollapseItem>
          </elCollapse>
        </div>
      );
    };
  },
});
