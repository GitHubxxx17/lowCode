
interface container {//容器组件
    type: string,
    Style: Object,
    children: Array<common>
}

interface common {//常用组件
    type: string,
    Style: Object,
    children: String
}

type Datatype = container | common;//联合类型声明

class createDataConfig {
    public dataList: Array<Datatype>;//默认数据数组
    public dataMap: Map<string, Datatype>;//默认数据映射表

    constructor(dataList: Array<Datatype> = [], dataMap: Map<string, Datatype> = new Map()) {
        this.dataList = dataList;
        this.dataMap = dataMap;
    }

    register(data: Datatype) {//注册组件
        this.dataList.push(data);
        this.dataMap.set(data.type, data);
    }
}

export const dataConfig = new createDataConfig();


const containerOrdinary: container = {
    type: 'container-ordinary',
    Style: {
        "position": "relative",
        "width": "100%",
        "zIndex": 1
    },
    children: []
}

const containerFree: container = {
    type: 'container-free',
    Style: {
        position: "relative",
        width: "100%",
        zIndex: 1
    },
    children: []
}


const text: common = {
    type: 'text',
    Style: {
        position: "relative",
        fontSize: "16px",
        color: "black",
        zIndex: 1
    },
    children: '渲染文字'
}

const button: common = {
    type: 'button',
    Style: {
        position: "relative",
        width:"87px",
        height:"32px",
        zIndex: 1
    },
    children: '渲染按钮'
}

const input: common = {
    type: 'input',
    Style: {
        position: "relative",
        zIndex: 1
    },
    children: ''
}

const select: common = {
    type: 'select',
    Style: {
        position: "relative",
        zIndex: 1
    },
    children: ''
}