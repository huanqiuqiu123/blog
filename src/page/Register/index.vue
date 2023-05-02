<template>
    <div class="register_container">
        <div class="register-main">
            <div class="left">
                <div class="background-image">
                </div>
            </div>
            <div class="right">
                <div class="title">
                    <div class="title-left">HQ</div>
                    <div class="title-right">BLOG</div>
                </div>
                <div class="form">
                    <div class="form-title">创建您的账户</div>
                    <div class="form-body">
                        <div class="account-group">
                            <div class="account-group-title group-title">邮箱
                                <HelpIcon>
                                    <div style="font-weight: 600;color: #8f8f8f">邮箱</div>
                                    <div style="margin-top: 4px;font-size: 0.85rem;color: #8f8f8f">
                                        暂只支持<span style="color: red">QQ邮箱</span>注册
                                    </div>
                                </HelpIcon>
                            </div>
                            <div class="account-group-input group-input">
                                <n-input v-model:value="email" placeholder="请输入邮箱" clearable/>
                            </div>
                        </div>

                        <div class="password-group">
                            <div class="password-group-title group-title">密码
                                <HelpIcon>
                                    <div style="font-weight: 600;color: #8f8f8f">密码</div>
                                    <div style="margin-top: 4px;font-size: 0.85rem;color: #8f8f8f">
                                        请输入<span style="color: red">6-12位</span>密码
                                    </div>
                                </HelpIcon>
                            </div>
                            <div class="password-group-input group-input">
                                <n-input v-model:value="password" type="password" placeholder="请输入密码"
                                         show-password-on="click"/>
                            </div>
                        </div>

                        <div class="code-group">
                            <div class="password-group-title group-title">验证码</div>
                            <div class="password-group-input group-input">
                                <n-input-group>
                                    <n-input v-model:value="code" placeholder="请输入验证码" clearable
                                             :allow-input="value=>(!value || /^\d+$/.test(value))&&value.length<=5"/>
                                    <n-button @click="sendCode" :disabled="!isSendCodeBtnActive" secondary type="info">
                                        {{ sendCodeContent }}
                                    </n-button>
                                </n-input-group>
                            </div>
                        </div>

                        <div class="register-group">
                            <n-button color="#a3a3ff" style="width: 100%" @click="register">点击注册</n-button>
                        </div>

                        <div class="tip-login">
                            <div class="tip" @click="navToLogin">已有帐户？点击登陆</div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {ref} from "vue";
import {Router, useRouter} from "vue-router";
import {useMessage} from "naive-ui"
import HelpIcon from "@/components/HelpIcon/index.vue";
import {registerReq, sendCodeReq} from "@/api/user";


const router: Router = useRouter()
const message = useMessage()


let sendCodeContent = ref<string>("发送验证码")
let isSendCodeBtnActive = ref<boolean>(true)
let email = ref<string>("")
let password = ref<string>("")
let code = ref<string>("")

//method
const sendCode = async () => {

    let emailInput = email.value.trim()
    if (!emailInput || emailInput.length == 0) {
        message.error("请输入邮箱")
        return
    }
    if (!/\w+@qq\.com/.test(emailInput)) {
        message.error("请输入正确的邮箱格式")
        return
    } else {
        let res = await sendCodeReq({email: emailInput})
        if (res.data.code === 200) {
            window.localStorage.setItem("codeToken", res.data.data.token)
            message.success(res.data.msg)
        } else {
            message.error(res.data.msg)
        }
    }

    let count: number = 60
    sendCodeContent.value = `还剩${count}s重新发送`
    isSendCodeBtnActive.value = false
    let timer = setInterval(() => {
        count--
        sendCodeContent.value = `还剩${count}s重新发送`
        if (count === 0) {
            sendCodeContent.value = "发送验证码"
            isSendCodeBtnActive.value = true
            clearInterval(timer)
        }
    }, 1000)
}

const navToLogin = () => {
    router.push({path: "/login"})
}

const register = async () => {
    let emailInput = email.value.trim()
    let passwordInput = password.value.trim()
    if (!emailInput || emailInput.length == 0) {
        message.error("请输入邮箱")
        return
    }
    if (!/\w+@qq\.com/.test(emailInput)) {
        message.error("请输入正确的邮箱格式")
    } else {
        if (passwordInput.length < 6 || passwordInput.length > 12) {
            message.error("请输入6-12位密码")
        } else {
            //验证成功
            let codeToken = window.localStorage.getItem("codeToken")
            if (codeToken) {
                let res = await registerReq({
                    email: emailInput,
                    password: passwordInput,
                    code: code.value.trim()
                }, {token: codeToken})
                if (res.data.code === 200) {
                    //注册成功
                    message.success(res.data.msg)
                    navToLogin()
                } else {
                    message.error(res.data.msg)
                }

            } else {
                message.error("token获取失败,请重新发送验证码")
            }

        }
    }
}

</script>

<style scoped lang="scss">
@import "@/styles/var.scss";

.help-icon {
  margin-left: 4px;
}

.register_container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;


  .register-main {
    width: 800px;
    height: 650px;
    display: flex;
    border-radius: 24px;
    overflow: hidden;
    border: 2px solid #f5f5f5;
    box-shadow: 0 0 2px #f5f5f5, 0 0 4px #f5f5f5, 0 0 8px #f5f5f5, 0 0 16px #f5f5f5;


    .right {
      flex: 1;
      height: 100%;
      background-color: #fff;
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
            display: flex;
            align-items: center;
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

          .code-group {
            margin-top: 24px;
          }

          .register-group {
            margin-top: 24px;
          }

          .tip-login {
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

    .left {
      flex: 1;
      height: 100%;
      background: $purple-light;
      display: flex;
      align-items: center;
      justify-content: center;

      .background-image {
        width: 60%;
        height: 100%;
        background: url("@/assets/image/bg_register.svg") no-repeat;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
