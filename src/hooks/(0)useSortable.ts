import { render, createVNode } from 'vue'
import Sortable from "sortablejs";
import { editorConfig } from '../utils/editor-config';
import deepcopy from 'deepcopy'
function useSortable(): any {
    let ghost = false//是否添加影子
    let renderer = null//渲染函数
    let datatype = ''//数据类型
    const listItemOptions: Sortable.Options = {//sortable配置项
        group: {
            name: 'listItem',
            pull: 'clone',
            put: false // 不允许拖拽进这个列表
        },
        animation: 150,
        sort: false, // 设为false，禁止sort
        ghostClass: "sortable-ghost",
        dragClass: "sortable-drag",
        onClone: function () {//当克隆组件时调用

        },
        onStart: function (evt) {//开始拖拽时调用
            ghost = false
            datatype = getDatatype(evt.item)
            renderer = editorConfig.componentMap.get(datatype).render;//通过映射表键值获取渲染函数
        },
        onMove() {//移动组件时调用
            if (!ghost) {
                let div = document.querySelector('.sortable-ghost');
                div.innerHTML = ''
                if (datatype.includes('container')) {
                    render(createVNode(renderer({ children: [] })), div)
                } else {
                    render(createVNode(renderer({ children: '' })), div)
                }
                ghost = true;
            }
        },
        
    }




    function getDatatype(item: any) {//获取组件对应的键值
        let value = item.attributes.datatype;
        if (value) {
            return value.nodeValue.replace('datatype="', '').replace('"', '') || '';
        } else {
            return item.attributes.type.nodeValue.replace('datatype="', '').replace('"', '') || '';
        }

    }
    let clone = true;//是否处于克隆组件
    let addcomponentData = {};
    function setContainerOptions(containerRef: any, data: any) {

        const containerOptions: Sortable.Options = {
            group: {
                name: 'container',
                put: ['listItem', 'container']
            },
            animation: 150,
            chosenClass: 'sortable-chosen',
            onStart: function (/**Event*/evt) {
                clone = false;
                console.log(evt);
                addcomponentData = data[evt.oldIndex]
            },
            onAdd: function (evt) {//添加组件时调用
                console.log('onadd');
                if (clone) {//如果是listItem克隆组件
                    let datatype = getDatatype(evt.item);//获取组件对应的键
                    let componentData = editorConfig.componentMap.get(datatype);//获取组件的数据
                    containerRef.value.removeChild(evt.item)//移出拖拽组件
                    data.splice(evt.newIndex, 0, deepcopy(componentData.defaultData))//修改json数据，将新组件添加进去并重新渲染
                } else {
                    console.log(addcomponentData);
                    data.splice(evt.newIndex, 0, deepcopy(addcomponentData))//修改json数据，将新组件添加进去并重新渲染
                    clone = true;
                }
            },
            onRemove: function (evt) {//移除组件时调用
                console.log('onRemove');
                data.splice(evt.oldIndex, 1);//修改json数据，将新组件移除进去并重新渲染
                console.log(data);
            },
            onUpdate: function (evt) {//更新组件顺序时调用
                let componentData = data[evt.oldIndex];
                if (evt.oldIndex != evt.newIndex) {
                    data.splice(evt.oldIndex, 1)
                    data.splice(evt.newIndex, 0, componentData)
                }
                console.log(evt);
            },
            onEnd: function (evt) {
                console.log(evt);
                clone = true;
            },
        }
        return containerOptions
    }



    return {
        getDatatype,
        listItemOptions,
        setContainerOptions
    }
}

export const usesortable = useSortable();