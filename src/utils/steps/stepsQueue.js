/*
 * @Autor: 陈鹏宇
 * @Date: 2020-07-15 14:11:53
 * @LastEditTime: 2020-08-14 20:11:51
 * @LastEditors: 陈鹏宇
 * @Description: 页面列表队列
 * @Version: 1.0
 */

 export default class StepQueue {
  constructor() {
    this.steps = [];
    this.current = 0;
  }

  add(step) {
    this.steps.push(step);
  }

  getAll() {
    return this.steps;
  }

  getCurrent() {
    return this.steps[this.current];
  }

  next() {
    return new Promise((success, fail) => {
      if (this.canNext()) {
        this.current++
        success()
      } else {
        fail("没有下一个元素")
      }
    })

  }

  canNext() {
    return this.current + 1 <= this.steps.length - 1
  }

  back() {
    return new Promise((success, fail) => {
      if (this.canBack()) {
        this.current--;
        success()
      } else {
        fail()
      }
    })
  }

  canBack() {
    return this.current !== 0
  }

  getFirst() {
    if (this.isEmpty()) {
      throw Error("当前队列中暂无流程");
    }
    return this.steps[0];
  }

  getLast() {
    if (this.isEmpty()) {
      throw Error("当前队列中暂无流程");
    }
    return this.steps[this.steps.length() - 1];
  }

  isEmpty() {
    return !this.steps.length;
  }
}
