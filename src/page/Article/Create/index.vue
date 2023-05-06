<script setup lang="ts">
import {onMounted, ref} from "vue";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {postUploadImg} from "@/api/file";
import {getArticleId} from "@/api/article";
import {getAllTags} from "@/api/tag";
import {TagType} from "@/type/tagType";
import {SelectOption} from "naive-ui";

let articleContent = ref<string>("")
let articleId = ref<string>("")
let articleTitle = ref<string>("")
let allTags: Array<TagType> = []
let articleTags = ref<Array<TagType>>([])
let isPopShow = ref<boolean>(false)

let tipTags=ref<Array<SelectOption>>([])

onMounted(async () => {
    let res = await getArticleId()
    articleId = res.data.data.id

    res = await getAllTags()
    allTags.push(...res.data.data.tags)
    // tipTags内容为allTags内容除去articleTags内容
    // tipTags = allTags.filter(v => !articleTags.value.includes(v)).map(v => ({label: v.name, value: v.id + ""}))
    tipTags.value.push(...allTags.map(v => ({label: v.name, value: v.id + ""})))
    console.log(tipTags.value)
})

const uploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
    let res = await postUploadImg(files)
    let paths: Array<string> = res.data.data.fileNames.map(v => `${import.meta.env.VITE_BASE_URL}/image/${v}`)
    callback(paths)
}

const tagInput =()=>{
    isPopShow.value = true
}


</script>

<template>
    <div class="blog-create-container">
        <div class="top">
            <div class="title-group">
                <div class="title-label">标题：</div>
                <n-input v-model:value="articleTitle" placeholder="请输入标题" size="large" class="title-input"
                         maxlength="30" show-count clearable/>
            </div>
            <div class="tag-group">
                <div class="tag-label">标签：</div>
                <n-dynamic-tags :max="5" :input-props="{}">
                </n-dynamic-tags>
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

      .title-label {
        font-size: 1.2rem;
        width: 72px;
        font-weight: bold;
        color: #5f5f5f;
      }

      .title-input {
        flex: 1;
      }
    }

    .tag-group {
      margin-top: 12px;
      display: flex;
      align-items: center;

      .tag-label {
        width: 72px;
        color: #8f8f8f;
        font-weight: bold;
      }
    }

  }

  .body {
    margin-top: 12px;
    flex: 1;
  }


}
</style>
