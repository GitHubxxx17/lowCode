import { reactive, render } from 'vue';
import dragStore from '../stores/dragStore.ts';
import pinia from '../stores/index.ts'
import deepcopy from 'deepcopy';
let jsonData = null;//渲染的json数据
console.log(jsonData);
function useDragger(): any {
    const dragData = dragStore(pinia)//拖拽数据
    let ghostEl = null;//影子组件
    let container = null;//父容器
    let renderEl = null;//渲染节点
    let dragEl = null;//拖拽组件
    let startX = 0;//鼠标在目标节点中的x值
    let startY = 0;//鼠标在目标节点中的y值
    let oldContainer = null;//一开始拖拽时组件所在的容器
    let oldDragData = null;//拖拽节点的数据
    let oldIndex = -1//拖拽节点一开始的位置
    let newIndex = -1;//拖拽节点最后的位置
    let dragChildList = []//拖拽节点当前容器所有的子节点
    let isSort = false;//是否排序
    let isDraging = false;//正在拖拽中
    let isAdd = false;//是否添加进其他容器
    /**
     *物料区鼠标事件
     * @param {*} component //物料区组件
     * @param {*} e
     */
    const mousedown = (component: any, e: any) => {
        mouseup();
        const { clientY, clientX, target } = e;
        const span = findSpan(target);
        const { top, left } = span.getBoundingClientRect();

        startX = clientX - left;
        startY = clientY - top;
        dragData.isClone = true;
        dragData.selectedMaterial = component;
        //添加拖拽的影子
        ghostEl = document.createElement('div');
        ghostEl.classList.add('ghostClone');
        document.body.appendChild((render(dragData.selectedMaterial.preview(), ghostEl), ghostEl));
        ghostEl.style.top = `${top}px`
        ghostEl.style.left = `${left}px`

        renderEl = null;
        container = null;
        document.body.addEventListener('mousemove', cloneMousemove)
    }

    const mouseup = (): void => {//鼠标松开
        if (dragData.isClone) {//当处于克隆节点时
            if (ghostEl) document.body.removeChild(ghostEl);//移除影子（后面得改成隐藏和显示）
            if (container) {
                container.classList.remove('chosen-container');//移除上一个容器的选中
                let childrenData = findVnodeProps(container);//获取json子数据
                childrenData.push(deepcopy(dragData.selectedMaterial.defaultData))//修改数据并重新渲染编辑区域
            }
            if (renderEl) renderEl.remove();
            dragData.isClone = false;
            dragData.selectedMaterial = null;
        }

        if (dragData.isDrag) {
            if (ghostEl) document.body.removeChild(ghostEl);//移除影子（后面得改成隐藏和显示）
            if (dragEl) {
                document.body.removeEventListener('mousemove', dragMousemove)//解绑鼠标移动事件，防止报错
                container.classList.remove('chosen-container');
                console.log(oldIndex, newIndex);

                // if (isAdd) {
                //     let oldChildrenData = findVnodeProps(oldContainer);//获取json子数据
                //     oldChildrenData.forEach((data: any, i: number) => {
                //         if (data == oldDragData) {
                //             oldChildrenData.splice(i, 1);
                //         }
                //     })
                //     isAdd = false;
                // }

                // if (isSort) {
                //     if (oldIndex < newIndex)//将交换的节点复原
                //         container.insertBefore(dragEl, container.children[oldIndex]);
                //     if (oldIndex > newIndex)//将交换的节点复原
                //         insertAfter(dragEl, container.children[oldIndex]);
                //     let childrenData = findVnodeProps(container);//获取json子数据
                //     let dragData = oldDragData;
                //     if (oldIndex != childrenData.length - 1) {
                //         childrenData.splice(oldIndex, 1);
                //         childrenData.splice(newIndex, 0, dragData);//修改数据并重新渲染编辑区域
                //     } else {
                //         childrenData.splice(newIndex, 0, deepcopy(dragData));//修改数据并重新渲染编辑区域
                //         childrenData.pop();
                //     }
                //     isSort = false;
                // }



                dragEl.classList.remove('chosenEl');
                dragEl.onmousedown = null;

            }
            isDraging = false;
            dragData.isDrag = false;
            dragEl = null;
        }

        document.body.removeEventListener('mousemove', cloneMousemove)
        document.body.removeEventListener('mousemove', dragMousemove)
    }

    document.body.onmouseup = mouseup;

    const cloneMousemove = (e: any) => {//克隆组件时的鼠标移动
        const { clientY, clientX } = e;
        ghostEl.style.top = `${clientY - startY}px`
        ghostEl.style.left = `${clientX - startX}px`
    }

    const mouseenter = (e: any) => {//鼠标移入
        if (dragData.isClone) {
            if (container) {
                container.classList.remove('chosen-container');//移除上一个容器的选中
                if (renderEl) {
                    container.removeChild(renderEl)
                }
            }
            container = findParentContainer(e.target);//获取容器节点
            container.classList.add('chosen-container');

            renderEl = document.createElement('div');
            renderEl.classList.add('renderEl');
            container.appendChild((render(dragData.selectedMaterial.render(dragData.selectedMaterial.defaultData), renderEl), renderEl));
        }
        // if (isDraging) {
        //     container.classList.remove('chosen-container');
        //     let newDragEl = deepcopy(dragEl);//深拷贝拖拽组件
        //     dragEl.remove();//将组件移除
        //     container = findParentContainer(e.target);//获取当前正在拖拽的容器
        //     container.classList.add('chosen-container');
        //     container.appendChild(newDragEl);//将复制的组件添加进新容器里面
        //     isAdd = oldContainer == container ? false : true;
        //     //初始化所有参数
        //     dragEl = newDragEl;
        //     dragChildList = [...container.children];//获取当前容器所有子组件
        //     oldIndex = dragChildList.indexOf(dragEl);//获取拖拽组件在当前容器的位置
        //     newIndex = oldIndex;
        // }
    }

    const mouseleave = (e: any) => {//鼠标移出
        if (dragData.isClone) {
            if (container) container.classList.remove('chosen-container');//移除上一个容器的选中
            let newContainer = findParentContainer(e.target);//获取容器节点
            container.removeChild(renderEl)
            if (container == newContainer) {//鼠标移出后如果获取的容器与上一个相同则获取它的父节点容器
                container = findParentContainer(e.target.parentNode);
                container.classList.add('chosen-container');
                renderEl = document.createElement('div');
                renderEl.classList.add('renderEl');
                container.appendChild((render(dragData.selectedMaterial.render(dragData.selectedMaterial.defaultData), renderEl), renderEl));
            }
        }

    }
    /**
     * @param {*} target 目标节点
     * @return {*} 返回标签为span的父组件
     */
    const findSpan = (target: any): any => {

        if (target.tagName == 'DIV')//如果点到父节点就直接返回子节点
            return target.children[0]

        if (target.tagName == 'SPAN') {
            return target;
        } else {
            return findSpan(target.parentNode);
        }
    }
    /**
     * @param {*} target 目标节点
     * @return {*}  {*}返回最近的父容器节点
     */
    const findParentContainer = (target: any): any => {
        if (target.className.includes('container')) {
            return target;
        } else {
            return findParentContainer(target.parentNode);
        }
    }
    /**
     * @param {*} target 目标容器
     * @return {*}  {*} 返回该容器的json子数据
     */
    const findVnodeProps = (target: any): any => {
        let props = target.__vueParentComponent.props
        if (props.EditorData) {
            return props.EditorData.body
        } else {
            return props.childrenList;
        }
    }


    /**
     * @param {*} oldNode 要被插入的节点
     * @param {*} newNode 要插入的节点
     */
    function insertAfter(newNode: any, oldNode: any) {
        if (oldNode != oldNode.parentNode.lastElementChild) {  // 判断  如果不是父节点的最后一个子节点执行的语句
            oldNode.parentNode.insertBefore(newNode, oldNode.nextElementSibling);
        } else {  // 如果是最后一个子节点,那么就直接添加到最后一个;
            oldNode.parentNode.appendChild(newNode);
        }
    }




    //点击选中节点进行拖拽
    const onclickToDrag = (e: any) => {
        ghostEl = null;
        isDraging = false;
        if (e.target.classList.contains('Editorcontainer')) return;//如果点击的是编辑区域就直接结束函数
        dragData.isDrag = true;
        dragEl = findDragEl(e.target);//获取拖拽节点
        dragEl.classList.add('chosenEl');
        container = findParentContainer(dragEl.parentNode);//获取当前正在拖拽的容器
        container.classList.add('chosen-container');
        oldContainer = container;
        console.dir(dragEl)
        dragEl.onmousedown = (e: any) => {
            const { clientY, clientX } = e;
            const { top, left } = dragEl.getBoundingClientRect();
            let childrenData = findVnodeProps(container);//获取json子数据
            dragChildList = [...container.children];//获取当前容器所有子组件
            oldIndex = dragChildList.indexOf(dragEl);//获取拖拽组件在当前容器的位置
            newIndex = oldIndex;
            oldDragData = childrenData[oldIndex];
            startX = clientX - left;
            startY = clientY - top;
            isDraging = true;
            createDragGhost();//创建拖拽的影子节点

            document.body.addEventListener('mousemove', dragMousemove)
        }
    }

    const dragMousemove = (e: any) => {//拖拽组件时的鼠标移动
        //影子组件移动
        const { clientY, clientX } = e;
        ghostEl.style.top = `${clientY - startY}px`;
        ghostEl.style.left = `${clientX - startX}px`;

        let enterEl = findDragEl(e.target)

        // dragChildList.forEach((dom, i) => {//遍历子节点，将目标节点（不是拖拽节点）与拖拽节点交换位置
        //     if (enterEl == dom && i != newIndex) {
        //         if (i > newIndex)
        //             container.insertBefore(dragEl, container.children[i + 1]);
        //         else
        //             container.insertBefore(dragEl, container.children[i]);
        //         dragChildList = [...container.children];//获取当前容器所有子组件
        //         newIndex = dragChildList.indexOf(dragEl);//获取拖拽组件在当前容器的位置
        //         isSort = true;
        //         return;
        //     }
        // })
    }




    /**找到所选中的节点
     * @param {*} target 目标节点
     * @return {*}  {*} 选中的节点
     */
    const findDragEl = (target: any): any => {//当节点为svg时会报错
        if (!target) return null;
        if ((target.className && target.className.includes('container')) || (target.classList && target.classList.contains('cannotPreview')))
            return target;
        else
            return findDragEl(target.parentNode);
    }

    //创建拖拽的影子节点
    const createDragGhost = () => {
        const { top, left, width, height } = dragEl.getBoundingClientRect();
        ghostEl = document.createElement('div');
        ghostEl.classList.add('ghostDrag');
        ghostEl.style.width = `${width}px`;
        ghostEl.style.height = `${height}px`;
        ghostEl.innerHTML = dragEl.outerHTML
        document.body.appendChild(ghostEl);
        ghostEl.style.top = `${top}px`;
        ghostEl.style.left = `${left}px`;
    }



// for (let i = 0; i < dragChildList.length; i++) {
    //   if (
    //     i !== newIndex &&
    //     e.clientX > dragChildList[i].left &&
    //     e.clientX < dragChildList[i].right &&
    //     e.clientY > dragChildList[i].top &&
    //     e.clientY < dragChildList[i].bottom
    //   ) {
    //     if (newIndex < i) {
    //       for (let j = newIndex; j < i; j++) {
    //         if (j < oldIndex) {
    //           container.children[j].style.transform =
    //             "translate3d(0px, 0px, 0)";
    //         } else {
    //           // const x = dragChildList[j].left - dragChildList[j + 1].left;
    //           // const y = dragChildList[j].top - dragChildList[j + 1].top;
    //           let widthOfAccount =
    //             cLeft +
    //             cWidth -
    //             dragChildList[j].left -
    //             dragChildList[j].width -
    //             dragChildList[j + 1].width;
    //           console.log(widthOfAccount,dragChildList[oldIndex].width);
    //           if (widthOfAccount >= 0) {
    //             container.children[j + 1].style.transform =
    //               "translate3d(" +
    //               -dragChildList[oldIndex].width +
    //               "px, " +
    //               0 +
    //               "px, 0)";
    //           }
    //         }
    //       }
    //     } else if (newIndex > i) {
    //       for (let j = i; j < newIndex; j++) {
    //         if (oldIndex <= j) {
    //           container.children[j + 1].style.transform =
    //             "translate3d(0px, 0px, 0)";
    //         } else {
    //           // const x = dragChildList[j + 1].left - dragChildList[j].left;
    //           // const y = dragChildList[j + 1].top - dragChildList[j].top;
    //           // container.children[j].style.transform =
    //           //   "translate3d(" + x + "px, " + y + "px, 0)";
    //           if (
    //             Math.abs(dragChildList[j].top - dragChildList[oldIndex].top) <=
    //             dragChildList[j].height
    //           ) {
    //             container.children[j].style.transform =
    //               "translate3d(" +
    //               dragChildList[oldIndex].width +
    //               "px, " +
    //               0 +
    //               "px, 0)";
    //           }
    //         }
    //       }
    //     }
    //     let left = 0;
    //     // const x = dragChildList[i].left - dragChildList[oldIndex].left;
    //     // const y = dragChildList[i].top - dragChildList[oldIndex].top;
    //     for (let j = oldIndex + 1; j <= i; j++) {
    //       left += dragChildList[j].width;
    //     }
    //     dragData.dragEl.style.transform =
    //       "translate3d(" + left + "px, " + 0 + "px, 0)";
    //     newIndex = i;
    //     //节流重新渲染
    //     // if (!timer) {
    //     //   timer = setTimeout(() => {
    //     //     refreshDragEl();
    //     //     getDragChildList();
    //     //     timer = null;
    //     //   }, 200);
    //     // }
    //     break;
    //   }
    // }






    return {
        mousedown,
        mouseenter,
        mouseleave,
        onclickToDrag
    }
}
/**
 *设置渲染数据
 * @param {Object} data 渲染json数据
 */
export const setJsonData = (data: Object): void => {
    jsonData = reactive(data);
}

export const usedragger = useDragger();

