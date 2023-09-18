import "@/sass/erComponent/events.scss";
import { defineComponent, reactive, watch, watchEffect } from "vue";
import { eventConfig } from "../../../utils/event-config";
import deepcopy from "deepcopy";
export default defineComponent({
  props: {
    option: { type: Object },
    isShow: { type: Boolean },
  },
  setup(props) {
    const state = reactive({
      menuActive: props.option.title, //执行动作类型
      openeds: ["1", "2", "3", "4", "5"], //折叠模板
      data: deepcopy(
        //执行动作默认数据渲染
        eventConfig.handlerMap.get(props.option.title).defaultData
      ),
      action: deepcopy(props.option), //执行动作绑定数据
    });

    //恢复原数据
    const toRestoreOriginalData = () => {
      if (state.menuActive == state.action.title) {
        state.data.value = state.action.content;
        if (state.menuActive == "消息提醒") {
          //消息类型
          if (state.action.messageType)
            state.data.messageType.value = state.action.messageType;
          //持续时间
          if (state.action.duration)
            state.data.duration.value = state.action.duration;
          //消息内容
          if (state.action.messageContent)
            state.data.messageContent.value = state.action.messageContent;
        }
      }
    };

    //打开弹窗
    watch(
      () => props.isShow,
      (newValue) => {
        if (newValue) {
          state.menuActive = props.option.title;
          state.data = deepcopy(
            eventConfig.handlerMap.get(props.option.title).defaultData
          );
          state.action = deepcopy(props.option);
          toRestoreOriginalData();
        }
      },
      { immediate: true }
    );

    //切换面板
    watch(
      () => state.menuActive,
      () => {
        state.data = deepcopy(
          eventConfig.handlerMap.get(state.menuActive).defaultData
        );
        toRestoreOriginalData();
      },
      { immediate: true }
    );

    watchEffect(() => {
      props.option.title = state.menuActive;
      props.option.content = state.data.value;
      if (state.menuActive == "消息提醒") {
        //消息类型
        if (state.data.messageType)
          props.option.messageType = state.data.messageType.value;
        //持续时间
        if (state.data.duration)
          props.option.duration = state.data.duration.value;
        //消息内容
        if (state.data.messageContent) {
          props.option.messageContent = state.data.messageContent.value;
          props.option.content = state.data.messageContent.value;
        }
      }
      if (state.menuActive == "组件可见性") {
        props.option.otherOption.isHidden = state.data.isHidden;
        props.option.otherOption.target = state.data.target;
      }
    });

    return () => {
      return (
        <>
          <div class="events-config">
            <div class="events-config-menu">
              <el-menu
                default-active={state.menuActive}
                default-openeds={state.openeds}
                onSelect={(val: string) => {
                  state.menuActive = val;
                }}
              >
                <el-sub-menu index="1">
                  {{
                    default: () => {
                      return (
                        <>
                          <el-menu-item index="跳转连接">跳转连接</el-menu-item>
                          <el-menu-item index="刷新页面">刷新页面</el-menu-item>
                          <el-menu-item index="回退页面">回退页面</el-menu-item>
                        </>
                      );
                    },
                    title: () => {
                      return <span>页面</span>;
                    },
                  }}
                </el-sub-menu>
                <el-sub-menu index="2">
                  {{
                    default: () => {
                      return (
                        <>
                          <el-menu-item index="打开弹窗">打开弹窗</el-menu-item>
                          <el-menu-item index="关闭弹窗">关闭弹窗</el-menu-item>
                          <el-menu-item index="消息提醒">消息提醒</el-menu-item>
                        </>
                      );
                    },
                    title: () => {
                      return <span>弹窗</span>;
                    },
                  }}
                </el-sub-menu>
                <el-sub-menu index="3">
                  {{
                    default: () => {
                      return (
                        <>
                          <el-menu-item index="发送请求">发送请求</el-menu-item>
                        </>
                      );
                    },
                    title: () => {
                      return <span>服务</span>;
                    },
                  }}
                </el-sub-menu>
                <el-sub-menu index="4">
                  {{
                    default: () => {
                      return (
                        <>
                          <el-menu-item index="提交表单">提交表单</el-menu-item>
                          <el-menu-item index="重置表单">重置表单</el-menu-item>
                          <el-menu-item index="校验表单">校验表单</el-menu-item>
                        </>
                      );
                    },
                    title: () => {
                      return <span>表单</span>;
                    },
                  }}
                </el-sub-menu>
                <el-sub-menu index="5">
                  {{
                    default: () => {
                      return (
                        <>
                          <el-menu-item index="组件可见性">
                            组件可见性
                          </el-menu-item>
                        </>
                      );
                    },
                    title: () => {
                      return <span>组件</span>;
                    },
                  }}
                </el-sub-menu>
              </el-menu>
            </div>
            <div class="events-config-content">
              <div class="events-config-content-item">
                <h3 class="events-config-content-item-title">动作说明</h3>
                <p>
                  {eventConfig.handlerMap.get(state.menuActive).instructions}
                </p>
              </div>
              <div class="events-config-content-item">
                <h3 class="events-config-content-item-title">动作配置</h3>
                {eventConfig.handlerMap
                  .get(state.menuActive)
                  .configRender(state.data)}
              </div>
            </div>
          </div>
        </>
      );
    };
  },
});
