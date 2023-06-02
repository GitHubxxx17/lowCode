//列表区显示所有物料
//type对应组件的映射关系
import { createVNode, defineComponent } from "vue";

import { ElButton, ElInput, ElSelect } from "element-plus"
import Container from "../components/renderer/container";

const componentsConfig = [
    {
        label: "容器", icon: "icon iconfont icon-checkbox", type: "container-ordinary", category: 'container',
        render(props: any) {
            props = { ...props, text: '容器', class: 'container-ordinary' }
            return <Container {...props}></Container>
        },
        defaultData: {
            type: 'container-ordinary',
            style: {
                "position": "relative",
                "width": "100%",
                "zIndex": 1
            },
            children: []
        }
    },
    {
        label: "自由容器", icon: "icon iconfont icon-zidingyibuju", type: "container-free", category: 'container',
        render(props: any) {
            props = { ...props, text: '自由容器', class: 'container-free' }
            return <Container {...props}></Container>
        },
        defaultData: {
            type: 'container-free',
            style: {
                position: "relative",
                width: "100%",
                zIndex: 1
            },
            children: []
        }
    },
    {
        label: "文字", icon: "icon iconfont icon-font", type: "text", category: 'common',
        render(props: any) {
            return <span style={props.style} datatype="text">{props.children ? props.children : '渲染文字'}</span>
        },
        defaultData: {
            type: 'text',
            style: {
                position: "relative",
                fontSize: "16px",
                color: "black",
                zIndex: 1
            },
            children: '渲染文字'
        }
    },
    {
        label: "按钮", icon: "icon iconfont icon-anniu", type: "button", category: 'common',
        render(props: any) {
            return <ElButton style={props.style}>{props.children ? props.children : '渲染按钮'}</ElButton>
        },
        defaultData: {
            type: 'button',
            style: {
                position: "relative",
                width: "87px",
                height: "32px",
                zIndex: 1
            },
            children: '渲染按钮'
        }
    },
    {
        label: "输入框", icon: "icon iconfont icon-input", type: "input", category: 'common',
        render(props: any) {
            return <ElInput style={props.style}></ElInput>
        },
        defaultData: {
            type: 'input',
            style: {
                position: "relative",
                zIndex: 1
            },
            children: ''
        }
    },
    {
        label: "下拉框", icon: "icon iconfont icon-m-xialacaidan", type: "select", category: 'common',
        render(props: any) {
            return <ElSelect style={props.style}></ElSelect>
        },
        defaultData: {
            type: 'select',
            style: {
                position: "relative",
                zIndex: 1
            },
            children: ''
        }
    }
]

interface componentConfig {
    label: String,//标签
    type: string,//类型
    category: String,//类别
    defaultData:Object//默认数据
    preview: () => any,//返回预览组件函数
    render: (props: any) => any,//返回渲染组件函数
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
        defaultData:block.defaultData,
        preview: () => createVNode(previewComponent, { block }),
        render: (props) => block.render(props),
    })
}

//预览组件
const previewComponent = defineComponent({
    props: {
        block: { type: Object }
    },
    setup(props) {
        return () => {
            return <span datatype={props.block.type}>
                <i class={props.block.icon}></i>
                <label>{props.block.label}</label>
            </span>
        }
    }
})

