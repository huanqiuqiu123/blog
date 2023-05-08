<script setup lang="ts">
import {onMounted, ref} from "vue";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {postUploadImg} from "@/api/file";
import {getArticleId, postPublishArticle, postSaveArticle} from "@/api/article";
import {getAllTags} from "@/api/tag";
import {TagType} from "@/type/tagType";
import {SelectOption, useMessage} from "naive-ui";
import HelpIcon from "@/components/HelpIcon/index.vue";

const message = useMessage()

let articleContent = ref<string>("")
let articleId = ref<string>("")
let articleTitle = ref<string>("")
let allTags: Array<TagType> = []
let articleTags = ref<Array<TagType>>([])

let tipTags = ref<Array<SelectOption>>([])

onMounted(async () => {

    let res =await getArticleId()
    articleId.value=res.data.data.id

    res = await getAllTags()
    allTags.push(...res.data.data.tags)
    tipTags.value.push(...allTags.map(v => ({label: v.name, value: v.id + ""})))
    console.log(tipTags.value)
    articleTags.value.push(...allTags)
})

const uploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
    let res = await postUploadImg(files)
    let paths: Array<string> = res.data.data.fileNames.map(v => `${import.meta.env.VITE_BASE_URL}/image/${v}`)
    callback(paths)
}

const saveArticle = async () => {
    //标题长度是否符合要求
    let title = articleTitle.value.trim()
    if (title.length < 5 || title.length > 100) {
        message.error("标题长度为5到100个字符")
    } else {
        let content = articleContent.value.trim();
        if (content.length === 0) {
            message.error("文章内容不能为空")
        } else {
            let token: string = <string>window.localStorage.getItem("token")
            let res = await postSaveArticle({
                articleId: articleId.value,
                title,
                content
            }, {token})
            if (res.data.code ===200){
                message.success(res.data.msg)
            }else {
                message.error(res.data.msg)
            }
        }
    }

}

const publishArticle = async () => {
    //标题长度是否符合要求
    let title = articleTitle.value.trim()
    if (title.length < 5 || title.length > 100) {
        message.error("标题长度为5到100个字符")
    } else {
        let content = articleContent.value.trim();
        if (content.length === 0) {
            message.error("文章内容不能为空")
        } else {
            let token: string = <string>window.localStorage.getItem("token")
            let res = await postPublishArticle({
                articleId: articleId.value,
                title,
                content,
                tags: articleTags.value
            }, {token})
            if (res.data.code ===200){
                message.success(res.data.msg)
            }else {
                message.error(res.data.msg)
            }
        }
    }
}


</script>

<template>
    <div class="blog-create-container">
        <div class="top">
            <div class="title-group">
                <div class="title-label">标题
                    <HelpIcon class="title-help-icon" size="small" color="#8a2be2" placement="bottom">
                        标题长度5到100个字符
                    </HelpIcon>
                    ：
                </div>

                <n-input v-model:value="articleTitle" placeholder="请输入标题" size="large" class="title-input"
                         maxlength="100" show-count clearable/>
                <n-button size="large" class="btn_save" @click="saveArticle">保存草稿</n-button>
                <n-button size="large" class="btn_publish" color="#8a2be2" @click="publishArticle">发布文章</n-button>
            </div>
        </div>
        <MdEditor class="body" v-model="articleContent" :show-code-row-number="true"
                  :on-upload-img="uploadImg"/>
    </div>
</template>

<style scoped lang="scss">
.blog-create-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  .top {
    .title-group {
      display: flex;
      align-items: center;
      margin-top: 12px;

      .title-label {
        font-size: 1.2rem;
        width: 96px;
        font-weight: bold;
        color: #5f5f5f;
        display: flex;
        align-items: center;
      }

      .title-input {
        flex: 1;
      }

      .btn_save {
        margin-left: 12px;

      }

      .btn_publish {
        margin-left: 12px;
        margin-right: 12px;
      }

    }

  }

  .body {
    margin-top: 12px;
    flex: 1;

    &:deep(.cm-scroller) {
      overflow-y: auto;
      border-right: #8f8f8f33 2px solid;
    }
  }


}
</style>
