import request from '@/plugin/axios'

export function getSecurityCode() {
    return request({
        url: '/rest/sysmanager/securityCode',
        method: 'get'
    })
}

export function AccountLogin(data) {
    return request({
        url: '/auth/login',
        method: 'post',
        data,
        loading: {
            type: 'loading',
            options: {
                fullscreen: true,
                lock: true,
                text: '正在登陆...',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.8)'
            }
        }
    })
}

