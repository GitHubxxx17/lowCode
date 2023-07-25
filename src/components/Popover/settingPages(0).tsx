import { ElInput, ElForm, ElFormItem, ElMessage } from "element-plus";
import { defineComponent, ref, reactive } from "vue";
import "../../sass/Popover/settingPages.scss";
import { checkIfUserExist } from "../../request/api/login.ts";
import {
  modifyUsername,
  modifyPassword,
  checkPassword,
} from "../../request/api/modifyInfo.ts";
import userStore from "../../stores/userStore.ts";
import pinia from "../../stores/index.ts";

export default defineComponent({
  setup() {
    const userData = userStore(pinia); // 用户数据
    // 修改用户名
    let usernameFormRef = ref(null);
    let newUsername = ref("");
    // 检查新的用户名是否已经存在
    const validateifUserExist = async (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请新的输入用户名"));
      } else {
        console.log("发送是否存在该用户请求");
        let ifUserExistServer = await checkIfUserExist(newUsername.value);
        console.log(ifUserExistServer);

        let regData = ifUserExistServer.data;
        if (regData.status) {
          callback(new Error(regData.msg));
        } else {
          callback();
        }
      }
    };
    // 确认修改用户名
    const confirmUserName = () => {
      console.log("确认修改用户名");
      usernameFormRef.value.validate(async (valid) => {
        // 如果表单的数据不合法则不发起请求
        if (!valid) return;
        let modifyServe = await modifyUsername(newUsername.value);
        let modifyData = modifyServe.data;
        if (modifyData.status) {
          ElMessage.error(modifyData.msg);
        } else {
          ElMessage.success(modifyData.msg);
          userData.username = modifyData.username;
        }
      });
    };
    // 表单的验证规则对象
    let usernameRules = reactive({
      // 验证新的用户名是否合法
      username: [
        {
          min: 3,
          max: 10,
          message: "用户名长度应在 3-10 个字符",
          trigger: "blur",
        },
        { validator: validateifUserExist, trigger: "blur" },
      ],
    });
    return () => {
      return (
        <>
          <el-tabs type="border-card" tab-position="left" class="card">
            <el-tab-pane label="修改用户名">
              <el-form
                ref={usernameFormRef}
                v-model={newUsername.value}
                rules={usernameRules}
                label-width="100px"
                autocomplete="off"
              >
                <el-form-item label="用户名：" prop="username">
                  <ElInput
                    placeholder="请输入新的用户名"
                    v-model={newUsername.value}
                    input-style="height:35px;"
                    autocomplete="off"
                  ></ElInput>
                </el-form-item>
                <el-form-item class="btns">
                  <button class="confirm" onClick={() => confirmUserName()}>
                    立即修改
                  </button>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="修改密码">
              <ElForm label-width="100px">
                <ElFormItem label="原始密码：">
                  <ElInput
                    placeholder="请输入原始密码"
                    input-style="height:35px;"
                    autocomplete="off"
                  ></ElInput>
                </ElFormItem>
                <ElFormItem label="修改密码：">
                  <ElInput
                    placeholder="请输入新的密码"
                    input-style="height:35px;"
                    show-password
                    type="password"
                    autocomplete="off"
                  ></ElInput>
                </ElFormItem>
                <ElFormItem label="确认密码：">
                  <ElInput
                    placeholder="请再次输入密码"
                    input-style="height:35px;"
                    show-password
                    type="password"
                  ></ElInput>
                </ElFormItem>
                <ElFormItem class="btns">
                  <button class="confirm">立即修改</button>
                </ElFormItem>
              </ElForm>
            </el-tab-pane>
          </el-tabs>
        </>
      );
    };
  },
});
