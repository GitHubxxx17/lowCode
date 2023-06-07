import { reactive, render } from 'vue';
import dragStore from '../stores/dragStore.ts';
import pinia from '../stores/index.ts'
let jsonData = null;//渲染的json数据

function useDragger(): any {
    const dragData = dragStore(pinia)//拖拽数据
    let ghostEl = null;//影子组件
    let container = null;//父容器
    let renderEl = null;//渲染节点
    let startX = 0;
    let startY = 0;
    /**
     *
     *物料区鼠标事件
     * @param {*} component //物料区组件
     * @param {*} e
     */
    const mousedown = (component: any, e: any) => {
        const { clientY, clientX, target } = e;
        const span = findSpan(target);
        const { top, left } = span.getBoundingClientRect();

        startX = clientX - left;
        startY = clientY - top;
        dragData.isClone = true;
        dragData.selectedMaterial = component;
        //添加拖拽的影子
        ghostEl = document.createElement('div');
        ghostEl.classList.add('ghostDrag');
        document.body.appendChild((render(dragData.selectedMaterial.preview(), ghostEl), ghostEl));
        ghostEl.style.top = `${top}px`
        ghostEl.style.left = `${left}px`

        renderEl = null;
        container = null;
        document.body.addEventListener('mousemove', dragMousemove)
    }


    document.body.onmouseup = () => {//鼠标松开
        if (dragData.isClone) {//当处于克隆节点时
            
            if (ghostEl) document.body.removeChild(ghostEl);
            if (container) {
                container.classList.remove('chosen-container');//移除上一个容器的选中
                let childrenData = findVnodeProps(container);
                childrenData.push(dragData.selectedMaterial.defaultData)
            }
            if(renderEl) renderEl.remove()
            dragData.isClone = false;
            dragData.selectedMaterial = null;
        }

        document.body.removeEventListener('mousemove', dragMousemove)
    }

    const dragMousemove = (e: any) => {//鼠标移动
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
            container.appendChild((render(dragData.selectedMaterial.render({ children: [] }), renderEl), renderEl));
        }
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
                container.appendChild((render(dragData.selectedMaterial.render({ children: [] }), renderEl), renderEl));
            }
        }
    }



    /**
     *
     *
     * @param {*} target 目标节点
     * @return {*} 返回标签为span的父组件
     */
    const findSpan = (target: any): any => {

        if(target.tagName == 'DIV')//如果点到父节点就直接返回子节点
        return target.children[0]
        
        if (target.tagName == 'SPAN') {
            return target;
        } else {
            return findSpan(target.parentNode);
        }
    }


    /**
     *
     *
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

    const findVnodeProps = (target: any): any => {
        let props = target.__vueParentComponent.props
        if (props.EditorData) {
            return props.EditorData.body
        } else {
            return props.childrenList;
        }
    }








    return {
        mousedown,
        mouseenter,
        mouseleave
    }
}

export /**
 *
 *设置渲染数据
 * @param {Object} data 渲染json数据
 */
    const setJsonData = (data: Object): void => {
        jsonData = reactive(data);
    }

export const usedragger = useDragger();

