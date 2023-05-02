import {TabType} from "@/page/Home/type";
import {Router} from "vue-router";
import {Add, Search, AccessibilityOutline, SettingsOutline} from '@vicons/ionicons5'
export const getTabData = (router: Router): Array<TabType> => {
    return [
        {
            title: "作品 & 探索",
            items: [
                {
                    title: "创建", icon: Add, path: "/blog/create", onClick: () => {
                        router.push("/blog/create")
                    }
                },
                {
                    title: "探索", icon: Search, path: "/blog/explore", onClick: () => {
                        router.push("/blog/explore")
                    }
                }

            ]
        },
        {
            title: "我的 & 设置",
            items: [
                {
                    title: "我的", icon: AccessibilityOutline, path: "/user/profile", onClick: () => {

                    }
                },
                {
                    title: "设置", icon: SettingsOutline, path: "/user/setting", onClick: () => {

                    }
                }
            ]
        }
    ]
}
