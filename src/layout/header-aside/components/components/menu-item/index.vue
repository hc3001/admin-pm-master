<template>
    <el-menu-item :index="menu.path || uniqueId">
        <i v-if="menu.meta.icon" :class="`fa fa-${menu.meta.icon}`"></i>
        <d2-icon-svg v-else-if="menu.meta.iconSvg" :name="menu.meta.iconSvg"/>
        <i v-else class="fa fa-file-o"></i>
        <span slot="title">{{menu.meta.title || '未命名菜单'}}</span>
    </el-menu-item>
</template>

<script>
    import {uniqueId} from 'lodash'

    export default {
        name: 'd2-layout-header-aside-menu-item',
        props: {
            menu: {
                type: Object,
                required: false,
                default: () => {
                }
            }
        },
        data() {
            return {
                uniqueId: uniqueId('d2-menu-empty-')
            }
        }
    }
</script>
