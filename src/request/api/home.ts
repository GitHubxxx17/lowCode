import service from "..";
import userStore from "../../stores/userStore.ts";
import pinia from "../../stores/index.ts";
const userData = userStore(pinia);
//获取编辑数据
export function getEditData() {
  return service({
    method: "get",
    url: "/getEditData",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: userData.token,
    },
  });
}
//删除页面数据
export function delEditData(id: number) {
  return service({
    method: "post",
    url: `/delEditData`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      authorization: userData.token,
    },
    data: {
      id,
    },
  });
}
//添加页面
export function addEditData(data: any) {
  return service({
    method: "post",
    url: `/addEditData`,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
      authorization: userData.token,
    },
    data: data,
  });
}
