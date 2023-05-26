import { defineComponent, reactive } from 'vue'
import '@/sass/editor/ElComponent.scss'
export default defineComponent({

    setup() {
        interface btn {
            label: String,
            active: boolean
        }

        const state: any = reactive({
            inputIsFocus: false,
        })

        let activeName:String[] = reactive(['1','2']);//折叠模板默认展开标识

        const buttons: Array<btn> = reactive([//标签按钮
            { label: '系统组件', active: true },
            { label: '自定义组件', active: false }
        ])

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
                        <elCollapse v-model={activeName}>
                            <elCollapseItem title="常用组件" name="1" >
                                <div class="ElComponent-list-item">
                                    <span>
                                        <i class="icon iconfont icon-font"></i>
                                        <label>文字</label>
                                    </span>
                                    <span>
                                        <i class="icon iconfont icon-anniu"></i>
                                        <label>按钮</label>
                                    </span>
                                    <span>
                                        <i class="icon iconfont icon-input"></i>
                                        <label>输入框</label>
                                    </span>
                                    <span>
                                        <i class="icon iconfont icon-m-xialacaidan"></i>
                                        <label>下拉框</label>
                                    </span>
                                </div>
                            </elCollapseItem>
                            <elCollapseItem title="表单" name="2">
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