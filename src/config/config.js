/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-15 14:11:53
 * @LastTime: 2020-11-23 21:53:18
 * @LastAuthor: 陈鹏宇
 * @Description: 配置文件
 * @Version: 1.0
 */

export const BASE_API = process.env.NODE_ENV == 'production' ? "https://api.fengkuangqie.cn" : 'http://localhost:8003'

export const MD_RENDER_API = "https://md.fengkuangqie.cn/?tex"