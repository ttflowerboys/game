import fetch from 'src/util/fetch';

export const AjaxGameDetail = (params) => fetch({ url: '/gameDetail/gameServers', method: 'get', params })   // 游戏详情

export const AjaxGameBanner = (params) => fetch({ url: '/gameDetail/gameBanners', method: 'get', params })   // 游戏Banner

export const AjaxGameDoc = (params) => fetch({ url: '/gameDetail/getDocs', method: 'get', params })   // 游戏详情-最新，公告，活动，攻略

export const AjaxGamePic = (params) => fetch({ url: '/gameDetail/picAppreciation', method: 'get', params })   // 游戏详情-图片鉴赏

export const AjaxGameType = (data) => fetch({ url: '/gameDetail/yxlm', method: 'post', data })   // 游戏详情-栏目

export const AjaxGameLogin = (data) => fetch({ url: '/api/gamelogin', method: 'post', data })   // 游戏详情-栏目
