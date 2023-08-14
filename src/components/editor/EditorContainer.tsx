import "@/sass/editor/EditorContainer.scss";
import { defineComponent, onMounted, ref, watch } from "vue";
import { usedragger } from "../../hooks/useDragger.ts";
import { mapRenderer } from "../../hooks/useRender.ts";
import dragStore from "../../stores/dragStore.ts";
import pinia from "../../stores/index.ts";
import deepcopy from "deepcopy";

export default defineComponent({
  props: {
    EditorData: Object,
  },
  setup(props) {
    let containerRef = ref(null);
    const dragData = dragStore(pinia);
    onMounted(() => {
      containerRef.value.attributes.childrenList =
        props.EditorData.get("page").children;
      /**找到所选中的节点
       * @param {*} target 目标节点
       * @return {*}  {*} 选中的节点
       */
      const findSelectNode = (nodes: any, selectKey: string): any => {
        let isFind = false; // 记录是否找到节点
        let selectNode = null; // 记录找到的节点
        // 遍历节点
        const traverseNodes = (childNodes) => {
          // 如果已经找到则返回
          if (isFind) {
            return;
          }

          // 遍历当前所有的节点
          for (let i = 0; i < childNodes.length; i++) {
            const childNode = childNodes[i];
            // 如果已经当前选中的节点
            if (childNode.getAttribute("data-id") == selectKey) {
              isFind = true;
              selectNode = childNode;
              return;
            }

            // 找出该节点（childNode）的 classList，
            // 如果他不是组件则进行不递归，继续遍历剩余节点
            let childrenList = childNode.children[0]?.classList
              ? [...childNode.children[0].classList]
              : "";
            if (
              childrenList &&
              (childrenList.includes("cannotPreview") ||
                childrenList.includes("container-ordinary"))
            ) {
              return traverseNodes(childNode.children);
            } else {
              continue;
            }
          }
        };

        // 遍历递归当前 page 页面存在的所有子节点
        for (let i = 0; i < nodes.length; i++) {
          if (!isFind) {
            if (nodes[i].getAttribute("data-id") == selectKey) {
              return nodes[i];
            }
            traverseNodes(nodes[i].children);
          } else {
            break;
          }
        }
        return selectNode;
      };

      // 给选中节点标上样式
      const giveStyle = (selectKey) => {
        let target = deepcopy(containerRef.value);
        dragData.dragEl = findSelectNode(target.children, selectKey);
      };
      watch(
        () => dragData.selectKey,
        () => {
          giveStyle(dragData.selectKey);
        }
      );
    });

    return () => {
      return (
        <div
          class="Editorcontainer"
          ref={containerRef}
          onMouseenter={(e) => usedragger.mouseenter(e)}
          onClick={(e) => usedragger.onclickToDrag(e)}
          style={props.EditorData.style}
          data-id="page"
        >
          {mapRenderer("page")}
        </div>
      );
    };
  },
});
