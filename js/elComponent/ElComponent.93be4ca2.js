import{u as e}from"../home/home.c21240f2.js";import{E as o}from"../ElSearch/ElSearch.62e1928b.js";import{G as t,z as s,Z as i,w as n,U as l,ag as m}from"../@vue/@vue.5b184091.js";import"../index.70967321.js";import"../pinia/pinia.e5f2e591.js";import"../element-plus/element-plus.cbbb2b2a.js";import"../lodash-es/lodash-es.3125e237.js";import"../@vueuse/@vueuse.9fc9a9b5.js";import"../@element-plus/@element-plus.cb377f36.js";import"../@ctrl/@ctrl.91de2ec7.js";import"../dayjs/dayjs.fdf8d021.js";import"../async-validator/async-validator.8d480e59.js";import"../memoize-one/memoize-one.63ab667a.js";import"../escape-html/escape-html.5fea19da.js";import"../normalize-wheel-es/normalize-wheel-es.3222b0a2.js";import"../@floating-ui/@floating-ui.01901ece.js";import"../fundebug-javascript/fundebug-javascript.4b005614.js";import"../fundebug-vue/fundebug-vue.04a7ac72.js";import"../vue-router/vue-router.f65266be.js";import"../userStore/userStore.49c50847.js";import"../axios/axios.5ae1da96.js";import"../mitt/mitt.f0e54764.js";const a=t({props:{EditorData:Object},setup(){const t=s("editorConfig"),a=i({search:{value:"",searchKey:"componentSearch",searchDefault:{label:"组件分类",list:["布局容器","常用组件","表单"]},placeholder:"查找组件"},componentList:{container:{label:"布局容器",list:[],hidden:!1},common:{label:"常用组件",list:[],hidden:!1},form:{label:"表单",list:[],hidden:!1}},activeName:i(["layoutContainer","commonComponents","form"])});return t.componentList.map((e=>{switch(e.category){case"container":a.componentList.container.list.push(e);break;case"common":a.componentList.common.list.push(e);break;case"form":a.componentList.form.list.push(e)}})),n((()=>a.search.value),(e=>{if(""==e)for(let o of Object.keys(a.componentList))a.componentList[o].list.filter((e=>{e.display=!0})),a.componentList[o].hidden=!1;else for(let o of Object.keys(a.componentList))if(a.componentList[o].label.indexOf(e)>=0)a.componentList[o].list.filter((e=>{e.display=!0}));else{let t=a.componentList[o].list.length;a.componentList[o].list.map((o=>{o.label.indexOf(e)>=0?o.display=!0:(o.display=!1,t--)})),a.componentList[o].hidden=0==t}})),()=>l("div",{class:"ElComponent"},[l("div",{class:"ElComponent-top"},[l(o,{search:a.search},null)]),l("div",{class:"ElComponent-list"},[l(m("elCollapse"),{modelValue:a.activeName,"onUpdate:modelValue":e=>a.activeName=e},{default:()=>[!a.componentList.container.hidden&&l(m("elCollapseItem"),{title:"布局容器",name:"layoutContainer"},{default:()=>[l("div",{class:"ElComponent-list-item"},[a.componentList.container.list.map((o=>o.display&&l("div",{onMousedown:t=>e.cloneMousedown(o,t)},[o.preview()])))])]}),!a.componentList.common.hidden&&l(m("elCollapseItem"),{title:"常用组件",name:"commonComponents"},{default:()=>[l("div",{class:"ElComponent-list-item"},[a.componentList.common.list.map((o=>o.display&&l("div",{onMousedown:t=>e.cloneMousedown(o,t)},[o.preview()])))])]}),!a.componentList.form.hidden&&l(m("elCollapseItem"),{title:"表单",name:"form"},{default:()=>[l("div",{class:"ElComponent-list-item"},[a.componentList.form.list.map((o=>o.display&&l("div",{onMousedown:t=>e.cloneMousedown(o,t)},[o.preview()])))])]})]})])])}});export{a as default};
