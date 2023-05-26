//列表区显示所有物料
//key对应组件的映射关系
import componentsConfig from './componentsConfig.json'

console.log(componentsConfig);


interface componentConfig {
    label: String,
    key: string,
    preview: () => any,
    render: () => any,
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



editorConfig.register({
    label: '文本',
    preview: () => <span>
                    <i class="icon iconfont icon-font"></i>
                    <label>文字</label>
                </span>,
    render: () => <div></div>,
    key: 'text',
})

// editorConfig.register({
//     label: '按钮',
//     preview: () => <div></div>,
//     render: () => <div></div>,
//     key: 'button',
// })

// editorConfig.register({
//     label: '输入框',
//     preview: () => <div></div>,
//     render: () => <div></div>,
//     key: 'input',

// })

// editorConfig.register({
//     label: '下拉框',
//     preview: () => <div></div>,
//     render: () => <div></div>,
//     key: 'select'
// })