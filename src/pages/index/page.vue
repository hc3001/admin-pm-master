<template>
    <d2-container class="page">
        <div>后台de系统</div>
    </d2-container>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        computed: {
            ...mapState('d2admin/releases', [
                'version'
            ])
        }
    }
</script>

<style lang="scss" scoped>
    @import '~@/assets/style/public.scss';

    .page {
        .page__logo {
            width: 120px;
        }
        .page__btn-group {
            color: $color-text-placehoder;
            font-size: 12px;
            margin-top: -10px;
            margin-bottom: 20px;
            span {
                color: $color-text-sub;
                &:hover {
                    color: $color-text-main;
                }
            }
        }
    }
</style>
