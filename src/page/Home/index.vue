<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue";
import {TabType} from "@/type/tabType"
import {getTabData} from "@/page/Home/data";
import {Icon} from "@vicons/utils";


const router = useRouter()

let username = ref<string>("Huan Qiu")
let email = ref<string>("2364521714@qq.com")

let tabs: Array<TabType> = getTabData(router)

const navToMain = () => {
    router.push("/main")
}

</script>

<template>
    <div class="home-container">
        <div class="left">
            <div class="logo-container" @click="navToMain">
                <div class="logo">
                    <n-gradient-text type="info">
                        SY
                    </n-gradient-text>
                </div>
                <div class="title">
                    <n-gradient-text gradient="linear-gradient(to right, #fa709a 0%, #fee140 100%)">
                        SEE YOU BLOG
                    </n-gradient-text>
                </div>
            </div>
            <div class="user-container">
                <div class="avatar">
                    <n-avatar round :size="60"
                              :style="{fontSize:'1.3rem',color:'#fff',backgroundColor:'#ff8000',border:'2px solid #efefef'}">
                        SY
                    </n-avatar>
                </div>
                <div class="name">
                    {{ username }}
                </div>
                <div class="email">{{ email }}</div>
            </div>

            <div class="tab-container">
                <div class="tab-group-item" v-for="(tabGroupItem,i) in tabs">
                    <div class="dividing-line" v-if="i!==0"></div>
                    <div class="tab-group-item-title">
                        {{ tabGroupItem.title }}
                    </div>
                    <div class="tabs-container">
                        <div class="tab-item" v-for="item in tabGroupItem.items" @click="item.onClick">
                            <div class="icon">
                                <Icon>
                                    <component :is="item.icon as string"/>
                                </Icon>
                            </div>
                            <div class="title">
                                {{ item.title }}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
        <div class="right">
            <router-view/>
        </div>

    </div>

</template>


<style scoped lang="scss">
@import "@/styles/var.scss";

.home-container {
  width: 100%;
  height: 100%;
  display: flex;

  .left {
    display: flex;
    width: fit-content;
    flex-direction: column;
    align-items: center;
    height: 100%;
    border-right: 2px solid;
    border-image: linear-gradient(#f2f2f299 20%, #fff 50%) 2 2 2 2;
    //background-image: linear-gradient(to top right, #d299c255 0%, #fef9d755 20%);
    background-image: linear-gradient(30deg, #96fbc4 0%, #f9f586 8%, #fff 15%);

    .logo-container {
      display: flex;
      align-items: baseline;
      margin-top: 24px;
      padding: 0 48px;
      cursor: pointer;

      .logo {
        font-size: 2rem;
      }

      .title {
        font-size: 1.3rem;
        margin-left: 4px;
      }
    }

    .user-container {
      margin-top: 24px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .name {
        font-size: 1.2rem;
      }

      .email {
        color: #8f8f8f;
        margin-top: 8px;
        font-size: 0.8rem;
      }

    }

    .tab-container {
      display: flex;
      flex-direction: column;
      width: fit-content;
      //margin-top: 12px;

      .tab-group-item {
        margin-top: 28px;

        .dividing-line {
          border: 1px solid;
          border-image: linear-gradient(#fff 0%, #f8f8f8 30%, #f2f2f2 50%, #f8f8f8 70%, #fff 100%) 2 2 2 2;
        }

        .tab-group-item-title {
          margin-top: 16px;
          margin-bottom: 12px;
          font-size: 1.1rem;
          font-weight: 800;
          color: #5f5f5f;
        }

        .tabs-container {
          display: flex;
          flex-direction: column;
          margin-top: 8px;

          .tab-item {
            margin-top: 12px;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            cursor: pointer;
            user-select: none;


            .icon {
              font-size: 1.2rem;
              color: #9c9d9b;
            }

            .title {
              margin-left: 16px;
              color: $purple-middle;
              letter-spacing: 0.2rem;
              font-weight: 600;
              transition: .5s ease;
            }

            &:hover {
              .title {
                text-shadow: #a3a3ff55 0 0 2px;
              }

              .icon {

              }
            }
          }
        }


      }


    }
  }

  .right{
    flex: 1;
  }

}


</style>
