import mainStore from "../stores/mainStore.ts";
import pinia from "../stores/index.ts";
import { reactive } from "vue";
import { localGetData } from "./useStorage.ts";

const EditorDataMap = new Map();

export const useCreateMap = () => {
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
  const mainData = mainStore(pinia);
  let id: string = key + "-" + getUUID();
  mainData.EditorDataMap.set(id, reactive(data));
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
  let data = JSON.parse(localGetData('data'));
  for(let [key,value] of Object.entries(data)){
    EditorDataMap.set(key,reactive(value as object));
  }
};

export const parseMapToJson = (EditorDataMap:any):any => {
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
  return JSON.stringify(Object.fromEntries(EditorDataMap));
}

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
