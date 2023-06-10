import { defineComponent, reactive } from "vue";
import { ElColorPicker, ElInputNumber, ElInput } from "element-plus";
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
        scrollMode: "超出显示",
      },
      {
        label: "宽度",
        adapter: true,
        max: 0,
        min: 0,
        maxUnit: "px",
        minUnit: "px",
        value: "",
        scrollMode: "超出显示",
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
    //滚动模式
    const scrollMode = [
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
    ];
    //对齐方式
    const alignment = reactive([
      { icon: "icon-zuoduiqi", active: true },
      { icon: "icon-juzhongduiqi", active: false },
      { icon: "icon-youduiqi", active: false },
      { icon: "icon-zuoyouduiqi", active: false },
    ]);
    //显示类型
    const displayType = reactive([
      { icon: "icon-zuoduiqi", active: true },
      { icon: "icon-juzhongduiqi", active: false },
      { icon: "icon-youduiqi", active: false },
      { icon: "icon-zuoyouduiqi", active: false },
    ]);
    return () => {
      return (
        <>
          <elCollapseItem title="基本" name="basic" class="container">
            <div class="elCollapseItem container-settings">
              <p>容器标签</p>
              <el-select v-model={containerLabels.value} filterable>
                {containerLabels.options.map((item) => {
                  return (
                    <el-option key={item.value} value={item.value}></el-option>
                  );
                })}
              </el-select>
            </div>
          </elCollapseItem>
          <elCollapseItem title="布局" name="layout" class="container">
            <div class="elCollapseItem container-positioningMode">
              <p>定位模式</p>
              <el-select v-model={positioningMode.value}>
                {positioningMode.options.map((item) => {
                  return (
                    <el-option key={item.value} value={item.value}></el-option>
                  );
                })}
              </el-select>
            </div>
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
                    <div class="elCollapseItem container-settings-scrollMode">
                      <p>滚动模式</p>
                      <div>
                        <el-select v-model={heightAndWidth[i].scrollMode}>
                          {scrollMode.map((item) => {
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
              </>
            ))}
            
            <div class="elCollapseItem container-displayType">
              <p>显示方式</p>
              {displayType.map((item) => (
                <div
                  class={{
                    active: item.active,
                    "container-displayType-item": true,
                  }}
                  onClick={(_) => {
                    displayType.forEach((item) => item.active = false);
                    item.active = true;
                  }}
                >
                  <i class={[item.icon, "icon", "iconfont"]}></i>
                </div>
              ))}
            </div>
            <div class="elCollapseItem container-alignment">
              <p>内部对齐方式</p>
              {alignment.map((item) => (
                <div
                  class={{
                    active: item.active,
                    "container-alignment-item": true,
                  }}
                  onClick={(_) => {
                    alignment.forEach((item) => item.active = false);
                    item.active = true;
                  }}
                >
                  <i class={[item.icon, "icon", "iconfont"]}></i>
                </div>
              ))}
            </div>
          </elCollapseItem>
        </>
      );
    };
  },
});
