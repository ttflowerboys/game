import fetch from 'src/util/fetch';

export const AjaxLogin = (data) => fetch({ url: '/api/gamelogin/token', method: 'post', data })   // 游戏登录-登录

export const AjaxJoin = (data) => fetch({ url: '/api/gamelogin/register', method: 'post', data })   // 游戏登录-注册

export const AjaxGameLogin = (data) => fetch({ url: '/api/gamelogin', method: 'post', data })   // 游戏登录-进入游戏

export const AjaxPay= (data) => fetch({ url: '/api/order/pay', method: 'post', data })   // 游戏登录-进入游戏

export const AjaxPayGameList= () => fetch({ url: '/xsGame/getGameList', method: 'get' })

export const AjaxPayServerList= (params) => fetch({ url: '/xsGame/serverList', method: 'get', params })

export const AjaxCheckAuth = (data) => fetch({ url: '/auth/check', method: 'post', data })

export const AjaxLoginPanel = (data) => fetch({ url: '/auth/register', method: 'post', data })

export const AjaxgetCaptcha = () => fetch({ url: '/auth/getCaptcha', method: 'post' })

export const AjaxGetUserinfo = () => fetch({ url: '/api/center/getUserInfo', method: 'get' })

export const AjaxEidtUserinfo = (data) => fetch({ url: '/api/center/updateUser', method: 'post', data })
