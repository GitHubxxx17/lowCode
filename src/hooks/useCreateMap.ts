import mainStore from "../stores/mainStore.ts";
import pinia from "../stores/index.ts";

const EditorDataMap = new Map();

export const useCreateMap = (data: any) => {
  EditorDataMap.clear();

  buildMap(data, "page");
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
  mainData.EditorDataMap.set(id, data);
  return id;
};

/**
 * 构建编辑数据哈希表结构
 * @param {*} data 数据
 * @param {string} parent 父节点id
 * @return {*} 当前节点id
 */
const buildMap = (data: any, parent: string): string => {
  let id: string = data.type + "-" + getUUID();
  let children: string[] = [];
  if (data.body) {
    data.body.forEach((item: any) => {
      children.push(buildMap(item, parent));
    });
    EditorDataMap.set(parent, { ...data, children: children, body: "" });
  } else {
    if (Array.isArray(data.children)) {
      data.children.forEach((item: any) => {
        children.push(buildMap(item, id));
      });
      EditorDataMap.set(id, { parent: parent, ...data, children });
    } else {
      EditorDataMap.set(id, { parent: parent, ...data });
    }
  }
  return id;
};

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
