import Watcher from './watcher';

class Compile {
  constructor(vm) {
    this.el = vm.$el;
    this.vm = vm;
    this.compile(this.el);
  }
  // 编译模版处理文本节点和元素节点
  compile(el) {
    const childNodes = el.childNodes;
    Array.from(childNodes).forEach(node => {
      if (this.isTextNode(node)) {
        // 处理文本节点
        this.compileText(node)
      } else if (this.isElementNode(node)) {
        // 处理元素节点
        this.compileElement(node);
      }
      // 判断node有没有childNodes 如果有 递归
      if (node.childNodes && node.childNodes.length) {
        this.compile(node);
      }
    })
  }

  // 编译元素节点 处理指令
  compileElement(node) {
    // 此处只匹配v-if v-model
    // node.attributes
    // 遍历属性节点
    Array.from(node.attributes).forEach(attr => {
      // 判断是否是指令
      let attrName = attr.name
      if (this.isElementNode(attrName)) {
        attrName = attrName.substr(2)
        const key = attr.value
        this.update(node, key, attrName)
      }
    })
  }

  // 方法整合
  update(node, key, attrName) {
    const updateFn = this[`${attrName}updater`]
    updateFn && updateFn.call(this, node, key, this.vm[key])
  }

  // 处理v-text指令
  textUpdater(node, key, value) {
    node.textContent = value;

    new Watcher(this.vm, key, (newValue) => {
      node.textContent = newValue;
    })
  }

  // 处理v-model指令
  modelUpdater(node, key, value) {
    node.value = value

    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue;
    })

    // 给表单元素注册事件 以实现双向绑定
    node.addEventListener('input', () => {
      this.vm[key] = node.value
    })
  }

  // v-html处理
  htmlUpdater(node, key, value) {
    const decoder = document.createElement('div');
    decoder.innerHTML = value;
    node.innerHTML = decoder;

    new Watcher(this.vm, key, (newValue) => {
      node.innerHTML = newValue;
    })
  }

  // v-on处理 只考虑了单一事件
  onUpdater(node) {
    // 获取属性
    const list = node.attributes;
    // 遍历
    for (let i = 0; i < list.length; i++) {
      // 取得属性名
      let name = list[i];
      // 取得属性值
      const value = node.getAttribute(name);
      // 判断以v-on或者@开头
      if (/^@|^v-on:/.test(name)) {
        // 替换@或v-on为空
        name = name.replace(/^@|^v-on:/, '');
        // 向node节点添加事件
        node.addEventListener(name, value)
      }
    }
  }

  // 编译文本节点 处理差值表达式
  compileText(node) {
    // console.dir(node)
    // 匹配{{}}
    const reg = /\{\{().+?\}\}/
    // 获取当前节点值
    let value = node.textContent;
    // 如果是插值表达式
    if (reg.test(value)) {
      // 取出key并抹平空格
      const key = RegExp.$1.trim();
      // 用vm实例上对应的值替换再放回
      node.textContent = value.replace(reg, this.vm[key])

      // 创建watcher对象 数据改变更新视图
      new Watcher(this.vm, key, (newValue) => {
        node.textContent = newValue;
      });
    }
  }

  // 判断是不是指令
  isDirective(attrsName) {
    return attrsName.startsWith('v-')
  }

  // 判断是不是文本节点
  isTextNode(node) {
    return node.nodeType === 3
  }

  // 判断是不是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
}

export default Compile;
