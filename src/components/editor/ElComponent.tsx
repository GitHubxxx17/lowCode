import {defineComponent,reactive} from 'vue'
import '@/sass/editor/ElComponent.scss'
export default defineComponent({
    
    setup(){
        interface btn {
            label: String,
            active: boolean
        }

        const state:any = reactive({
            inputIsFocus:false,
        })

        const buttons:Array<btn> = reactive([//标签按钮
            {label:'系统组件',active:true},
            {label:'自定义组件',active:false}
        ])

        const onClickBtn = (index: number) => {
            buttons.forEach((item, i) => {
                if (i === index){
                    item.active = true;
                    return;
                }
                item.active = false;
            })
        }

        const searchFocus = ():void => {//点击input
            state.inputIsFocus = true
        }

        const searchBlur = ():void => {//取消input焦点
            state.inputIsFocus = false
        }

        return ()=> {
            return <div class="ElComponent">
                <div class="ElComponent-top">
                    <div class={[state.inputIsFocus ? 'ElComponent-top-input-focus' : '','ElComponent-top-input']}>
                    <input type="text" placeholder='查找组件' onFocus={searchFocus} onBlur={searchBlur}/>
                        <span>
                            <i class="icon iconfont icon-search"></i>
                        </span>
                    </div>
                </div>
                <div class="ElComponent-header">
                    {
                        buttons.map((btn,index)=>{
                            return <label 
                            onClick={_ => onClickBtn(index)}
                            class={btn.active ? 'ElComponent-header-labelActive' : ''}

                            >{btn.label}</label>
                        })
                    }
                </div>
                <div class="ElComponent-list">
                    <elCollapse >
                        <elCollapseItem title="常用组件"  name="1">123213</elCollapseItem>
                        <elCollapseItem title="表单"  name="2">21312</elCollapseItem>
                    </elCollapse>
                </div>
            </div>
        }
    }
})