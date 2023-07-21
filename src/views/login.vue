<script setup>
import { ElButton, ElForm, ElFormItem, ElInput } from "element-plus";
import "../sass/login/login.scss";
import { reactive, ref, watchEffect } from "vue";

// 登录数据集合
let changeState = reactive({
  changeName: "注册",
  confirmName: "登录",
  isRegister: false,
});

// 点击切换登录注册
const changeModel = () => {
  if (changeState.changeName == "注册") {
    changeState.isRegister = true;
    changeState.changeName = "登录";
    changeState.confirmName = "注册";
    form.username = "";
    form.password = "";
    form.twicePassword = "";
  } else {
    changeState.isRegister = false;
    changeState.changeName = "注册";
    changeState.confirmName = "登录";
    form.username = "";
    form.password = "";
    form.twicePassword = "";
  }
};

// 表单的数据绑定对象
let form = reactive({
  username: "",
  password: "",
  twicePassword: "",
});

// 密码
const checkPasswordIsSame = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== this.ruleForm.pass) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

// 表单的验证规则对象
let rules = reactive({
  // 验证用户名是否合法
  username: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    { min: 3, max: 10, message: "用户名长度应在 3-10 个字符", trigger: "blur" },
  ],
  // 验证密码是否合法
  password: [
    { required: true, message: "请输入密码", trigger: "blur" },
    { min: 6, max: 15, message: "密码长度应在 6-15 个字符", trigger: "blur" },
  ],
  twicePassword: [{ validator: checkPasswordIsSame, trigger: "blur" }],
});
</script>
<template>
  <div class="login">
    <div class="login-box">
      <!-- 头像区域 -->
      <div class="login-box-avatar">
        <img src="../assets/user.jpg" />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        :model="form"
        :rules="rules"
        label-width="100px"
        class="login-box-form"
        autocomplete="off"
      >
        <el-form-item label="用&nbsp;&nbsp;户&nbsp;&nbsp;名：" prop="username">
          <ElInput
            placeholder="请输入用户名"
            v-model="form.username"
            input-style="height:35px;"
            autocomplete="off"
          ></ElInput>
        </el-form-item>
        <el-form-item
          label="密&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;码："
          prop="password"
        >
          <ElInput
            placeholder="请输入密码"
            v-model="form.password"
            input-style="height:35px;"
            show-password
            type="password"
            autocomplete="off"
          ></ElInput>
        </el-form-item>
        <el-form-item
          label="确认密码："
          v-show="changeState.isRegister"
          prop="twicePassword"
        >
          <ElInput
            placeholder="请再次输入密码"
            v-model="form.twicePassword"
            input-style="height:35px;"
            show-password
            type="password"
            autocomplete="off"
          ></ElInput>
        </el-form-item>
        <el-form-item class="login-box-form-btns">
          <button class="confirm">立即{{ changeState.confirmName }}</button>
          <div class="change" @click="changeModel()">
            去{{ changeState.changeName }}
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
