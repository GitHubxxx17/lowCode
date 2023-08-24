<script setup>
import { ElButton, ElForm, ElFormItem, ElInput, ElMessage } from "element-plus";
import "../sass/login/login.scss";
import { reactive, ref } from "vue";
import { checkIfUserExist, reguser, login } from "../request/api/login";
import userStore from "../stores/userStore.ts";
import pinia from "../stores/index.ts";
import { sessionSaveData } from "../hooks/useStorage.ts";
import router from "../router/index.ts";

sessionStorage.clear(); // 刷新清空会话
const userData = userStore(pinia); // 用户数据

// 登录数据集合
let changeState = reactive({
  changeName: "注册",
  confirmName: "登录",
  isRegister: false,
});

let formRef = ref(null); //表单对象

// 重置表单
const resetFrom = () => {
  formRef.value.resetFields();
};

// 点击切换登录注册
const changeModel = () => {
  if (changeState.changeName == "注册") {
    changeState.isRegister = true;
    changeState.changeName = "登录";
    changeState.confirmName = "注册";
  } else {
    changeState.isRegister = false;
    changeState.changeName = "注册";
    changeState.confirmName = "登录";
  }
  form.username = "";
  form.password = "";
  form.checkPassword = "";
  resetFrom();
};

// 表单的数据绑定对象
let form = reactive({
  username: "",
  password: "",
  checkPassword: "",
});

// 检查用户名是否存在
const validateifUserExist = async (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入用户名"));
  } else {
    let ifUserExistServer = await checkIfUserExist(form.username);
    if (changeState.confirmName === "注册") {
      let regData = ifUserExistServer.data;
      if (regData.status) {
        callback(new Error(regData.msg));
      } else {
        callback();
      }
    } else {
      let loginData = ifUserExistServer.data;
      if (loginData.status) {
        callback();
      } else {
        callback("该用户名不存在！");
      }
    }
  }
};

// 检查密码
const validatePass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请输入密码"));
  } else {
    if (form.checkPassword !== "") {
      formRef.value.validateField("checkPassword");
    }
    callback();
  }
};

// 二次校验密码
const validateCheckPass = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次输入密码"));
  } else if (value !== form.password) {
    callback(new Error("两次输入密码不一致!"));
  } else {
    callback();
  }
};

// 表单的验证规则对象
let rules = reactive({
  // 验证用户名是否合法
  username: [
    { min: 3, max: 10, message: "用户名长度应在 3-10 个字符", trigger: "blur" },
    { validator: validateifUserExist, trigger: "blur" },
  ],
  // 验证密码是否合法
  password: [
    { min: 6, max: 15, message: "密码长度应在 6-15 个字符", trigger: "blur" },
    { validator: validatePass, trigger: "blur" },
  ],
  checkPassword: [{ validator: validateCheckPass, trigger: "blur" }],
});

// 立即登录或者立即注册
const confirm = ($router) => {
  formRef.value.validate(async (valid) => {
    // 如果表单的数据不合法则不发起请求
    if (!valid) return;
    let isSuccess = false;
    let loginServe = null;
    if (changeState.confirmName === "注册") {
      loginServe = await reguser(form.username, form.password);
    } else {
      loginServe = await login(form.username, form.password);
    }
    if (loginServe) {
      let loginData = loginServe.data;
      // 如果登录失败则给出提示
      if (loginData.status) {
        ElMessage.error(loginData.msg);
      } else {
        ElMessage.success(loginData.msg);
        isSuccess = true;
      }
      if (isSuccess) {
        // 保存 token username 到 piano
        userData.username = loginData.username;
        userData.token = loginData.token;
        // 保存 token 到 session
        sessionSaveData("token", loginData.token);
        sessionSaveData("username", loginData.username);
        $router.push("/home");
      }
    } else {
      ElMessage.success(changeState.confirmName + "异常，请重试！");
    }
  });
};
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
        ref="formRef"
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
          v-if="changeState.isRegister"
          prop="checkPassword"
        >
          <ElInput
            placeholder="请再次输入密码"
            v-model="form.checkPassword"
            input-style="height:35px;"
            show-password
            type="password"
            autocomplete="off"
          ></ElInput>
        </el-form-item>
        <el-form-item class="login-box-form-btns">
          <button type="button" class="confirm" @click="confirm($router)">
            立即{{ changeState.confirmName }}
          </button>
          <div class="change" @click="changeModel()">
            去{{ changeState.changeName }}
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
