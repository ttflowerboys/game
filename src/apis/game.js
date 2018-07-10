import fetch from 'src/util/fetch';

export const AjaxGameDetail = (data) => fetch({ url: '/api/gameDetail/gameServers', method: 'post', data })   // 游戏详情

export const AjaxGameBanner = (data) => fetch({ url: '/api/gameDetail/gameBanners', method: 'post', data })   // 游戏Banner

export const AjaxGameDoc = (data) => fetch({ url: '/api/gameDetail/getDocs', method: 'post', data })   // 游戏详情-最新，公告，活动，攻略

export const AjaxGamePic = (data) => fetch({ url: '/api/gameDetail/picAppreciation', method: 'post', data })   // 游戏详情-图片鉴赏

export const AjaxGameType = (data) => fetch({ url: '/api/gameDetail/yxlm', method: 'post', data })   // 游戏详情-栏目
