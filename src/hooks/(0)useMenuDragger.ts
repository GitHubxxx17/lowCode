import { ref } from 'vue'
function useMenuDragger(): any {
    let currentComponent: any = null;
    let data: any = null;
    let containerRef: any = null;

    const dragenter = (e: any) => {
        e.dataTransfer.dropEffect = 'move'//鼠标拖拽样式
    }

    const dragover = (e: any) => {
        e.preventDefault();
    }

    const dragleave = (e: any) => {
        e.dataTransfer.dropEffect = 'none'
    }

    const drop = (e: any) => {
        console.log(containerRef,'12312');
                
        data.value.body && data.value.body.push({
            type: currentComponent.type,
            children: currentComponent.type.includes('container') ? [] : '',
            style: {
                position: "relative",
                zIndex: 1
            },
        })
        data.value.children && data.value.children.push({
            type: currentComponent.type,
            children: currentComponent.type.includes('container') ? [] : '',
            style: {
                position: "relative",
                zIndex: 1
            },
        })
        currentComponent = null;
    }

    const dragstart = (component: Object) => {
        containerRef.value.addEventListener('dragenter', dragenter)
        containerRef.value.addEventListener('dragover', dragover)
        containerRef.value.addEventListener('dragleave', dragleave)
        containerRef.value.addEventListener('drop', drop)
        currentComponent = component;
    }

    const dragend = () => {
        containerRef.value.removeEventListener('dragenter', dragenter)
        containerRef.value.removeEventListener('dragover', dragover)
        containerRef.value.removeEventListener('dragleave', dragleave)
        containerRef.value.removeEventListener('drop', drop)
        currentComponent = null
    }

    const setData = (value: any):void => {//绑定数据
        data = ref(value)
    }

    const setcontainerRef = (value: any):void => {//绑定容器
        console.log(value);
        
        containerRef = ref(value)
    }

    return {
        dragstart,
        dragend, 
        setData, 
        setcontainerRef
    }
}

export const useMenudragger = useMenuDragger();