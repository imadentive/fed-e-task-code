/* eslint-disable */
// VueRouter 类图
// ----------------
// options // 记录构造函数参数对象
// data // 响应式对象
// routeMap // 路由规则
// ----------------
// constructor(options)
// _install(Vue) -- 插件机制
// init() //调用下面3个
// initEvent()
// createRouteMap()
// initComponents(Vue)

let _Vue = null;

class VueRouter {
  constructor(options) {
    // 记录options
    this.options = options;
    // 记录路由键值对
    this.routeMap = {}
    this.data = _Vue.observable({
      current: '/'
    });
  }

  createRouteMap() {
    // 创建路由键值对
    if (this.options.routes) {
      // 遍历所有的路由规则
      this.options.routes.forEach(route => {
        this.routeMap[route.path] = route.component
      })
      console.log(this.routeMap);
    }
  }

  init() {
    // 创建路由规则对应关系
    this.createRouteMap();
    // 初始化popstate方法
    this.initEvent();
    // 创建router-link和router-view
    this.initComponent(_Vue)
  }

  initComponent(Vue) {
    const self = this;
    const { options: { mode } } = self;
    // 创建router-link
    Vue.component('router-link', {
      props: {
        to: String
      },
      // template: '<a :href="to"><slot></slot></a>'
      render(h) {
        // 选择器，属性，内容/子元素
        return h('a', {
          attrs: {
            href: `${mode === 'history' ? '' : '#'}${this.to}`,
          },
          on: {
            click: this.clickHandler
          },
        }, [this.$slots.default])
      },
      methods: {
        clickHandler(e) {
          if (this.options.mode === 'history') {
            history.pushState({}, '', this.to);
          }
          this.$router.data.current = this.to;
          e.preventDefault();
        }
      }
    })
    // 创建router-view
    Vue.component('router-view', {
      render(h) {
        // 找到当前路由地址，在routeMap中找
        const comp = self.routeMap[self.data.current]
        return h(comp)
      }
    })
  }

  initEvent() {
    if (this.options.mode === 'history') {
      window.addEventListener('popstate', () => {
        this.data.current = window.location.pathname
      })
    } else {
      // 这儿是不是要实现个嵌套路由？
      window.addEventListener('onhashchange', () => {
        this.data.current = window.location.hash.slice(1)
      })
      window.addEventListener('load', () => {
        this.data.current = window.location.hash.slice(1)
      })
    }
  }

  static install(Vue, options) {
    // 判断当前插件是不是已经安装
    if (VueRouter.install.installed) return;
    VueRouter.install.installed = true;
    // 记录Vue构造函数到全局变量
    _Vue = Vue;
    // 把当前创建Vue实例时传入的router注入到所有Vue实例
    // _Vue.prototype.$router =
    // 混入
    _Vue.mixin({
      beforeCreate() {
        // 如果有$router判断是Vue实例 进行挂载 如果没有 判断时组件 不处理
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router
          this.$options.router.init();
        }
      },
    })
  }
}

export default VueRouter;
