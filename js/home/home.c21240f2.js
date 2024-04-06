import{p as e,s as t,b as n,r as o}from"../index.70967321.js";import{m as l,e as a,s,u as i,c as r,_ as d}from"../userStore/userStore.49c50847.js";import{c,a as u,k as p,l as m,m as g,n as v,o as f,g as y,b as h,E as b}from"../element-plus/element-plus.cbbb2b2a.js";import{w,au as C,G as x,r as E,h as D,U as P,K as k,ag as L,F as S,x as M,z as T,Z as O,b as j,o as R,c as V,a as K,u as N,P as _,V as I,O as z,S as U,bh as F,bf as B,M as H}from"../@vue/@vue.5b184091.js";import{d as A}from"../pinia/pinia.e5f2e591.js";const G=(e,t)=>{const n=e.__vccOpts||e;for(const[o,l]of t)n[o]=l;return n},X=A("dragStore",{state:()=>({selectedMaterial:null,isClone:!1,isDrag:!1,isDraging:!1,selectKey:null,selectParent:null,selectedComponent:null,containerData:null,selectedIndex:null,dragEl:null}),actions:{destructionOfDrag:null}}),Y=X(e),$=l(e),W=(e,t)=>{let n=!1,o=null;const l=e=>{if(!n)for(let a=0;a<e.length;a++){const s=e[a];if(s.getAttribute("data-key")==t)return n=!0,void(o=s);if(s.className.includes("container"))return l(s.children[0].children)}};for(let a=0;a<e.length&&!n;a++){if(e[a].getAttribute("data-key")==t)return e[a];e[a].className.includes("container")&&l(e[a].children[0].children)}return o},q=e=>{if(!e.classList)return null;let t=[...e.classList];return t.includes("is-expanded")||t.includes("cannotPreview")||t.includes("container-ordinary")?e:q(e.parentNode)},J=e=>{var t;let n=$.EditorDataMap.get(e),o=null==(t=$.EditorDataMap.get(n.parent))?void 0:t.children;for(let l=0;l<o.length;l++)if(o[l-1]==e)return o[l];return"page"==n.parent?"page":J(n.parent)},Z=e=>{var t;$.menuConfig.selectKey=null==(t=q(e.target))?void 0:t.getAttribute("data-key"),$.menuConfig.selectKey==Y.selectKey?($.menuConfig.isShow.selectComponent=!0,$.menuConfig.isShow.unselectComponent=!1,$.menuConfig.isShow.moveForward=!1,$.menuConfig.isShow.moveBack=!1):($.menuConfig.isShow.selectComponent=!1,$.menuConfig.isShow.unselectComponent=!0,$.menuConfig.isShow.moveForward=!0,$.menuConfig.isShow.moveBack=!0),$.menuConfig.selectKey;const n=window.innerHeight||document.documentElement.clientHeight;e.preventDefault(),$.menuConfig.isShowMenu=!0,n-e.y<390?(e.x<100?$.menuConfig.style.left=e.x+"px":$.menuConfig.style.left=e.x-100+"px",$.menuConfig.style.top=e.y-390+"px"):($.menuConfig.style.left=e.x+"px",$.menuConfig.style.top=e.y+"px"),e.stopPropagation()},Q=()=>{$.menuConfig.isShowMenu=!1},ee=e=>{$.menuConfig.isShow.selectComponent?c.info("该组件已经被选中啦！"):$.menuConfig.selectKey?($.menuConfig.elOutlineTree&&$.menuConfig.elOutlineTree.setCurrentKey($.menuConfig.selectKey),Y.selectKey=$.menuConfig.selectKey,$.menuConfig.isShowMenu=!1):c.error("无法选中！"),e.stopPropagation()},te=e=>{$.menuConfig.isShow.unselectComponent?c.info("这个组件不需要取消选中嘞！"):(Y.selectKey=null,$.menuConfig.elOutlineTree&&$.menuConfig.elOutlineTree.setCurrentKey(null),$.menuConfig.isShowMenu=!1),e.stopPropagation()},ne=(e,t)=>{$.menuConfig.isShow.makeACopy?c.info("不可以复制该组件哦！"):($.copyData=$.menuConfig.selectKey,$.wantCopy=$.menuConfig.selectKey,t.paste(),$.menuConfig.isShowMenu=!1),e.stopPropagation()},oe=e=>{$.menuConfig.isShow.copycomponents?c.info("不可以复制该组件哦！"):($.copyData=$.menuConfig.selectKey,$.menuConfig.isShowMenu=!1),e.stopPropagation()},le=(e,t)=>{$.menuConfig.isShow.delComponents?c.info("不可以删除该组件哦！"):($.wantDel=$.menuConfig.selectKey,t.delete(),$.menuConfig.isShowMenu=!1),e.stopPropagation()},ae=(e,t)=>{$.menuConfig.isShow.shearComponents?c.info("不可以剪切该组件哦！"):($.copyData=$.menuConfig.selectKey,$.menuConfig.isShowMenu=!1,le(e,t)),e.stopPropagation()},se=(e,t)=>{$.copyData?($.menuConfig.isShow.pasteComponents?c.info("不可以粘贴到该组件哦！"):(t.swap(),$.menuConfig.isShowMenu=!1),e.stopPropagation()):c.error("还没有复制组件配置哦！")},ie=e=>{if($.menuConfig.isShow.moveForward)c.error("未选中该节点！");else{let e=(e=>{var t;let n=$.EditorDataMap.get(e),o=null==(t=$.EditorDataMap.get(n.parent))?void 0:t.children;for(let l=0;l<o.length;l++)if(o[l+1]==e)return o[l];return n.parent})($.menuConfig.selectKey);$.menuConfig.elOutlineTree&&$.menuConfig.elOutlineTree.setCurrentKey(e),$.rootNode&&(Y.dragEl=W($.rootNode.children,e)),$.menuConfig.isShowMenu=!1}e.stopPropagation()},re=e=>{if($.menuConfig.isShow.moveForward)c.error("未选中该节点！");else{let e=J($.menuConfig.selectKey);$.menuConfig.elOutlineTree&&$.menuConfig.elOutlineTree.setCurrentKey(e),$.rootNode&&(Y.dragEl=W($.rootNode.children,e)),$.menuConfig.isShowMenu=!1}e.stopPropagation()},de=(e,t)=>{$.menuConfig.isShow.undo?c.error("这个组件没有撤销的空间！"):t.undo(),e.stopPropagation()},ce=(e,t)=>{$.menuConfig.isShow.redo?c.error("这个组件没有还原的空间！"):t.redo(),e.stopPropagation()};const ue=function(){const t=X(e);let n=l(e),o=null,s=null,i=null,r=0,d=0,c=-1,u=[],p=null,m=!1,g=!1,v=null,f=!0;w((()=>t.dragEl),((e,o)=>{var l;e&&void 0===x(e)&&(t.dragEl=o),o&&(o.classList.remove("chosenEl"),null==(l=h(o.parentNode))||l.classList.remove("chosen-container")),e?(n.rootNode.classList.remove("chosen-container"),s=h(e.parentNode),e.classList.add("chosenEl"),s.classList.add("chosen-container")):n.rootNode.classList.add("chosen-container")})),w((()=>t.selectKey),(e=>{n.modify.curData=JSON.stringify(n.EditorDataMap.get(e||"page")),f||(t.dragEl=W(n.rootNode.children[0].children,e))})),w((()=>t.isDraging),(e=>{e||a.emit("dragEnd")}));const y=()=>{o&&o.remove(),i&&i.remove(),o=null,i=null,t.selectedMaterial=null,t.isClone=!1,t.isDrag||(null==s||s.classList.remove("chosen-container"),s=null,t.isDrag=!1,u=[]),t.isDraging=!1,clearTimeout(p),m=!1,g=!1,document.body.removeEventListener("mousemove",M),document.body.removeEventListener("mousemove",P)};document.body.onmouseup=e=>{if(!b(e.target))return y(),void(f=!1);f=!0,t.isClone&&s&&(t.selectParent=x(s),a.emit("cloneEnd")),(t.isClone||t.isDrag)&&(n.isNeedSave=!0),y();let o=setTimeout((()=>{n.modify.disabled=!1,clearTimeout(o)}),0)};const h=e=>{if(e)return e.className.includes("container")||e.className.includes("Editorcontainer")?e:h(e.parentNode)},b=e=>e.parentNode!=document.body&&(!!(null==e?void 0:e.classList.contains("Editorcontainer"))||b(e.parentNode)),x=e=>{var t;return null==(t=e.attributes["data-key"])?void 0:t.nodeValue},E=()=>{new Promise((e=>{let o=x(v),l=n.EditorDataMap.get(o).children,a=n.EditorDataMap.get(t.selectKey).parent;n.EditorDataMap.get(a).children.splice(c,1),l.push(t.selectKey),n.EditorDataMap.get(t.selectKey).parent=o,s=v,e(l)})).then((e=>{c=e.length-1,t.dragEl=s.children[0].children[c],t.dragEl,t.dragEl.onmousedown=D,k(),m=!1,g=!1}))},D=e=>{n.modify.disabled=!0,a.emit("dragStart"),c=[].indexOf.call(s.children[0].children,t.dragEl),k(),t.isDraging=!0,S("ghostDrag",t.dragEl,e),document.body.addEventListener("mousemove",P)},P=e=>{b(e.target)&&p&&!g&&(clearTimeout(p),m&&(p=setTimeout(E,300))),M(e);for(let o=0;o<u.length;o++)if(o!==c&&e.clientX>u[o].left&&e.clientX<u[o].right&&e.clientY>u[o].top&&e.clientY<u[o].bottom){let e=n.EditorDataMap.get(t.selectKey).parent,l=n.EditorDataMap.get(e).children;l.splice(c,1),l.splice(o,0,t.selectKey),k(),c=o}},k=()=>{u=[];for(let e of s.children[0].children)u.push(e.getBoundingClientRect())},L=e=>e==document.body?null:"transition"==(null==e?void 0:e.parentNode.className)?e:"transition"==e.className?e.parentNode:"cannotPreview"==e.className?e:L(e.parentNode),S=(e,t,n)=>{const{clientY:l,clientX:a}=n,{top:s,left:i,width:c,height:u}=t.getBoundingClientRect();r=a-i,d=l-s,o=document.createElement("div"),o.classList.add(e),o.style.width=`${c}px`,o.style.height=`${u}px`,o.innerHTML=t.outerHTML,document.body.appendChild(o),o.style.top=`${s}px`,o.style.left=`${i}px`},M=({clientY:e,clientX:t})=>{o.style.top=e-d+"px",o.style.left=t-r+"px"};return{cloneMousedown:(e,o)=>{const l=o.currentTarget;t.isClone=!0,t.selectedMaterial=e,n.modify.disabled=!0,S("ghostClone",l,o),document.body.addEventListener("mousemove",M)},mouseenter:e=>{if(t.isClone&&(s&&(s.classList.remove("chosen-container"),i&&s.removeChild(i)),s=h(e.target),s.classList.add("chosen-container"),i=document.createElement("div"),i.classList.add("renderEl"),s.appendChild((C(t.selectedMaterial.render({node:t.selectedMaterial.defaultData}),i),i))),t.isDraging){if(clearTimeout(p),t.dragEl==e.target||e.target.classList.contains("Editorcontainer"))return;m=!0,g=!1,v=e.target,p=setTimeout(E,300)}},mouseleave:e=>{if(t.isClone&&(s&&s.classList.remove("chosen-container"),s.removeChild(i),s=h(e.target.parentNode),s.classList.add("chosen-container"),i=document.createElement("div"),i.classList.add("renderEl"),s.appendChild((C(t.selectedMaterial.render({node:t.selectedMaterial.defaultData}),i),i))),t.isDraging){if(m=!1,e.target!=s)return;v=h(e.target.parentNode),g=!0,p=setTimeout(E,300)}},onclickToDrag:e=>{const n=L(e.target)||e.target;if(n.classList.contains("Editorcontainer"))return s=n,n.classList.add("chosen-container"),t.selectKey=null,t.dragEl&&(t.dragEl.onmousedown=null),void(t.dragEl=null);n!=t.dragEl&&(t.dragEl&&(t.dragEl.onmousedown=null),t.isDrag=!0,t.dragEl=n,t.selectKey=x(t.dragEl),t.dragEl.onmousedown=D,t.destructionOfDrag=()=>{t.isDrag&&(t.selectKey=null,o&&o.remove(),t.dragEl&&(document.body.removeEventListener("mousemove",P),null==s||s.classList.remove("chosen-container"),t.dragEl.classList.remove("chosenEl"),t.dragEl.onmousedown=null),t.isDraging=!1,t.isDrag=!1,t.dragEl=null)})}}}(),pe=x({props:{style:Object,children:Object,childrenList:Array,text:String,class:String,events:Object,node:Object},setup(e){let t=E(null);return D((()=>{t.value.attributes.childrenList=e.childrenList})),()=>P("div",k({class:e.class,style:e.style,ref:t,datatype:e.class,onMouseenter:e=>ue.mouseenter(e),onMouseleave:e=>ue.mouseleave(e)},e.events),[0!=(null==e?void 0:e.children.length)&&e.children,0==(null==e?void 0:e.node.children.length)&&P("span",{class:"nochild"},[e.text])])}}),me=x({props:{option:{type:Object},events:{type:Object}},setup:e=>()=>P(u,k({class:e.option.class,modelValue:e.option.value,"onUpdate:modelValue":t=>e.option.value=t,style:e.option.style,size:e.option.size,type:e.option.inputStyle,placeholder:e.option.placeholder,showPassword:e.option.showPassword,clearable:e.option.clearable,"show-word-limit":e.option.showWordLimit,disabled:e.option.disabled,readonly:e.option.readonly,autofocus:e.option.autofocus,maxlength:e.option.maxlength,minlength:e.option.minlength},e.events),null)}),ge=x({props:{option:{type:Object},events:{type:Object}},setup:e=>()=>P(p,k({style:e.option.style,filterable:!!e.option.filterable&&e.option.filterable,placeholder:e.option.placeholder?e.option.placeholder:"请选择",modelValue:e.option.defaultValue,"onUpdate:modelValue":t=>e.option.defaultValue=t},e.events),{default:()=>[e.option.selectData&&e.option.selectData.map((e=>P(L("el-option"),{key:e.value,value:e.value},null)))]})}),ve=x({props:{option:{type:Object},events:{type:Object}},setup:e=>()=>P(S,null,[P("div",{style:e.option.style.title},[e.option.title?e.option.title:"文本"]),P(u,k({modelValue:e.option.value,"onUpdate:modelValue":t=>e.option.value=t,style:e.option.style.input,placeholder:e.option.inputBoxPlaceholder?e.option.inputBoxPlaceholder:"",clearable:!!e.option.clearable&&e.option.clearable,type:e.option.inputType?e.option.inputType:"text"},e.events),null)])}),fe=x({props:{option:{type:Object},events:{type:Object}},setup:e=>()=>P(S,null,[P("div",{style:e.option.style.title},[e.option.title?e.option.title:"多行文本"]),P(u,k({modelValue:e.option.value,"onUpdate:modelValue":t=>e.option.value=t,style:e.option.style.input,type:"textarea",placeholder:e.option.inputBoxPlaceholder?e.option.inputBoxPlaceholder:"",clearable:!!e.option.clearable&&e.option.clearable,rows:e.option.autosize.minRows},e.events),null)])}),ye=x({props:{option:{type:Object},events:{type:Object}},setup:e=>()=>P(S,null,[P("div",{style:e.option.style.title},[e.option.title?e.option.title:"文本"]),P(m,k(e.events,{modelValue:e.option.value,"onUpdate:modelValue":t=>e.option.value=t,style:e.option.style.radio}),{default:()=>[e.option.radioData&&e.option.radioData.map((e=>P(g,{label:e.value},{default:()=>[e.value]})))]})])}),he=x({props:{option:{type:Object},events:{type:Object}},setup:e=>()=>P(S,null,[P("div",{style:e.option.style.title},[e.option.title?e.option.title:"文本"]),P(v,k(e.events,{modelValue:e.option.checkboxGroup,"onUpdate:modelValue":t=>e.option.checkboxGroup=t,style:e.option.style.checkboxes}),{default:()=>[e.option.checkboxesData&&e.option.checkboxesData.map((t=>P(f,{label:t.value,key:t.value,checked:t.radio,border:e.option.border},null)))]})])}),be=x({props:{option:{type:Object}},setup:e=>()=>P("div",{class:"elCollapseItem base-settings base-events"},[P("p",null,[e.option.label]),P(L("el-input-number"),{modelValue:e.option.value,"onUpdate:modelValue":t=>e.option.value=t,min:e.option.min,max:e.option.max},null)])}),we=x({props:{option:{type:Object}},setup:e=>()=>P(S,null,[P("div",{class:"elCollapseItem base-settings-textarea-text"},[P("div",null,[e.option.label])]),P("div",{class:"elCollapseItem base-settings-textarea"},[P(u,{type:"textarea",modelValue:e.option.value,"onUpdate:modelValue":t=>e.option.value=t},null)])])});const Ce=x({props:{option:{type:Object}},setup:e=>()=>{let t;return P("div",{class:"elCollapseItem base-settings base-events"},[P("p",null,[e.option.label]),P(L("el-button-group"),null,(n=t=e.option.list.map((t=>P(L("el-button"),{class:"disabled-el-button",type:t.value==e.option.value?"primary":"",onClick:n=>{e.option.value=t.value}},{default:()=>[t.label]}))),"function"==typeof n||"[object Object]"===Object.prototype.toString.call(n)&&!M(n)?t:{default:()=>[t]}))]);var n}}),xe=""+new URL("../../png/noneData3.4ac3.png",import.meta.url).href,Ee=e=>(F("data-v-92ace972"),e=e(),B(),e),De={class:"events-targetCom"},Pe={class:"events-targetCom-item"},ke=Ee((()=>K("div",{class:"events-targetCom-title"},[K("p",null,"目标组件")],-1))),Le={class:"events-targetCom-select"},Se={class:"events-targetCom-select-content"},Me={class:"events-targetCom-item"},Te=Ee((()=>K("div",{class:"events-targetCom-title"},[K("p",null,"隐藏/显示")],-1))),Oe={class:"events-targetCom-select"},je=G(x({__name:"targetComponent",props:{option:Object},setup(t){const n=t;n.option;const o=l(e),a=T("editorConfig");let s=E(null);const i=O({targetComPath:n.option.value,selectTarget:n.option.target,isShowTree:!1,data:[{id:1,label:"页面","node-key":"page",children:o.OutlineData}],defaultProps:{children:"children","node-key":"node-key",label:"label"}}),r=e=>{i.selectTarget=e?e["node-key"]:null,i.selectTarget,o.getBreadcrumbData(o.EditorDataMap.get("page").children,a,i.selectTarget,0),i.targetComPath="";for(let t=0;t<o.targetComPath.length;t++)i.targetComPath+=o.targetComPath[t]+" > ";i.targetComPath+="("+i.selectTarget+")",i.isShowTree=!1};document.addEventListener("click",(e=>{i.isShowTree=!1,e.stopPropagation()}));const d=E(n.option.isHidden?"1":"0");return j((()=>{n.option.isHidden=!!d,n.option.target=i.selectTarget,n.option.value=i.targetComPath})),(e,t)=>{const n=L("el-tree"),o=L("el-radio");return R(),V("div",De,[K("div",Pe,[ke,K("div",Le,[P(N(u),{placeholder:"输入关键字进行过滤",clearable:"",modelValue:i.targetComPath,"onUpdate:modelValue":t[0]||(t[0]=e=>i.targetComPath=e),onFocus:t[1]||(t[1]=()=>i.isShowTree=!0),onClick:t[2]||(t[2]=e=>e.stopPropagation())},null,8,["modelValue"]),_(K("div",Se,[P(n,{ref_key:"targetComTree",ref:s,class:"filter-tree",data:i.data,props:i.defaultProps,"node-key":"node-key","highlight-current":"","default-expand-all":"",onCurrentChange:r},null,8,["data","props"])],512),[[I,i.isShowTree]])])]),K("div",Me,[Te,K("div",Oe,[P(o,{modelValue:d.value,"onUpdate:modelValue":t[3]||(t[3]=e=>d.value=e),label:"0"},{default:z((()=>[U("显示")])),_:1},8,["modelValue"]),P(o,{modelValue:d.value,"onUpdate:modelValue":t[4]||(t[4]=e=>d.value=e),label:"1"},{default:z((()=>[U("隐藏")])),_:1},8,["modelValue"])])])])}}}),[["__scopeId","data-v-92ace972"]]),Re=l(e),Ve=[{type:"跳转连接",instructions:"跳转到指定连接的页面",configRender:e=>P(we,{option:e},null),selectedRender:e=>P("p",null,[U("跳转至："),P("span",{class:"events-url"},[e.content])]),handler:e=>()=>{window.open(e.content,"_blank")},defaultData:{label:"页面地址",value:""}},{type:"刷新页面",instructions:"触发浏览器刷新页面",configRender:()=>P("div",{class:"events-none"},[P("img",{src:xe},null),P("p",null,[U("无配置内容")])]),selectedRender:e=>P("p",null,[P("span",null,[e.content])]),handler:()=>()=>{location.reload()},defaultData:{value:"刷新页面"}},{type:"回退页面",instructions:"触发浏览器回退",configRender:()=>P("div",{class:"events-none"},[P("img",{src:xe},null),P("p",null,[U("无配置内容")])]),selectedRender:e=>P("p",null,[P("span",null,[e.content])]),handler:()=>()=>{history.go(-1)},defaultData:{value:"回退页面"}},{type:"打开弹窗",instructions:"打开弹窗",configRender:e=>P(we,{option:e},null),selectedRender:e=>P("p",null,[P("span",null,[e])]),handler:()=>{},defaultData:{label:"页面地址",value:""}},{type:"关闭弹窗",instructions:"关闭弹窗",configRender:e=>P(we,{option:e},null),selectedRender:e=>P("p",null,[U("跳转至："),P("span",null,[e])]),handler:()=>{},defaultData:{label:"页面地址",value:""}},{type:"消息提醒",instructions:"出现消息提醒框",configRender:e=>P(S,null,[P(Ce,{option:e.messageType},null),P(be,{option:e.duration},null),P(we,{option:e.messageContent},null)]),selectedRender:function(e){let t="成功";return this.defaultData.messageType.list.map((n=>{n.value==e.messageType&&(t=n.label)})),P("p",null,[t,U("消息："),P("span",null,[e.messageContent])])},handler:e=>()=>{c({type:e.messageType,message:e.messageContent,duration:e.duration})},defaultData:{messageType:{label:"消息类型",list:[{label:"成功",value:"success"},{label:"警告",value:"warning"},{label:"提示",value:"info"},{label:"错误",value:"error"}],value:"success"},duration:{label:"持续时间",min:0,value:3e3},messageContent:{label:"消息内容",value:""},value:""}},{type:"发送请求",instructions:"发送请求",configRender:e=>P(we,{option:e},null),selectedRender:e=>P("p",null,[U("跳转至："),P("span",null,[e])]),handler:()=>{},defaultData:{label:"页面地址",value:""}},{type:"提交表单",instructions:"提交表单",configRender:e=>P(we,{option:e},null),selectedRender:e=>P("p",null,[U("跳转至："),P("span",null,[e])]),handler:()=>{},defaultData:{label:"页面地址",value:""}},{type:"重置表单",instructions:"重置表单",configRender:e=>P(we,{option:e},null),selectedRender:e=>P("p",null,[U("跳转至："),P("span",null,[e])]),handler:()=>{},defaultData:{label:"页面地址",value:""}},{type:"校验表单",instructions:"校验表单",configRender:e=>P(we,{option:e},null),selectedRender:e=>P("p",null,[U("跳转至："),P("span",null,[e])]),handler:()=>{},defaultData:{label:"页面地址",value:""}},{type:"组件可见性",instructions:"控制所选的组件的显示与隐藏",configRender:e=>P(je,{option:e},null),selectedRender:e=>P("p",null,[U("使得该组件 "),P("span",{style:"font-weight: 700"},[e.content]),e.otherOption.isHidden?" 隐藏":" 显示"]),handler:e=>()=>{var t;let n=Re.EditorDataMap.get(e.otherOption.target);n.classList&&(n.classList=[]),e.otherOption.isHidden,!(null==(t=Re.EditorDataMap.get(e.otherOption.target).classList)?void 0:t.includes("hidden"))&&e.otherOption.isHidden&&(n.classList.push("hidden"),Re.addLinkage({type:"class",target:e.otherOption.target}))},defaultData:{target:"",isHidden:!1,value:""}}],Ke=[{type:"onclick",name:"鼠标点击",execute:e=>({onClick:()=>{e.forEach((e=>e&&e()))}})},{type:"mouseenter",name:"鼠标移入",execute:e=>({onMouseenter:()=>{e.forEach((e=>e&&e()))}})},{type:"mouseleave",name:"鼠标移出",execute:e=>({onmouseleave:()=>{e.forEach((e=>e&&e()))}})},{type:"onfocus",name:"获取焦点",execute:e=>({onFocus:()=>{e.forEach((e=>e&&e()))}})},{type:"onblur",name:"失去焦点",execute:e=>({onBlur:()=>{e.forEach((e=>e&&e()))}})},{type:"onchange",name:"值改变",execute:e=>({onChange:()=>{e.forEach((e=>e&&e()))}})}];const Ne=new class{constructor(e=new Map,t=new Map){this.handlerMap=e,this.eventMap=t}getRenderEvents(e){return e.reduce(((e,t)=>Object.assign(e,this.eventMap.get(t.type).execute(t.list.map((e=>this.handlerMap.get(e.title).handler(e)))))),{})}register(e,t=!1){t?this.eventMap.set(e.type,e):this.handlerMap.set(e.type,e)}};for(let Je of Ve)Ne.register({type:Je.type,instructions:Je.instructions,defaultData:Je.defaultData,configRender:Je.configRender,selectedRender:Je.selectedRender,handler:Je.handler});for(let Je of Ke)Ne.register({type:Je.type,name:Je.name,execute:Je.execute},!0);const _e=[{label:"用户",icon:"icon iconfont icon-yonghu"},{label:"退出",icon:"icon iconfont icon-h"},{label:"叉 关闭",icon:"icon iconfont icon-cha"},{label:"叉 关闭",icon:"icon iconfont icon-cha1"},{label:"连接",icon:"icon iconfont icon-ai70"},{label:"密码",icon:"icon iconfont icon-mima"},{label:"返回 左箭头",icon:"icon iconfont icon-fanhui"},{label:"搜索",icon:"icon iconfont icon-search"},{label:"笑脸",icon:"icon iconfont icon-xiaolian"},{label:"菜单",icon:"icon iconfont icon-caidan"},{label:"修改",icon:"icon iconfont icon-xiugai"}],Ie=l(e),ze=[{label:"容器",icon:"icon iconfont icon-checkbox",type:"container-ordinary",category:"container",render(e){var t;const{children:n,childrenList:o}=e;return e={node:e.node,children:n||[],childrenList:o,style:e.node.style,text:"容器",class:"container-ordinary "+e.node.classList.join(" "),"data-key":e.id,events:(null==(t=e.node)?void 0:t.events)&&Ie.isPreview?Ne.getRenderEvents(e.node.events):{}},P(pe,e,null)},defaultData:{type:"container-ordinary",style:{position:"relative",width:"100%",zIndex:1},children:[],classList:[]}},{label:"自由容器",icon:"icon iconfont icon-zidingyibuju",type:"container-free",category:"container",render(e){var t;const{children:n,childrenList:o}=e;return e={node:e.node,children:n||[],childrenList:o,style:e.node.style,text:"自由容器",class:"container-free "+e.node.classList.join(" "),"data-key":e.id,events:(null==(t=e.node)?void 0:t.events)&&Ie.isPreview?Ne.getRenderEvents(e.node.events):{}},P(pe,e,null)},defaultData:{type:"container-free",style:{position:"relative",width:"100%",zIndex:1},children:[],classList:[]}},{label:"文字",icon:"icon iconfont icon-font",type:"text",category:"common",render(e){var t;let n=(null==(t=e.node)?void 0:t.events)&&Ie.isPreview?Ne.getRenderEvents(e.node.events):{};return P("div",{class:"cannotPreview "+e.node.classList.join(" "),"data-key":e.id},[P("span",k({style:e.node.style},n,{datatype:"text"}),[e.node.children?e.node.children:"渲染文字"])])},defaultData:{type:"text",style:{position:"relative",fontSize:"16px",color:"black",zIndex:1},children:"渲染文字",classList:[]}},{label:"按钮",icon:"icon iconfont icon-anniu",type:"button",category:"common",render(e){var t;let n=(null==(t=e.node)?void 0:t.events)&&Ie.isPreview?Ne.getRenderEvents(e.node.events):{};return P("div",{class:"cannotPreview "+e.node.classList.join(" "),"data-key":e.id},[P(y,k({style:e.node.style,class:"baseButton",type:e.node.buttonstyle,size:e.node.size,disabled:e.node.isDisable},n),{default:()=>[P("i",{class:["icon iconfont leftIcon",e.node.icon.leftIcon],style:{"font-size":e.node.icon.leftIconSize}},null),e.node.children?e.node.children:"渲染按钮",P("i",{class:["icon iconfont rightIcon",e.node.icon.rightIcon],style:{"font-size":e.node.icon.rightIconSize}},null)]})])},defaultData:{type:"button",style:{position:"relative",width:"87px",height:"32px",zIndex:1},classList:[],buttonstyle:"",size:"default",icon:{},twiceComfire:{},bubblePrompt:{},isDisable:!1,children:"渲染按钮"}},{label:"输入框",icon:"icon iconfont icon-input",type:"input",category:"common",render(e){var t;let n=(null==(t=e.node)?void 0:t.events)&&Ie.isPreview?Ne.getRenderEvents(e.node.events):{};return P("div",{class:"cannotPreview "+e.node.classList.join(" "),"data-key":e.id},[P(me,{option:e.node,events:n},null)])},defaultData:{type:"input",value:"",inputStyle:"text",size:"default",placeholder:"请输入",showPassword:!1,clearable:!1,showWordLimit:!1,disabled:!1,readonly:!1,autofocus:!1,style:{position:"relative",zIndex:1},children:"",classList:[]}},{label:"下拉框",icon:"icon iconfont icon-m-xialacaidan",type:"select",category:"common",render(e){var t;let n=(null==(t=e.node)?void 0:t.events)&&Ie.isPreview?Ne.getRenderEvents(e.node.events):{};return P("div",{class:"cannotPreview "+e.node.classList.join(" "),"data-key":e.id},[P(ge,{option:e.node,events:n},null)])},defaultData:{type:"select",style:{position:"relative",zIndex:1},children:"",defaultValue:"",classList:[]}},{label:"文本框",icon:"icon iconfont icon-wenben",type:"textBox",category:"form",render(e){var t;let n=(null==(t=e.node)?void 0:t.events)&&Ie.isPreview?Ne.getRenderEvents(e.node.events):{};return P("div",{class:"cannotPreview "+e.node.classList.join(" "),style:e.node.style.box,"data-key":e.id},[P(ve,{option:e.node,events:n},null)])},defaultData:{value:"",type:"textBox",title:"文本",style:{box:{display:"block"},title:{},input:{}},children:"",classList:[]}},{label:"多行文本框",icon:"icon iconfont icon-duohangwenben1",type:"multilineText",category:"form",render(e){var t;let n=(null==(t=e.node)?void 0:t.events)&&Ie.isPreview?Ne.getRenderEvents(e.node.events):{};return P("div",{class:"cannotPreview "+e.node.classList.join(" "),style:e.node.style.box,"data-key":e.id},[P(fe,{option:e.node,events:n},null)])},defaultData:{value:"",type:"multilineText",title:"多行文本",style:{box:{display:"block"},title:{},input:{}},children:"",autosize:{minRows:2,maxRows:6},classList:[]}},{label:"单选框",icon:"icon iconfont icon-danxuankuang",type:"radio",category:"form",render(e){var t;let n=(null==(t=e.node)?void 0:t.events)&&Ie.isPreview?Ne.getRenderEvents(e.node.events):{};return P("div",{class:"cannotPreview "+e.node.classList.join(" "),style:e.node.style.box,"data-key":e.id},[P(ye,{option:e.node,events:n},null)])},defaultData:{value:"",type:"radio",title:"单选框",style:{box:{display:"block"},title:{},radio:{}},children:"",radioData:[{value:"选项1",radio:!1},{value:"选项2",radio:!1},{value:"选项3",radio:!1}],classList:[]}},{label:"复选框",icon:"icon iconfont icon-duoxuankuang",type:"checkboxes",category:"form",render(e){var t;let n=(null==(t=e.node)?void 0:t.events)&&Ie.isPreview?Ne.getRenderEvents(e.node.events):{};return P("div",{class:"cannotPreview "+e.node.classList.join(" "),style:e.node.style.box,"data-key":e.id},[P(he,{option:e.node,events:n},null)])},defaultData:{value:"",type:"checkboxes",title:"复选框",style:{box:{display:"block"},title:{},checkboxes:{}},checkboxGroup:[],children:"",checkboxesData:[{value:"选项1",radio:!1},{value:"选项2",radio:!1},{value:"选项3",radio:!1}],border:!1,classList:[]}}];const Ue=new class{constructor(e=[],t=new Map,n=[]){this.componentList=e,this.componentMap=t,this.iconList=n}register(e,t=!1){t?this.iconList.push(e):this.componentList.push(e),this.componentMap.set(e.type,e)}};for(let Je of ze)Ue.register({label:Je.label,type:Je.type,category:Je.category,defaultData:Je.defaultData,display:!0,preview:()=>P(Fe,{block:Je}),render:e=>Je.render(e)});for(let Je of _e)Ue.register({label:Je.label,type:"icon",category:"icon",display:!0,defaultData:{icon:Je.icon,type:"icon",style:{position:"relative",fontSize:"16px",color:"black",zIndex:1},children:""},preview:()=>P("span",{datatype:"icon",class:"iconSpan"},[P("i",{class:Je.icon},null)]),render:e=>P("div",{class:"cannotPreview","data-key":e.id},[P("i",{class:e.node.icon,style:e.node.style},null)])},!0);const Fe=x({props:{block:{type:Object}},setup:e=>()=>P("span",{datatype:e.block.type},[P("i",{class:e.block.icon},null),P("label",null,[e.block.label])])});const Be={__name:"settingPages",props:["modifyForm"],setup(n){const o=n,l=i(e);let a=E(null),d=O({username:"",oldPassword:"",newPassword:"",checkPassword:""});const p=()=>{a.value.validate((async e=>{if(!e)return;var n;let a=(await(n=d.username,s({method:"post",url:"/modfiyUserInfo/modifyUsername",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{username:n}}))).data;a.status?c.error(a.msg):(c.success(a.msg),l.username=a.username,t("username",a.username),d.username="",o.modifyForm.value=!1,d.username="")}))};let m=E(null);const g=()=>{m.value.validate((async e=>{if(!e)return;var n;let a=(await(n=d.newPassword,s({method:"post",url:"/modfiyUserInfo/modifyPassword",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{password:n}}))).data;a.status?c.error(a.msg):(c.success(a.msg),l.password=a.password,t("password",a.password),o.modifyForm.value=!1,d.oldPassword="",d.newPassword="",d.checkPassword="")}))};let v=O({username:[{min:3,max:10,message:"用户名长度应在 3-10 个字符",trigger:"blur"},{validator:async(e,t,n)=>{if(""===t)n(new Error("请新的输入用户名"));else{let e=(await r(d.username)).data;e.status?n(new Error(e.msg)):n()}},trigger:"blur"}],oldPassword:[{validator:async(e,t,n)=>{if(""===t)n(new Error("请输入原始密码"));else{if(""!==d.oldPassword){let e=await(o=d.oldPassword,s({method:"post",url:"/modfiyUserInfo/checkPassword",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{password:o}})),t=e.data;t.status?n(new Error(t.msg)):n()}n()}var o},trigger:"blur"}],newPassword:[{min:6,max:15,message:"密码长度应在 6-15 个字符",trigger:"blur"},{validator:(e,t,n)=>{""===t?n(new Error("请输入密码")):(""!==d.checkPassword&&m.value.validateField("checkPassword"),n())},trigger:"blur"}],checkPassword:[{validator:(e,t,n)=>{""===t?n(new Error("请再次输入密码")):t!==d.newPassword?n(new Error("两次输入密码不一致!")):n()},trigger:"blur"}]});const f=()=>{m.value.resetFields(),a.value.resetFields()};return(e,t)=>{const n=L("el-tab-pane"),o=L("el-tabs");return R(),H(o,{type:"border-card","tab-position":"left",class:"card",onTabClick:f},{default:z((()=>[P(n,{label:"修改用户名"},{default:z((()=>[P(N(h),{ref_key:"usernameFormRef",ref:a,model:N(d),rules:N(v),"label-width":"100px",autocomplete:"off"},{default:z((()=>[P(N(b),{label:"用户名：",prop:"username",class:"formItemCommon"},{default:z((()=>[P(N(u),{placeholder:"请输入新的用户名",modelValue:N(d).username,"onUpdate:modelValue":t[0]||(t[0]=e=>N(d).username=e),"input-style":"height:35px;",autocomplete:"off"},null,8,["modelValue"])])),_:1}),P(N(b),{class:"btns"},{default:z((()=>[K("button",{class:"confirm",onClick:p},"立即修改")])),_:1})])),_:1},8,["model","rules"])])),_:1}),P(n,{label:"修改密码"},{default:z((()=>[P(N(h),{ref_key:"passwordFormRef",ref:m,model:N(d),rules:N(v),"label-width":"100px"},{default:z((()=>[P(N(b),{label:"原始密码：",prop:"oldPassword",class:"formItemCommon"},{default:z((()=>[P(N(u),{placeholder:"请输入原始密码",modelValue:N(d).oldPassword,"onUpdate:modelValue":t[1]||(t[1]=e=>N(d).oldPassword=e),"input-style":"height:35px;",autocomplete:"off"},null,8,["modelValue"])])),_:1}),P(N(b),{label:"修改密码：",prop:"newPassword"},{default:z((()=>[P(N(u),{placeholder:"请输入新的密码",modelValue:N(d).newPassword,"onUpdate:modelValue":t[2]||(t[2]=e=>N(d).newPassword=e),"input-style":"height:35px;","show-password":"",type:"password",autocomplete:"off"},null,8,["modelValue"])])),_:1}),P(N(b),{label:"确认密码：",prop:"checkPassword"},{default:z((()=>[P(N(u),{placeholder:"请再次输入密码",modelValue:N(d).checkPassword,"onUpdate:modelValue":t[3]||(t[3]=e=>N(d).checkPassword=e),"input-style":"height:35px;","show-password":"",type:"password"},null,8,["modelValue"])])),_:1}),P(N(b),{class:"btns"},{default:z((()=>[K("button",{class:"confirm",onClick:g},"立即修改")])),_:1})])),_:1},8,["model","rules"])])),_:1})])),_:1})}}},He=x({setup(){const e=E(!1);return()=>P("div",{class:"setting"},[P("div",{class:"setting-user"},[P("div",{class:"setting-user-portrait"},[P("img",{src:d},null)]),P("div",{class:"setting-user-info",title:n("username")},[n("username")])]),P("div",{class:"setting-line"},null),P("div",{class:"setting-common"},[P("div",{class:"icon iconfont icon-yonghu"},null),P("div",{class:"setting-common-name",onClick:()=>{o.push("/home")}},[U("我的主页")])]),P("div",{class:"setting-common",onClick:()=>{e.value=!0}},[P("div",{class:"icon iconfont icon-xiugai"},null),P("div",{class:"setting-common-name"},[U("我的设置")])]),P(L("el-dialog"),{title:"我的设置",modelValue:e.value,"onUpdate:modelValue":t=>e.value=t,width:"540px"},{default:()=>[P(Be,{modifyForm:e},null)]}),P("div",{class:"setting-common setting-warn",onClick:()=>(o.push("/login"),sessionStorage.clear(),void localStorage.clear())},[P("div",{class:"icon iconfont icon-h"},null),P("div",{class:"setting-common-name"},[U("退出登录")])])])}});let Ae=l(e);const Ge=e=>{let t=Ae.EditorDataMap.get(e);if(t.children instanceof Array)return t.children.map((e=>{var t;let n=Ge(e),o=Ae.EditorDataMap.get(e),l=O({node:o,id:e,style:o.style});return o.type.includes("container")&&(l.children=n,l.childrenList=o.children),null==(t=Ue.componentMap.get(o.type))?void 0:t.render(l)}))},Xe=x({props:{EditorData:Object},setup:e=>()=>e.EditorData?P("div",{class:"EditorPreview"},[P("div",{id:"body",style:e.EditorData.get("page").style},[Ge("page")]),P("div",{class:"EditorPreview-leftMessage"},[U("按ESC可退出预览")])]):P(S,null,[Ge("page")])});function Ye(){return s({method:"get",url:"/getEditData",headers:{"Content-Type":"application/x-www-form-urlencoded"}})}function $e(e){return s({method:"post",url:"/delEditData",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{id:e}})}function We(e){return s({method:"post",url:"/addEditData",headers:{"Content-Type":"application/json;charset=utf-8"},data:e})}function qe(e){return s({method:"post",url:"/updateEditData",headers:{"Content-Type":"application/json;charset=utf-8"},data:e})}export{we as B,Xe as E,He as P,G as _,be as a,qe as b,ee as c,X as d,Ue as e,te as f,oe as g,ae as h,le as i,ie as j,re as k,de as l,ne as m,Ye as n,$e as o,se as p,We as q,ce as r,Z as s,Ne as t,ue as u,Q as v};
