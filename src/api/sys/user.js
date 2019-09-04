import request from '@/plugin/axios'

export function getUser(id) {
    return request({
        url: '/user/' + id,
        method: 'get',
        loading: {
            type: 'nprogress',
            interval: 500
        }
    })
}

export function getUserPermissionInfo() {
    return request({
        url: '/user/info',
        method: 'get'
    })
}

export function getStaffInfoList(data) {
    return request({
        url: '/user/staff/list',
        method: 'post',
        params: data,
    })
}

export function getUserPagedList(query) {
    return request({
        url: '/user/pagedlist',
        method: 'get',
        params: query,
        loading: {
            type: 'loading',
            options: {
                fullscreen: true,
                lock: true,
                text: '加载中...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            }
        }
    })
}

export function editRoleUser(data) {
    return request({
        url: '/user/editroleuser',
        method: 'post',
        data: data
    })
}

export function saveUser(data) {
    return request({
        url: '/user/save',
        method: 'post',
        data: data,
        success: {
            type: 'message',
            options: {
                message: '保存成功',
                type: 'success'
            }
        }
    })
}

export function delUser(id) {
    return request({
        url: '/user/del',
        method: 'delete',
        params: {id: id},
        success: {
            type: 'message',
            options: {
                message: '删除成功',
                type: 'success'
            }
        }
    })
}

export function delUsers(ids) {
    return request({
        url: '/user/batchdel',
        method: 'delete',
        params: ids,
        success: {
            type: 'message',
            options: {
                message: '删除成功',
                type: 'success'
            }
        }
    })
}