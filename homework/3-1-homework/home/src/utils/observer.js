// 发布者
class Dep {
  constructor() {
    this.subs = [] // 记录所有的订阅者
  }

  addSub(sub) {
    if (sub && sub.update) {
      // 必须有update才视为订阅者
      this.subs.push(sub)
    }
  }

  notify() {
    this.subs.forEach((sub) => {
      sub.update()
    }) 
  }
}
// 订阅者

class Watcher {
  update() {
    console.log('update');
  }
}

const dep = new Dep()
const Watcher = new Watcher()

dep.addSub(Watcher)
dep.notify()