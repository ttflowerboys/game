import fetch from 'src/util/fetch';

export const AjaxLogin = (data) => fetch({ url: '/api/gamelogin/token', method: 'post', data })   // 游戏登录-登录

export const AjaxJoin = (data) => fetch({ url: '/api/gamelogin/register', method: 'post', data })   // 游戏登录-注册

export const AjaxGameLogin = (data) => fetch({ url: '/api/gamelogin', method: 'post', data })   // 游戏登录-进入游戏

export const AjaxPay= (data) => fetch({ url: '/api/order/pay', method: 'post', data })   // 游戏登录-进入游戏

export const AjaxPayGameList= () => fetch({ url: '/xsGame/getGameList', method: 'get' })

export const AjaxPayServerList= (params) => fetch({ url: '/xsGame/serverList', method: 'get', params })

export const AjaxRoleValidate = (data) => fetch({ url: '/api/order/roleValidate', method: 'post', data })

export const AjaxCheckAuth = (data) => fetch({ url: '/auth/check', method: 'post', data })

export const AjaxJoinPanel = (data) => fetch({ url: '/auth/register', method: 'post', data }) // 平台注册
export const AjaxLoginPanel = (data) => fetch({ url: '/auth/token', method: 'post', data}) // 平台登录

export const AjaxgetCaptcha = () => fetch({ url: '/auth/getCaptcha', method: 'get' }) // 图形验证码

export const AjaxGetUserinfo = () => fetch({ url: '/api/center/getUserInfo', method: 'get' })

export const AjaxEidtUserinfo = (data) => fetch({ url: '/api/center/updateUser', method: 'post', data })

export const AjaxSendSMS = (params) => fetch({ url: '/auth/getSmsCode', method: 'get', params })

export const AjaxForgetPassword = (data) => fetch({ url: '/auth/getforgetCode', method: 'post', data})
