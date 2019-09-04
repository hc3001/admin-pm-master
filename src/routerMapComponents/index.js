const files = require.context('./', true, /\.js$/);
import layoutHeaderAside from '@/layout/header-aside/layout'

let componentMaps = {
    "layoutHeaderAside": layoutHeaderAside,
    "menu": () => import(/* webpackChunkName: "menu" */'@/pages/sys/menu'),
    "role": () => import(/* webpackChunkName: "role" */'@/pages/sys/role'),
    "user": () => import(/* webpackChunkName: "user" */'@/pages/sys/user'),
    "salesman": () => import(/* webpackChunkName: "user" */'@/pages/reconciliation/salesman'),
    "datainquiry": () => import(/* webpackChunkName: "user" */'@/pages/reconciliation/datainquiry'),
}
files.keys().forEach((key) => {
    if(key === './index.js') return
    Object.assign(componentMaps, files(key).default)
})
export default componentMaps