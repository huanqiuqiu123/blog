import request from '@/utils/request'

export const getAllTags = () => {
    return request({
        url: "/article/get_all_tags",
        method: "GET"
    })
}
