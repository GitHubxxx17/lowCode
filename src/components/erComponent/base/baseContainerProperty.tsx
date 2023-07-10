import { defineComponent, reactive, watchEffect } from "vue";
import { ElInput } from "element-plus";
import { BaseSelect } from "../base/index";
export default defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    // 下拉器
    const activeNames: string[] = ["basic", "layout"];
    //容器标签
    const containerLabels = reactive({
      value: "div",
      options: [
        {
          value: "header",
        },
        {
          value: "nav",
        },
        {
          value: "section",
        },
        {
          value: "main",
        },
        {
          value: "footer",
        },
        {
          value: "div",
        },
        {
          value: "p",
        },
      ],
    });

    // 定位模式
    const positioningMode = reactive({
      value: "默认(static)",
      options: [
        {
          value: "默认(static)",
        },
        {
          value: "绝对(relative)",
        },
        {
          value: "相对(absolute)",
        },
        {
          value: "固定(fixed)",
        },
      ],
    });

    if (props.option.style.position) {
      if (props.option.style.position == "relative")
        positioningMode.value = "绝对(relative)";
      if (props.option.style.position == "absolute")
        positioningMode.value = "相对(absolute)";
      if (props.option.style.position == "fixed")
        positioningMode.value = "固定(fixed)";
    }

    //高度宽度设置
    const heightAndWidth = reactive([
      {
        label: "高度",
        adapter: true,
        max: 0,
        min: 0,
        maxUnit: "px",
        minUnit: "px",
        value: 0,
        valueUnit: "px",
        scrollMode: {
          value: "自动适配",
          options: [
            {
              value: "超出显示",
            },
            {
              value: "超出隐藏",
            },
            {
              value: "超出滚动",
            },
            {
              value: "自动适配",
            },
          ],
        },
      },
      {
        label: "宽度",
        adapter: true,
        max: 0,
        min: 0,
        maxUnit: "px",
        minUnit: "px",
        value: 0,
        valueUnit: "px",
        scrollMode: {
          value: "超出显示",
          options: [
            {
              value: "超出显示",
            },
            {
              value: "超出隐藏",
            },
            {
              value: "超出滚动",
            },
            {
              value: "自动适配",
            },
          ],
        },
      },
    ]);
    //单位
    const unit = [
      {
        value: "px",
      },
      {
        value: "em",
      },
      {
        value: "%",
      },
      {
        value: "vw",
      },
      {
        value: "vh",
      },
    ];
    //处理宽高
    const withWideHigh = (() => {
      if (props.option.style.width) {
        heightAndWidth[1].value = props.option.style.width.match(/^\d+/)[0];
        heightAndWidth[1].valueUnit =
          props.option.style.width.match(/^(\d+)(.*)/)[2];
      }
      if (props.option.style.height) {
        heightAndWidth[0].value = props.option.style.height.match(/^\d+/)[0];
        heightAndWidth[0].valueUnit =
          props.option.style.height.match(/^(\d+)(.*)/)[2];
      }
      if (props.option.style.maxHeight) {
        heightAndWidth[0].max = props.option.style.maxHeight.match(/^\d+/)[0];
        heightAndWidth[0].maxUnit =
          props.option.style.maxHeight.match(/^(\d+)(.*)/)[2];
      }
      if (props.option.style.minHeight) {
        heightAndWidth[0].min = props.option.style.minHeight.match(/^\d+/)[0];
        heightAndWidth[0].minUnit =
          props.option.style.minHeight.match(/^(\d+)(.*)/)[2];
      }
      if (props.option.style.maxWidth) {
        heightAndWidth[0].max = props.option.style.maxWidth.match(/^\d+/)[0];
        heightAndWidth[0].maxUnit =
          props.option.style.maxWidth.match(/^(\d+)(.*)/)[2];
      }
      if (props.option.style.minWidth) {
        heightAndWidth[0].min = props.option.style.minWidth.match(/^\d+/)[0];
        heightAndWidth[0].minUnit =
          props.option.style.minWidth.match(/^(\d+)(.*)/)[2];
      }

      if (props.option.style.overflowY) {
        if (props.option.style.overflowY == "visible")
          heightAndWidth[0].scrollMode.value = "超出显示";
        if (props.option.style.overflowY == "hidden")
          heightAndWidth[0].scrollMode.value == "超出隐藏";
        if (props.option.style.overflowY == "scroll")
          heightAndWidth[0].scrollMode.value == "超出滚动";
        if (props.option.style.overflowY == "auto")
          heightAndWidth[0].scrollMode.value == "自动适配";
      }

      if (props.option.style.overflowX) {
        if (props.option.style.overflowX == "visible")
          heightAndWidth[1].scrollMode.value = "超出显示";
        if (props.option.style.overflowX == "hidden")
          heightAndWidth[1].scrollMode.value == "超出隐藏";
        if (props.option.style.overflowX == "scroll")
          heightAndWidth[1].scrollMode.value == "超出滚动";
        if (props.option.style.overflowX == "auto")
          heightAndWidth[1].scrollMode.value == "自动适配";
      }
    })();
    //对齐方式
    const alignment = reactive({
      list: [
        { icon: "icon-zuoduiqi", active: true, attribute: "left" },
        { icon: "icon-juzhongduiqi", active: false, attribute: "center" },
        { icon: "icon-youduiqi", active: false, attribute: "right" },
        { icon: "icon-zuoyouduiqi", active: false, attribute: "justify" },
      ],
      value: "left",
    });
    //显示类型
    const displayType = reactive({
      alignmentLabel: "块级(block)设置",
      flexisShow: false,
      options: [
        {
          icon: "icon-a-Displayblock",
          active: true,
          alignmentLabel: "块级(block)设置",
        },
        {
          icon: "icon-a-Displayinline-block",
          active: false,
          alignmentLabel: "行内块(inline-block)设置",
        },
        {
          icon: "icon-a-Displayinline",
          active: false,
          alignmentLabel: "行内(inline)设置",
        },
        {
          icon: "icon-a-Displayflex",
          active: false,
          alignmentLabel: "flex布局设置",
        },
      ],
      flexList: [
        {
          label: "布局方向",
          list: [
            { value: "水平方向", attribute: "row" },
            { value: "垂直方向", attribute: "column" },
            { value: "水平反向", attribute: "row-reverse" },
            { value: "垂直反向", attribute: "column-reverse" },
          ],
          value: "水平方向",
        },
        {
          label: "水平对齐",
          list: [
            { value: "左对齐", attribute: "flex-start" },
            { value: "水平居中", attribute: "center" },
            { value: "右对齐", attribute: "flex-end" },
            { value: "两端对齐", attribute: "space-between" },
            { value: "间隔分布", attribute: "space-around" },
          ],
          value: "左对齐",
        },
        {
          label: "垂直对齐",
          list: [
            { value: "顶部对齐", attribute: "flex-start" },
            { value: "垂直居中", attribute: "center" },
            { value: "底部对齐", attribute: "flex-end" },
            { value: "基线对齐", attribute: "baseline" },
            { value: "高度撑满", attribute: "stretch" },
          ],
          value: "顶部对齐",
        },
        {
          label: "是否换行",
          list: [
            { value: "不换行", attribute: "nowrap" },
            { value: "自动换行", attribute: "wrap" },
            { value: "自动换行(颠倒)", attribute: "wrap-reverse" },
          ],
          value: "不换行",
        },
      ],
      flexAttribute: ["", "", "", ""],
      flexDirectionMap: new Map(),
    });
    //处理显示对齐
    const processingAccordingToAlign = (() => {
      if (props.option.style.display) {
        displayType.options.forEach((item) => (item.active = false));
        if (props.option.style.display == "flex") {
          displayType.alignmentLabel = "flex布局设置";
          displayType.options[3].active = true;
          displayType.flexisShow = true;
          if (props.option.style.flexDirection)
            displayType.flexAttribute[0] = props.option.style.flexDirection;
          if (props.option.style.justifyContent)
            displayType.flexAttribute[1] = props.option.style.justifyContent;
          if (props.option.style.alignItems)
            displayType.flexAttribute[2] = props.option.style.alignItems;
          if (props.option.style.flexWrap)
            displayType.flexAttribute[3] = props.option.style.flexWrap;
        } else {
          if (props.option.style.textAlign) {
            let index = 0;
            if (props.option.style.display == "inline-block") index = 1;
            if (props.option.style.display == "inline") index = 2;
            displayType.alignmentLabel =
              displayType.options[index].alignmentLabel;
            displayType.options[index].active = true;
            alignment.value = props.option.style.textAlign;
            alignment.list.forEach((item: any) => {
              item.active = false;
              if (alignment.value == item.attribute) item.active = true;
            });
          }
        }
      }
    })();

    displayType.flexDirectionMap.set("row", {
      jc: [
        { value: "左对齐", attribute: "flex-start" },
        { value: "水平居中", attribute: "center" },
        { value: "右对齐", attribute: "flex-end" },
        { value: "两端对齐", attribute: "space-between" },
        { value: "间隔分布", attribute: "space-around" },
      ],
      ai: [
        { value: "顶部对齐", attribute: "flex-start" },
        { value: "垂直居中", attribute: "center" },
        { value: "底部对齐", attribute: "flex-end" },
        { value: "基线对齐", attribute: "baseline" },
        { value: "高度撑满", attribute: "stretch" },
      ],
    });

    displayType.flexDirectionMap.set("column", {
      jc: [
        { value: "顶部对齐", attribute: "flex-start" },
        { value: "垂直居中", attribute: "center" },
        { value: "底部对齐", attribute: "flex-end" },
        { value: "两端对齐", attribute: "space-between" },
        { value: "间隔分布", attribute: "space-around" },
      ],
      ai: [
        { value: "左对齐", attribute: "flex-start" },
        { value: "水平居中", attribute: "center" },
        { value: "右对齐", attribute: "flex-end" },
        { value: "基线对齐", attribute: "baseline" },
        { value: "水平铺开", attribute: "stretch" },
      ],
    });

    displayType.flexDirectionMap.set("row-reverse", {
      jc: [
        { value: "右对齐", attribute: "flex-start" },
        { value: "水平居中", attribute: "center" },
        { value: "左对齐", attribute: "flex-end" },
        { value: "两端对齐", attribute: "space-between" },
        { value: "间隔分布", attribute: "space-around" },
      ],
      ai: [
        { value: "顶部对齐", attribute: "flex-start" },
        { value: "垂直居中", attribute: "center" },
        { value: "底部对齐", attribute: "flex-end" },
        { value: "基线对齐", attribute: "baseline" },
        { value: "高度撑满", attribute: "stretch" },
      ],
    });

    displayType.flexDirectionMap.set("column-reverse", {
      jc: [
        { value: "底部对齐", attribute: "flex-start" },
        { value: "垂直居中", attribute: "center" },
        { value: "顶部对齐", attribute: "flex-end" },
        { value: "两端对齐", attribute: "space-between" },
        { value: "间隔分布", attribute: "space-around" },
      ],
      ai: [
        { value: "左对齐", attribute: "flex-start" },
        { value: "水平居中", attribute: "center" },
        { value: "右对齐", attribute: "flex-end" },
        { value: "基线对齐", attribute: "baseline" },
        { value: "水平铺开", attribute: "stretch" },
      ],
    });

    watchEffect(() => {
      if (containerLabels.value != "div")
        props.option.containerLabels = containerLabels.value;
      else delete props.option.containerLabels;

      if (!positioningMode.value.includes("static"))
        props.option.style.position =
          positioningMode.value.match(/\((.*?)\)/)[1];
      else delete props.option.style.position;

      if (heightAndWidth[0].max != 0)
        props.option.style.maxHeight = `${heightAndWidth[0].max}${heightAndWidth[0].maxUnit}`;
      else delete props.option.style.maxHeight;

      if (heightAndWidth[0].min != 0)
        props.option.style.minHeight = `${heightAndWidth[0].min}${heightAndWidth[0].minUnit}`;
      else delete props.option.style.minHeight;

      if (heightAndWidth[1].max != 0)
        props.option.style.maxWidth = `${heightAndWidth[1].max}${heightAndWidth[1].maxUnit}`;
      else delete props.option.style.maxWidth;

      if (heightAndWidth[1].min != 0)
        props.option.style.minWidth = `${heightAndWidth[1].min}${heightAndWidth[1].minUnit}`;
      else delete props.option.style.minWidth;

      if (heightAndWidth[0].value != 0)
        props.option.style.height = `${heightAndWidth[0].value}${heightAndWidth[0].valueUnit}`;
      else delete props.option.style.height;

      if (heightAndWidth[1].value != 0)
        props.option.style.width = `${heightAndWidth[1].value}${heightAndWidth[1].valueUnit}`;
      else delete props.option.style.width;

      if (heightAndWidth[0].scrollMode.value == "超出显示")
        props.option.style.overflowY = "visible";
      if (heightAndWidth[0].scrollMode.value == "超出隐藏")
        props.option.style.overflowY = "hidden";
      if (heightAndWidth[0].scrollMode.value == "超出滚动")
        props.option.style.overflowY = "scroll";
      if (heightAndWidth[0].scrollMode.value == "自动适配")
        props.option.style.overflowY = "auto";

      if (heightAndWidth[1].scrollMode.value == "超出显示")
        props.option.style.overflowX = "visible";
      if (heightAndWidth[1].scrollMode.value == "超出隐藏")
        props.option.style.overflowX = "hidden";
      if (heightAndWidth[1].scrollMode.value == "超出滚动")
        props.option.style.overflowX = "scroll";
      if (heightAndWidth[1].scrollMode.value == "自动适配")
        props.option.style.overflowX = "auto";

      props.option.style.display =
        displayType.alignmentLabel.match(/[a-zA-Z]+/g)[0];
      if (!displayType.flexisShow) {
        if (alignment.value != "left")
          props.option.style.textAlign = alignment.value;
        else delete props.option.style.textAlign;
      } else {
        if (displayType.flexAttribute[0] != "") {
          props.option.style.flexDirection = displayType.flexAttribute[0];
        }
        if (displayType.flexAttribute[1] != "") {
          props.option.style.justifyContent = displayType.flexAttribute[1];
        }
        if (displayType.flexAttribute[2] != "") {
          props.option.style.alignItems = displayType.flexAttribute[2];
        }
        if (displayType.flexAttribute[3] != "") {
          props.option.style.flexWrap = displayType.flexAttribute[3];
        }
      }
    });

    return () => {
      return (
        <>
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="basic" class="container">
              <BaseSelect
                label="容器标签"
                setting={containerLabels}
              ></BaseSelect>
            </elCollapseItem>
            <elCollapseItem title="布局" name="layout" class="container">
              <BaseSelect
                label="定位模式"
                setting={positioningMode}
              ></BaseSelect>
              {heightAndWidth.map((item, i) => (
                <>
                  <div class="elCollapseItem">
                    <p>{item.label}设置</p>
                    <div class="container-changeBtn">
                      <button
                        class={{ active: item.adapter }}
                        onClick={(_) => (item.adapter = true)}
                      >
                        适配
                      </button>
                      <button
                        class={{ active: !item.adapter }}
                        onClick={(_) => (item.adapter = false)}
                      >
                        固定
                      </button>
                    </div>
                  </div>
                  {item.adapter && (
                    <div>
                      <div class="elCollapseItem container-settings-wh">
                        <p>最大{item.label}</p>
                        <div>
                          <ElInput v-model={item.max} />
                          <el-select v-model={heightAndWidth[i].maxUnit}>
                            {unit.map((item) => {
                              return (
                                <el-option
                                  key={item.value}
                                  value={item.value}
                                ></el-option>
                              );
                            })}
                          </el-select>
                        </div>
                      </div>
                      <div class="elCollapseItem container-settings-wh">
                        <p>最小{item.label}</p>
                        <div>
                          <ElInput v-model={item.min} />
                          <el-select v-model={heightAndWidth[i].minUnit}>
                            {unit.map((item) => {
                              return (
                                <el-option
                                  key={item.value}
                                  value={item.value}
                                ></el-option>
                              );
                            })}
                          </el-select>
                        </div>
                      </div>
                    </div>
                  )}
                  {!item.adapter && (
                    <div>
                      <div class="elCollapseItem container-settings-wh">
                        <p>{item.label}</p>
                        <div>
                          <ElInput v-model={item.value} />
                          <el-select v-model={heightAndWidth[i].valueUnit}>
                            {unit.map((item) => {
                              return (
                                <el-option
                                  key={item.value}
                                  value={item.value}
                                ></el-option>
                              );
                            })}
                          </el-select>
                        </div>
                      </div>
                      <BaseSelect
                        label="滚动模式"
                        setting={heightAndWidth[i].scrollMode}
                      ></BaseSelect>
                    </div>
                  )}
                </>
              ))}

              <div class="elCollapseItem container-displayType">
                <p>显示方式(display)</p>
                {displayType.options.map((item) => (
                  <div
                    class={{
                      active: item.active,
                      "container-displayType-item": true,
                    }}
                    onClick={(_) => {
                      displayType.options.forEach(
                        (item) => (item.active = false)
                      );
                      item.active = true;
                      displayType.alignmentLabel = item.alignmentLabel;
                      if (item.alignmentLabel.includes("flex"))
                        displayType.flexisShow = true;
                      else displayType.flexisShow = false;
                    }}
                  >
                    <i class={[item.icon, "icon", "iconfont"]}></i>
                  </div>
                ))}
              </div>
              <div class="elCollapseItem container-alignment">
                <div class="alignmentContent">
                  <p>{displayType.alignmentLabel}</p>
                  {!displayType.flexisShow && (
                    <div class="alignmentContent-list">
                      {alignment.list.map((item) => (
                        <div
                          class={{
                            active: item.active,
                            "container-alignment-item": true,
                          }}
                          onClick={(_) => {
                            alignment.list.forEach(
                              (item) => (item.active = false)
                            );
                            item.active = true;
                            alignment.value = item.attribute;
                          }}
                        >
                          <i class={[item.icon, "icon", "iconfont"]}></i>
                        </div>
                      ))}
                    </div>
                  )}
                  {displayType.flexisShow &&
                    displayType.flexList.map((flexItem, i) => (
                      <div class="flexlayout-list">
                        <div class="flexlayout-list-item">
                          <p>{flexItem.label}</p>
                          <el-select
                            v-model={flexItem.value}
                            onChange={(_) => {
                              //获取对应的属性值
                              let item = flexItem.list.filter((v) => {
                                if (v.value == flexItem.value) return v;
                              });
                              displayType.flexAttribute[i] = item[0].attribute;
                              if (i == 0) {
                                displayType.flexList[1].list =
                                  displayType.flexDirectionMap.get(
                                    item[0].attribute
                                  ).jc;
                                displayType.flexList[2].list =
                                  displayType.flexDirectionMap.get(
                                    item[0].attribute
                                  ).ai;
                                displayType.flexList[1].value =
                                  displayType.flexList[1].list[0].value;
                                displayType.flexList[2].value =
                                  displayType.flexList[2].list[0].value;
                                displayType.flexAttribute[1] =
                                  displayType.flexList[1].list[0].attribute;
                                displayType.flexAttribute[2] =
                                  displayType.flexList[2].list[0].attribute;
                              }
                            }}
                          >
                            {flexItem.list.map((item) => {
                              return (
                                <el-option
                                  key={item.value}
                                  value={item.value}
                                ></el-option>
                              );
                            })}
                          </el-select>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
