import Vue from 'vue'
import Router from 'vue-router'
import { AjaxCheckAuth } from 'src/apis/user'
import store from 'src/store'
import * as types from 'src/store/mutation-types'

const layout = r => require.ensure([], () => r(require('../pages/layout')), 'layout')

const index = r => require.ensure([], () => r(require('../pages/index/index')), 'index')
const pay = r => require.ensure([], () => r(require('../pages/pay/index')), 'pay')

const login = r => require.ensure([], () => r(require('../pages/login/index')), 'login')
const join = r => require.ensure([], () => r(require('../pages/join/index')), 'join')
const forget = r => require.ensure([], () => r(require('../pages/forget/index')), 'forget')

const ucenter = r => require.ensure([], () => r(require('../pages/ucenter/layout')), 'ucenter')
const account = r => require.ensure([], () => r(require('../pages/ucenter/index')), 'account')
const ugame = r => require.ensure([], () => r(require('../pages/ucenter/game')), 'ugame')
const udata = r => require.ensure([], () => r(require('../pages/ucenter/data')), 'udata')
const avatar = r => require.ensure([], () => r(require('../pages/ucenter/avatar')), 'avatar')
const unews = r => require.ensure([], () => r(require('../pages/ucenter/news')), 'unews')
const safety = r => require.ensure([], () => r(require('../pages/ucenter/safety')), 'safety')
const recycling = r => require.ensure([], () => r(require('../pages/ucenter/recycling')), 'recycling')

const help = r => require.ensure([], () => r(require('../pages/help/index')), 'help')

const gamelayout = r => require.ensure([], () => r(require('../pages/game/layout')), 'gamelayout')
const gameindex = r => require.ensure([], () => r(require('../pages/game/index')), 'gameindex')
const gamexygl = r => require.ensure([], () => r(require('../pages/game/xygl')), 'gamexygl')
const gameyxgg = r => require.ensure([], () => r(require('../pages/game/yxgg')), 'gameyxgg')
const gamehdzx = r => require.ensure([], () => r(require('../pages/game/hdzx')), 'gamehdzx')

const server = r => require.ensure([], () => r(require('../pages/server/index')), 'server')

const notFound = r => require.ensure([], () => r(require('components/error/404')), 'notFound')

const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/index',
    meta: { title: '789W' },
    children: [
      { path: '/index', name: 'index', component: index, meta: { title: '首页' }},
      { path: '/pay', component: pay, meta: { title: '充值中心', requireAuth: true }}, //充值中心
      { path: '/help', component: help, meta: { title: '客服中心' }},  //客服中心
      { path: '/ucenter', component: ucenter, redirect: '/ucenter/index', meta: { title: '个人中心', requireAuth: true },// 个人中心
        children: [
          { path: 'data', component: account, meta: { title: '我的帐号', requireAuth: true }},
          { path: 'game', component: ugame, meta: { title: '我的游戏', requireAuth: true }},
          { path: 'index', component: udata, meta: { title: '个人资料', requireAuth: true }},
          { path: 'avatar', component: avatar, meta: { title: '修改头像', requireAuth: true }},
          { path: 'safety', component: safety, meta: { title: '账号安全', requireAuth: true }},
          { path: 'news', component: unews, meta: { title: '站内消息', requireAuth: true }},
          { path: 'recycling', component: recycling, meta: { title: '账号回收', requireAuth: true }}
        ]
      }
    ]
  },
  { path: "/game/", name: "gamelayout", component: gamelayout, meta: { title: '游戏' },
    children: [
      { path: "/game/:code/", redirect: '/game/:code/index' },
      { path: "/game/:code/index", name: "gameindex", component: gameindex, meta: { title: '游戏' } },
      { path: "/game/:code/yxgl", name: "gamexygl", component: gamexygl, meta: { title: '游戏攻略' } },
      { path: "/game/:code/yxgg", name: "gameyxgg", component: gameyxgg, meta: { title: '新闻公告' } },
      { path: "/game/:code/hdzx", name: "gamehdzx", component: gamehdzx, meta: { title: '活动资讯' } }
    ]
  },
  { path: '/server/:code', component: server, meta: { title: '服务器列表页' }},
  { path: '/login', component: login, meta: { title: '登录' }},
  { path: '/join', component: join, meta: { title: '注册' }},
  { path: '/forget', component: forget, meta: { title: '找回密码' }},
  { path: "/*", name: "error", component: notFound, meta: { title: '404' }}
]

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes
})

// 防刷新
if (localStorage.getItem('userData')) {
  store.commit(types.RECORD_USERINFO, {
    token: localStorage.getItem('userToken'),
    data: JSON.parse(localStorage.getItem('userData'))
  })
}

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : '798游戏';
  if (to.matched.some(r => r.meta.requireAuth)) {
    if(!localStorage.getItem('userToken')){
      next({
        path: '/login',
        query: {
          redirect: to.fullPath
        }
      })
    }else{
      let data = {
        token: localStorage.getItem('userToken')
      }
      AjaxCheckAuth(data).then(res => {
        if (res.status === 'success') {
          next()
        } else {
          next({
            path: '/login',
            query: {
              redirect: to.fullPath
            }
          })
        }
      })
    }
  } else {
    next()
  }
})

export default router;