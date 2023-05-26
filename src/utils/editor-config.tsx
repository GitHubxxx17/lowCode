//列表区显示所有物料
//key对应组件的映射关系

import { ElButton, ElInput, ElSelect } from "element-plus"

const componentsConfig = [
    {
        label: "文字", icon: "icon iconfont icon-font", key: "text", render(props:any) {
            return <span>{props.text ? props.text : '渲染文字'}</span>
        }
    },
    {
        label: "按钮", icon: "icon iconfont icon-anniu", key: "button", render(props:any) {
            return <ElButton>{props.text ? props.text : '渲染按钮'}</ElButton>
        }
    },
    {
        label: "输入框", icon: "icon iconfont icon-input", key: "input", render(props:any) {
            return <ElInput></ElInput>
        }
    },
    {
        label: "下拉框", icon: "icon iconfont icon-m-xialacaidan", key: "select", render(props:any) {
            return <ElSelect></ElSelect>
        }
    }
]

interface componentConfig {
    label: String,
    key: string,
    preview: () => any,
    render: (props:any) => any,
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
        this.componentMap.set(component.key, component);
    }
}

export const editorConfig = new createEditorConfig();

for (let block of componentsConfig) {//遍历声明的组件并注册
    editorConfig.register({
        label: block.label,
        preview: () => <span>
            <i class={block.icon}></i>
            <label>{block.label}</label>
        </span>,
        render: (props) => block.render(props),
        key: block.key,
    })
}
