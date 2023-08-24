import { ElMessage } from "element-plus";
import service from "..";
/**
 * 通用下载方法
 * @param url 请求地址
 * @param fileName 下载的文件名
 * @param fileFormat 下载的文件格式
 * @param params 请求传参
 * @returns buffer
 */
export function download(
  url: string,
  fileName: string,
  fileFormat: string = "xlsx",
  params?: object
) {
  return service
    .post(url, params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      responseType: "blob",
    })
    .then(async (res: any) => {
      let uploadExcel = (fileName: any) => {
        const blob = new Blob([res.data], {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
        }) as any;
        const url = URL.createObjectURL(blob);
        const aLink = document.createElement("a");
        aLink.setAttribute("download", fileName);
        aLink.setAttribute("href", url);
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
        URL.revokeObjectURL(blob);
      };
      uploadExcel(`${fileName}_${new Date().valueOf()}.${fileFormat}`);
    })
    .catch((r) => {
      console.error(r);
      ElMessage.error("下载文件出现错误，请联系管理员！");
    });
}
