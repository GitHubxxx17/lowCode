import service from "..";
// 检测用户名是否存在
export function checkIfUserExist(username) {
  return service({
    method: "post",
    url: "/user/checkIfUserExist",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      username: username,
    },
  });
}

// 注册
export function reguser(username, password) {
  return service({
    method: "post",
    url: "/user/reguser",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      username: username,
      password: password,
    },
  });
}

// 登录
export function login(username, password) {
  return service({
    method: "post",
    url: "/user/login",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    data: {
      username: username,
      password: password,
    },
  });
}
