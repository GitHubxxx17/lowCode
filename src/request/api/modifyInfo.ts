import service from "..";
// 修改用户名
export function modifyUsername(username) {
  return service({
    method: "post",
    url: "/modfiyUserInfo/modifyUsername",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      username: username,
    },
  });
}

// 检测原始密码是否正确
export function checkPassword(password) {
  return service({
    method: "post",
    url: "/modfiyUserInfo/checkPassword",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      password: password,
    },
  });
}

// 修改密码
export function modifyPassword(password) {
  return service({
    method: "post",
    url: "/modfiyUserInfo/modifyPassword",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: {
      password: password,
    },
  });
}
