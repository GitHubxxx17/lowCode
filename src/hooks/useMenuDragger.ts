import { Ref } from "vue";

export function useMenuDragger(containerRef:Ref,data:Ref):any {
    let currentComponent:Object | null = null;

    const dragenter = (e:any) => {
        e.dataTransfer.dropEffect = 'move'//鼠标拖拽样式
    }

    const dragover = (e:any) => {
        e.preventDefault();
    }

    const dragleave = (e:any) => {
        e.dataTransfer.dropEffect = 'none'
    }

    const drop = (e:any) => {
        let blocks = data.value.blocks;
        data.value = {
            ...data.value,
            blocks: [
                ...blocks,
                {
                    top: e.offsetY,
                    left: e.offsetX,
                    zIndex: 1,
                    // key: currentComponent.key,
                    alignCenter: true,
                    props:{},
                    model:{}
                }
            ]
        }
        currentComponent = null;
    }

    const dragstart = (component:Object) => {
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

    return {
        dragstart,
        dragend
    }
}