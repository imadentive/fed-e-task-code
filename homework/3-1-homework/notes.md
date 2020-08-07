# vue
## 基础结构
1. el指向目标元素
2. render接收h h->创建虚拟dom render返回虚拟dom
## 生命周期
1. 初始化 事件&生命周期
2. beforeCreate
3. 初始化 注入及校验
4. created
5. el?
6. template?
7. beforeMount
8. vm.$el 替换 el
9. mounted
## 语法概念
1. 插值表达式`{{}}`
2. 14个内置指令及自定义指令
3. 计算属性&监听器
4. class&style绑定
5. 条件渲染(v-if/v-show)&列表渲染(v-for:key)
6. 表单输入绑定(v-model)
7. 组件Component
8. 插槽slot
9. 插件VueRouter/Vuex
10. 混入mixin
11. 深入响应式原理
12. 不同构建版本的vue
## VueRouter工作步骤
- `import VueRouter from 'vue-router'`
- `Vue.use(VueRouter)`
- 路由规则router
- new VueRouter 传入路由规则
- 实例化Vue并传入router时会在vm挂载$route(路由规则)和$router(路由对象)
## 动态路由
- 通过路由规则里props设置为true 将url参数映射到props
## 嵌套路由
- 在相同布局中嵌入路由
## 编程式导航
- `this.$router.push(path, object)`
- `this.$router.replace(path);`
- `this.$router.push(path, { params: xxx })`
- `this.$router.go(number)`
## hash/history B端路由
- hash
- - 带#
- - 基于锚点 onhashchange
- history
- - 正常url
- - 基于html5的history api(IE10+)
- - pushState/replaceState
- - 需要服务器支持(服务器没有带路由的页面)
- - node环境下 connect-history-api-fallback
- - nginx环境下 `try_files $uri $uri/ /index.html;`
## Vue构建版本
- 运行时 没有template 要提前编译
- 完整版 包含运行时和编译器 程序运行时把模版编译成render
- 见utils/vue-router
## 模拟vue
### 数据驱动
- 数据响应式 - 避免操作dom
- 双向绑定 - 数据&视图
- 数据驱动 - 关注数据
### vue核心原理V2.6
- Object.defineProperty
### vue核心原理V3.0RC
- Proxy - ES6API 不支持IE 性能由浏览器优化
### 发布订阅模式
- 订阅者
- 发布者
- 信号中心
### 观察者模式
- Watcher 订阅者
- Dep 发布者
- - subs
- - addSubs
- - notify()
### 发布订阅模式与观察者模式
- 观察者模式由订阅者和发布者直接交互
- 发布订阅模式：订阅者与事件中心交互 发布者下发消息至事件中心
### Vue响应式原理模拟(src/utils/vue)
- 功能
- - 负责接收初始化参数(选项)
- - 将data内的属性注入到vue实例并转换成getter/setter
- - 负责调用监听observer监听data中所有属性的变化
- - 负责调用compiler解析指令/差值表达式
- - 类图
- - - $options/$el/$data
- - - _proxyData()
- - Observer
- - 负责将data选项中的属性转换为响应式数据
- - data中某个属性也是对象，把该属性转换成响应式数据
- - 数据变化发送通知
- - - 类图
- - - walk(data) - 遍历
- - - defineReactive
- - Compiler
- - 负责编译模版，解析指令/差值表达式
- - 负责页面首次渲染
- - 当数据变化后重新渲染视图
- - 类图
- - - el
- - - vm
- - - compile(el)
- - - compileElement(node)
- - - compileText(node)
- - - isDirective(arrtName)
- - - isTextNode(node)
- - - isElementNode(node)
- - Dep
- - 收集依赖 添加观察者
- - 通知所有观察者
- - 类图
- - - subs
- - - addSub()
- - - notify()
- - Watcher
- - 当数据变化触发依赖 dep通知所有的Watcher实例更新视图
- - 自身实例化时要往dep对象中添加自己
- - 类图
- - - vm
- - - key
- - - cb
- - - oldValue
- - - update()
## 虚拟dom
### 模块
- 导入
- 注册
- 使用 patch 第2个参数
### snabbdom源码
#### 如何看源码
1. 宏观了解
2. 带着目标看
3. 不求甚解
4. 调试
5. 参考资料
##### 核心
- h创建js对象(vnode)
- init设置模块 返回patch
- patch比较新旧vnode
- 映射真实dom
##### h函数
- vue中render的参数
- 来自hyperscript
- 用来创建vnode
- 函数重载
- - 参数个数或类型不同的函数
- 核心是调用vnode返回一个虚拟节点
##### vnode函数
- 就是返回一个js对象 用来描述虚拟dom
- patch(oldVnode, newVnode)
- - 对比新旧是否相同的根据(key&sel)
- - 如果不是 直接删 重新渲染
- - 判断text 如果是 不同就直接更新
- - 判断children 如果有 判断是不是有变化 用diff算法
- - diff只进行同层级比较
- init(modules - 模块, domApi - 可选(default htmlDomApi))
- - 返回了patch
- createElm
- - 触发用户钩子函数 init
- - 将vnode转换成DOM对象存储到vnode.elm中(此时还没有渲染到页面)
- - - sel === '!' -> 注释节点
- - - sel不为空
- - - - 创建对应dom
- - - - 触发模块的钩子函数create
- - - - 创建所有子节点的dom
- - - - 触发用户的钩子函数create
- - - - 如果vnode中包含insert则追加插入
- - - sel为空 -> 返回文本节点
- - 返回vnode.elm
- addVnode
- removeVnode
- patchVnode
- updateChildren
- - 同层级对比 时间复杂度O(n)
- - 旧开始/新开始 - 按索引正序依次对比
- - 旧结束/新结束 - 按索引倒序依次对比
- - 旧开始/新结束 - 如果相同则将旧开始移动到旧结束之后 按索引倒序依次对比
- - 旧结束/新开始 - 如果相同则将旧结束移动到旧开始之前 按索引正序依次对比
- - 新开始在旧的里面去找 - 如果有 移动到最前面 如果没有 添加到最前面
- - 循环结束之后 旧的少于新的 对比开始节点 索引依次后移 对比结束节点 索引依次向前 完全结束之后 新的中剩余整体插入到旧的之后
- - 循环结束之后 旧的多于新的 对比开始节点 索引依次后移 对比结束节点 索引依次向前 完全结束之后 旧的中剩余整体删除
