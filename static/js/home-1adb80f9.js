import{bQ as De,p as I,i as g,bu as le,aS as ae,X as P,d as n,aV as T,e as R,F as H,ap as xe,Q as C,a as A,aE as Pe,at as K,bR as Me,bN as Se,r as $,o as Fe,f as Re,w as D,u,h as ie,E as B,b as se,s as re,bP as ce,bS as de}from"./index-1967552b.js";import{m as W,a as Le,d as ke,s as O,u as Ne,c as Ie,_ as Te}from"./userStore-c08e10e6.js";const Ke="page",Oe="Hello world",Ue={},Be=[{type:"container-ordinary",style:{position:"relative",width:"100%",zIndex:1},children:[{type:"button",style:{display:"",position:"relative",zIndex:1},buttonstyle:"primary",size:"default",icon:{},twiceComfire:{},bubblePrompt:{triggerMode:"鼠标悬浮",promptLocation:"下"},isDisable:!1,children:"我的按钮"},{type:"text",style:{position:"relative",fontSize:"20px",color:"blue",zIndex:1},children:"(｡･∀･)ﾉﾞ"},{type:"input",value:"",inputStyle:"text",size:"default",defaultValue:"123",placeholder:"",showPassword:!1,maxlength:0,minlength:0,showWordLimit:!0,style:{position:"relative",zIndex:1},children:""}]}],gt={type:Ke,title:Oe,style:Ue,body:Be},ye=De("dragStore",{state:()=>({selectedMaterial:null,isClone:!1,isDrag:!1,isDraging:!1,selectKey:null,selectParent:null,selectedComponent:null,containerData:null,selectedIndex:null,dragEl:null}),actions:{destructionOfDrag:null}});function ze(e){return{all:e=e||new Map,on:function(t,o){var i=e.get(t);i?i.push(o):e.set(t,[o])},off:function(t,o){var i=e.get(t);i&&(o?i.splice(i.indexOf(o)>>>0,1):e.set(t,[]))},emit:function(t,o){var i=e.get(t);i&&i.slice().map(function(s){s(o)}),(i=e.get("*"))&&i.slice().map(function(s){s(t,o)})}}}const ue=ze(),V=ye(I),l=W(I),Z=(e,t)=>{let o=!1,i=null;const s=d=>{if(!o)for(let y=0;y<d.length;y++){const f=d[y];if(f.getAttribute("data-key")==t){o=!0,i=f;return}if(f.className.includes("container"))return s(f.children[0].children)}};for(let d=0;d<e.length&&!o;d++){if(e[d].getAttribute("data-key")==t)return e[d];e[d].className.includes("container")&&s(e[d].children[0].children)}return i},he=e=>{if(!e.classList)return null;let t=[...e.classList];return t.includes("is-expanded")||t.includes("cannotPreview")||t.includes("container-ordinary")?e:he(e.parentNode)},Ve=e=>{var i;let t=l.EditorDataMap.get(e),o=(i=l.EditorDataMap.get(t.parent))==null?void 0:i.children;for(let s=0;s<o.length;s++)if(o[s+1]==e)return o[s];return t.parent},ve=e=>{var i;let t=l.EditorDataMap.get(e),o=(i=l.EditorDataMap.get(t.parent))==null?void 0:i.children;for(let s=0;s<o.length;s++)if(o[s-1]==e)return o[s];return t.parent=="page"?"page":ve(t.parent)},pt=e=>{var o;l.menuConfig.selectKey=(o=he(e.target))==null?void 0:o.getAttribute("data-key"),l.menuConfig.selectKey==V.selectKey?(console.log("右击节点是已经选中的节点"),l.menuConfig.isShow.selectComponent=!0,l.menuConfig.isShow.unselectComponent=!1,l.menuConfig.isShow.moveForward=!1,l.menuConfig.isShow.moveBack=!1):(l.menuConfig.isShow.selectComponent=!1,l.menuConfig.isShow.unselectComponent=!0,l.menuConfig.isShow.moveForward=!0,l.menuConfig.isShow.moveBack=!0),console.log("打开菜单"),console.log("右击选中节点："+l.menuConfig.selectKey);const t=window.innerHeight||document.documentElement.clientHeight;e.preventDefault(),l.menuConfig.isShowMenu=!0,t-e.y<390?(e.x<100?l.menuConfig.style.left=e.x+"px":l.menuConfig.style.left=e.x-100+"px",l.menuConfig.style.top=e.y-390+"px"):(l.menuConfig.style.left=e.x+"px",l.menuConfig.style.top=e.y+"px"),e.stopPropagation()},yt=()=>{console.log("关闭菜单"),l.menuConfig.isShowMenu=!1},ht=e=>{console.log("选中组件"),l.menuConfig.isShow.selectComponent?g.info("该组件已经被选中啦！"):l.menuConfig.selectKey?(console.log("更改"),l.menuConfig.elOutlineTree&&l.menuConfig.elOutlineTree.setCurrentKey(l.menuConfig.selectKey),V.selectKey=l.menuConfig.selectKey,l.menuConfig.isShowMenu=!1):g.error("无法选中！"),e.stopPropagation()},vt=e=>{l.menuConfig.isShow.unselectComponent?g.info("这个组件不需要取消选中嘞！"):(console.log("取消组件"),V.selectKey=null,l.menuConfig.elOutlineTree&&l.menuConfig.elOutlineTree.setCurrentKey(null),l.menuConfig.isShowMenu=!1),e.stopPropagation()},wt=(e,t)=>{l.menuConfig.isShow.makeACopy?g.info("不可以复制该组件哦！"):(console.log("复制一份"),l.copyData=l.menuConfig.selectKey,l.wantCopy=l.menuConfig.selectKey,t.paste(),l.menuConfig.isShowMenu=!1),e.stopPropagation()},bt=e=>{l.menuConfig.isShow.copycomponents?g.info("不可以复制该组件哦！"):(console.log("复制组件"),l.copyData=l.menuConfig.selectKey,l.menuConfig.isShowMenu=!1),e.stopPropagation()},_e=(e,t)=>{l.menuConfig.isShow.delComponents?g.info("不可以删除该组件哦！"):(console.log("删除组件"),l.wantDel=l.menuConfig.selectKey,t.delete(),l.menuConfig.isShowMenu=!1),e.stopPropagation()},Ct=(e,t)=>{l.menuConfig.isShow.shearComponents?g.info("不可以剪切该组件哦！"):(console.log("剪切组件"),l.copyData=l.menuConfig.selectKey,l.menuConfig.isShowMenu=!1,_e(e,t)),e.stopPropagation()},Et=e=>{var t;if(!l.copyData){g.error("还没有复制组件配置哦！");return}if(l.menuConfig.isShow.pasteComponents)g.info("不可以粘贴到该组件哦！");else{let o=function(){p(),w(),l.menuConfig.key++},i=function(){h(),f(),l.menuConfig.key--};console.log("粘贴组件");let s=l.EditorDataMap.get(l.menuConfig.selectKey),d=(t=l.EditorDataMap.get(s.parent))==null?void 0:t.children,y=-1;for(let b=0;b<d.length;b++)if(d[b+1]==l.menuConfig.selectKey){y=b;break}let{delUndo:f,delRedo:p}=je(),{copyUndo:h,copyRedo:w}=Ae(y,s.parent);o(),l.queue.push({redo:o,undo:i}),l.curPointerTo+=1,l.menuConfig.isShowMenu=!1}e.stopPropagation()},je=()=>{var t;let e=l.menuConfig.selectKey;if(e){console.log("删除被粘贴的节点");let o=((t=l.EditorDataMap.get(e))==null?void 0:t.parent)||"page",i=l.EditorDataMap.get(o).children.findIndex(s=>s==e);return{delRedo(){l.EditorDataMap.get(o).children.splice(i,1),console.log(l.EditorDataMap.get(o))},delUndo(){l.EditorDataMap.get(o).children.splice(i,0,e),console.log(l.EditorDataMap.get(o))}}}else g.error("编辑区域根节点不能被粘贴配置！")},Ae=(e,t)=>{let o=l.copyData,i=l.EditorDataMap.get(o),s=[];return{copyRedo(){function d(y,f,p){p.parent=f;let h=Le(y.replace(/-[^-]*$/,""),ke(p));return s.push(h),Array.isArray(p.children)&&(l.EditorDataMap.get(h).children=p.children.map(w=>d(w,h,l.EditorDataMap.get(w)))),h}l.EditorDataMap.get(t).children.splice(e+1,0,d(o,t,i))},copyUndo(){l.EditorDataMap.get(t).children.splice(e+1,1),s.forEach(d=>{l.EditorDataMap.delete(d)})}}},Dt=e=>{if(l.menuConfig.isShow.moveForward)g.error("未选中该节点！");else{console.log("向前移动");let t=Ve(l.menuConfig.selectKey);console.log("向前移动"+t),l.menuConfig.elOutlineTree&&l.menuConfig.elOutlineTree.setCurrentKey(t),l.rootNode&&(V.dragEl=Z(l.rootNode.children,t)),l.menuConfig.isShowMenu=!1}e.stopPropagation()},xt=e=>{if(l.menuConfig.isShow.moveForward)g.error("未选中该节点！");else{console.log("向后移动");let t=ve(l.menuConfig.selectKey);console.log(t),l.menuConfig.elOutlineTree&&l.menuConfig.elOutlineTree.setCurrentKey(t),l.rootNode&&(V.dragEl=Z(l.rootNode.children,t)),l.menuConfig.isShowMenu=!1}e.stopPropagation()},Pt=(e,t)=>{l.menuConfig.isShow.undo?g.error("这个组件没有撤销的空间！"):(console.log("撤销"),t.undo(),l.menuConfig.isShowMenu=!1),e.stopPropagation()},Mt=(e,t)=>{l.menuConfig.isShow.redo?g.error("这个组件没有还原的空间！"):(console.log("还原"),t.redo(),l.menuConfig.isShowMenu=!1),e.stopPropagation()};function $e(){const e=ye(I);let t=W(I),o=null,i=null,s=null,d=0,y=0,f=-1,p=[],h=null,w=!1,b=!1,L=null,z=!1;le(()=>e.dragEl,(a,c)=>{console.log("newVal:",a),console.log("oldVal:",c),a&&typeof _(a)>"u"&&(e.dragEl=c),c&&(c.classList.remove("chosenEl"),N(c.parentNode).classList.remove("chosen-container")),a&&(i=N(a.parentNode),a.classList.add("chosenEl"),i.classList.add("chosen-container"))}),le(()=>e.selectKey,a=>{z&&(e.dragEl=Z(t.rootNode.children[0].children,a))});const E=()=>{o&&o.remove(),s&&s.remove(),o=null,s=null,e.selectedMaterial=null,e.isClone=!1,e.isDrag||(i==null||i.classList.remove("chosen-container"),i=null,e.isDrag=!1,p=[]),e.isDraging=!1,clearTimeout(h),w=!1,b=!1,document.body.removeEventListener("mousemove",J),document.body.removeEventListener("mousemove",q)},m=(a,c)=>{const M=v(c.target);ue.emit("cloneStart"),e.isClone=!0,e.selectedMaterial=a,te("ghostClone",M,c),document.body.addEventListener("mousemove",J)};document.body.onmouseup=a=>{if(!G(a.target)){E(),z=!0;return}z=!1,e.isClone&&i&&(e.selectParent=_(i),ue.emit("cloneEnd")),(e.isClone||e.isDrag)&&(t.isNeedSave=!0),E()};const r=a=>{if(e.isClone&&(i&&(i.classList.remove("chosen-container"),s&&i.removeChild(s)),i=N(a.target),i.classList.add("chosen-container"),s=document.createElement("div"),s.classList.add("renderEl"),i.appendChild((ae(e.selectedMaterial.render({node:e.selectedMaterial.defaultData}),s),s))),e.isDraging){if(clearTimeout(h),e.dragEl==a.target||a.target.classList.contains("Editorcontainer"))return;w=!0,b=!1,L=a.target,h=setTimeout(Y,300)}},k=a=>{e.isClone&&(i&&i.classList.remove("chosen-container"),i.removeChild(s),i==N(a.target)&&(i=N(a.target.parentNode),i.classList.add("chosen-container"),s=document.createElement("div"),s.classList.add("renderEl"),i.appendChild((ae(e.selectedMaterial.render({node:e.selectedMaterial.defaultData}),s),s)))),e.isDraging&&(L=N(a.target.parentNode),b=!0,w=!1,h=setTimeout(Y,300))},v=a=>a.tagName=="DIV"?a.children[0]:a.tagName=="SPAN"?a:v(a.parentNode),N=a=>a.className.includes("container")||a.className.includes("Editorcontainer")?a:N(a.parentNode),G=a=>a.parentNode==document.body?!1:a!=null&&a.classList.contains("Editorcontainer")?!0:G(a.parentNode),_=a=>{var c;return(c=a.attributes["data-key"])==null?void 0:c.nodeValue},Y=()=>{new Promise(a=>{let c=_(L),M=t.EditorDataMap.get(c).children,U=t.EditorDataMap.get(e.selectKey).parent;t.EditorDataMap.get(U).children.splice(f,1),M.push(e.selectKey),t.EditorDataMap.get(e.selectKey).parent=c,i=L,a(M)}).then(a=>{f=a.length-1,e.dragEl=i.children[0].children[f],console.log(i,f,e.dragEl),e.dragEl.onmousedown=ee,Q(),w=!1,b=!1})},we=a=>{if(console.log("选中：",a.target,"寻找",j(a.target)),a.target.classList.contains("Editorcontainer")){i=a.target,a.target.classList.add("chosen-container"),e.selectKey=null,e.dragEl&&(e.dragEl.onmousedown=null),e.dragEl=null;return}j(a.target).classList.contains("Editorcontainer")||a.target!=e.dragEl&&(e.dragEl&&(e.dragEl.onmousedown=null),e.isDrag=!0,e.dragEl=j(a.target)||a.target,e.selectKey=_(e.dragEl),console.log("dragData.dragEl:",e.dragEl),e.dragEl.onmousedown=ee,e.destructionOfDrag=()=>{e.isDrag&&(e.selectKey=null,o&&o.remove(),e.dragEl&&(document.body.removeEventListener("mousemove",q),i==null||i.classList.remove("chosen-container"),e.dragEl.classList.remove("chosenEl"),e.dragEl.onmousedown=null),e.isDraging=!1,e.isDrag=!1,e.dragEl=null)})},ee=a=>{console.log("正在交换组件中"),f=[].indexOf.call(i.children[0].children,e.dragEl),Q(),e.isDraging=!0,te("ghostDrag",e.dragEl,a),document.body.addEventListener("mousemove",q)},q=a=>{G(a.target)&&h&&!b&&(clearTimeout(h),w&&(h=setTimeout(Y,300))),J(a);for(let c=0;c<p.length;c++)if(c!==f&&a.clientX>p[c].left&&a.clientX<p[c].right&&a.clientY>p[c].top&&a.clientY<p[c].bottom){let M=t.EditorDataMap.get(e.selectKey).parent,U=t.EditorDataMap.get(M).children;U.splice(f,1),U.splice(c,0,e.selectKey),Q(),f=c}},Q=()=>{p=[];for(let a of i.children[0].children)p.push(a.getBoundingClientRect())},j=a=>a==document.body?null:(a==null?void 0:a.parentNode.className)=="transition"?a:a.className=="transition"?a.parentNode:a.className=="cannotPreview"?a:j(a.parentNode),te=(a,c,M)=>{const{clientY:U,clientX:be}=M,{top:ne,left:oe,width:Ce,height:Ee}=c.getBoundingClientRect();d=be-oe,y=U-ne,o=document.createElement("div"),o.classList.add(a),o.style.width=`${Ce}px`,o.style.height=`${Ee}px`,o.innerHTML=c.outerHTML,document.body.appendChild(o),o.style.top=`${ne}px`,o.style.left=`${oe}px`},J=({clientY:a,clientX:c})=>{o.style.top=`${a-y}px`,o.style.left=`${c-d}px`};return{cloneMousedown:m,mouseenter:r,mouseleave:k,onclickToDrag:we,deterWhetherToMoveUp:a=>a()}}const fe=$e(),He=P({props:{option:{type:Object}},setup(e){return()=>n("div",{class:"elCollapseItem base-settings base-events"},[n("p",null,[e.option.label]),n(T("el-input-number"),{modelValue:e.option.value,"onUpdate:modelValue":t=>e.option.value=t,min:e.option.min,max:e.option.max},null)])}}),S=P({props:{option:{type:Object}},setup(e){return()=>n(H,null,[n("div",{class:"elCollapseItem base-settings-textarea-text"},[n("div",null,[e.option.label])]),n("div",{class:"elCollapseItem base-settings-textarea"},[n(R,{type:"textarea",modelValue:e.option.value,"onUpdate:modelValue":t=>e.option.value=t},null)])])}});function We(e){return typeof e=="function"||Object.prototype.toString.call(e)==="[object Object]"&&!xe(e)}const Xe=P({props:{option:{type:Object}},setup(e){return()=>{let t;return n("div",{class:"elCollapseItem base-settings base-events"},[n("p",null,[e.option.label]),n(T("el-button-group"),null,We(t=e.option.list.map(o=>n(T("el-button"),{class:"disabled-el-button",type:o.value==e.option.value?"primary":"",onClick:i=>{e.option.value=o.value}},{default:()=>[o.label]})))?t:{default:()=>[t]})])}}}),me=""+new URL("../png/noneData3-4ac3557f.png",import.meta.url).href,Ge=[{type:"跳转连接",instructions:"跳转到指定连接的页面",configRender:e=>n(S,{option:e},null),selectedRender:e=>n("p",null,[C("跳转至："),n("span",{class:"events-url"},[e.content])]),handler:e=>()=>{window.open(e.content,"_blank")},defaultData:{label:"页面地址",value:""}},{type:"刷新页面",instructions:"触发浏览器刷新页面",configRender:()=>n("div",{class:"events-none"},[n("img",{src:me},null),n("p",null,[C("无配置内容")])]),selectedRender:e=>n("p",null,[n("span",null,[e.content])]),handler:()=>()=>{location.reload()},defaultData:{value:"刷新页面"}},{type:"回退页面",instructions:"触发浏览器回退",configRender:()=>n("div",{class:"events-none"},[n("img",{src:me},null),n("p",null,[C("无配置内容")])]),selectedRender:e=>n("p",null,[n("span",null,[e.content])]),handler:()=>()=>{history.go(-1)},defaultData:{value:"回退页面"}},{type:"打开弹窗",instructions:"打开弹窗",configRender:e=>n(S,{option:e},null),selectedRender:e=>n("p",null,[n("span",null,[e])]),handler:()=>{console.log("打开弹窗")},defaultData:{label:"页面地址",value:""}},{type:"关闭弹窗",instructions:"关闭弹窗",configRender:e=>n(S,{option:e},null),selectedRender:e=>n("p",null,[C("跳转至："),n("span",null,[e])]),handler:()=>{console.log("关闭弹窗")},defaultData:{label:"页面地址",value:""}},{type:"消息提醒",instructions:"出现消息提醒框",configRender:e=>n(H,null,[n(Xe,{option:e.messageType},null),n(He,{option:e.duration},null),n(S,{option:e.messageContent},null)]),selectedRender:function(e){let t="成功";return this.defaultData.messageType.list.map(o=>{o.value==e.messageType&&(t=o.label)}),n("p",null,[t,C("消息："),n("span",null,[e.messageContent])])},handler:e=>()=>{g({type:e.messageType,message:e.messageContent,duration:e.duration})},defaultData:{messageType:{label:"消息类型",list:[{label:"成功",value:"success"},{label:"警告",value:"warning"},{label:"提示",value:"info"},{label:"错误",value:"error"}],value:"success"},duration:{label:"持续时间",min:0,value:3e3},messageContent:{label:"消息内容",value:""},value:""}},{type:"发送请求",instructions:"发送请求",configRender:e=>n(S,{option:e},null),selectedRender:e=>n("p",null,[C("跳转至："),n("span",null,[e])]),handler:()=>{console.log("发送请求")},defaultData:{label:"页面地址",value:""}},{type:"提交表单",instructions:"提交表单",configRender:e=>n(S,{option:e},null),selectedRender:e=>n("p",null,[C("跳转至："),n("span",null,[e])]),handler:()=>{console.log("提交表单")},defaultData:{label:"页面地址",value:""}},{type:"重置表单",instructions:"重置表单",configRender:e=>n(S,{option:e},null),selectedRender:e=>n("p",null,[C("跳转至："),n("span",null,[e])]),handler:()=>{console.log("重置表单")},defaultData:{label:"页面地址",value:""}},{type:"校验表单",instructions:"校验表单",configRender:e=>n(S,{option:e},null),selectedRender:e=>n("p",null,[C("跳转至："),n("span",null,[e])]),handler:()=>{console.log("事件执行了")},defaultData:{label:"页面地址",value:""}}],Ye=[{type:"onclick",name:"鼠标点击",execute:e=>({onClick:()=>{e.forEach(t=>t&&t())}})},{type:"mouseenter",name:"鼠标移入",execute:e=>({onMouseenter:()=>{e.forEach(t=>t&&t())}})},{type:"mouseleave",name:"鼠标移出",execute:e=>({onmouseleave:()=>{e.forEach(t=>t&&t())}})},{type:"onfocus",name:"获取焦点",execute:e=>({onFocus:()=>{e.forEach(t=>t&&t())}})},{type:"onblur",name:"失去焦点",execute:e=>({onBlur:()=>{e.forEach(t=>t&&t())}})},{type:"onchange",name:"值改变",execute:e=>({onChange:()=>{e.forEach(t=>t&&t())}})}];class qe{constructor(t=new Map,o=new Map){this.handlerMap=t,this.eventMap=o}getRenderEvents(t){return t.reduce((o,i)=>Object.assign(o,this.eventMap.get(i.type).execute(i.list.map(s=>this.handlerMap.get(s.title).handler(s)))),{})}register(t,o=!1){o?this.eventMap.set(t.type,t):this.handlerMap.set(t.type,t)}}const x=new qe;for(let e of Ge)x.register({type:e.type,instructions:e.instructions,defaultData:e.defaultData,configRender:e.configRender,selectedRender:e.selectedRender,handler:e.handler});for(let e of Ye)x.register({type:e.type,name:e.name,execute:e.execute},!0);const ge=P({props:{style:Object,children:Object,childrenList:Array,text:String,class:String,events:Object,node:Object},setup(e){let t=A(null);return Pe(()=>{t.value.attributes.childrenList=e.childrenList}),()=>n("div",K({class:e.class,style:e.style,ref:t,datatype:e.class,onMouseenter:o=>fe.mouseenter(o),onMouseleave:o=>fe.mouseleave(o)},e.events),[(e==null?void 0:e.children.length)!=0&&e.children,(e==null?void 0:e.node.children.length)==0&&n("span",{class:"nochild"},[e.text])])}}),Qe=P({props:{option:{type:Object},events:{type:Object}},setup(e){return()=>n(R,K({modelValue:e.option.value,"onUpdate:modelValue":t=>e.option.value=t,style:e.option.style,size:e.option.size,type:e.option.inputStyle,placeholder:e.option.placeholder,showPassword:e.option.showPassword,clearable:e.option.clearable,"show-word-limit":e.option.showWordLimit,disabled:e.option.disabled,readonly:e.option.readonly,autofocus:e.option.autofocus,maxlength:e.option.maxlength,minlength:e.option.minlength},e.events),null)}}),Je=P({props:{option:{type:Object},events:{type:Object}},setup(e){return()=>n(Me,K({style:e.option.style,filterable:e.option.filterable?e.option.filterable:!1,placeholder:e.option.placeholder?e.option.placeholder:"请选择",modelValue:e.option.defaultValue,"onUpdate:modelValue":t=>e.option.defaultValue=t},e.events),{default:()=>[e.option.selectData&&e.option.selectData.map(t=>n(T("el-option"),{key:t.value,value:t.value},null))]})}}),Ze=P({props:{option:{type:Object},events:{type:Object}},setup(e){return()=>n(H,null,[n("div",{style:e.option.style.title},[e.option.title?e.option.title:"文本"]),n(R,K({modelValue:e.option.value,"onUpdate:modelValue":t=>e.option.value=t,style:e.option.style.input,placeholder:e.option.inputBoxPlaceholder?e.option.inputBoxPlaceholder:"",clearable:e.option.clearable?e.option.clearable:!1,type:e.option.inputType?e.option.inputType:"text"},e.events),null)])}}),et=P({props:{option:{type:Object},events:{type:Object}},setup(e){return()=>n(H,null,[n("div",{style:e.option.style.title},[e.option.title?e.option.title:"多行文本"]),n(R,K({modelValue:e.option.value,"onUpdate:modelValue":t=>e.option.value=t,style:e.option.style.input,type:"textarea",placeholder:e.option.inputBoxPlaceholder?e.option.inputBoxPlaceholder:"",clearable:e.option.clearable?e.option.clearable:!1,rows:e.option.autosize.minRows},e.events),null)])}}),tt=[{label:"用户",icon:"icon iconfont icon-yonghu"},{label:"退出",icon:"icon iconfont icon-h"},{label:"叉 关闭",icon:"icon iconfont icon-cha"},{label:"叉 关闭",icon:"icon iconfont icon-cha1"},{label:"连接",icon:"icon iconfont icon-ai70"},{label:"密码",icon:"icon iconfont icon-mima"},{label:"返回 左箭头",icon:"icon iconfont icon-fanhui"},{label:"搜索",icon:"icon iconfont icon-search"},{label:"笑脸",icon:"icon iconfont icon-xiaolian"},{label:"菜单",icon:"icon iconfont icon-caidan"},{label:"修改",icon:"icon iconfont icon-xiugai"}],F=W(I),nt=[{label:"容器",icon:"icon iconfont icon-checkbox",type:"container-ordinary",category:"container",render(e){var i;const{children:t,childrenList:o}=e;return e={node:e.node,children:t||[],childrenList:o,style:e.node.style,text:"容器",class:"container-ordinary","data-key":e.id,events:(i=e.node)!=null&&i.events&&F.isPreview?x.getRenderEvents(e.node.events):{}},n(ge,e,null)},defaultData:{type:"container-ordinary",style:{position:"relative",width:"100%",zIndex:1},children:[]}},{label:"自由容器",icon:"icon iconfont icon-zidingyibuju",type:"container-free",category:"container",render(e){var i;const{children:t,childrenList:o}=e;return e={node:e.node,children:t||[],childrenList:o,style:e.node.style,text:"自由容器",class:"container-free","data-key":e.id,events:(i=e.node)!=null&&i.events&&F.isPreview?x.getRenderEvents(e.node.events):{}},n(ge,e,null)},defaultData:{type:"container-free",style:{position:"relative",width:"100%",zIndex:1},children:[]}},{label:"文字",icon:"icon iconfont icon-font",type:"text",category:"common",render(e){var o;let t=(o=e.node)!=null&&o.events&&F.isPreview?x.getRenderEvents(e.node.events):{};return n("div",{class:"cannotPreview","data-key":e.id},[n("span",K({style:e.node.style},t,{datatype:"text"}),[e.node.children?e.node.children:"渲染文字"])])},defaultData:{type:"text",style:{position:"relative",fontSize:"16px",color:"black",zIndex:1},children:"渲染文字"}},{label:"按钮",icon:"icon iconfont icon-anniu",type:"button",category:"common",render(e){var o;let t=(o=e.node)!=null&&o.events&&F.isPreview?x.getRenderEvents(e.node.events):{};return n("div",{class:"cannotPreview","data-key":e.id},[n(Se,K({style:e.node.style,class:"baseButton",type:e.node.buttonstyle,size:e.node.size,disabled:e.node.isDisable},t),{default:()=>[n("i",{class:["icon iconfont leftIcon",e.node.icon.leftIcon],style:{"font-size":e.node.icon.leftIconSize}},null),e.node.children?e.node.children:"渲染按钮",n("i",{class:["icon iconfont rightIcon",e.node.icon.rightIcon],style:{"font-size":e.node.icon.rightIconSize}},null)]})])},defaultData:{type:"button",style:{position:"relative",width:"87px",height:"32px",zIndex:1},buttonstyle:"",size:"default",icon:{},twiceComfire:{},bubblePrompt:{},isDisable:!1,children:"渲染按钮"}},{label:"输入框",icon:"icon iconfont icon-input",type:"input",category:"common",render(e){var o;let t=(o=e.node)!=null&&o.events&&F.isPreview?x.getRenderEvents(e.node.events):{};return n("div",{class:"cannotPreview","data-key":e.id},[n(Qe,{option:e.node,events:t},null)])},defaultData:{type:"input",value:"",inputStyle:"text",size:"default",placeholder:"请输入",showPassword:!1,clearable:!1,showWordLimit:!1,disabled:!1,readonly:!1,autofocus:!1,style:{position:"relative",zIndex:1},children:""}},{label:"下拉框",icon:"icon iconfont icon-m-xialacaidan",type:"select",category:"common",render(e){var o;let t=(o=e.node)!=null&&o.events&&F.isPreview?x.getRenderEvents(e.node.events):{};return n("div",{class:"cannotPreview","data-key":e.id},[n(Je,{option:e.node,events:t},null)])},defaultData:{type:"select",style:{position:"relative",zIndex:1},children:"",defaultValue:""}},{label:"文本框",icon:"icon iconfont icon-wenben",type:"textBox",category:"form",render(e){var o;let t=(o=e.node)!=null&&o.events&&F.isPreview?x.getRenderEvents(e.node.events):{};return n("div",{class:"cannotPreview",style:e.node.style.box,"data-key":e.id},[n(Ze,{option:e.node,events:t},null)])},defaultData:{value:"",type:"textBox",title:"文本",style:{box:{display:"block"},title:{},input:{}},children:""}},{label:"多行文本框",icon:"icon iconfont icon-duohangwenben1",type:"multilineText",category:"form",render(e){var o;let t=(o=e.node)!=null&&o.events&&F.isPreview?x.getRenderEvents(e.node.events):{};return n("div",{class:"cannotPreview",style:e.node.style.box,"data-key":e.id},[n(et,{option:e.node,events:t},null)])},defaultData:{value:"",type:"multilineText",title:"多行文本",style:{box:{display:"block"},title:{},input:{}},children:"",autosize:{minRows:2,maxRows:6}}}];class ot{constructor(t=[],o=new Map,i=[]){this.componentList=t,this.componentMap=o,this.iconList=i}register(t,o=!1){o?this.iconList.push(t):this.componentList.push(t),this.componentMap.set(t.type,t)}}const X=new ot;for(let e of nt)X.register({label:e.label,type:e.type,category:e.category,defaultData:e.defaultData,display:!0,preview:()=>n(lt,{block:e}),render:t=>e.render(t)});for(let e of tt)X.register({label:e.label,type:"icon",category:"icon",display:!0,defaultData:{icon:e.icon,type:"icon",style:{position:"relative",fontSize:"16px",color:"black",zIndex:1},children:""},preview:()=>n("span",{datatype:"icon",class:"iconSpan"},[n("i",{class:e.icon},null)]),render:t=>n("div",{class:"cannotPreview","data-key":t.id},[n("i",{class:t.node.icon,style:t.node.style},null)])},!0);const lt=P({props:{block:{type:Object}},setup(e){return()=>n("span",{datatype:e.block.type},[n("i",{class:e.block.icon},null),n("label",null,[e.block.label])])}});function at(e){return O({method:"post",url:"/modfiyUserInfo/modifyUsername",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{username:e}})}function it(e){return O({method:"post",url:"/modfiyUserInfo/checkPassword",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{password:e}})}function st(e){return O({method:"post",url:"/modfiyUserInfo/modifyPassword",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{password:e}})}const rt={__name:"settingPages",props:["modifyForm"],setup(e){const t=e,o=Ne(I);let i=A(null),s=$({username:"",oldPassword:"",newPassword:"",checkPassword:""});const d=async(E,m,r)=>{if(m==="")r(new Error("请新的输入用户名"));else{let v=(await Ie(s.username)).data;v.status?r(new Error(v.msg)):r()}},y=()=>{i.value.validate(async E=>{if(!E)return;let r=(await at(s.username)).data;r.status?g.error(r.msg):(g.success(r.msg),o.username=r.username,re("username",r.username),s.username="",t.modifyForm.value=!1,s.username="")})};let f=A(null);const p=async(E,m,r)=>{if(m==="")r(new Error("请输入原始密码"));else{if(s.oldPassword!==""){let k=await it(s.oldPassword);console.log(k);let v=k.data;v.status?r(new Error(v.msg)):r()}r()}},h=(E,m,r)=>{m===""?r(new Error("请输入密码")):(s.checkPassword!==""&&f.value.validateField("checkPassword"),r())},w=(E,m,r)=>{m===""?r(new Error("请再次输入密码")):m!==s.newPassword?r(new Error("两次输入密码不一致!")):r()},b=()=>{f.value.validate(async E=>{if(!E)return;let r=(await st(s.newPassword)).data;r.status?g.error(r.msg):(g.success(r.msg),o.password=r.password,re("password",r.password),t.modifyForm.value=!1,s.oldPassword="",s.newPassword="",s.checkPassword="")})};let L=$({username:[{min:3,max:10,message:"用户名长度应在 3-10 个字符",trigger:"blur"},{validator:d,trigger:"blur"}],oldPassword:[{validator:p,trigger:"blur"}],newPassword:[{min:6,max:15,message:"密码长度应在 6-15 个字符",trigger:"blur"},{validator:h,trigger:"blur"}],checkPassword:[{validator:w,trigger:"blur"}]});const z=()=>{f.value.resetFields(),i.value.resetFields()};return(E,m)=>{const r=T("el-tab-pane"),k=T("el-tabs");return Fe(),Re(k,{type:"border-card","tab-position":"left",class:"card",onTabClick:z},{default:D(()=>[n(r,{label:"修改用户名"},{default:D(()=>[n(u(ie),{ref_key:"usernameFormRef",ref:i,model:u(s),rules:u(L),"label-width":"100px",autocomplete:"off"},{default:D(()=>[n(u(B),{label:"用户名：",prop:"username",class:"formItemCommon"},{default:D(()=>[n(u(R),{placeholder:"请输入新的用户名",modelValue:u(s).username,"onUpdate:modelValue":m[0]||(m[0]=v=>u(s).username=v),"input-style":"height:35px;",autocomplete:"off"},null,8,["modelValue"])]),_:1}),n(u(B),{class:"btns"},{default:D(()=>[se("button",{class:"confirm",onClick:y},"立即修改")]),_:1})]),_:1},8,["model","rules"])]),_:1}),n(r,{label:"修改密码"},{default:D(()=>[n(u(ie),{ref_key:"passwordFormRef",ref:f,model:u(s),rules:u(L),"label-width":"100px"},{default:D(()=>[n(u(B),{label:"原始密码：",prop:"oldPassword",class:"formItemCommon"},{default:D(()=>[n(u(R),{placeholder:"请输入原始密码",modelValue:u(s).oldPassword,"onUpdate:modelValue":m[1]||(m[1]=v=>u(s).oldPassword=v),"input-style":"height:35px;",autocomplete:"off"},null,8,["modelValue"])]),_:1}),n(u(B),{label:"修改密码：",prop:"newPassword"},{default:D(()=>[n(u(R),{placeholder:"请输入新的密码",modelValue:u(s).newPassword,"onUpdate:modelValue":m[2]||(m[2]=v=>u(s).newPassword=v),"input-style":"height:35px;","show-password":"",type:"password",autocomplete:"off"},null,8,["modelValue"])]),_:1}),n(u(B),{label:"确认密码：",prop:"checkPassword"},{default:D(()=>[n(u(R),{placeholder:"请再次输入密码",modelValue:u(s).checkPassword,"onUpdate:modelValue":m[3]||(m[3]=v=>u(s).checkPassword=v),"input-style":"height:35px;","show-password":"",type:"password"},null,8,["modelValue"])]),_:1}),n(u(B),{class:"btns"},{default:D(()=>[se("button",{class:"confirm",onClick:b},"立即修改")]),_:1})]),_:1},8,["model","rules"])]),_:1})]),_:1})}}},St=P({setup(){const e=()=>{de.push("/home")},t=A(!1),o=()=>{de.push("/login"),sessionStorage.clear(),localStorage.clear()};return()=>n("div",{class:"setting"},[n("div",{class:"setting-user"},[n("div",{class:"setting-user-portrait"},[n("img",{src:Te},null)]),n("div",{class:"setting-user-info",title:ce("username")},[ce("username")])]),n("div",{class:"setting-line"},null),n("div",{class:"setting-common"},[n("div",{class:"icon iconfont icon-yonghu"},null),n("div",{class:"setting-common-name",onClick:()=>e()},[C("我的主页")])]),n("div",{class:"setting-common",onClick:()=>{t.value=!0}},[n("div",{class:"icon iconfont icon-xiugai"},null),n("div",{class:"setting-common-name"},[C("我的设置")])]),n(T("el-dialog"),{title:"我的设置",modelValue:t.value,"onUpdate:modelValue":i=>t.value=i,width:"540px"},{default:()=>[n(rt,{modifyForm:t},null)]}),n("div",{class:"setting-common setting-warn",onClick:()=>o()},[n("div",{class:"icon iconfont icon-h"},null),n("div",{class:"setting-common-name"},[C("退出登录")])])])}});let pe=W(I);const ct=e=>e instanceof Array?e.map(t=>{let o=ct(t.children),i=$({node:t,children:o,style:t.style});return t.type.includes("container")&&(i.childrenList=t.children),X.componentMap.get(t.type).render(i)}):e,dt=e=>{let t=pe.EditorDataMap.get(e);if(t.children instanceof Array)return t.children.map(o=>{var y;let i=dt(o),s=pe.EditorDataMap.get(o),d=$({node:s,id:o,style:s.style});return s.type.includes("container")&&(d.children=i,d.childrenList=s.children),(y=X.componentMap.get(s.type))==null?void 0:y.render(d)})};function Ft(){return O({method:"get",url:"/getEditData",headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function Rt(e){return O({method:"post",url:"/delEditData",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{id:e}})}function Lt(e){return O({method:"post",url:"/addEditData",headers:{"Content-Type":"application/json;charset=utf-8"},data:e})}function kt(e){return O({method:"post",url:"/updateEditData",headers:{"Content-Type":"application/json;charset=utf-8"},data:e})}export{S as B,St as P,X as a,He as b,yt as c,ye as d,x as e,kt as f,ue as g,gt as h,ht as i,vt as j,wt as k,bt as l,dt as m,Ct as n,_e as o,Et as p,Dt as q,xt as r,pt as s,Pt as t,fe as u,Mt as v,ct as w,Ft as x,Rt as y,Lt as z};