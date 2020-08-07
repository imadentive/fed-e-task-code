import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _53694b22 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _0d6b3d38 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _303a1384 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _39abd9f8 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _13585e28 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _6b06fe9c = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _6c17535e = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _53694b22,
    children: [{
      path: "",
      component: _0d6b3d38,
      name: "home"
    }, {
      path: "/login",
      component: _303a1384,
      name: "login"
    }, {
      path: "/register",
      component: _303a1384,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _39abd9f8,
      name: "profile"
    }, {
      path: "/settings",
      component: _13585e28,
      name: "settings"
    }, {
      path: "/editor",
      component: _6b06fe9c,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _6c17535e,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
