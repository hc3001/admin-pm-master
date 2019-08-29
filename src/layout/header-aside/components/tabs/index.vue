<template>
    <div class="d2-multiple-page-control-group" flex>
        <div class="d2-multiple-page-control-content" flex-box="1">
            <div class="d2-multiple-page-control-content-inner">
                <d2-contextmenu :visible.sync="contextmenuFlag" :x="contentmenuX" :y="contentmenuY">
                    <d2-contextmenu-list :menulist="contextmenuListIndex"/>
                </d2-contextmenu>
                <el-tabs
                        class="d2-multiple-page-control"
                        :value="current"
                        type="card"
                        :closable="true"
                        @tab-click="handleClick"
                        @edit="handleTabsEdit">
                    <el-tab-pane
                            v-for="(page, index) in opened"
                            :key="index"
                            :label="page.meta.title || '未命名'"
                            :name="page.name"/>
                </el-tabs>
            </div>
        </div>
        <div class="d2-multiple-page-control-btn" flex-box="0">
            <el-dropdown size="default" split-button @click="handleControlBtnClick" @command="handleCommand">
                <d2-icon name="times-circle"/>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="fullscreen">
                        <span>{{active ? '退出全屏' : '全屏'}}</span>
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
    import {mapState, mapActions, mapMutations} from 'vuex'

    export default {
        components: {
            D2Contextmenu: () => import('../contextmenu'),
            D2ContextmenuList: () => import('../contextmenu/components/contentmenuList')
        },
        data() {
            return {
                contextmenuFlag: false,
                contentmenuX: 0,
                contentmenuY: 0,
                contextmenuListIndex: [
                    {icon: 'times-circle', title: '关闭全部', value: 'all'}
                ],
                tagName: 'index'
            }
        },
        computed: {
            ...mapState('d2admin/page', [
                'opened',
                'current'
            ]),
            ...mapState('d2admin/fullscreen', [
                'active'
            ])
        },
        methods: {
            ...mapActions('d2admin/page', [
                'close',
                'closeAll'
            ]),
            ...mapActions('d2admin/fullscreen', [
                'toggle'
            ]),
            /**
             * @description 触发全屏
             */
            handleCommand(command) {
                this.toggle()
            },
            /**
             * @description 接收点击关闭控制上按钮的事件
             */
            handleControlBtnClick() {
                this.closeAll(this)
            },
            /**
             * @description 接收点击 tab 标签的事件
             */
            handleClick(tab, event) {
                // 找到点击的页面在 tag 列表里是哪个
                const page = this.opened.find(page => page.name === tab.name)
                const {name, params, query} = page
                if(page) {
                    this.$router.push({name, params, query})
                }
            },
            /**
             * @description 点击 tab 上的删除按钮触发这里 首页的删除按钮已经隐藏 因此这里不用判断是 index
             */
            handleTabsEdit(tagName, action) {
                if(action === 'remove') {
                    this.close({
                        tagName,
                        vm: this
                    })
                }
            }
        }
    }
</script>
