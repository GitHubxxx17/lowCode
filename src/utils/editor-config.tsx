//列表区显示所有物料
//key对应组件的映射关系

import { ElButton, ElInput, ElSelect } from "element-plus"

const componentsConfig = [
    {
        label: "容器", icon: "icon iconfont icon-checkbox", type: "container-ordinary",category:'container',
        render(props: any) {
            return <div class="container-ordinary" 
            style={props.style}
            onMouseenter={e => props.onmouseenter(e)}
            onMouseleave={_ => props.onmouseleave()}
            >
                {props.children ? props.children : '容器'}
                </div>
        }
    },
    {
        label: "自由容器", icon: "icon iconfont icon-zidingyibuju", type: "container-free",category:'container',
        render(props: any) {
            return <div class="container-free" 
            style={props.style}
            onMouseenter={props.onmouseenter}
            >
                {props.children ? props.children : '自由容器'}
                </div>
        }
    },
    {
        label: "文字", icon: "icon iconfont icon-font", type: "text",category:'common',
        render(props: any) {
            return <span style={props.style}>{props.children ? props.children : '渲染文字'}</span>
        }
    },
    {
        label: "按钮", icon: "icon iconfont icon-anniu", type: "button",category:'common',
        render(props: any) {
            return <ElButton style={props.style}>{props.children ? props.children : '渲染按钮'}</ElButton>
        }
    },
    {
        label: "输入框", icon: "icon iconfont icon-input", type: "input",category:'common',
        render(props: any) {
            return <ElInput></ElInput>
        }
    },
    {
        label: "下拉框", icon: "icon iconfont icon-m-xialacaidan", type: "select",category:'common',
        render(props: any) {
            return <ElSelect></ElSelect>
        }
    }
]

interface componentConfig {
    label: String,
    type: string,
    category: String,
    preview: () => any,
    render: (props: any) => any,
}

class createEditorConfig {

    public componentList: Array<componentConfig>;//组件数组
    public componentMap: Map<string, componentConfig>;//组件映射表

    constructor(componentList: Array<componentConfig> = [], componentMap: Map<string, componentConfig> = new Map()) {
        this.componentList = componentList;
        this.componentMap = componentMap;
    }

    register(component: componentConfig) {//注册组件
        this.componentList.push(component);
        this.componentMap.set(component.type, component);
    }
}

export const editorConfig = new createEditorConfig();

for (let block of componentsConfig) {//遍历声明的组件并注册
    editorConfig.register({
        label: block.label,
        type: block.type,
        category: block.category,
        preview: () => <span>
            <i class={block.icon}></i>
            <label>{block.label}</label>
        </span>,
        render: (props) => block.render(props),
        
    })
}
