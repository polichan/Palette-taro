/*
 * @Autor: 陈鹏宇
 * @Date: 2020-08-22 22:19:37
 * @LastEditTime: 2020-08-23 00:18:49
 * @LastEditors: 陈鹏宇
 * @Description: 队列
 * @Version: 1.0
 */
class Queue {
    constructor() {
        this.list = []
    }

    push(item) {
        this.list.push(item)
    }

    pop() {
        return this.list.pop()
    }

    size() {
        return this.list.length
    }

    isEmpty(){
        return this.list.length == 0
    }

}

export default Queue