<template>

    <div class="gradient-card-container"
         :style="{width:width,height:height,borderRadius:radius}">
        <div class="background"
             :style="{background:`linear-gradient(to ${direction},${gradientColor})`}"></div>
        <div class="face" :style="{...bodyStyle}">
            <slot></slot>
        </div>
    </div>

</template>

<script setup lang="ts">

import {PropType, toRefs} from "vue";
import {DirectionType} from "@/components/GradientCard/type";

const props = defineProps({
    width: {
        type: String,
        required: true,
    },
    height: {
        type: String,
        required: true
    },
    radius: {
        type: String,
        default: "12px",
        required: false
    },
    direction: {
        type: String as PropType<DirectionType>,
        default: "bottom right",
        required: false
    },
    gradientColor: {
        type: String,
        default: "#fa709a 0%, #fee140 100%",
        required: false
    },
    backgroundStyle: {
        type: Object,
        required: false
    },
    bodyStyle: {
        type: Object,
        required: false
    }
})

const {width, height, radius, direction, gradientColor, backgroundStyle, bodyStyle} = toRefs(props)


</script>

<style scoped lang="scss">
.gradient-card-container {
  position: relative;
  overflow: hidden;
  border: 2px solid #f5f5f5;

  .background {
    width: 100%;
    height: 100%;
  }

  .face {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    backdrop-filter: saturate(180%) blur(24px);
    background: rgba(255, 255, 255, .1);
  }
}

</style>
