import{s as t}from"./userStore-7be86369.js";function n(e){return t({method:"post",url:"/user/checkIfUserExist",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{username:e}})}function s(e,r){return t({method:"post",url:"/user/reguser",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{username:e,password:r}})}function a(e,r){return t({method:"post",url:"/user/login",headers:{"Content-Type":"application/x-www-form-urlencoded"},data:{username:e,password:r}})}export{n as c,a as l,s as r};
