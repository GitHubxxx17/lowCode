import{B as e,a as t}from"../editor/editor.a7b80277.js";import{B as l}from"../home/home.c21240f2.js";import"../index.70967321.js";import"../userStore/userStore.49c50847.js";import{G as o,U as s,ag as a,S as i,Z as u,b as n,F as p}from"../@vue/@vue.5b184091.js";const r=o({props:{option:{type:Object}},setup(t){const l=["basic","styleSource"],o={writingStyle:!0,bgColor:!0,border:!0,marginAndPadding:!0,radius:!0,shadow:!0,style:t.option.style};return()=>s(a("elCollapse"),{modelValue:l},{default:()=>[s(a("elCollapseItem"),{title:"基本",name:"basic"},{default:()=>[s(e,{option:o},null)]}),s(a("elCollapseItem"),{title:"样式源码",name:"styleSource"},{default:()=>[s("div",{class:"elCollapseItem editStyle"},[s("div",{class:"editStyleSource"},[s("i",{class:"icon iconfont icon-daimajishufuwu"},null),s("span",null,[i("编辑样式源码")])])])]})]})}}),d=o({props:{option:{type:Object}},setup(e){const o=["basic","layout"],i=u({pageTitle:{label:"页面标题",value:e.option.title??""},subtitle:{label:"副标题",value:e.option.subtitle??""}});return n((()=>{e.option.title=i.pageTitle.value,e.option.subtitle=i.subtitle.value})),()=>s(p,null,[s(a("elCollapse"),{modelValue:o},{default:()=>[s(a("elCollapseItem"),{title:"基本",name:"basic"},{default:()=>[s(t,{option:i.pageTitle},null),s(l,{option:i.subtitle},null)]})]})])}});export{d as C,r as a};