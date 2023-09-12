import { events } from "../utils/events.ts";
import { onUnmounted } from "vue";
import { ElMessage,ElLoading } from "element-plus";
import mainStore from "../stores/mainStore.ts";
import dragStore from "../stores/dragStore.ts";
import pinia from "../stores/index.ts";
import deepcopy from "deepcopy";
import { localSaveData, localGetData } from "./useStorage.ts";
import { updateEditData } from "../request/api/home";
import { download } from "../request/api/download.ts";
import { addMap } from "./useCreateMap.ts";

//命令
interface command {
  name: string; //执行的命令的名称
  keyboard?: string; //执行命令的快捷键
  pushQueue?: boolean; //是否放进队列
  execute: Function; //执行的操作
  init?: Function; //初始化函数
}

export function useCommand() {
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
        console.log("复制");
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
        let data = mainData.EditorDataMap.get(copyData); //复制的key的数据
        let addKeys = []; //粘贴后添加上去的key
        return {
          redo() {
            /**
             * 复制所有节点
             * @param {string} keys 需要复制的keys
             * @param {string} parent 需要复制的keys的父容器
             * @param {*} data 需要复制的keys的数据
             * @return {*} 返回复制后的keys
             */
            function toCopy(keys: string, parent: string, data: any): string {
              data.parent = parent;
              let id = addMap(keys.replace(/-[^-]*$/, ""), deepcopy(data));
              addKeys.push(id);
              if (Array.isArray(data.children)) {
                mainData.EditorDataMap.get(id).children = data.children.map(
                  (child: string) => {
                    return toCopy(child, id, mainData.EditorDataMap.get(child));
                  }
                );
              }
              return id;
            }
            mainData.EditorDataMap.get(parent).children.splice(
              index + 1,
              0,
              toCopy(copyData, parent, data)
            );
            mainData.menuConfig.key++;
          },
          undo() {
            mainData.EditorDataMap.get(parent).children.splice(index + 1, 1);
            addKeys.forEach((keys: string) => {
              mainData.EditorDataMap.delete(keys);
            });
            mainData.menuConfig.key--;
          },
        };
      },
    },
    //还原命令
    {
      name: "redo",
      keyboard: "ctrl+y",
      execute() {
        return {
          redo() {
            let item = mainData.queue[mainData.curPointerTo + 1];
            if (item) {
              item.redo && item.redo();
              mainData.curPointerTo++;
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
          redo() {
            if (mainData.curPointerTo == -1) return;
            let item = mainData.queue[mainData.curPointerTo];
            if (item) {
              item.undo && item.undo();
              mainData.curPointerTo--;
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
        let key = dragData.selectKey;
        let parent = mainData.EditorDataMap.get(key)?.parent || "page";
        let index = mainData.EditorDataMap.get(parent).children.findIndex(
          (item: string) => item == key
        );
        if (dragData.isDrag) {
          dragData.destructionOfDrag();
        }
        return {
          redo() {
            mainData.EditorDataMap.get(parent).children.splice(index, 1);
            mainData.menuConfig.key++;
          },
          undo() {
            mainData.EditorDataMap.get(parent).children.splice(index, 0, key);
            mainData.menuConfig.key--;
          },
        };
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
          let parent = mainData.EditorDataMap.get(key)?.parent || "page";
          let index = mainData.EditorDataMap.get(parent).children.findIndex(
            (item: string) => item == key
          );
          if (dragData.isDrag) {
            dragData.destructionOfDrag();
          }
          return {
            redo() {
              mainData.EditorDataMap.get(parent).children.splice(index, 1);
              mainData.menuConfig.key++;
            },
            undo() {
              mainData.EditorDataMap.get(parent).children.splice(index, 0, key);
              mainData.menuConfig.key--;
            },
          };
        } else {
          ElMessage.error("编辑区域根节点不能删除！");
        }
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
            let loadingInstance = ElLoading.service({ fullscreen: true ,text: '服务器正在打包中,请稍等半分钟······'})
            download('generateZipFile','lowcode','zip',loadingInstance,{id:localGetData('id')})
          },
        };
      },
    },
    //克隆组件命令
    {
      name: "clone",
      pushQueue: true,
      init() {
        //初始化操作
        this.before = null;
        //监控拖拽开始事件，保存状态
        //拖拽之后需要触发对应的指令
        const end = () => commands["clone"]();
        events.on("cloneEnd", end);
        return () => {
          events.off("cloneEnd", end);
        };
      },
      execute() {
        let parent = dragData.selectParent;
        let selectedMaterial = dragData.selectedMaterial;
        let defaultData = deepcopy(dragData.selectedMaterial.defaultData);
        let index = mainData.EditorDataMap.get(parent)?.children.length;
        let id = null;
        return {
          redo() {
            id = addMap(selectedMaterial.type, {
              ...defaultData,
              parent: parent,
            });
            mainData.EditorDataMap.get(parent)?.children.push(id); //修改数据并重新渲染编辑区域
            mainData.menuConfig.key++;
          },
          undo() {
            mainData.EditorDataMap.get(parent)?.children.splice(index, 1);
            mainData.EditorDataMap.delete(id);
            mainData.menuConfig.key--;
          },
        };
      },
    },
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
    commands[command.name] = () => {
      //处于拖拽中时禁止触发命令
      if (dragData.isDraging) return;
      const { redo, undo } = command.execute();
      redo();
      if (!command.pushQueue) return; //不需要放入队列的跳过
      if (mainData.queue.length > 0) {
        mainData.queue = mainData.queue.slice(0, mainData.curPointerTo + 1);
        mainData.queue = mainData.queue;
      }
      mainData.queue.push({ redo, undo }); //存放命令的前进后退
      mainData.curPointerTo += 1;
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
