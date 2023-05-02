import {Component} from "vue";

export interface TabType{
    title:string,
    items:Array<TabItemType>
}

export interface TabItemType{
    icon:Component,
    title:string,
    path?:string
    onClick:Function
}
