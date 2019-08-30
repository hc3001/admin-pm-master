import util from '@/libs/util.js'

export default {
    methods: {
        handleMenuSelect(index, indexPath) {
            console.log('index', index, indexPath)
            if(/^d2-menu-empty-\d+$/.test(index) || index === undefined) {
                this.$message.warning('临时菜单')
            } else if(/^https:\/\/|http:\/\//.test(index)) {
                util.open(index)
            } else {
                this.$router.push({
                    path: index
                })
            }
        },
        //点击header 栏，侧边栏默认展示第一个path
        handleHeaderMenuSelect(index, indexPath) {
            if(this.header && this.header.length !== 0) {
                const targetHead = this.header.find((val)=> {
                    return val.path === index
                })
                if(targetHead) {
                    function findFirst(targetHead) {
                        var child = targetHead.children
                        return child ? findFirst(child[0]) : targetHead.path
                    }
                    var pathFirst = findFirst(targetHead)
                    this.$router.push({
                        path: pathFirst
                    })
                }
            }
        }
    }
}
