import { defineComponent, reactive, inject, watch } from "vue";
import "@/sass/editor/ElComponent.scss";
import { usedragger } from "../../hooks/useDragger";
import ElSearch from "./ElSearch";

export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup() {
    const config: any = inject("editorConfig"); //组件配置

    const state: any = reactive({
      search: {
        value: "",
        searchKey: "componentSearch",
        searchDefault:{
          label:'组件分类',
          list:["布局容器", "常用组件", "表单"]
        },
        placeholder:'查找组件',
      },
      componentList: {
        container: {
          label: "布局容器",
          list: [],
          hidden: false,
        },
        common: {
          label: "常用组件",
          list: [],
          hidden: false,
        },
        form: {
          label: "表单",
          list: [],
          hidden: false,
        },
      },
      activeName: reactive(["layoutContainer", "commonComponents", "form"]), //折叠模板默认展开标识
    });

    //将组件列表进行分类
    (() => {
      config.componentList.map((item: any) => {
        switch (item.category) {
          case "container":
            state.componentList.container.list.push(item);
            break;
          case "common":
            state.componentList.common.list.push(item);
            break;
          case "form":
            state.componentList.form.list.push(item);
            break;
          default:
            break;
        }
      });
    })();

    watch(
      () => state.search.value,
      (newValue) => {
        if (newValue == "") {
          for (let key of Object.keys(state.componentList)) {
            state.componentList[key].list.filter((item: any) => {
              item.display = true;
            });
            state.componentList[key].hidden = false;
          }
        } else {
          for (let key of Object.keys(state.componentList)) {
            if (state.componentList[key].label.indexOf(newValue) >= 0) {
              state.componentList[key].list.filter((item: any) => {
                item.display = true;
              });
            } else {
              let len = state.componentList[key].list.length;
              state.componentList[key].list.map((item: any) => {
                if (item.label.indexOf(newValue) >= 0) {
                  item.display = true;
                } else {
                  item.display = false;
                  len--;
                }
              });
              state.componentList[key].hidden = len == 0;
            }
          }
        }
      }
    );

    return () => {
      return (
        <div class="ElComponent">
          <div class="ElComponent-top">
            <ElSearch search={state.search}></ElSearch>
          </div>
          <div class="ElComponent-list">
            <elCollapse v-model={state.activeName}>
              {!state.componentList.container.hidden && (
                <elCollapseItem title="布局容器" name="layoutContainer">
                  <div class="ElComponent-list-item">
                    {state.componentList.container.list.map(
                      (component: any) =>
                        component.display && (
                          <div
                            onMousedown={(e) =>
                              usedragger.cloneMousedown(component, e)
                            }
                          >
                            {component.preview()}
                          </div>
                        )
                    )}
                  </div>
                </elCollapseItem>
              )}
              {!state.componentList.common.hidden && (
                <elCollapseItem title="常用组件" name="commonComponents">
                  <div class="ElComponent-list-item">
                    {state.componentList.common.list.map(
                      (component: any) =>
                        component.display && (
                          <div
                            onMousedown={(e) =>
                              usedragger.cloneMousedown(component, e)
                            }
                          >
                            {component.preview()}
                          </div>
                        )
                    )}
                  </div>
                </elCollapseItem>
              )}
              {!state.componentList.form.hidden && (
                <elCollapseItem title="表单" name="form">
                  <div class="ElComponent-list-item">
                    {state.componentList.form.list.map(
                      (component: any) =>
                        component.display && (
                          <div
                            onMousedown={(e) =>
                              usedragger.cloneMousedown(component, e)
                            }
                          >
                            {component.preview()}
                          </div>
                        )
                    )}
                  </div>
                </elCollapseItem>
              )}
            </elCollapse>
          </div>
        </div>
      );
    };
  },
});
