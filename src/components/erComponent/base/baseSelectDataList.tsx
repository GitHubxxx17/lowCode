import { defineComponent, ref, onMounted, onUnmounted, reactive } from "vue";
import { ElButton, ElInput, ElMessage } from "element-plus";
import Draggable from "../../../hooks/draggable";
export default defineComponent({
  props: {
    option: { type: Object },
    check: { type: Boolean },
  },
  setup(props) {
    const selectDataList = ref(null);
    const state = reactive({
      isShow: false,
      addData: "",
    });
    onMounted(() => {
      new Draggable({
        el: selectDataList.value,
        handle: "selectDataDrag",
        dragData: props.option.selectData,
        dragClassName: "active",
        cloneClassName: "drag-ghost",
      });
    });
    //添加选项
    const addSelectData = (value: string) => {
      props.option.selectData.push({
        ...{
          radio: false,
          value,
          isShow: false,
        },
      });
    };

    //批量添加
    const comfirmBatchAdd = () => {
      console.log("确认添加");
      state.addData.split("\n").map((val: string) => {
        if (val.trim() != "") addSelectData(val);
      });
      state.addData = "";
      state.isShow = false;
    };

    //点击隐藏菜单
    const windowClick = () => {
      props.option.selectData.map((item: any) => (item.isShow = false));
    };
    window.addEventListener("click", windowClick);
    onUnmounted(() => {
      window.removeEventListener("click", windowClick);
    });
    return () => {
      return (
        <>
          <div class="elCollapseItem">数据</div>
          <div class="selectDataList" ref={selectDataList}>
            {props.option.selectData.map((item, i) => {
              return (
                <div class="elCollapseItem">
                  <div class="selectData">
                    <i class="icon iconfont icon-drag selectDataDrag"></i>
                    {props.check && (
                      <input
                        class="selectData-radio"
                        type="checkbox"
                        value="true"
                        name="defaultValue"
                        title="默认选中"
                        checked={item.radio}
                        onChange={(_) => {
                          item.radio = !item.radio;
                          props.option.checkGroup.length = 0;
                          props.option.selectData.map((v) => {
                            if (v.radio) props.option.checkGroup.push(v.value);
                          });
                          console.log(props.option.checkGroup);
                        }}
                      />
                    )}
                    {!props.check && (
                      <input
                        class="selectData-radio"
                        type="radio"
                        value="true"
                        name="defaultValue"
                        title="默认选中"
                        checked={item.radio}
                        onChange={(_) => {
                          props.option.selectData.forEach(
                            (item) => (item.radio = false)
                          );
                          item.radio = true;
                          props.option.defaultValue.value = item.value;
                        }}
                      />
                    )}

                    <ElInput
                      v-model={item.value}
                      placeholder="请输入选项的值"
                    ></ElInput>
                    <div
                      class="selectData-menu"
                      onClick={(e) => {
                        e.stopPropagation();
                        props.option.selectData.forEach(
                          (item) => (item.isShow = false)
                        );
                        item.isShow = true;
                      }}
                    >
                      <i class="icon iconfont icon-caidan"></i>
                      <div
                        class="selectData-menu-dropdown"
                        v-show={item.isShow}
                      >
                        <span
                          v-show={item.radio}
                          onClick={(e) => {
                            e.stopPropagation();
                            item.isShow = false;
                            item.radio = false;
                          }}
                        >
                          取消勾选
                        </span>
                        <span
                          onClick={(e) => {
                            e.stopPropagation();
                            item.isShow = false;
                            if (props.option.selectData.length > 1)
                              props.option.selectData.splice(i, 1);
                            else {
                              ElMessage.warning({
                                message: "最后一项不可删除",
                                duration: 2000,
                              });
                            }
                          }}
                        >
                          删除
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div class="elCollapseItem selectDataList-footer">
            <ElButton
              plain
              onClick={() =>
                addSelectData(`选项${props.option.selectData.length + 1}`)
              }
            >
              添加选项
            </ElButton>
            <ElButton plain onClick={() => (state.isShow = true)}>
              批量添加
            </ElButton>
          </div>

          <el-dialog
            append-to-body
            title="批量添加"
            v-model={state.isShow}
            width="500px"
          >
            {{
              default: () => {
                return (
                  <>
                    <el-alert
                      title="每个选项单列一行，将所有值不重复的项加为新的选项;"
                      type="success"
                      closable={false}
                    >
                      {" "}
                    </el-alert>
                    <ElInput
                      type="textarea"
                      v-model={state.addData}
                      autosize={{ minRows: 10, maxRows: 100 }}
                      placeholder="请输入内容"
                    ></ElInput>
                  </>
                );
              },
              footer: () => {
                return (
                  <span class="dialog-footer">
                    <ElButton onClick={() => (state.isShow = false)}>
                      取 消
                    </ElButton>
                    <ElButton type="primary" onClick={comfirmBatchAdd}>
                      确 定
                    </ElButton>
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
