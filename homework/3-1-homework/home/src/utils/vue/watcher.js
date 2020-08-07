class Watcher {
  constructor(vm, key, cb) {
    // 缓存vm
    this.vm = vm;
    // key值
    this.key = key;
    // 回调
    this.cb = cb
    // 记录当前watcher 添加到dep的静态属性target
    Dep.target = this;
    // 触发get方法
    this.oldValue = this.vm[this.key];
    Dep.target = null;
  }

  update() {
    const newValue = this.vm[this.key]
    if (newValue = this.oldValue) return;
    this.cb(newValue);
  }
}

export default Watcher;
