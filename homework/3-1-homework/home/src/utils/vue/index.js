import Observer from './observer'
import Compile from './compile'

class Vue {
  constructor(options) {
    // 通过属性保存选项/数据
    this.$options = options || {};
    this.$data = options.data || {};
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    // 将data转换成getter/setter
    this._proxyData(this.$data);
    // 调用observer对象监听变化
    new Observer(this.$data)
    // 调用compiler对象解析指令和差值表达式
    new Compile(this)
  }
  _proxyData(data) {
    //  遍历data中的所有属性
    Object.keys(data).forEach(key => {
      // 将其注入到Vue实例
      Object.defineProperty(this, key, {
        enumerable: true,
        configurable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if (data[key] === newValue) return;
          data[key] = newValue
        }
      })
    })
  }
}

export default Vue;
