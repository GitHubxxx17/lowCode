import{u as $,_ as N}from"./userStore-03905ce2.js";import{r as O,m as B,P as F,g as L,h as M,i as U,c as f,_ as G}from"./home-05920f23.js";import{X as k,p as b,bP as J,r as T,aE as z,aV as D,o as _,c as h,b as a,d as n,w as r,u as p,bO as H,F as y,aT as Q,Q as E,bM as c,i as I,av as R,t as X,aO as q,aL as A}from"./index-73e75812.js";const K=""+new URL("../png/noneData1-cb06f12f.png",import.meta.url).href,W=k({props:{EditorData:Object},setup(i){return()=>{var s;return O((s=i.EditorData)==null?void 0:s.body)}}}),u=i=>(q("data-v-c629db02"),i=i(),A(),i),Y={class:"home"},Z={class:"home-header"},ee=u(()=>a("div",{class:"home-header-left"},[a("h2",null,"codeFlow")],-1)),te={class:"home-header-right"},ae=u(()=>a("div",{class:"home-header-right-avatar"},[a("img",{src:N,alt:"user"})],-1)),oe={class:"home-body"},se={class:"home-body-left"},de=u(()=>a("div",{class:"home-body-left-header"},[a("span",null,"我的页面")],-1)),ie={class:"home-body-left-content"},le=["onClick"],ne={class:"title"},re=["onClick"],ce={class:"home-body-right"},_e={key:0,class:"home-body-right-viewer"},he={key:1,class:"home-body-right-none"},ue=u(()=>a("img",{src:K,alt:"没有页面捏"},null,-1)),pe=[ue],ge=u(()=>a("span",null,"确认删除该页面吗？",-1)),me={class:"dialog-footer"},ve=k({__name:"home",setup(i){const s=B(b),x=$(b);x.token=J("token");const t=T({editdata:[],dialogVisible:!1,delIndex:0,selectIndex:0}),V=async()=>{let o=await L();t.editdata=o.data.editData.map((e,l)=>(e.jsonData=JSON.parse(e.jsonData),e.active=!1,l==0&&(e.active=!0,s.EditorData=e.jsonData,s.title=e.title,t.selectIndex=e.id),e)),console.log(t.editdata)},g=o=>{t.editdata.forEach((e,l)=>{e.active=!1,l==o&&(e.active=!0,s.EditorData=e.jsonData,s.title=e.title,t.selectIndex=e.id)})},w=o=>{o.push("/editor"),c("title",s.title),c("data",s.EditorData),c("id",t.selectIndex)},C=(o,e)=>{o.stopPropagation(),t.delIndex=e,t.dialogVisible=!0},S=async()=>{let o=await M(t.editdata[t.delIndex].id);console.log(o),t.dialogVisible=!1,t.editdata.splice(t.delIndex,1);let e=t.editdata.length;if(e==0){s.EditorData=null,localStorage.removeItem("title"),localStorage.removeItem("data");return}g(t.delIndex==e?t.delIndex-1:t.delIndex),I.success({message:o.data.msg,duration:2e3})},P=async o=>{let e=await U({title:"未命名页面",jsonData:JSON.stringify(f)});I.success({message:e.data.msg,duration:1e3}),o.push("/editor"),c("title","未命名页面"),c("data",f),c("id",e.data.id),console.log(e)};return z(()=>{V()}),(o,e)=>{const l=D("el-button"),j=D("el-dialog");return _(),h(y,null,[a("div",Y,[a("header",Z,[ee,a("div",te,[a("div",{class:"home-header-right-btn",onClick:e[0]||(e[0]=d=>w(o.$router))}," 进入编辑 "),a("div",{class:"home-header-right-btn",onClick:e[1]||(e[1]=d=>P(o.$router))}," 新建页面 "),n(p(H),{placement:"bottom",width:200,trigger:"click"},{reference:r(()=>[ae]),default:r(()=>[n(p(F))]),_:1})])]),a("section",oe,[a("div",se,[de,a("div",ie,[a("ul",null,[(_(!0),h(y,null,Q(t.editdata,(d,m)=>(_(),h("li",{class:R({active:d.active}),onClick:v=>g(m),key:d.id},[a("div",ne,X(d.title),1),a("i",{class:"del icon iconfont icon-cha",onClick:v=>C(v,m)},null,8,re)],10,le))),128))])])]),a("div",ce,[t.editdata.length?(_(),h("div",_e,[n(p(W),{EditorData:p(s).EditorData},null,8,["EditorData"])])):(_(),h("div",he,pe))])])]),n(j,{title:"删除页面",modelValue:t.dialogVisible,"onUpdate:modelValue":e[3]||(e[3]=d=>t.dialogVisible=d),width:"30%"},{footer:r(()=>[a("span",me,[n(l,{onClick:e[2]||(e[2]=d=>t.dialogVisible=!1)},{default:r(()=>[E("取 消")]),_:1}),n(l,{type:"primary",onClick:S},{default:r(()=>[E("确 定")]),_:1})])]),default:r(()=>[ge]),_:1},8,["modelValue"])],64)}}});const ye=G(ve,[["__scopeId","data-v-c629db02"]]);export{ye as default};
