<template>
  <div class="login-form">
    <div class="login-form__wrapper">
      <div class="login-form__content">
        <Transition name="el-fade-in-linear" appear>
          <ElForm :model="form" :rules="rules" ref="formRef">
            <ElFormItem prop="username">
              <ElInput type="text" v-model="form.username" placeholder="请输入账号">
                <template #prefix>
                  <m-icon name="User" />
                </template>
              </ElInput>
            </ElFormItem>
            <ElFormItem prop="password">
              <ElInput
                type="password"
                v-model="form.password"
                placeholder="请输入密码"
                show-password
              >
                <template #prefix>
                  <m-icon name="Lock" />
                </template>
              </ElInput>
            </ElFormItem>
            <ElFormItem prop="verifyCode">
              <ElInput v-model.number="form.verifyCode" placeholder="请输入验证码">
                <template #prefix>
                  <m-icon name="Help" />
                </template>
              </ElInput>
            </ElFormItem>
            <ElFormItem>
              <div class="flex-1 flex gap-10">
                <ElButton
                  class="flex-1"
                  type="primary"
                  icon="SwitchButton"
                  round
                  :loading="login_loading"
                  @click="handleLogin(form, handleValidate)"
                >
                  登录
                </ElButton>
                <ElButton class="flex-1" round icon="Setting" @click="handleReset">
                  重置
                </ElButton>
              </div>
            </ElFormItem>
          </ElForm>
        </Transition>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ElForm, ElFormItem, ElInput, ElButton } from "element-plus";

import type { FormRules, FormInstance } from "element-plus";

import { ref } from "vue";

import { useLogin } from "./hooks/useLogin";

const { form, login_loading, handleLogin } = useLogin();

const rules: FormRules = {
  account: [
    { required: true, message: "账号不允许为空", trigger: "change" },
    { min: 6, max: 18, message: "账号长度在6-18位" },
  ],
  password: [
    { required: true, message: "密码不允许为空", trigger: "change" },
    { min: 6, max: 18, message: "密码长度在6-18位" },
  ],
  code: [
    { required: true, message: "验证码不允许为空", trigger: "change" },
    { min: 6, max: 6, message: "验证码长度为6位" },
  ],
};

const formRef = ref<FormInstance>();
const handleValidate = (): Promise<boolean> => {
  return new Promise((resolve) => {
    formRef.value?.validate((valid) => resolve(valid));
  });
};

const handleReset = () => {
  formRef.value?.resetFields();
};
</script>

<style scoped lang="less">
.login-form {
  &__content {
    min-width: clamp(250px, 50vw, 350px);
  }
}
.el-button + .el-button {
  margin-left: 0;
}
</style>
