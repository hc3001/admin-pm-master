<template>
    <d2-container>
        <template slot="header">
            <el-form :inline="true" :model="searchForm" ref="searchForm" size="mini" style="margin-bottom: -18px;">
                <el-form-item label="账户名" prop="username">
                    <el-input v-model="searchForm.userName" placeholder="请输入账户名" style="width: 150px;"/>
                </el-form-item>
                <el-form-item label="手机号码" prop="mail">
                    <el-input v-model="searchForm.email" placeholder="请输入手机号码" style="width: 150px;"/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="handleSearchFormSubmit">
                        <d2-icon name="search"/>
                        查询
                    </el-button>
                </el-form-item>
                <el-button type="primary" size="mini" icon="el-icon-circle-plus" @click="addUser">
                    新增用户
                </el-button>
            </el-form>
        </template>
        <div>
            <el-table :data="tableData" size="small" border highlight-current-row style="width: 100%;">
                <el-table-column label="用户id" prop="userId">
                    <template slot-scope="scope">
                        {{scope.row.userId}}
                    </template>
                </el-table-column>
                <el-table-column label="用户名" prop="username">
                    <template slot-scope="scope">
                        {{scope.row.username}}
                    </template>
                </el-table-column>
                <el-table-column label="手机号码" prop="mobile">
                    <template slot-scope="scope">
                        {{scope.row.mobile}}
                    </template>
                </el-table-column>
                <el-table-column label="邮箱" prop="mail">
                    <template slot-scope="scope">
                        {{scope.row.mail}}
                    </template>
                </el-table-column>
                <el-table-column label="部门" prop="department" width="100">
                    <template slot-scope="scope">
                        {{scope.row.department}}
                    </template>
                </el-table-column>
                <el-table-column label="账号类型" prop="userBelong" width="80">
                    <template slot-scope="scope">
                        {{scope.row.userBelong == 1 ? '内部员工' : '外部用户'}}
                    </template>
                </el-table-column>
                <el-table-column label="状态" prop="deleteStatus" width="70">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.deleteStatus==1" size="mini" type="info">启用</el-tag>
                        <el-tag v-if="scope.row.deleteStatus==-1" size="mini" type="success">禁止</el-tag>
                    </template>
                </el-table-column>
                <el-table-column fixed="right" label="操作" align="center" width="250">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" @click="operatState(scope.row.state)">{{scope.row.deleteStatus==1 ? '禁止' : '启用'}}</el-button>
                        <el-button type="primary" size="mini" @click="openEditForm(scope.row)">编辑</el-button>
                        <el-button type="danger" size="mini" @click="resetPassword">重置密码</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-dialog :visible.sync="dialogResetpassword" @closed="dialogResetpassword = false" title="重置密码" width="25%">
                <el-form :inline="true" :model="passwordForm" ref="resetPassword" size="mini" label-width="80px" :rules="passwordRules">
                    <el-form-item label="密码" prop="firstPassword" style="margin-bottom: 30px">
                        <el-input type="password" v-model="passwordForm.firstPassword" placeholder="请输入密码"/>
                    </el-form-item>
                    <el-form-item label="确认密码" prop="confirmPassword">
                        <el-input type="password" v-model="passwordForm.confirmPassword" placeholder="请再次输入密码"/>
                    </el-form-item>
                </el-form>
                <div slot="footer">
                    <el-button type="primary" @click="savePassword">保存</el-button>
                    <el-button @click="dialogResetpassword = false">取消</el-button>
                </div>
            </el-dialog>
        </div>
        <template slot="footer">
            <el-pagination :current-page="page.current" :page-size="page.size" :total="page.total" :page-sizes="[1,100, 200, 300, 400]" layout="total, sizes, prev, pager, next, jumper" style="margin: -10px;" @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
        </template>
        <edit-form :userForm="userForm" v-model="editFormVisible" @submit="getTableData"/>
    </d2-container>
</template>
<script>
    import * as userService from "@/api/sys/user";
    import editForm from "./editForm";

    export default {
        name: "UserPage",
        components: {editForm},
        data() {
            var reg = /((?=.*[0-9])(?=.*[a-zA-Z])|(?=.*[0-9])(?=.*[^0-9a-zA-Z])|(?=.*[^0-9a-zA-Z])(?=.*[a-zA-Z]))^[ -~]{8,16}$/
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    if (!reg.test(value)) {
                        callback(new Error('密码长度8~16位，数字、字母、字符至少包含两种'))
                    }
                    callback()
                }
            }
            var validatePassconfirm = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                    if (!reg.test(value)) {
                        callback(new Error('密码长度8~16位，数字、字母、字符至少包含两种'))
                    } else {
                        if(value !== this.passwordForm.firstPassword) {
                            callback(new Error('两次输入密码不一致！'))
                        }
                    }
                    callback()
                }
            }
            return {
                searchForm: {
                    username: "",
                    mail: ""
                },
                tableData: [],
                dialogResetpassword: false,
                passwordForm: {
                    firstPassword: '',
                    confirmPassword: ''
                },
                passwordRules: {
                    firstPassword: [
                        { required: true, validator: validatePass, trigger: 'blur' }
                    ],
                    confirmPassword: [
                        { required: true, validator: validatePassconfirm, trigger: 'blur' }
                    ],
                },


                multipleSelection: [],
                page: {
                    current: 1,
                    size: 100,
                    total: 0
                },
                userForm: {},
                editFormVisible: false,
                userRoleDialogVisible: false
            };
        },
        mounted() {
            this.getTableData();
        },
        methods: {
            getTableData() {
                let query = {
                    pageIndex: this.page.current,
                    pageSize: this.page.size,
                    filter: this.searchForm
                };
                userService.getUserPagedList(query).then(data => {
                    this.tableData = data.rows;
                    this.page.total = data.totalCount;
                });
            },
            //禁止或启用用户
            operatState(state) {
                const s = state == 1 ? -1 : 1
            },
            //打开重置密码dialog
            resetPassword() {
                this.dialogResetpassword = true
                this.$nextTick(()=> {
                    this.$refs['resetPassword'].resetFields()
                })
            },
            //重置密码
            savePassword() {
                this.$refs["resetPassword"].validate(valid => {
                    if(valid) {

                    } else {
                        return false;
                    }
                })
            },
            //增加用户
            addUser() {
                this.editFormVisible = true
            },
            //编辑用户
            openEditForm(userForm) {
                this.userForm = userForm
                this.editFormVisible = true
            },


            handleSearchFormSubmit() {
                this.getTableData();
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            handleSizeChange(val) {
                this.page.size = val;
                this.getTableData();
            },
            handleCurrentChange(val) {
                this.page.current = val;
                this.getTableData();
            },


            openUserRoleDialog(user) {
                this.user = user;
                this.userRoleDialogVisible = true;
            },
            del(id) {
                this.$confirm("确认删除？", "确认信息", {
                    distinguishCancelAndClose: true,
                    confirmButtonText: "删除",
                    cancelButtonText: "取消"
                }).then(() => {
                    userService.delUser(id).then(() => {
                        this.getTableData();
                    });
                });
            }
        }
    };
</script>
