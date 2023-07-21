import service from '..';
//获取编辑数据
export function getEditData() {
    return service({
        method: 'get',
        url: '/getEditData',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    })
}