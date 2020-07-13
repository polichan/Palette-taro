export default class StepQueue {
  constructor() {
    this.steps = [];
    this.current = 0;
  }

  add(step) {
    this.steps.push(step);
  }

  removeAtIndex(index) {
    //todo remove
  }

  getAll() {
    return this.steps;
  }

  getCurrent() {
    return this.steps[this.current];
  }

  next() {
    if (this.current + 1 > this.steps.length - 1) {
        throw Error("没有下一个队列了")
    }else{
        this.current ++ 
    }
  }

  back() {
    if (this.current !== 0) {
      this.current--;
    }
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
