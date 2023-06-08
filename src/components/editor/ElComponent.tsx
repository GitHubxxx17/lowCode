import { defineComponent, reactive, inject, ref } from 'vue'
import '@/sass/editor/ElComponent.scss'
import { usedragger } from '../../hooks/useDragger'; 


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

        let setListItemRef = (el:any):void => {//获取预览组件的父节点数组
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
                                            component.category == 'container' && <div 
                                            onMousedown={e=>usedragger.mousedown(component,e)}
                                            >
                                                {
                                                    component.preview()
                                                }
                                            </div>
                                        ))
                                    }
                                </div>
                            </elCollapseItem>
                            <elCollapseItem title="常用组件" name="2" >
                                <div class="ElComponent-list-item" ref={setListItemRef}>
                                    {
                                        config.componentList.map((component: any) => (
                                            component.category == 'common' && <div 
                                            onMousedown={e=>usedragger.mousedown(component,e)}
                                            >
                                                {
                                                    component.preview()
                                                }
                                            </div>
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