import service from "..";
//获取编辑数据
export function getEditData() {
  return service({
    method: "get",
    url: "/getEditData",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
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
    },
    data: data,
  });
}
//修改页面
export function updateEditData(data: any) {
  return service({
    method: "post",
    url: `/updateEditData`,
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    data: data,
  });
}
