import request from "@/utils/request";

export const loginReq = (data: {account:string,password:string}) => {
    return request({
        url: "/user/login",
        method: "POST",
        data
    })
}

export const registerReq = (data: { email: string, password: string, code: string }, headers: { token: string }) => {
    return request({
        url: "/user/register",
        method: "POST",
        data,
        headers
    })
}

export const sendCodeReq = (data: { email: string }) => {
    return request({
        url: "/user/send_code",
        method: "POST",
        data
    })
}
