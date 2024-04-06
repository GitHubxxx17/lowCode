import "@/sass/erComponent/events.scss";
import { defineComponent, onMounted, onUnmounted, reactive, watch } from "vue";
import pinia from "../../stores/index.ts";
import dragStore from "../../stores/dragStore.ts";
import mainStore from "../../stores/mainStore.ts";

import ErEventConfig from "./erConfig/erEvent-config";
import { eventConfig } from "../../utils/event-config";
import deepcopy from "deepcopy";
import { ElMessage } from "element-plus";
export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup() {
    const dragData = dragStore(pinia); //拖拽数据
    const mainData = mainStore(pinia); //拖拽数据

    let state = reactive({
      dialogIsShow: false, //对话框显示
      addListIsShow: false, //事件列表显示
      //事件列表
      eventsList:
        mainData.EditorDataMap.get(dragData.selectKey || "page").events || [],
      activeName: Array.from(eventConfig.eventMap.keys()), //折叠模板名称
      addAction: {
        //新增的执行动作
        title: "跳转连接",
        content: "",
        otherOption: {}, // 其他配置项
      },
      selectedEvent: null, //选中事件
      selectedIndex: 0, //选中事件的动作列表的下标
      mouseEventsMap: new Map(), //事件列表哈希表
      isUpdate: false, //是否更新执行动作
    });

    watch(
      () => dragData.selectKey,
      (newValue, oldValue) => {
        // 如果没有事件绑定上去就剔除
        if (state.eventsList.length == 0) {
          delete mainData.EditorDataMap.get(oldValue || "page").events;
        } else {
          // 如果有的话就将当前的所有事件赋值
          mainData.EditorDataMap.get(oldValue || "page").events =
            state.eventsList;
        }
        state.eventsList =
          mainData.EditorDataMap.get(newValue || "page").events || [];

        state.selectedEvent = null;
        for (let item of eventConfig.eventMap) {
          state.mouseEventsMap.get(item[0]).exist = false;
        }
        for (let item of state.eventsList) {
          state.mouseEventsMap.get(item.type).exist = true;
        }
      }
    );

    //隐藏事件列表
    const hiddenList = () => {
      state.addListIsShow = false;
    };

    onMounted(() => {
      //初始化事件配置
      for (let [key, value] of eventConfig.eventMap) {
        state.mouseEventsMap.set(key, {
          type: value.type,
          name: value.name,
          exist: state.mouseEventsMap.get(value.type)?.exist,
        });
      }

      //当不存在事件对象时添加空事件对象
      if (
        !mainData.EditorDataMap.get(dragData.selectKey || "page").events &&
        state.eventsList.length == 0
      ) {
        mainData.EditorDataMap.get(dragData.selectKey || "page").events =
          state.eventsList;
      }
      window.addEventListener("click", hiddenList);
    });

    onUnmounted(() => {
      window.removeEventListener("click", hiddenList);
    });

    //默认数据
    const defaultAction = () => {
      state.addAction = deepcopy({
        title: "跳转连接",
        content: "",
        otherOption: {},
      });
    };

    //添加事件
    const addEvents = (item: any) => {
      state.eventsList.push({
        type: item.type,
        name: item.name,
        list: [],
      });
      item.exist = true;
    };

    //删除事件
    const delEvents = (index: number) => {
      state.mouseEventsMap.get(state.eventsList[index].type).exist = false;
      state.eventsList.splice(index, 1);
    };

    //将事件添加到待添加执行动作中
    const addToPerformAction = (event: any) => {
      state.isUpdate = false;
      defaultAction();
      state.dialogIsShow = true;
      state.selectedEvent = event;
    };

    //确认提交事件并将执行动作添加到待添加执行动作的事件中
    const confirmToAdd = () => {
      if (state.addAction.content.trim() == "") {
        ElMessage.warning("内容不能为空");
        return;
      }
      state.dialogIsShow = false;
      if (state.isUpdate) {
        //更新执行动作
        state.selectedEvent.list[state.selectedIndex] = deepcopy(
          state.addAction
        );
      } else {
        //新增执行动作
        state.selectedEvent.list.push(deepcopy(state.addAction));
      }
      defaultAction();
    };

    const changeAction = (event: any, index: number) => {
      state.isUpdate = true;
      state.addAction = deepcopy(event.list[index]);
      state.dialogIsShow = true;
      state.selectedEvent = event;
      state.selectedIndex = index;
    };

    //删除执行动作
    const delAction = (item: any, index: number) => {
      item.list.splice(index, 1);
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
                  {Array.from(state.mouseEventsMap.values()).map((item) => {
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
                        {item.name}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
            <elCollapse v-model={state.activeName}>
              {state.eventsList.map((item: any, i: number) => {
                return (
                  <div class="events-elCollapseItem">
                    <div class="events-nav">
                      <i
                        class="icon iconfont icon-tianjia"
                        onClick={(_) => addToPerformAction(item)}
                      ></i>
                      <i
                        class="icon iconfont icon-shanchu"
                        onClick={(_) => delEvents(i)}
                      ></i>
                    </div>

                    <elCollapseItem title={item.name} name={item.type}>
                      <div class="events-list">
                        {item.list.map((v: any, j: number) => {
                          return (
                            <div class="events-list-item">
                              <div class="events-list-item-header">
                                <span>{v.title}</span>
                                <span>
                                  <i
                                    class="icon iconfont icon-xiugai"
                                    onClick={(_) => changeAction(item, j)}
                                  ></i>
                                  <i
                                    class="icon iconfont icon-shanchu"
                                    onClick={(_) => delAction(item, j)}
                                  ></i>
                                </span>
                              </div>
                              <div class="events-list-item-content">
                                {eventConfig.handlerMap
                                  .get(v.title)
                                  .selectedRender(v)}
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
            append-to-body
          >
            {{
              default: () => {
                return (
                  <ErEventConfig
                    option={state.addAction}
                    isShow={state.dialogIsShow}
                  ></ErEventConfig>
                );
              },
              footer: () => {
                return (
                  <span class="dialog-footer">
                    <el-button onClick={(_) => (state.dialogIsShow = false)}>
                      取 消
                    </el-button>
                    <el-button type="primary" onClick={(_) => confirmToAdd()}>
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
