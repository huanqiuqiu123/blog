<template>
    <div class="login_container">
        <div class="login-main">
            <div class="left">
                <n-gradient-text class="title" gradient="linear-gradient(to right, #fa709a 0%, #fee140 100%)">
                    {{ logo }} BLOG
                </n-gradient-text>
                <div class="form">
                    <div class="form-title">登陆您的账户</div>
                    <div class="form-body">
                        <div class="account-group">
                            <div class="account-group-title group-title">账号</div>
                            <div class="account-group-input group-input">
                                <n-input v-model:value="account" placeholder="请输入用户名或邮箱" clearable/>
                            </div>
                        </div>

                        <div class="password-group">
                            <div class="password-group-title group-title">密码</div>
                            <div class="password-group-input group-input">
                                <n-input v-model:value="password" type="password" placeholder="请输入密码"
                                         show-password-on="click"/>
                            </div>
                        </div>

                        <div class="help-group">
                            <div class="auto-login-group">
                                <n-checkbox v-model:checked="isAutoLoginChecked" label="自动登陆"/>
                            </div>
                            <div class="remember-account-group">
                                <n-checkbox v-model:checked="isRememberAccountChecked" label="记住密码"/>
                            </div>
                        </div>

                        <div class="login-group">
                            <n-button color="#a3a3ff" style="width: 100%" @click="login">点击登陆</n-button>
                        </div>

                        <div class="tip-register">
                            <div class="tip" @click="navToRegister">未有帐户？点击注册</div>
                        </div>
                    </div>

                </div>
            </div>
            <div class="right">
                <div class="background-image">
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>

import {onMounted, ref} from "vue";
import {useRouter} from "vue-router";
import {useMessage} from "naive-ui"
import {postLogin} from "@/api/user";

const router = useRouter()
const message = useMessage()

let isAutoLoginChecked = ref<boolean>(false)
let isRememberAccountChecked = ref<boolean>(false)
let account = ref<string>("")
let password = ref<string>("")
let logo = import.meta.env.VITE_LOGO

onMounted(() => {
    isAutoLoginChecked.value = (window.localStorage.getItem("isAutoLogin") ? !!window.localStorage.getItem("isAutoLogin") : false)
    isRememberAccountChecked.value = (window.localStorage.getItem("isRemember") ? !!window.localStorage.getItem("isRemember") : false)
    if (isRememberAccountChecked.value) {
        let accountLS = window.localStorage.getItem("account")
        if (!!accountLS) {
            account.value = accountLS
        }
        let passwordLS = window.localStorage.getItem("password")
        if (!!passwordLS) {
            password.value = passwordLS
        }
    }
})

//method
const login = async () => {
    let accountInput = account.value.trim()
    //验证格式
    if (!!accountInput && accountInput.length !== 0) {
        let passwordInput = password.value.trim()
        if (!!passwordInput && passwordInput.length !== 0) {
            let res = await postLogin({account: accountInput, password: passwordInput})
            if (res.data.code === 200) {
                window.localStorage.setItem("token", res.data.data.token)
                console.log(window.localStorage.getItem("token"))
                if (isRememberAccountChecked.value) {
                    window.localStorage.setItem("account", accountInput)
                    window.localStorage.setItem("password", passwordInput)
                }
                window.localStorage.setItem("isAutoLogin", isAutoLoginChecked.value ? "true" : "")
                window.localStorage.setItem("isRemember", isRememberAccountChecked.value ? "true" : "")
                message.success(res.data.msg)
                //跳转到首页
                await router.push({path: "/"})
            } else {
                message.error(res.data.msg)
            }
        }
    } else {
        message.error("请输入账号")
    }


}

const navToRegister = () => {
    router.push({path: "/register"})
}


</script>

<style scoped lang="scss">
@import "@/styles/var.scss";

.help-icon {
  margin-left: 4px;
}

.login_container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .login-main {
    width: 800px;
    height: 650px;
    display: flex;
    border-radius: 24px;
    overflow: hidden;
    border: 2px solid #f5f5f5;
    box-shadow: 0 0 2px #f5f5f5, 0 0 4px #f5f5f5, 0 0 8px #f5f5f5, 0 0 16px #f5f5f5;


    .left {
      flex: 1;
      height: 100%;
      background-color: #ffffff;
      display: flex;
      align-items: center;
      flex-direction: column;


      .title {
        margin: 48px auto;
        font-size: 1.5rem;
        font-weight: 600;
        display: flex;
        justify-content: center;
        align-items: center;
        height: fit-content;

        .title-left {
          color: #8f8f8f
        }
      }

      .form {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        flex: 1;
        width: 100%;

        .form-title {
          margin-bottom: 24px;
          font-size: 1.1rem;
          font-weight: 600;
          font-family: "YouYuan", serif;
          letter-spacing: 0.2rem;
          color: $purple-middle;
        }

        .form-body {
          width: 100%;
          padding: 0 48px;

          .group-title {
            font-size: 0.85rem;
            margin-bottom: 5px;
            font-weight: 600;
            color: #05050555;
          }

          .group-input {

          }

          .account-group {
            margin-top: 24px;
          }

          .password-group {
            margin-top: 24px;

          }

          .help-group {
            margin-top: 12px;
            display: flex;
            justify-content: space-between;
            padding: 0 12px;
          }

          .login-group {
            margin-top: 24px;
          }

          .tip-register {
            margin-top: 48px;
            display: flex;
            justify-content: center;


            .tip {
              color: #5f5f5f;
              cursor: pointer;
              user-select: none;
              transition: .5s ease;
              width: fit-content;

              &:hover {
                color: $purple-middle;
              }
            }
          }


        }
      }
    }

    .right {
      flex: 1;
      height: 100%;
      background: $purple-light;
      display: flex;
      align-items: center;
      justify-content: center;

      .background-image {
        width: 60%;
        height: 100%;
        background: url("@/assets/image/bg_login.svg") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
