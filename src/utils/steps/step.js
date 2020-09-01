/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-15 14:11:53
 * @LastEditTime: 2020-09-02 03:10:21
 * @LastEditors: 陈鹏宇
 * @Description: Step 对象，保存标题，按钮标题，页面路径，进入该页面的时间、以及当前页面用户进行操作时候出现的实验错误
 * @Version: 1.0
 */
import moment from "moment";
import { DEFAULT_TIME_FORMAT } from "@/constants";

export default class Step {
    constructor(config) {
        this.navigationTitle = config.navigationTitle
        this.buttonTitle = config.buttonTitle
        this.pagePath = config.pagePath

        if (config.hasOwnProperty('error')) {
            this.error = config.error
        } else {
            this.error = null
        }

        if (config.hasOwnProperty('beginAt')) {
            this.beginAt = config.beginAt
        } else {
            this.beginAt = null
        }

    }

    getNavigationTitle() {
        return this.navigationTitle
    }

    getButtonTitle() {
        return this.buttonTitle
    }

    getPagePath() {
        return this.pagePath
    }


    getBeginTime() {
        return this.beginAt
    }

    getError() {
        return this.error
    }

    /**
     * 设置当前开始的时间
     */
    setBeginTime(time = null) {
        if (time == null) {
            this.beginAt = moment().format(DEFAULT_TIME_FORMAT)
        } else {
            this.beginAt = time
        }
    }

    /**
     * error
     * @param {string} err 
     */
    setError(err) {
        this.error = err
    }

}