import request from '@/utils/request'

export const getArticleId = () => {
    return request({
        url: "/article/get_article_id",
        method: "GET"
    })
}
