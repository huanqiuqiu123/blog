/// <reference types="vite/client" />
interface ImportMetaEnv {
    readonly VITE_BASE_URL:string;
    readonly VITE_LOGO:string;
}

declare module '*.vue' {
    import type {DefineComponent} from 'vue'
    const component: DefineComponent<{}, {}, any>
    export default component
}
