import { defineComponent, reactive, inject, ref, onMounted, render, createVNode } from 'vue'
import '@/sass/editor/ElComponent.scss'
// import { useMenudragger } from '../../hooks/useMenuDragger';
import Sortable from "sortablejs";
import _appendGhost from './_appendGhost.js'

export default defineComponent({
    props: {
        EditorData: Object
    },
    setup() {
        const config: any = inject('editorConfig');//组件配置

        interface btn {
            label: String,
            active: boolean
        }

        const state: any = reactive({
            inputIsFocus: false,
            activeName: reactive(['1', '2', '3'])//折叠模板默认展开标识
        })

        const buttons: Array<btn> = reactive([//标签按钮
            { label: '系统组件', active: true },
            { label: '自定义组件', active: false }
        ])

        let listItem = ref([]);

        let setListItemRef = (el:any):void => {
            listItem.value.push(el)
        }

        const onClickBtn = (index: number) => {
            buttons.forEach((item, i) => {
                if (i === index) {
                    item.active = true;
                    return;
                }
                item.active = false;
            })
        }

        const searchFocus = (): void => {//点击input
            state.inputIsFocus = true;
        }

        const searchBlur = (): void => {//取消input焦点
            state.inputIsFocus = false;
        }

        onMounted(() => {
            let ghost = false//是否添加影子
            let renderer = null//渲染函数
            let datatype = ''//数据类型
            const options:Sortable.Options = {//sortable配置项
                group: {
                    name: 'listItem',
                    pull: 'clone',
                    put: false // 不允许拖拽进这个列表
                },
                animation: 150,
                sort: false, // 设为false，禁止sort
                ghostClass: "sortable-ghost",
                dragClass: "sortable-drag",
                onClone: function (evt) {//当克隆组件时调用
                    console.log(evt);
                },
                onStart: function (evt) {//开始拖拽时调用
                    ghost = false
                    datatype = getDatatype(evt.item)
                    renderer = config.componentMap.get(datatype).render;//通过映射表键值获取渲染函数

                },
                onMove() {//移动组件时调用
                    if (!ghost) {
                        let div = document.querySelector('.sortable-ghost');
                        div.innerHTML = ''
                        if(datatype.includes('container')){
                            render(createVNode(renderer({ children: [] })), div)
                        }else{
                            render(createVNode(renderer({ children: '' })), div)
                        }
                        ghost = true;
                    }
                },
            }
            
            // Sortable.prototype._dragStarted = _appendGhost;
            // console.log(Sortable.prototype);
            listItem.value.forEach((item)=> {
                new Sortable(item, options);
            })
        })

        // function getItemProps(item: any) {
        //     return item.__vueParentComponent.props || null;
        // }

        function getDatatype(item: any) {//获取组件对应的键值
            let value = item.attributes.datatype.nodeValue;
            return value.replace('datatype="', '').replace('"', '') || '';
        }

        return () => {
            return <div class="ElComponent">
                <div class="ElComponent-top">
                    <div class={[state.inputIsFocus ? 'ElComponent-top-input-focus' : '', 'ElComponent-top-input']}>
                        <input type="text" placeholder='查找组件' onFocus={searchFocus} onBlur={searchBlur} />
                        <span>
                            <i class="icon iconfont icon-search"></i>
                        </span>
                    </div>
                </div>
                <div class="ElComponent-header">
                    {
                        buttons.map((btn, index) => {
                            return <label
                                onClick={_ => onClickBtn(index)}
                                class={btn.active ? 'ElComponent-header-labelActive' : ''}

                            >{btn.label}</label>
                        })
                    }
                </div>
                {
                    buttons[0].active && <div class="ElComponent-list">
                        <elCollapse v-model={state.activeName}>
                            <elCollapseItem title="布局容器" name="1" >
                                <div class="ElComponent-list-item" ref={setListItemRef}>
                                    {
                                        config.componentList.map((component: any) => (
                                            component.category == 'container' && component.preview()
                                            //<div
                                            //     draggable
                                            // // onDragstart={_ => useMenudragger.dragstart(component)}
                                            // // onDragend={_ => useMenudragger.dragend()}
                                            // >
                                            //     {component.preview()}
                                            // </div>
                                        ))
                                    }
                                </div>
                            </elCollapseItem>
                            <elCollapseItem title="常用组件" name="2" >
                                <div class="ElComponent-list-item" ref={setListItemRef}>
                                    {
                                        config.componentList.map((component: any) => (
                                            component.category == 'common' && component.preview()
                                        ))
                                    }
                                </div>
                            </elCollapseItem>
                            <elCollapseItem title="表单" name="3">
                                <div class="ElComponent-list-item">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </elCollapseItem>
                        </elCollapse>
                    </div>
                }

            </div>
        }
    }
})