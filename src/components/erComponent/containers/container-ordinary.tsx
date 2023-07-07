import { defineComponent, reactive } from "vue";
import { ElInput } from "element-plus";
import { BaseSelect } from "../base/baseSelect";
import BaseAppearance from "../base/baseAppearance";
export const ContainerOrdinaryAppearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    const option = {
      writingStyle:true,
      bgColor:true,
      border:true,
      marginAndPadding:true,
      radius:true,
      shadow:true,
    };

    return () => {
      return <BaseAppearance option={option}></BaseAppearance>;
    };
  },
});

export const ContainerOrdinaryProperty = defineComponent({
  props: {
    option: { type: Object },
  },
  setup() {
    // 下拉器
    const activeNames: string[] = ["basic","layout"];
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

    //高度宽度设置
    const heightAndWidth = reactive([
      {
        label: "高度",
        adapter: true,
        max: 0,
        min: 0,
        maxUnit: "px",
        minUnit: "px",
        value: "",
        scrollMode: {
          value: "超出显示",
          options:[
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
          ]
        },
      },
      {
        label: "宽度",
        adapter: true,
        max: 0,
        min: 0,
        maxUnit: "px",
        minUnit: "px",
        value: "",
        scrollMode: {
          value: "超出显示",
          options:[
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
          ]
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
    //对齐方式
    const alignment = reactive([
      { icon: "icon-zuoduiqi", active: true },
      { icon: "icon-juzhongduiqi", active: false },
      { icon: "icon-youduiqi", active: false },
      { icon: "icon-zuoyouduiqi", active: false },
    ]);
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
      flexAttribute:['','','',''],
      flexDirectionMap: new Map()
    });

    displayType.flexDirectionMap.set('row',{jc:[
      { value: "左对齐", attribute: "flex-start" },
      { value: "水平居中", attribute: "center" },
      { value: "右对齐", attribute: "flex-end" },
      { value: "两端对齐", attribute: "space-between" },
      { value: "间隔分布", attribute: "space-around" },
    ],ai:[
      { value: "顶部对齐", attribute: "flex-start" },
      { value: "垂直居中", attribute: "center" },
      { value: "底部对齐", attribute: "flex-end" },
      { value: "基线对齐", attribute: "baseline" },
      { value: "高度撑满", attribute: "stretch" },
    ]})

    displayType.flexDirectionMap.set('column',{jc:[
      { value: "顶部对齐", attribute: "flex-start" },
      { value: "垂直居中", attribute: "center" },
      { value: "底部对齐", attribute: "flex-end" },
      { value: "两端对齐", attribute: "space-between" },
      { value: "间隔分布", attribute: "space-around" },
    ],ai:[
      { value: "左对齐", attribute: "flex-start" },
      { value: "水平居中", attribute: "center" },
      { value: "右对齐", attribute: "flex-end" },
      { value: "基线对齐", attribute: "baseline" },
      { value: "水平铺开", attribute: "stretch" },
    ]})

    displayType.flexDirectionMap.set('row-reverse',{jc:[
      { value: "右对齐", attribute: "flex-start" },
      { value: "水平居中", attribute: "center" },
      { value: "左对齐", attribute: "flex-end" },
      { value: "两端对齐", attribute: "space-between" },
      { value: "间隔分布", attribute: "space-around" },
    ],ai:[
      { value: "顶部对齐", attribute: "flex-start" },
      { value: "垂直居中", attribute: "center" },
      { value: "底部对齐", attribute: "flex-end" },
      { value: "基线对齐", attribute: "baseline" },
      { value: "高度撑满", attribute: "stretch" },
    ]})

    displayType.flexDirectionMap.set('column-reverse',{jc:[
      { value: "底部对齐", attribute: "flex-start" },
      { value: "垂直居中", attribute: "center" },
      { value: "顶部对齐", attribute: "flex-end" },
      { value: "两端对齐", attribute: "space-between" },
      { value: "间隔分布", attribute: "space-around" },
    ],ai:[
      { value: "左对齐", attribute: "flex-start" },
      { value: "水平居中", attribute: "center" },
      { value: "右对齐", attribute: "flex-end" },
      { value: "基线对齐", attribute: "baseline" },
      { value: "水平铺开", attribute: "stretch" },
    ]})

    return () => {
      return (
        <>
        <elCollapse modelValue={activeNames}>
          <elCollapseItem title="基本" name="basic" class="container">
            <BaseSelect label="容器标签" setting={containerLabels}></BaseSelect>
          </elCollapseItem>
          <elCollapseItem title="布局" name="layout" class="container">
            <BaseSelect label="定位模式" setting={positioningMode}></BaseSelect>
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
                    <BaseSelect label="滚动模式" setting={heightAndWidth[i].scrollMode}></BaseSelect>
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
                    {alignment.map((item) => (
                      <div
                        class={{
                          active: item.active,
                          "container-alignment-item": true,
                        }}
                        onClick={(_) => {
                          alignment.forEach((item) => (item.active = false));
                          item.active = true;
                        }}
                      >
                        <i class={[item.icon, "icon", "iconfont"]}></i>
                      </div>
                    ))}
                  </div>
                )}
                {displayType.flexisShow &&
                  displayType.flexList.map((flexItem,i) => (
                    <div class="flexlayout-list">
                      <div class="flexlayout-list-item">
                        <p>{flexItem.label}</p>
                        <el-select v-model={flexItem.value} onChange={_=>{
                          
                          //获取对应的属性值
                          let item = flexItem.list.filter((v)=>{
                            if(v.value == flexItem.value){
                              return v;
                            } 
                          })
                          displayType.flexAttribute[i] = item[0].attribute;
                          console.log(displayType.flexAttribute);
                          if(i == 0){
                            displayType.flexList[1].list = displayType.flexDirectionMap.get(item[0].attribute).jc;
                            displayType.flexList[2].list = displayType.flexDirectionMap.get(item[0].attribute).ai;
                            displayType.flexList[1].value = displayType.flexList[1].list[0].value
                            displayType.flexList[2].value = displayType.flexList[2].list[0].value
                            displayType.flexAttribute[1] = displayType.flexList[1].list[0].attribute
                            displayType.flexAttribute[2] = displayType.flexList[2].list[0].attribute
                          }
                        }}>
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
