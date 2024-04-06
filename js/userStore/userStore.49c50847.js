import{a as e}from"../axios/axios.5ae1da96.js";import{a as t,p as r,b as a}from"../index.70967321.js";import{d as s}from"../pinia/pinia.e5f2e591.js";import{m as o}from"../mitt/mitt.f0e54764.js";import{Z as n,w as i}from"../@vue/@vue.5b184091.js";import{c as u}from"../element-plus/element-plus.cbbb2b2a.js";const l=""+new URL("../../jpg/user.89bc.jpg",import.meta.url).href;const p=o(),c=new Map;let m=null;const d=(e,t)=>{let r=n(t),a=function(e,t){let r=null;return function(...a){clearTimeout(r),r=setTimeout((()=>{e.apply(this,a)}),t)}}((()=>{p.emit("changeEnd")}),700);i((()=>r),(()=>{m.disabled||a()}),{deep:!0}),c.set(e,r)},h=(e,t)=>{let r=e+"-"+"xyxxyxxx".replace(/[xy]/g,(function(e){let t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)}));return d(r,t),r},f=s("mainStore",{state:()=>({title:"新项目",isPreview:!1,EditorData:null,copyData:null,wantDel:null,wantCopy:null,queue:[],curPointerTo:-1,EditorDataMap:null,modify:{curData:null,modifying:0,disabled:!1},isLoading:!1,isSucessSave:!1,isNeedSave:!1,Breadcrumb:["页面"],OutlineData:{},targetComPath:["页面"],rootNode:null,menuConfig:{key:0,isShowMenu:!1,elOutlineTree:null,style:{top:"0px",left:"0px"},selectKey:"",isShow:{selectComponent:!1,unselectComponent:!1,makeACopy:!1,copycomponents:!1,shearComponents:!1,pasteComponents:!1,delComponents:!1,moveForward:!1,moveBack:!1,undo:!1,redo:!1}},linkageList:[]}),actions:{setMap(){this.EditorDataMap=(e=>{m=e,c.clear();let r=JSON.parse(t("data"));for(let[t,a]of Object.entries(r))d(t,a);return c})(this.modify),this.curData=JSON.stringify(this.EditorDataMap.get("page"))},setEditorData(){return(e=>{let t=new Map;const r=a=>{t.set(a,e.get(a));let s=e.get(a).children;Array.isArray(s)&&s.map((e=>{r(e)}))};return r("page"),JSON.stringify(Object.fromEntries(t))})(this.EditorDataMap)},getBreadcrumbData(e,t,r,a=1){let s=!1;const o=e=>{let n=this.EditorDataMap.get(e),i=t.componentMap.get(n.type).label;a?this.Breadcrumb.push(i):this.targetComPath.push(i);let u=this.EditorDataMap.get(e).children;if(!Array.isArray(u))return e==r?void(s=!0):void(a?this.Breadcrumb.pop():this.targetComPath.pop());for(let t=0;t<u.length&&!s;t++)o(u[t])};if(Array.isArray(e))for(let n=0;n<e.length&&!s;n++)a?this.Breadcrumb=["页面"]:this.targetComPath=["页面"],o(e[n])},handlerLinkage(e){if("class"===e.type)this.EditorDataMap.get(e.target).classList.length=0},addLinkage(e){this.linkageList.push(e)}}}),g=f(r),y=()=>{g.isLoading=!1,g.isSucessSave=!1,g.isNeedSave=!0};let w=e.create({baseURL:"http://127.0.0.1:8081"});function x(e){return w({method:"post",url:"/user/checkIfUserExist",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{username:e}})}function C(e,t){return w({method:"post",url:"/user/reguser",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{username:e,password:t}})}function D(e,t){return w({method:"post",url:"/user/login",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{username:e,password:t}})}w.interceptors.request.use((function(e){return e.url.match(/^\/user/)||(e.headers.authorization=a("token")),e}),(function(e){return Promise.reject(e)})),w.interceptors.response.use((function(e){return e}),(function(e){const{status:t}=e.request;return 0==t?(u.error("请检查您的网络配置!"),y()):400==t?(u.error("400错误,请求语法错误!"),y()):401==t?(u.error("401错误,请求需要身份验证!"),y()):403==t?(u.error("403错误,服务器拒绝请求!"),y()):404==t?(u.error("404错误,请求的资源不存在!"),y()):500==t?(u.error("500错误,服务器内部错误，无法完成请求!"),y()):502==t?(u.error("502错误,错误网关,请检查您的网络配置!"),y()):503==t?(u.error("503错误,服务器暂时无法处理请求!"),y()):504==t&&(u.error("504错误,网关超时,请检查您的网络配置!"),y()),Promise.reject(e)}));const S=s("userStore",{state:()=>({username:"",token:""})});export{l as _,h as a,x as c,p as e,D as l,f as m,C as r,w as s,S as u};
