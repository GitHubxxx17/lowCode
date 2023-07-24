import{_ as V}from"./user-339da0c7.js";import{s as v}from"./index-765abcf3.js";import{d as _,p as S,r as g,a as b,o as x,c as C,b as f,e as n,w as m,u as a,E as p,f as w,g as U,h as D,t as k,i as R,j as h,s as F}from"./index-1a4ab0b5.js";function B(i){return v({method:"post",url:"/user/checkIfUserExist",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{username:i}})}function I(i,u){return v({method:"post",url:"/user/reguser",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{username:i,password:u}})}function $(i,u){return v({method:"post",url:"/user/login",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{username:i,password:u}})}const T=_("userStore",{state:()=>({username:"",token:""})}),M={class:"login"},j={class:"login-box"},q=f("div",{class:"login-box-avatar"},[f("img",{src:V})],-1),L={__name:"login",setup(i){sessionStorage.clear();const u=T(S);let t=g({changeName:"注册",confirmName:"登录",isRegister:!1}),c=b(null);const E=()=>{c.value.resetFields()},N=()=>{t.changeName=="注册"?(t.isRegister=!0,t.changeName="登录",t.confirmName="注册"):(t.isRegister=!1,t.changeName="注册",t.confirmName="登录"),r.username="",r.password="",r.checkPassword="",E()};let r=g({username:"admin",password:"123456",checkPassword:""}),y=g({username:[{min:3,max:10,message:"用户名长度应在 3-10 个字符",trigger:"blur"},{validator:async(d,s,e)=>{if(s==="")e(new Error("请输入用户名"));else{let l=await B(r.username);if(t.confirmName==="注册"){let o=l.data;o.status?e(new Error(o.msg)):e()}else l.data.status?e():e("该用户名不存在！")}},trigger:"blur"}],password:[{min:6,max:15,message:"密码长度应在 6-15 个字符",trigger:"blur"},{validator:(d,s,e)=>{s===""?e(new Error("请输入密码")):(r.checkPassword!==""&&c.value.validateField("checkPassword"),e())},trigger:"blur"}],checkPassword:[{validator:(d,s,e)=>{s===""?e(new Error("请再次输入密码")):s!==r.password?e(new Error("两次输入密码不一致!")):e()},trigger:"blur"}]});const P=d=>{c.value.validate(async s=>{if(!s)return;let e=!1,l=null;if(t.confirmName==="注册"?l=await I(r.username,r.password):l=await $(r.username,r.password),l){let o=l.data;o.status?h.error(o.msg):(h.success(o.msg),e=!0),e&&(u.username=o.username,u.token=o.token,F("token",o.token),d.push("/home"))}else h.success(t.confirmName+"异常，请重试！")})};return(d,s)=>(x(),C("div",M,[f("div",j,[q,n(a(R),{ref_key:"formRef",ref:c,model:a(r),rules:a(y),"label-width":"100px",class:"login-box-form",autocomplete:"off"},{default:m(()=>[n(a(p),{label:"用  户  名：",prop:"username"},{default:m(()=>[n(a(w),{placeholder:"请输入用户名",modelValue:a(r).username,"onUpdate:modelValue":s[0]||(s[0]=e=>a(r).username=e),"input-style":"height:35px;",autocomplete:"off"},null,8,["modelValue"])]),_:1}),n(a(p),{label:"密       码：",prop:"password"},{default:m(()=>[n(a(w),{placeholder:"请输入密码",modelValue:a(r).password,"onUpdate:modelValue":s[1]||(s[1]=e=>a(r).password=e),"input-style":"height:35px;","show-password":"",type:"password",autocomplete:"off"},null,8,["modelValue"])]),_:1}),a(t).isRegister?(x(),U(a(p),{key:0,label:"确认密码：",prop:"checkPassword"},{default:m(()=>[n(a(w),{placeholder:"请再次输入密码",modelValue:a(r).checkPassword,"onUpdate:modelValue":s[2]||(s[2]=e=>a(r).checkPassword=e),"input-style":"height:35px;","show-password":"",type:"password",autocomplete:"off"},null,8,["modelValue"])]),_:1})):D("",!0),n(a(p),{class:"login-box-form-btns"},{default:m(()=>[f("button",{class:"confirm",onClick:s[3]||(s[3]=e=>P(d.$router))}," 立即"+k(a(t).confirmName),1),f("div",{class:"change",onClick:s[4]||(s[4]=e=>N())}," 去"+k(a(t).changeName),1)]),_:1})]),_:1},8,["model","rules"])])]))}};export{L as default};
