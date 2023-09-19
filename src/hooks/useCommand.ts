import { events } from "../utils/events.ts";
import { onUnmounted } from "vue";
import { ElMessage, ElLoading } from "element-plus";
import mainStore from "../stores/mainStore.ts";
import dragStore from "../stores/dragStore.ts";
import pinia from "../stores/index.ts";
import deepcopy from "deepcopy";
import { localSaveData, localGetData } from "./useStorage.ts";
import { updateEditData } from "../request/api/home";
import { download } from "../request/api/download.ts";
import { addMap,getUUID } from "./useCreateMap.ts";

//命令
interface command {
  name: string; //执行的命令的名称
  keyboard?: string; //执行命令的快捷键
  pushQueue?: boolean; //是否放进队列
  execute: Function; //执行的操作
  init?: Function; //初始化函数
  redo?: Function; //还原命令数据
  undo?: Function; //撤销命令数据
}

export function useCommand() {
  let commandMap = new Map();
  let commands = {}; //命令和执行功能的映射表
  let destroyArray = []; //销毁命令
  let mainData = mainStore(pinia);
  let dragData = dragStore(pinia);

  //存放所有命令
  const commandArray: command[] = [
    //复制命令
    {
      name: "copy",
      keyboard: "ctrl+c",
      execute() {
        return {
          redo() {
            mainData.copyData = dragData.selectKey;
          },
        };
      },
    },
    //粘贴命令
    {
      name: "paste",
      keyboard: "ctrl+v",
      pushQueue: true,
      execute() {
        mainData.menuConfig.key++;
        let copyData = mainData.copyData; //复制的keys
        let key = mainData.wantCopy; //当前选中的keys
        let parent = mainData.EditorDataMap.get(key)?.parent || "page"; //当前选中的keys的父容器key
        let index = mainData.EditorDataMap.get(parent).children.findIndex(
          (item: string) => item == key
        ); //当前选中的keys所在容器的位置
        let addKeys = []; //粘贴后添加上去的key
        return {
          name: "paste",
          parent,
          index,
          copyKey: copyData,
          addKeys,
        };
      },
      redo(data: any) {
        /**
         * 复制所有节点
         * @param {string} keys 需要复制的keys
         * @param {string} parent 需要复制的keys的父容器
         * @param {*} copyData 需要复制的keys的数据
         * @return {*} 返回复制后的keys
         */
        data.addKeys.length = 0;
        function toCopy(keys: string, parent: string, copyData: any): string {
          copyData.parent = parent;
          let id = addMap(keys.replace(/-[^-]*$/, ""), deepcopy(copyData));
          data.addKeys.push(id);
          if (Array.isArray(copyData.children)) {
            mainData.EditorDataMap.get(id).children = copyData.children.map(
              (child: string) => {
                return toCopy(child, id, mainData.EditorDataMap.get(child));
              }
            );
          }
          return id;
        }
        mainData.EditorDataMap.get(data.parent).children.splice(
          data.index + 1,
          0,
          toCopy(
            data.copyKey,
            data.parent,
            mainData.EditorDataMap.get(data.copyKey)
          )
        );
        mainData.menuConfig.key++;
      },
      undo(data: any) {
        mainData.EditorDataMap.get(data.parent).children.splice(
          data.index + 1,
          1
        );
        data.addKeys.forEach((keys: string) => {
          mainData.EditorDataMap.delete(keys);
        });
        mainData.menuConfig.key--;
      },
    },
    //还原命令
    {
      name: "redo",
      keyboard: "ctrl+y",
      execute() {
        return {
          async redo() {
            let item = mainData.queue[mainData.curPointerTo + 1];
            if (item) {
              mainData.modify.disabled = true;
              await commandMap.get(item.name).redo(item);
              mainData.curPointerTo++;
              mainData.modify.disabled = false;
              return true;
            } else {
              return false;
            }
          },
        };
      },
    },
    //撤销命令
    {
      name: "undo",
      keyboard: "ctrl+z",
      execute() {
        return {
          async redo() {
            if (mainData.curPointerTo == -1) return;
            let item = mainData.queue[mainData.curPointerTo];
            if (item) {
              mainData.modify.disabled = true;
              await commandMap.get(item.name).undo(item);
              mainData.curPointerTo--;
              mainData.modify.disabled = false;
              return true;
            } else {
              return false;
            }
          },
        };
      },
    },
    //剪切命令
    {
      name: "shear",
      keyboard: "ctrl+x",
      pushQueue: true,
      execute() {
        mainData.copyData = dragData.selectKey;
        return {
          ...commandMap.get("delete").execute(),
          name: "shear",
        };
      },
      redo(data: any) {
        commandMap.get("delete").redo(data);
      },
      undo(data: any) {
        commandMap.get("delete").undo(data);
      },
    },
    //保存命令
    {
      name: "save",
      keyboard: "ctrl+s",
      execute() {
        return {
          async redo() {
            mainData.isLoading = true;
            localSaveData("title", mainData.title);
            localSaveData("data", mainData.setEditorData());
            let res = await updateEditData({
              jsonData: mainData.setEditorData(),
              id: localGetData("id"),
              title: mainData.title,
            });
            if (res.data?.code == 200) {
              mainData.isLoading = false;
              mainData.isNeedSave = false;
              mainData.isSucessSave = true;
              ElMessage.success({ message: "保存成功", duration: 2000 });
            }
          },
        };
      },
    },
    //清除保存命令
    {
      name: "removeSave",
      keyboard: "ctrl+delete",
      execute() {
        return {
          redo() {
            localStorage.removeItem("title");
            localStorage.removeItem("data");
            ElMessage.success({ message: "清除保存数据成功", duration: 2000 });
          },
        };
      },
    },
    //删除命令
    {
      name: "delete",
      keyboard: "delete",
      pushQueue: true,
      execute() {
        let key = mainData.wantDel;
        if (key) {
          if (dragData.isDrag) {
            dragData.destructionOfDrag();
          }
          let parent = mainData.EditorDataMap.get(key)?.parent || "page";
          let index = mainData.EditorDataMap.get(parent).children.findIndex(
            (item: string) => item == key
          );
          return {
            name: "delete",
            parent,
            key,
            index,
          };
        } else {
          ElMessage.error("编辑区域根节点不能删除！");
        }
      },
      redo(data: any) {
        mainData.EditorDataMap.get(data.parent).children.splice(data.index, 1);
        mainData.menuConfig.key++;
      },
      undo(data: any) {
        mainData.EditorDataMap.get(data.parent).children.splice(
          data.index,
          0,
          data.key
        );
        mainData.menuConfig.key--;
      },
    },
    //预览命令
    {
      name: "preview",
      keyboard: "ctrl+p",
      execute() {
        return {
          redo() {
            if (!mainData.isPreview) {
              mainData.modify.disabled = true;
              mainData.isPreview = true;
              ElMessage.success({ message: "已进入预览模式", duration: 2000 });
            }
          },
        };
      },
    },
    //退出预览命令
    {
      name: "exitPreview",
      keyboard: "esc",
      execute() {
        return {
          
          redo() {
            if (mainData.isPreview) {
              mainData.linkageList.forEach((linkage)=>{
                mainData.handlerLinkage(linkage)
              })
              mainData.linkageList.length = 0;
              mainData.modify.disabled = false;
              mainData.isPreview = false;
              ElMessage.success({ message: "已退出预览模式", duration: 1000 });
            }
          },
        };
      },
    },
    //导出命令
    {
      name: "export",
      keyboard: "ctrl+e",
      execute() {
        return {
          redo() {
            let loadingInstance = ElLoading.service({
              fullscreen: true,
              text: "服务器正在打包中,请稍等半分钟······",
            });
            download("generateZipFile", "lowcode", "zip", loadingInstance, {
              id: localGetData("id"),
            });
          },
        };
      },
    },
    //克隆组件命令
    {
      name: "clone",
      pushQueue: true,
      init() {
        //拖拽之后需要触发对应的指令
        const end = () => commands["clone"]();
        events.on("cloneEnd", end);
        return () => {
          events.off("cloneEnd", end);
        };
      },
      execute() {
        return {
          name: "clone",
          parent: dragData.selectParent,
          type: dragData.selectedMaterial.type,
          defaultData: deepcopy(dragData.selectedMaterial.defaultData),
        };
      },
      redo(data: any) {
        if (!data.id)
          //如果没有id则创建
          data.id = addMap(data.type, {
            ...data.defaultData,
            parent: data.parent,
          });
        //如果没有数据则创建
        if (!mainData.EditorDataMap.has(data.id))
          mainData.EditorDataMap.set(data.id, {
            ...data.defaultData,
            parent: data.parent,
          });
        mainData.EditorDataMap.get(data.parent)?.children.push(data.id); //修改数据并重新渲染编辑区域
        mainData.menuConfig.key++;
        console.log(456);
        
      },
      undo(data: any) {
        let id = mainData.EditorDataMap.get(data.parent)?.children.at(-1);
        mainData.EditorDataMap.get(data.parent)?.children.pop();
        mainData.EditorDataMap.delete(id);
        mainData.menuConfig.key--;
      },
    },
    //拖拽组件命令
    {
      name: "drag",
      pushQueue: true,
      init() {
        //拖拽之后需要触发对应的指令
        this.oldParent = null;
        this.oldIndex = null;
        const start = () => {
          console.log("开始记录");
          this.oldParent =
            mainData.EditorDataMap.get(dragData.selectKey)?.parent || "page";
          this.oldIndex = mainData.EditorDataMap.get(
            this.oldParent
          ).children.findIndex((item: string) => item == dragData.selectKey);
        };
        const end = () => commands["drag"]();
        events.on("dragStart", start);
        events.on("dragEnd", end);
        return () => {
          events.off("dragStart", start);
          events.off("dragEnd", end);
        };
      },
      execute() {
        let key = dragData.selectKey;
        let parent = mainData.EditorDataMap.get(key)?.parent || "page";
        let index = mainData.EditorDataMap.get(parent).children.findIndex(
          (item: string) => item == key
        );
        return {
          name: "drag",
          oldParent: this.oldParent,
          oldIndex: this.oldIndex,
          parent,
          index,
          key,
        };
      },
      redo(data: any) {
        let dragElData = mainData.EditorDataMap.get(data.key);
        dragElData.parent = data.parent;
        mainData.EditorDataMap.get(data.oldParent).children.splice(
          data.oldIndex,
          1
        );
        mainData.EditorDataMap.get(data.parent).children.splice(
          data.index,
          0,
          data.key
        );
      },
      undo(data: any) {
        let dragElData = mainData.EditorDataMap.get(data.key);
        dragElData.parent = data.oldParent;
        mainData.EditorDataMap.get(data.parent).children.splice(data.index, 1);
        mainData.EditorDataMap.get(data.oldParent).children.splice(
          data.oldIndex,
          0,
          data.key
        );
        dragData.selectKey = null;
        dragData.dragEl = null;
        mainData.menuConfig.key--;
      },
    },
    //修改组件配置命令
    {
      name: "change",
      pushQueue: true,
      init() {
        //拖拽之后需要触发对应的指令
        const end = () => commands["change"]();
        events.on("changeEnd", end);
        return () => {
          events.off("changeEnd", end);
        };
      },
      execute() {
        return {
          name: "change",
          key: dragData.selectKey || "page",
          newVal: JSON.stringify(
            mainData.EditorDataMap.get(dragData.selectKey || "page")
          ),
          oldVal: mainData.modify.curData,
        };
      },
      redo(data: any) {
        mainData.modify.modifying--;
        const { newVal, key } = data;
        /**
         *  遍历找到修改的属性并还原
         * @param {*} newVal  旧数据
         * @param {*} curVal    当前数据
         */
        const setNewData = (newVal: any, curVal: any) => {
          for (let [key, val] of Object.entries(newVal)) {
            try {
              if (Array.isArray(val)) {
                console.log("有数组发生修改");
              } else if (typeof val == "object") {
                setNewData(newVal[key], curVal[key]);
              } else if (
                !curVal.hasOwnProperty(key) ||
                curVal[key] != newVal[key]
              ) {
                
                
                curVal[key] = newVal[key];
                console.log(key,curVal[key],newVal[key],curVal);
              }
            } catch (err) {
              ElMessage.error("重做失败！", err);
            }
          }
        };
        setNewData(JSON.parse(newVal), mainData.EditorDataMap.get(key));
        mainData.menuConfig.key++;
      },
      undo(data: any) {
        mainData.modify.modifying++;
        let curData = mainData.EditorDataMap.get(data.key);
        /**
         *  遍历找到修改的属性并撤销
         * @param {*} oldVal  旧数据
         * @param {*} curVal    当前数据
         */
        const setOldData = (oldVal: any, curVal: any) => {
          for (let [key, val] of Object.entries(curVal)) {
            try {
            if (!oldVal.hasOwnProperty(key)) delete curVal[key]; //不存在的属性直接删掉
              if (Array.isArray(val)) {
                console.log("有数组发生修改");
              } else if (typeof val == "object") {
                setOldData(oldVal[key], curVal[key]);
              } else if (curVal[key] != oldVal[key]) {
                curVal[key] = oldVal[key];
              }
            } catch (err) {
              ElMessage.error("撤销失败！", err);
            }
          }
        };
        setOldData(JSON.parse(data.oldVal), curData);
        mainData.menuConfig.key--;
      },
    },
    //替换命令
    {
      name: "swap",
      pushQueue: true,
      execute() {
        mainData.modify.disabled = true;
        let copyData = mainData.copyData; //复制的keys
        let key = mainData.wantCopy; //当前选中的keys
        let parent = mainData.EditorDataMap.get(key)?.parent || "page"; //当前选中的keys的父容器key
        let index = mainData.EditorDataMap.get(parent).children.findIndex(
          (item: string) => item == key
        ); //当前选中的keys所在容器的位置
        let addKeys = []; //粘贴后添加上去的key
        return {
          name: "swap",
          parent,
          index,
          copyKey: copyData,
          addKeys,
          key
        };
      },
      redo(data: any) {
        /**
         * 复制所有节点
         * @param {string} keys 需要复制的keys
         * @param {string} parent 需要复制的keys的父容器
         * @param {*} copyData 需要复制的keys的数据
         * @return {*} 返回复制后的keys
         */
        data.addKeys.length = 0;
        function toCopy(keys: string, parent: string, copyData: any): string {
          copyData.parent = parent;
          let id = addMap(keys.replace(/-[^-]*$/, ""), deepcopy(copyData));
          data.addKeys.push(id);
          if (Array.isArray(copyData.children)) {
            mainData.EditorDataMap.get(id).children = copyData.children.map(
              (child: string) => {
                return toCopy(child, id, mainData.EditorDataMap.get(child));
              }
            );
          }
          return id;
        }
        mainData.EditorDataMap.get(data.parent).children.splice(
          data.index,
          1,
          toCopy(
            data.copyKey,
            data.parent,
            mainData.EditorDataMap.get(data.copyKey)
          )
        );
        mainData.menuConfig.key++;
        dragData.dragEl = null;
        mainData.modify.disabled = false;
      },
      undo(data: any) {
        data.addKeys.forEach((keys: string) => {
          mainData.EditorDataMap.delete(keys);
        });
        mainData.EditorDataMap.get(data.parent).children.splice(
          data.index,
          1,
          data.key
        );
        mainData.menuConfig.key--;
      },
    }
  ];

  //需要使用的键
  const keyCodes = {
    67: "c",
    86: "v",
    90: "z",
    89: "y",
    88: "x",
    83: "s",
    46: "delete",
    80: "p",
    27: "esc",
    69: "e",
  };

  const register = (command: command) => {
    commandMap.set(command.name, command);
    commands[command.name] = () => {
      //处于拖拽中或正在修改数据时禁止触发命令
      if (dragData.isDraging) return;
      const data = command.execute();
      //不需要放入队列的跳过
      if (!command.pushQueue) {
        data.redo();
        return;
      }

      //如果为拖拽命令
      if (command.name == "drag") {
        //当无任何位置调整时
        if (
          data["oldParent"] == data["parent"] &&
          data["oldIndex"] == data["index"]
        ) {
          return;
        }
      } else if (command.name == "change") {
        if(data.oldVal == data.newVal)return;
        mainData.modify.curData = JSON.stringify(
          mainData.EditorDataMap.get(dragData.selectKey || "page")
        );
      } else {
        command.redo(data);
      }
      //最多撤销30步
      if(mainData.queue.length == 30){
        mainData.queue.shift();
        mainData.curPointerTo--;
      }
      if (mainData.queue.length - 1 != mainData.curPointerTo) {
        mainData.queue.splice(mainData.curPointerTo + 1);
      }
      mainData.queue.push({ ...data }); //存放命令的前进后退
      mainData.curPointerTo++;
    };
  };

  //键盘事件
  const keyboardEvent = (() => {
    //键盘按下事件
    const onKeydown = (e: any) => {
      const { ctrlKey, keyCode } = e;
      let keyArr = [];
      if (ctrlKey) keyArr.push("ctrl");
      keyArr.push(keyCodes[keyCode]);
      let keyString = keyArr.join("+");
      commandArray.forEach(({ keyboard, name }) => {
        if (!keyboard) return; //没有键盘事件
        if (keyboard === keyString) {
          //执行相应的命令并阻止默认事件
          if (keyString == "delete") {
            // 如果执行删除事件，此时是根节点则不执行
            mainData.wantDel ? commands[name]() : "";
          } else {
            commands[name]();
          }

          if (keyString == "ctrl+s") {
            mainData.isNeedSave = false;
          } else {
            mainData.isLoading = false;
            mainData.isSucessSave = false;
            mainData.isNeedSave = true;
          }
          if (["c", "v", "x"].includes(keyCodes[keyCode]) && !dragData.isDrag)
            return;
          e.preventDefault();
        }
      });
    };
    //绑定事件并返回解绑事件
    return () => {
      //初始化事件
      window.addEventListener("keydown", onKeydown);
      return () => {
        //销毁事件
        window.removeEventListener("keydown", onKeydown);
      };
    };
  })();

  (() => {
    destroyArray.push(keyboardEvent());
    commandArray.forEach((com: command) => {
      register(com); //循环注册命令
      com.init && destroyArray.push(com.init()); //将可销毁命令放入销毁数组中
    });
  })();

  onUnmounted(() => {
    //解绑事件
    destroyArray.forEach((fn) => fn && fn());
  });

  return {
    commands,
  };
}
