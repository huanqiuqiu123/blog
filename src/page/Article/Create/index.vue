<script setup lang="ts">
import {onMounted, ref} from "vue";
import MdEditor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import {postUploadImg} from "@/api/file";
import {getArticleId} from "@/api/article";

let text = ref<string>("")
let articleId = ref<string>("")
let count = 0


onMounted(async () => {
    let res = await getArticleId()
    articleId = res.data.data.id
})

const uploadImg = async (files: Array<File>, callback: (urls: Array<string>) => void) => {
    let res =await postUploadImg(files)
    let paths:Array<string> = res.data.data.fileNames.map(v=>`${import.meta.env.VITE_BASE_URL}/image/${v}`)
    callback(paths)
}


</script>

<template>
    <div class="blog-create-container">
        <MdEditor style="width: 100%;height: 100%" v-model="text" :show-code-row-number="true"
                  :on-upload-img="uploadImg"/>
    </div>
</template>

<style scoped lang="scss">
.blog-create-container {
  width: 100%;
  height: 100%;
}
</style>
