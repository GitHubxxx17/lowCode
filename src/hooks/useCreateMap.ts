import { reactive, watch } from "vue";
import { localGetData } from "./useStorage.ts";
import useDebouce from "./useDebounce.ts";
import { events } from "../utils/events.ts";

const EditorDataMap = new Map();

let modifys = null;

export const useCreateMap = (modify: any) => {
  modifys = modify;
  EditorDataMap.clear();
  buildMap();
  return EditorDataMap;
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

const buildMap = () => {
  // let id: string = data.type + "-" + getUUID();
  // let children: string[] = [];
  // if (data.body) {
  //   data.body.forEach((item: any) => {
  //     children.push(buildMap(item, parent));
  //   });
  //   EditorDataMap.set(parent, reactive({ ...data, children: children, body: "" }));
  // } else {
  //   if (Array.isArray(data.children)) {
  //     data.children.forEach((item: any) => {
  //       children.push(buildMap(item, id));
  //     });
  //     EditorDataMap.set(id, reactive({ parent: parent, ...data, children }));
  //   } else {
  //     EditorDataMap.set(id, reactive({ parent: parent, ...data }));
  //   }
  // }
  // return id;
  let data = JSON.parse(localGetData("data"));
  for (let [key, value] of Object.entries(data)) {
    watchHandler(key, value);
  }
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
      console.log(1111,modifys);
      debouceFun();
    },
    { deep: true }
  );
  EditorDataMap.set(key, valRef);
};

export const parseMapToJson = (EditorDataMap: any): any => {
  // let EditorData = {};
  // const parseMap = (key:string):any => {
  //     let data = deepcopy(EditorDataMap.get(key));
  //     let children = [];
  //     if(Array.isArray(data.children)){
  //       data.children.map((child:string)=>{
  //         children.push(parseMap(child));
  //       })
  //       if(key == 'page'){
  //         data.body = children;
  //         delete data.children;
  //       }else{
  //         data.children = children;
  //       }
  //     }
  //     delete data.parent;
  //     return data;
  // }
  // EditorData = parseMap('page');
  // console.log(EditorData);
  // return EditorData;
  let newEditorDataMap = new Map();
  //深度搜索重构哈希树，剔除已被删除的数据
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
 *  生成唯一的uuid
 * @return {*}  {string}
 */
export const getUUID = (): string => {
  return "xyxxyxxx".replace(/[xy]/g, function (c) {
    let r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};
