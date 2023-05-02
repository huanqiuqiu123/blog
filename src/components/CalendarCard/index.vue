<template>
    <div class="calendar-container">
        <div class="title">
            <div class="show-date">
                <div class="show-date-month">{{ MonthEnum[currentMonth - 1] }}</div>
                <div class="show-date-year">{{ currentYear }}</div>
            </div>
            <div class="operation-group">
                <div class="operation-left operation-btn" @click="prevMonth">&lt;</div>
                <!--                <div class="operation-today operation-btn">今天</div>-->
                <div class="operation-right operation-btn" @click="nextMonth">&gt;</div>
            </div>
        </div>
        <div class="body">
            <div class="week-group">
                <div class="week-item" v-for="item in weekEnum">
                    {{ item }}
                </div>
            </div>
            <div class="date-group">
                <div :class="{'date-item':true,
                'today':getDate(year, month, item)===date&&currentYear===year&&currentMonth===month&&item<=getMonthDays(currentYear,currentMonth)&&item>=getFirstDayWeek(currentYear,currentMonth),
                'not-this-month':item>(getMonthDays(currentYear,currentMonth)+getFirstDayWeek(currentYear,currentMonth))||item<=getFirstDayWeek(currentYear,currentMonth),
                }"
                     v-for="item in (getMonthDays(currentYear,currentMonth)+getFirstDayWeek(currentYear,currentMonth))>35?42:35">
                    {{ getDate(currentYear, currentMonth, item) }}
                </div>
            </div>
        </div>
    </div>

</template>
<script setup lang="ts">

import {ref} from "vue";
//今天的日期
let today = new Date()
//日
let date = today.getDate()
//月
let month = today.getMonth() + 1
//年
let year = today.getFullYear()

let currentYear = ref<number>(year)
let currentMonth = ref<number>(month)

let weekEnum = ["日", "一", "二", "三", "四", "五", "六"]
let MonthEnum = ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]


//输入年月计算当月第一天是周几
const getFirstDayWeek = (year: number, month: number): number => new Date(year, month - 1, 1).getDay();

//输入年月计算当月有多少天
const getMonthDays = (year: number, month: number): number => new Date(year, month, 0).getDate()

const getDate = (year: number, month: number, index: number): number => {
    let firstDayWeek = getFirstDayWeek(year, month);
    let monthDays = getMonthDays(year, month);
    if (index <= firstDayWeek) {
        return getMonthDays(year, month - 1) - firstDayWeek + index
    } else if (index > monthDays + firstDayWeek) {
        return index - monthDays - firstDayWeek
    } else {
        return index - firstDayWeek
    }
}

const prevMonth = () => {
    if (currentMonth.value === 1) {
        currentMonth.value = 12
        currentYear.value--
    } else {
        currentMonth.value--
    }
}

const nextMonth = () => {
    if (currentMonth.value === 12) {
        currentMonth.value = 1
        currentYear.value++
    } else {
        currentMonth.value++
    }
}
</script>

<style scoped lang="scss">
@import "@/styles/var.scss";

.calendar-container {
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  background-color: #fff;
  box-shadow: 0 0 4px #f5f5f5, 0 0 8px #f5f5f5;

  .title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .show-date {
      display: flex;
      align-items: center;
      font-weight: 800;

      .show-date-month {
        margin-right: 8px;
        text-align: center;
      }

      .show-date-year {

      }
    }

    .operation-group {
      display: flex;
      align-items: center;
      font-weight: 600;

      .operation-btn {
        cursor: pointer;
        padding: 8px 12px;
        border-radius: 4px;
        background-color: #f5f5f5;
        font-size: 0.8rem;
        user-select: none;
      }

      .operation-left {
        margin-right: 12px;
      }
    }
  }

  .body {
    width: 100%;
    margin-top: 12px;

    .week-group {
      width: 100%;
      display: flex;
      align-items: center;

      .week-item {
        flex: 1;
        font-size: 0.7rem;
        text-align: center;
        color: #cccecd;
        font-weight: 600;
      }
    }

    .date-group {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: 8px;

      .date-item {
        flex-basis: 14.28%;
        text-align: center;
        padding: 8px;
        cursor: pointer;
        font-size: 0.8rem;
        font-weight: 600;
        border-radius: 4px;
      }

      .today {
        color: #fff;
        background-color: $purple-middle;

      }

      .not-this-month {
        color: #5f5f5f66;
      }

    }

  }
}

</style>
