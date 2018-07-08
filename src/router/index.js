import Vue from 'vue'
import Router from 'vue-router'

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

const notFound = r => require.ensure([], () => r(require('components/error/404')), 'notFound')

const routes = [
  {
    path: '/',
    name: 'layout',
    component: layout,
    redirect: '/index',
    meta: { title: '789W' },
    children: [
      {
        path: '/index',
        name: 'index',
        component: index,
        meta: {
          title: '首页'
        }
      }, {
        path: '/pay', //充值中心
        component: pay,
        meta: {
          title: '充值中心'
        }
      }, {
        path: '/login', //登录注册页
        component: login,
        meta: {
          title: '登录'
        }
      }, {
        path: '/join', //注册页
        component: join,
        meta: {
          title: '注册'
        }
      }, {
        path: '/forget', //找回密码页
        component: forget,
        meta: {
          title: '找回密码'
        }
      }, {
        path: '/ucenter', // 个人中心
        component: ucenter,
        redirect: '/ucenter/index',
        meta: {
          title: '个人中心',
          requireAuth: true
        },
        children: [{
          path: 'index',
          component: account,
          meta: {
            title: '我的帐号'
          }
        }, {
          path: 'game',
          component: ugame,
          meta: {
            title: '我的游戏'
          }
        }, {
          path: 'data',
          component: udata,
          meta: {
            title: '个人资料'
          }
        }, {
          path: 'avatar',
          component: avatar,
          meta: {
            title: '修改头像'
          }
        }, {
          path: 'safety',
          component: safety,
          meta: {
            title: '账号安全'
          }
        }, {
          path: 'news',
          component: unews,
          meta: {
            title: '站内消息'
          }
        }, {
          path: 'recycling',
          component: recycling,
          meta: {
            title: '账号回收'
          }
        }]
      },{
        path: '/help', //客服中心
        component: help,
        meta: {
          title: '客服中心'
        }
      }
    ]
  }, {
    path: "/*", name: "error", component: notFound, meta: { title: '404' }
  }]

Vue.use(Router)

const router = new Router({
  mode: 'history',
  linkActiveClass: 'active',
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title : '798游戏'
  next()
})

export default router;