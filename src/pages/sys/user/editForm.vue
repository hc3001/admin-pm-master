<template>
    <el-dialog :visible.sync="dialogVisible" width="30%">
        <el-form ref="userForm" :model="userForm" label-width="80px" size="small">
            <el-form-item prop="userBelong" label="账号类型" :rules="[{ required: true, message: '不能为空'}]">
                <el-select v-model="userForm.userBelong" placeholder="请选择">
                    <el-option v-for="item in accountList" :key="item.state" :label="item.name" :value="item.state">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="username" label="用户名" :rules="[{ required: true, message: '不能为空'}]">
                <el-autocomplete v-model="userForm.username" :fetch-suggestions="nameSearchAsync" placeholder="请输入用户名"
                                 @select="selectStaff"
                ></el-autocomplete>
            </el-form-item>
            <el-form-item prop="password" label="密码" :rules="[{ required: true, message: '不能为空'}]">
                <el-input v-model="userForm.password"></el-input>
            </el-form-item>
            <el-form-item prop="name" label="姓名" :rules="[{ required: true, message: '不能为空'}]">
                <el-input v-model="userForm.name"></el-input>
            </el-form-item>
            <el-form-item prop="mobile" label="手机号码">
                <el-input v-model="userForm.mobile"></el-input>
            </el-form-item>
            <el-form-item prop="mail" label="邮箱">
                <el-input v-model="userForm.mail"></el-input>
            </el-form-item>
            <el-form-item prop="department" label="部门">
                <el-select v-model="userForm.department" placeholder="请选择">
                    <el-option v-for="item in accountList" :key="item.state" :label="item.name" :value="item.state">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item prop="deleteStatus" label="是否启用">
                <el-switch v-model="userForm.deleteStatus" active-color="#13ce66" inactive-color="#dcdfe6"></el-switch>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" @click="saveUser">
                    保存
                </el-button>
                <el-button @click="close">取消</el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>
<script>
    import * as userService from "@/api/sys/user";

    export default {
        name: "userEditForm",
        props: {
            userForm: {
                type: Object,
                default: function() {
                    return {
                        username: "",
                        userBelong: "",
                        password: "",
                        name: "",
                        mobile: "",
                        mail: "",
                        department: "",
                        deleteStatus: false,
                    }
                }
            },
            value: Boolean
        },
        data() {
            return {
                loading: false,
                dialogVisible: false,
                form: {
                    username: "",
                    userBelong: "",
                    password: "",
                    name: "",
                    mobile: "",
                    mail: "",
                    department: "",
                    deleteStatus: false,
                },
                staffList: [],
                accountList: [
                    {
                        name: '内部员工',
                        state: 1,
                    }, {
                        name: '外部用户',
                        state: 2,
                    }
                ],
            }
        },
        watch: {
            value(val) {
                this.dialogVisible = val
            },
            dialogVisible(val) {
                this.$emit("input", val)
            }
        },
        methods: {
            nameSearchAsync(queryString, cd) {
                userService.getStaffInfoList({staff: queryString}).then((res) => {
                    console.log('res', res)
                    var list = []
                    res.forEach(ele => {
                        list.push({
                            value: ele.username,
                        })
                    })
                    cd(list)
                })
            },
            selectStaff(item) {
                console.log('item', item)
                this.userForm.username = item.value
            },

//            dialogOpen() {
//                this.$refs.form.resetFields();
//                if(this.user.id) {
//                    userService.getUser(this.user.id).then(data => {
//                        let form = {};
//                        form.name = data.name;
//                        form.trueName = data.trueName;
//                        form.phone = data.phone;
//                        form.email = data.email;
//                        this.form = form;
//                    });
//                } else {
//                    this.form = {};
//                }
//            },
            saveUser() {
                this.$refs["form"].validate(valid => {
                    if(valid) {
                        this.loading = true;
                        userService
                            .saveUser({...this.form, id: this.user.id})
                            .then(data => {
                                this.loading = false;
                                this.dialogVisible = false;
                                this.$emit("submit");
                            });
                    } else {
                        return false;
                    }
                });
            },
            close() {
                this.$refs["userForm"].resetFields();
                this.dialogVisible = false;
            }
        }
    };
</script>

