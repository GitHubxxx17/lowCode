import { defineComponent, reactive, watchEffect, ref, onMounted } from "vue";
import { BaseInput,BaseSelect, BaseSwitch,BaseAppearance } from "../base/index";
import { ElInput, ElButton } from "element-plus";
import Draggable from '../../../hooks/draggable.ts'
export const SelectAppearance = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    // 下拉器
    const activeNames: string[] = [
      "basic",
      "titleType",
      "inputBoxType",
      "styleSource",
    ];

    const state = reactive({
      inputBoxSize: {
        value: "占满",
        options: [
          {
            value: "占满",
          },
          {
            value: "大",
          },
          {
            value: "中",
          },
          {
            value: "小",
          },
          {
            value: "极小",
          },
        ],
      },
      inputBoxType: {
        writingStyle: true,
        bgColor: true,
        border: true,
        marginAndPadding: true,
        radius: true,
        style: props.option.style,
      },
    });

    (() => {
      if (props.option.style.width) {
        const { width } = props.option.style.width;
        if (width == "80px") {
          state.inputBoxSize.value = "极小";
        } else if (width == "160px") {
          state.inputBoxSize.value = "小";
        } else if (width == "240px") {
          state.inputBoxSize.value = "中";
        } else if (width == "320px") {
          state.inputBoxSize.value = "大";
        }
      }
    })();

    watchEffect(() => {
    
      if (state.inputBoxSize.value == "极小") {
        props.option.style.width = "80px";
      } else if (state.inputBoxSize.value == "小") {
        props.option.style.width = "160px";
      } else if (state.inputBoxSize.value == "中") {
        props.option.style.width = "240px";
      } else if (state.inputBoxSize.value == "大") {
        props.option.style.width = "320px";
      } else {
        delete props.option.style.width;
      }
    });

    return () => {
      return (
        <elCollapse modelValue={activeNames}>
          <elCollapseItem title="基本" name="basic">
            <BaseSelect
              label="下拉框尺寸"
              setting={state.inputBoxSize}
            ></BaseSelect>
          </elCollapseItem>
          <elCollapseItem title="下拉框样式" name="inputBoxType">
            <BaseAppearance option={state.inputBoxType}></BaseAppearance>
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
      );
    };
  },
});

export const SelectProperty = defineComponent({
  props: {
    option: { type: Object },
  },
  setup(props) {
    // 下拉器
    const activeNames: string[] = ["basic", "options"];

    const state = reactive({
      bindingField: {
        label: "绑定字段",
        value: props.option.bindingField ? props.option.bindingField : "",
      },
      filterable: {
        label: "可搜索",
        value: props.option.filterable ? props.option.filterable : false,
      },
      multiple: {
        label: "是否多选",
        value: props.option.multiple ? props.option.multiple : false,
      },
      defaultValue: {
        label: "默认值",
        value: props.option.defaultValue ? props.option.defaultValue : "",
        clearable: true,
      },
      inputBoxPlaceholder: {
        label: "占位提示",
        value: props.option.inputBoxPlaceholder
          ? props.option.inputBoxPlaceholder
          : "",
        placeholder: "空内容提示占位",
      },
      selectData: [
        {
          radio: false,
          value: "选项A",
          isShow: false,
        },
        {
          radio: false,
          value: "选项B",
          isShow: false,
        },
        {
          radio: false,
          value: "选项C",
          isShow: false,
        },
      ],
    });

    (()=>{
      if(props.option.selectData){
        state.selectData = props.option.selectData.map((item)=>{
          return {
            ...item,
            isShow:false
          }
        })
      }
    })()

    let selectDataList = ref(null);
    onMounted(() => {
      new Draggable({
        el: selectDataList.value,
        handle: "selectDataDrag",
        dragData: state.selectData,
        dragClassName:"active",
        cloneClassName:"drag-ghost"
      });
    });

    const addSelectData = () => {
      state.selectData.push({
        ...{
          radio: false,
          value: "",
          isShow: false,
        },
      });
      selectDataList = ref(null);
    };

    watchEffect(() => {
      if (state.bindingField.value != "")
        props.option.bindingField = state.bindingField.value;
      else delete props.option.bindingField;
      if (state.filterable.value)
        props.option.filterable = state.filterable.value;
      else delete props.option.filterable;
      if (state.multiple.value) props.option.multiple = state.multiple.value;
      else delete props.option.multiple;
      if (state.defaultValue.value != "")
        props.option.defaultValue = state.defaultValue.value;
      else delete props.option.defaultValue;
      if (state.inputBoxPlaceholder.value != "")
        props.option.inputBoxPlaceholder = state.inputBoxPlaceholder.value;
      else delete props.option.inputBoxPlaceholder;

      props.option.selectData = state.selectData.map((item) => {
        return {
          value:item.value,
          radio:item.radio
        }
      })
    });

    return () => {
      return (
        <>
          <elCollapse modelValue={activeNames}>
            <elCollapseItem title="基本" name="basic">
              <BaseInput option={state.bindingField}></BaseInput>
              <BaseSwitch option={state.multiple}></BaseSwitch>
              <BaseSwitch option={state.filterable}></BaseSwitch>
              <BaseInput option={state.defaultValue}></BaseInput>
              <BaseInput option={state.inputBoxPlaceholder}></BaseInput>
            </elCollapseItem>
            <elCollapseItem title="选项" name="options">
              <div class="elCollapseItem">数据</div>
              <div class="selectDataList" ref={selectDataList}>
                {state.selectData.map((item) => {
                  return (
                    <div class="elCollapseItem">
                      <div class="selectData">
                        <i class="icon iconfont icon-drag selectDataDrag"></i>
                        <input
                          class="selectData-radio"
                          type="radio"
                          value="true"
                          name="defaultValue"
                          title="默认选中"
                          checked={item.radio}
                          onChange={_=>{
                            state.selectData.forEach(item=>item.radio = false);
                            item.radio = true;
                            state.defaultValue.value = item.value;
                          }}
                        />
                        <ElInput
                          v-model={item.value}
                          placeholder="请输入选项的值"
                        ></ElInput>
                        <div class="selectData-menu">
                          <i class="icon iconfont icon-caidan"></i>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div class="elCollapseItem selectDataList-footer">
                <ElButton plain onClick={addSelectData}>
                  添加选项
                </ElButton>
                <ElButton plain>批量添加</ElButton>
              </div>
            </elCollapseItem>
          </elCollapse>
        </>
      );
    };
  },
});
