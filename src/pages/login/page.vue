<template>
    <div class="login-page">
        <div class="layer bg" id="login"></div>
        <div class="layer flex-center">
            <!-- logo部分 -->
            <div class="logo-group">
                <img src="./image/logo.png" alt="logo">
            </div>
            <!-- 表单部分 -->
            <div class="form-group">
                <el-card>
                    <el-form ref="loginForm" label-position="top" :rules="rules" :model="formLogin" size="default">
                        <el-form-item prop="username">
                            <el-input type="text" v-model="formLogin.username" placeholder="用户名">
                                <i slot="prepend" class="fa fa-user-circle-o"></i>
                                <d2-icon name="user-circle-o"/>
                            </el-input>
                        </el-form-item>
                        <el-form-item prop="password">
                            <el-input type="password" v-model="formLogin.password" placeholder="密码">
                                <i slot="prepend" class="fa fa-keyboard-o"></i>
                                <d2-icon name="fa-keyboard-o"/>
                            </el-input>
                        </el-form-item>
                        <el-button-group>
                            <el-button size="default" @click="submit" type="primary">登录</el-button>
                        </el-button-group>
                    </el-form>
                </el-card>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapActions} from "vuex"
    import JSEncrypt from 'jsencrypt'
    import * as sysLogin from "@/api/sys/login"

    export default {
        data() {
            return {
                // 表单
                formLogin: {
                    username: "",
                    password: "",
                },
                // 校验
                rules: {
                    username: [
                        {required: true, message: "请输入用户名", trigger: "blur"}
                    ],
                    password: [{required: true, message: "请输入密码", trigger: "blur"}],
                    code: [{required: true, message: "请输入验证码", trigger: "blur"}]
                },
                //公钥
                SecurityCode: '',
            };
        },
        mounted() {
//            this.getsecurityCode()
        },

        methods: {
            ...mapActions("d2admin/account", ["login"]),
            //加密账号和密码
            encryCode(publicKey) {
                let rsa = new JSEncrypt()
                rsa.setPublicKey(publicKey)
                this.formLogin.username = rsa.encrypt(this.formLogin.username)
                this.formLogin.password = rsa.encrypt(this.formLogin.password)
            },
            /**
             * @description 提交表单
             */
            // 提交登录信息
            async submit() {
                //* @description 获取公钥
                const code = await sysLogin.getSecurityCode()
                this.encryCode(code)
                this.$refs.loginForm.validate(valid => {
                    if(valid) {
                        // 登录
                        // 注意 这里的演示没有传验证码
                        // 具体需要传递的数据请自行修改代码
                        this.login({
                            vm: this,
                            username: this.formLogin.username,
                            password: this.formLogin.password
                        });
                    } else {
                        // 登录表单校验失败
                        this.$message.error("表单校验失败");
                    }
                });
            },
        }
    }
</script>
<style lang="scss">
    @import "./style.scss";
</style>
