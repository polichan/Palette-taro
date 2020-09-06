/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-15 14:11:53
 * @LastEditTime: 2020-09-06 12:54:43
 * @LastEditors: 陈鹏宇
 * @Description: 配置文件
 * @Version: 1.0
 */ 

export const BASE_API = process.env == 'producation' ? "https://api.fengkuangqie.cn" : 'http://localhost:8888'

export const MD_RENDER_API = "https://md.fengkuangqie.cn/?tex"