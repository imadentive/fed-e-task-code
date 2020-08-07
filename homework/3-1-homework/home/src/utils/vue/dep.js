class Dep {
  constructor() {
    // 观察者数组
    this.subs = []
  }
  // 添加观察者
  addSub(sub) {
    // 先判断sub是否为空且有update
    if (sub && sub.update) {
      sub.update();
    }
  }
  // 通知所有观察者
  notify() {
    this.subs.forEach(sub => {
      sub.update();
    })
  }
}