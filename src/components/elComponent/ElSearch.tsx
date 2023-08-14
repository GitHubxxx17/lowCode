import { defineComponent, onUnmounted, reactive, ref, watch } from "vue";
import { localSaveData, localGetData } from "../../hooks/useStorage";
import "@/sass/editor/ElSearch.scss";

interface Search {
  value: string; //搜索值
  searchKey: string; //搜索历史保存本地的键
  searchDefault: {
    //默认的搜索值
    label: string; //标签
    list: string[]; //搜索默认值列表
  };
  placeholder: string; //输入框占位
}

export default defineComponent({
  props: {
    search: { type: Object as () => Search },
  },
  setup(props) {
    const inputRef = ref(null);
    const state: any = reactive({
      searchList: localGetData(props.search.searchKey) || [], //历史记录
      inputIsFocus: false,
    });

    const searchFocus = (): void => {
      //点击input
      state.inputIsFocus = true;
    };

    const searchBlur = (): void => {
      //取消input焦点
      state.inputIsFocus = false;
    };
    window.addEventListener("click", searchBlur);

    onUnmounted(()=>{
      window.removeEventListener("click", searchBlur);
    })

    //保存记录
    const saveRecords = () => {
      if (props.search.value.trim() != "") {
        let index = state.searchList.findIndex(
          (v: string) => v == props.search.value
        );
        if (index >= 0) {
          //将出现过的记录删掉
          state.searchList.splice(index, 1);
        }
        state.searchList.unshift(props.search.value);
        localSaveData(props.search.searchKey, state.searchList);
      }
    };

    //清空所有记录
    const delAll = () => {
      state.searchList = [];
      localStorage.removeItem(props.search.searchKey);
    };

    //删除记录
    const deleteRecords = (i: number, e: any) => {
      e.stopPropagation();
      state.searchList.splice(i, 1);
      localSaveData(props.search.searchKey, state.searchList);
    };

    //搜索
    const toSearch = (val: string) => {
      searchBlur();
      props.search.value = val;
      saveRecords();
    };

    watch(
      () => props.search.value,
      (newValue) => {
        if (newValue == "") {
          searchFocus();
        } else {
          searchBlur();
        }
      }
    );

    return () => {
      return (
        <div
          class="el-search"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div
            class={[
              state.inputIsFocus ? "el-search-input-focus" : "",
              "el-search-input",
            ]}
          >
            <input
              ref={inputRef}
              type="text"
              placeholder={props.search.placeholder}
              onFocus={searchFocus}
              onChange={saveRecords}
              v-model={props.search.value}
            />
            <span>
              <i
                class={[
                  "icon iconfont",
                  props.search.value ? "icon-cha" : "icon-search",
                ]}
                onClick={(_) => (props.search.value = "")}
              ></i>
            </span>
          </div>
          {state.inputIsFocus && (
            <div class="el-search-content" onClick={() => {}}>
              {state.searchList.length != 0 && (
                <div class="el-search-content-history">
                  <div class="el-search-content-history-header">
                    <span>搜索历史</span>
                    <span onClick={delAll}>清空</span>
                  </div>
                  <div class="el-search-content-history-list">
                    <ul>
                      {state.searchList.map((item: string, i: number) => {
                        return (
                          <li onClick={(_) => toSearch(item)}>
                            <span>{item}</span>
                            <i
                              class="icon iconfont icon-guanbi"
                              onClick={(e) => deleteRecords(i, e)}
                            ></i>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              )}

              <div class="el-search-content-default">
                <div class="el-search-content-default-header">
                  <span>{props.search.searchDefault.label}</span>
                </div>
                <div class="el-search-content-default-list">
                  <ul>
                    {props.search.searchDefault.list.map((item: string) => {
                      return (
                        <li onClick={(_) => toSearch(item)}>
                          <span>{item}</span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    };
  },
});
