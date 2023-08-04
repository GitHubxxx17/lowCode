import { events } from "../utils/events.ts";
import { onUnmounted, reactive } from "vue";
import { ElMessage } from "element-plus";
import mainStore from "../stores/mainStore.ts";
import dragStore from "../stores/dragStore.ts";
import pinia from "../stores/index.ts";
import deepcopy from "deepcopy";
import { localSaveData, localGetData } from "./useStorage.ts";
import { updateEditData } from "../request/api/home";
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
  let cur: number = -1; //前进后退的指针
  let queue = []; //存放所有操作命令
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
            mainData.copyData = dragData.selectedComponent;
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
        let before = deepcopy(mainData.EditorData);
        if (mainData.copyData && dragData.containerData) {
          dragData.containerData.splice(
            dragData.selectedIndex + 1,
            0,
            deepcopy(mainData.copyData)
          );
        }
        let after = deepcopy(mainData.EditorData);
        return {
          redo() {
            mainData.EditorData = after;
          },
          undo() {
            mainData.EditorData = before;
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
            let item = queue[cur + 1];
            if (item) {
              item.redo && item.redo();
              cur++;
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
            if (cur == -1) return;
            let item = queue[cur];
            if (item) {
              item.undo && item.undo();
              cur--;
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
        let before = deepcopy(mainData.EditorData);
        if (dragData.isDrag) {
          mainData.copyData = dragData.selectedComponent;
          dragData.destructionOfDrag();
          dragData.containerData.splice(dragData.selectedIndex, 1);
        }
        let after = deepcopy(mainData.EditorData);
        return {
          redo() {
            mainData.EditorData = after;
          },
          undo() {
            mainData.EditorData = before;
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
            localSaveData("title", mainData.title);
            localSaveData("data", mainData.EditorData);
            let res = await updateEditData({
              jsonData: JSON.stringify(mainData.EditorData),
              id: localGetData("id"),
              title: mainData.title,
            });
            if (res.data?.code == 200) {
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
        let key = dragData.selectKey;
        let parent = mainData.EditorDataMap.get(key).parent;
        let index = mainData.EditorDataMap.get(parent).children.findIndex(
          (item: string) => item == key
        );
        if (dragData.isDrag) {
          dragData.destructionOfDrag();
        }
        return {
          redo() {
            mainData.EditorDataMap.get(parent).children.splice(index, 1);
          },
          undo() {
            mainData.EditorDataMap.get(parent).children.splice(index, 0, key);
          },
        };
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
            const a = document.createElement("a");
            a.style.display = "none";
            //文件的名称
            a.download = mainData.title + ".json";
            //生成一个blob二进制数据，内容为json数据
            var blob = new Blob([JSON.stringify(mainData.EditorData)]);
            //生成一个指向blob的URL地址，并赋值给a标签的href属性
            a.href = URL.createObjectURL(blob);
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
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
        const start = () => (this.before = deepcopy(mainData.EditorData));
        //拖拽之后需要触发对应的指令
        const end = () => commands["clone"]();
        events.on("cloneStart", start);
        events.on("cloneEnd", end);
        return () => {
          events.off("cloneStart", start);
          events.off("cloneEnd", end);
        };
      },
      execute() {
        let parent = dragData.selectParent;
        let selectedMaterial = dragData.selectedMaterial;
        let defaultData = deepcopy(dragData.selectedMaterial.defaultData);
        let index = mainData.EditorDataMap.get(parent).children.length;
        let id = null;
        return {
          redo() {
            id = addMap(selectedMaterial.type, {
              ...defaultData,
              parent: parent,
            });
            mainData.EditorDataMap.get(parent).children.push(id); //修改数据并重新渲染编辑区域
          },
          undo() {
            mainData.EditorDataMap.get(parent).children.splice(index, 1);
            mainData.EditorDataMap.delete(id);
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
      if (queue.length > 0) {
        queue = queue.slice(0, cur + 1);
        queue = queue;
      }
      queue.push({ redo, undo }); //存放命令的前进后退
      cur += 1;
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
          commands[name]();
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
