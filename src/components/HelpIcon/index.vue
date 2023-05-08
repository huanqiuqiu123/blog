<template>
    <n-popover trigger="hover" :placement="placement as PlacementType">
        <template #trigger>
            <div class="icon-container">
                <Icon size="1rem" color="#c7c7ff">
                    <HelpCircle class="icon"/>
                </Icon>
            </div>
        </template>
        <slot></slot>
    </n-popover>

</template>

<script lang="ts" setup>
import {HelpCircle} from "@vicons/ionicons5";
import {Icon} from "@vicons/utils";
import {PropType, toRefs} from "vue";

type PlacementType = 'top' | 'bottom' | 'left' | 'right' | 'top-start' | 'top-end' | 'left-start' | 'left-end' | 'right-start' | 'right-end' | 'bottom-start' | 'bottom-end'

let props = defineProps({
    placement: {
        type: String as PropType<PlacementType>,
        default: "right",
        required: false
    }
})

const {placement} = toRefs(props)


</script>

<style scoped lang="scss">
</style>
