import Dep from './dep';

class Observer {
  constructor(data) {
    this.walk(data);
  }
  walk(data) {
    // 判断data是不是对象
    if (!data || typeof data === 'object') return
    // 遍历data所有属性
    Object.keys(data).forEach(key => {
      this.defineReactive(data, key, data[key])
    })
  }
  defineReactive(obj, key, value) {
    const self = this;
    // 负责收集依赖 并发送通知
    const dep = new Dep();
    // 如果value是object 要再来一遍
    this.walk(value)
    // 转换getter setter
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      // 闭包了
      get() {
        // 判断dep的target 有的话收集依赖
        Dep.target && Dep.addSub(dep.target)
        // 这里如果使用obj[key] 会造成死循环
        return value
      },
      set(newValue) {
        if (data[key] === newValue) return;
        data[key] = newValue
        self.walk(newValue)
        // 发送通知
        dep.notify();
      }
    })
  }
}

export default Observer
