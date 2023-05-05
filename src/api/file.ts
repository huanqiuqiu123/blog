import request from '@/utils/request'

export const postUploadImg = (img: Array<File>) => {
    let forms = new FormData()
    img.forEach((item: File) => {
        forms.append("img", item)
    })
    return request({
        url: "/file/upload_img",
        method: "POST",
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data: forms
    })
}
