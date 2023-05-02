<template>
    <n-popover trigger="hover" placement="right">
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


</script>

<style scoped lang="scss">
</style>
