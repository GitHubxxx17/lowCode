import "@/sass/erComponent/events.scss";
import { defineComponent, reactive } from "vue";
export default defineComponent({
  setup() {
    const state = reactive({
      dialogIsShow: true,
      addListIsShow: false,
      eventsList: [
        {
          title: "鼠标点击",
          name: "mouseToClick",
          list: [
            {
              title: "消息提醒",
              content: "内容：啊实打实的发的价格的法国诺曼底帮个忙吗",
            },
          ],
        },
      ],
      activeName: [
        "mouseToClick",
        "mouseMoving",
        "mouseMovedOut",
        "getFocus",
        "loseFocus",
        "valuesChange",
      ],
    });

    //事件列表
    const mouseEvents = [
      {
        value: "鼠标点击",
        name: "mouseToClick",
        exist: false,
      },
      {
        value: "鼠标移入",
        name: "mouseMoving",
        exist: false,
      },
      {
        value: "鼠标移出",
        name: "mouseMovedOut",
        exist: false,
      },
      {
        value: "获取焦点",
        name: "getFocus",
        exist: false,
      },
      {
        value: "失去焦点",
        name: "loseFocus",
        exist: false,
      },
      {
        value: "值改变",
        name: "valuesChange",
        exist: false,
      },
    ];

    //事件列表哈希表
    const mouseEventsMap = new Map();
    for (let item of mouseEvents) {
      mouseEventsMap.set(item.value, item);
    }

    for (let item of state.eventsList) {
      mouseEventsMap.get(item.title).exist = true;
    }

    //隐藏事件列表
    const hiddenList = () => {
      state.addListIsShow = false;
    };

    window.addEventListener("click", hiddenList);

    //添加事件
    const addEvents = (item: any) => {
      state.eventsList.push({
        title: item.value,
        name: item.name,
        list: [
          {
            title: "消息提醒",
            content: "内容：啊实打实的发的价格的法国诺曼底帮个忙吗",
          },
        ],
      });
      item.exist = true;
    };

    //删除事件
    const delEvents = (index: number) => {
      mouseEventsMap.get(state.eventsList[index].title).exist = false;
      state.eventsList.splice(index, 1);
    };

    return () => {
      return (
        <>
          <div class="events">
            <div
              class="events-addEvents"
              onClick={(e) => {
                e.stopPropagation();
                state.addListIsShow = !state.addListIsShow;
              }}
            >
              <span>添加事件</span>
            </div>
            {state.addListIsShow && (
              <div class="events-addEvents-list">
                <ul>
                  {Array.from(mouseEventsMap.values()).map((item) => {
                    return (
                      <li
                        onClick={(e) => {
                          e.stopPropagation();
                          if (item.exist) return;
                          addEvents(item);
                          hiddenList();
                        }}
                        class={item.exist ? "disabled" : ""}
                      >
                        {item.value}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <elCollapse v-model={state.activeName}>
              {state.eventsList.map((item, i) => {
                return (
                  <div class="events-elCollapseItem">
                    <div class="events-nav">
                      <i
                        class="icon iconfont icon-tianjia"
                        onClick={(_) => {
                          state.dialogIsShow = true;
                        }}
                      ></i>
                      <i
                        class="icon iconfont icon-shanchu"
                        onClick={(_) => delEvents(i)}
                      ></i>
                    </div>

                    <elCollapseItem title={item.title} name={item.name}>
                      <div class="events-list">
                        {item.list.map((v) => {
                          return (
                            <div class="events-list-item">
                              <div class="events-list-item-header">
                                <span>{v.title}</span>
                                <span>
                                  <i class="icon iconfont icon-xiugai"></i>
                                  <i class="icon iconfont icon-shanchu"></i>
                                </span>
                              </div>
                              <div class="events-list-item-content">
                                <span>{v.content}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </elCollapseItem>
                  </div>
                );
              })}
            </elCollapse>
          </div>
          <el-dialog
            title="事件配置"
            v-model={state.dialogIsShow}
            width="60%"
            fullscreen
          >
            {{
              default: () => {
                return (
                  <div class="events-config">
                    <div class="events-config-menu">
                      <el-menu class="el-menu-vertical-demo">
                        <el-sub-menu index="1">
                          {{
                            default:()=>{
                              return <span>页面</span>;
                            },
                            footer: () => {
                              return <span>页面</span>;
                            },
                          }}
                          <el-menu-item-group>
                            {{
                              default: () => {
                                return (
                                  <>
                                    <el-menu-item index="1-1">
                                      选项1
                                    </el-menu-item>
                                    <el-menu-item index="1-2">
                                      选项2
                                    </el-menu-item>
                                  </>
                                );
                              },
                              footer: () => {
                                return <span>分组一</span>;
                              },
                            }}
                          </el-menu-item-group>
                          <el-menu-item-group title="分组2">
                            <el-menu-item index="1-3">选项3</el-menu-item>
                          </el-menu-item-group>
                        </el-sub-menu>
                      </el-menu>
                    </div>
                  </div>
                );
              },
              footer: () => {
                return (
                  <span class="dialog-footer">
                    <el-button onClick={(_) => (state.dialogIsShow = false)}>
                      取 消
                    </el-button>
                    <el-button
                      type="primary"
                      onClick={(_) => (state.dialogIsShow = false)}
                    >
                      确 定
                    </el-button>
                  </span>
                );
              },
            }}
          </el-dialog>
        </>
      );
    };
  },
});
