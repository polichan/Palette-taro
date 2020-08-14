/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-15 14:11:53
 * @LastEditTime: 2020-08-14 20:00:17
 * @LastEditors: 陈鹏宇
 * @Description: Step 对象，保存标题，按钮标题，以及页面路径
 * @Version: 1.0
 */
export default class Step {
    constructor(config) {
        this.navigationTitle = config.navigationTitle
        this.buttonTitle = config.buttonTitle
        this.pagePath = config.pagePath
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
}