import { reactive, watch } from "vue";
import { localGetData } from "./useStorage.ts";
import useDebouce from "./useDebounce.ts";
import { events } from "../utils/events.ts";
// 组件哈希树
const EditorDataMap = new Map();
// 正在修改的组件数据
let modifys = null;

/**
 *  生成唯一的uuid
 * @return {*}  {string}
 */
const getUUID = (): string => {
  return "xyxxyxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

/**
 *  监听处理
 * @param {string} key 节点key
 * @param {*} value 节点数据
 */
const watchHandler = (key: string, value: any) => {
  //数据响应式处理
  let valRef = reactive(value as object);
  //防抖处理函数
  let debouceFun = useDebouce(() => {
    events.emit("changeEnd");
  }, 700);
  // 防抖监听数据修改
  watch(
    () => valRef,
    () => {
      if (modifys.disabled) return;
      debouceFun();
    },
    { deep: true }
  );
  EditorDataMap.set(key, valRef);
};

/**
 * 构建哈希树
 * @param modify
 * @returns
 */
export const useCreateMap = (modify: any) => {
  modifys = modify;
  EditorDataMap.clear();
  let data = JSON.parse(localGetData("data"));
  for (let [key, value] of Object.entries(data)) {
    watchHandler(key, value);
  }
  return EditorDataMap;
};

/**
 * 将哈希树解析成json
 * @param EditorDataMap
 * @returns
 */
export const parseMapToJson = (EditorDataMap: any): any => {
  let newEditorDataMap = new Map();
  // 深度搜索重构哈希树，剔除已被删除的数据
  //ps: 删除操作只删除哈希树中对应组件的数据，并没有将其所有的子组件都删除掉
  const DFSMap = (key: string) => {
    newEditorDataMap.set(key, EditorDataMap.get(key));
    let children = EditorDataMap.get(key).children;
    if (Array.isArray(children)) {
      children.map((id: string) => {
        DFSMap(id);
      });
    }
  };
  DFSMap("page");
  return JSON.stringify(Object.fromEntries(newEditorDataMap));
};

/**
 *  添加节点
 * @param {string} key 节点key
 * @param {*} data 节点数据
 * @return {*}  {string} 返回节点id
 */
export const addMap = (key: string, data: any): string => {
  let id: string = key + "-" + getUUID();
  watchHandler(id, data);
  return id;
};
