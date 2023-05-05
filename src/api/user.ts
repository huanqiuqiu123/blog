import request from "@/utils/request";

export const postLogin = (data: {account:string,password:string}) => {
    return request({
        url: "/user/login",
        method: "POST",
        data
    })
}

export const postRegister = (data: { email: string, password: string, code: string }, headers: { token: string }) => {
    return request({
        url: "/user/register",
        method: "POST",
        data,
        headers
    })
}

export const postSendCode = (data: { email: string }) => {
    return request({
        url: "/user/send_code",
        method: "POST",
        data
    })
}
