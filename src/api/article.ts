import request from '@/utils/request'
import {TagType} from "@/type/tagType";

export const getArticleId = () => {
    return request({
        url: "/article/get_article_id",
        method: "GET"
    })
}

export const postPublishArticle = (data: { articleId: string, title: string, content: string, tags: Array<TagType> },headers:{token:string}) => {
    return request({
        url: "/article/publish",
        method: "POST",
        data,
        headers
    })
}

export const postSaveArticle = (data: { articleId: string, title: string, content: string},headers:{token:string}) => {
    return request({
        url: "/article/save",
        method: "POST",
        data,
        headers
    })
}
